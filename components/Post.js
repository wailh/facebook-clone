import Image from 'next/image';
import {
  ChatBubbleBottomCenterIcon,
  ShareIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';

const Post = ({ name, message, email, image, postImage, timestamp }) => {
  return (
    <div className="flex flex-col">
      <div className="p-5 bg-white mt-5 rounded-t-2px shadow-sm">
        <div className="flex items-center space-x-2">
          <img
            className="rounded-full"
            src={image}
            width={40}
            height={40}
            alt="hhh"
          />
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sx text-gray-400">
              {new Date(timestamp?.toDate()).toLocaleDateString()}
            </p>
          </div>
        </div>
        <p className="pt-4">{message}</p>
        {postImage && (
          <div className="relative h-56 md:h-96 bg-white">
            <Image src={postImage} objectFit="cover" layout="fill" />
          </div>
        )}

        {/* Footer of posts */}
        <div
          className="flex justify-between items-center rounded-b-2xl bg-white
                       shadow-md text-gray-400 border-t"
        >
          <div className="inputIcon rounded-none  rounded-bl-2xl">
            <HandThumbUpIcon className="h-4" />
            <p className="text-xs sm:text-base">Like</p>
          </div>

          <div className="inputIcon rounded-none">
            <ChatBubbleBottomCenterIcon className="h-4" />
            <p className="text-xs sm:text-base">Comment</p>
          </div>

          <div className="inputIcon rounded-none  rounded-br-2xl">
            <ShareIcon className="h-4" />
            <p className="text-xs sm:text-base">Share</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
