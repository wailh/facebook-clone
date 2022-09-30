import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, doc, setDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import Post from './Post';

const Posts = () => {
  const data = collection(db, 'posts');
  const q = query(data, orderBy('timestamp', 'desc'));

  const [realTimePosts, loading, error] = useCollection(q);

  return (
    <div>
      {realTimePosts && (
        <span>
          Collection:{' '}
          {realTimePosts.docs.map((post) => (
            <Post
              keys={post.id}
              name={post.data().name}
              message={post.data().message}
              email={post.data().timestamp}
              image={post.data().image}
              postImage={post.data().postImage}
            />
          ))}
        </span>
      )}
    </div>
  );
};

export default Posts;
