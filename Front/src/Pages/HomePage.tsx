import * as React from 'react';
import Home from '../Components/homePage/Home';
import Header from '../Components/header/Header';
import Footer from '../Components/footer/Footer';

const HomePage: React.FunctionComponent = () => {
  return (
    <>
      <Header />
      <Home />
      <Footer/>
    </>
  );
};

export default HomePage;
