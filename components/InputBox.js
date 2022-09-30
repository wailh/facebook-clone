import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaceSmileIcon } from '@heroicons/react/24/outline';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/24/solid';
import { useRef, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import {
  getStorage,
  ref,
  uploadString,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

const InputBox = () => {
  const { data: session } = useSession();
  const inputRef = useRef(null);
  const filepickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);
  const storage = getStorage();

  const sendPost = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;
    // Add a new document with a generated id.
    addDoc(collection(db, 'posts'), {
      message: inputRef.current.value,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      timestamp: serverTimestamp(),
    }).then((docum) => {
      if (imageToPost) {
        const storage = getStorage();
        const storageRef = ref(storage, `posts/${doc.id}`);
        const uploadTask = uploadBytesResumable(
          storageRef,
          imageToPost,
          'data_url'
        );
        removeImage();
        uploadTask.on(
          'state_changed',
          null,
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
              setDoc(
                doc(db, 'posts', doc.id),
                { postImage: URL },
                { merge: true }
              );
            });
          }
        );
      }
    });
    inputRef.current.value = '';
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };

  const removeImage = () => {
    setImageToPost(null);
  };

  return (
    <div
      className="bg-white p-2 rounded-2xl shadow-md 
     text-gray-500 font-medium mt-6"
    >
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full"
          src={session.user.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
            type="text"
            ref={inputRef}
            placeholder={`what's on your mind, ${session.user.name}?`}
          />
          <button hidden type="submit" onClick={sendPost}>
            Submit
          </button>
        </form>

        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex flex-col filter
          hover:brightness-110 transition duration-150 transform 
          hover:scale-105 cursor-pointer"
          >
            <img
              className="h-10 object-contain"
              src={imageToPost}
              alt="wait for image"
            />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>
      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div className="inputIcon">
          <FaceSmileIcon className="h-7 text-yellow-500" />
          <p className="text-xs sm:text-sm xl:text-base">Felling/Activity</p>
        </div>
        <div
          className="inputIcon"
          onClick={() => filepickerRef.current.click()}
        >
          <CameraIcon className="h-7 text-green-500" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input
            ref={filepickerRef}
            onChange={addImageToPost}
            type="file"
            hidden
          />
        </div>
      </div>
    </div>
  );
};

export default InputBox;
