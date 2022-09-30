import InputBox from './InputBox';
import Posts from './Posts';
import Stories from './Stories';

const Feed = () => {
  return (
    <div
      className="flex-grow h-screen pb-44 pt-6 mr-4 xl:mr-40 
       overflow-y-auto scrollbar-hide"
    >
      {/* Stories */}
      <Stories />
      {/* InputtBox */}
      <InputBox />
      {/* Posts */}
      <Posts />
    </div>
  );
};

export default Feed;
