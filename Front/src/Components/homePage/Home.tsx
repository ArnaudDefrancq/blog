import * as React from 'react';
import Feeds from './feeds/Feeds';
import CreatePost from './createPost/CreatePost';

const Home: React.FunctionComponent = () => {

  const [isClick, setIsClick] = React.useState<boolean>(false)

  return (
    <>
      <Feeds />
      {!isClick ? (
        <button
          className="fixed bottom-40 right-20 bg-colorFive text-white px-8 py-2 rounded-full shadow-lg hover:bg-colorOne hover:text-black transition duration-300 cursor-pointer text-xl"
          onClick={() => {setIsClick(true)}}
        >
          Publier
        </button>
      ) : (
        <CreatePost setIsClick={setIsClick} />
      )
      }
    </>
  );
};

export default Home;
