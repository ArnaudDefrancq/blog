import * as React from 'react';
import Home from '../Components/homePage/Home';
import Header from '../Components/header/Header';
import Footer from '../Components/footer/Footer';

const HomePage: React.FunctionComponent = () => {
  return (
    <>
    <div className='flex flex-col min-h-screen'>
      <header className='flex justify-end bg-stone-50'>
        <Header />
      </header>
      <main className='flex-grow bg-colorTwo'>
        <Home />
      </main>
      <footer className='bg-colorFive h-25 flex justify-center items-center'>
        <Footer/>
      </footer>
    </div>
    </>
  );
};

export default HomePage;
