import * as React from 'react';
import Feeds from './feeds/Feeds';

const Home: React.FunctionComponent = () => {
  return (
    <>
      <Feeds />
      <button className="fixed bottom-40 right-20 bg-colorFive text-white px-8 py-2 rounded-full shadow-lg hover:bg-colorFour hover:text-black cursor-pointer text-xl">
        Publier
      </button>
    </>
  );
};

export default Home;
