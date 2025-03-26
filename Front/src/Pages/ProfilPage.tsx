import * as React from 'react';
import Header from '../Components/header/Header';
import Footer from '../Components/footer/Footer';
import Profil from '../Components/profilPage/Profil';

const ProfilPage: React.FunctionComponent = () => {
  return (
   <>        
    <div className='flex flex-col min-h-screen'>
      <header className='flex justify-end bg-stone-50'>
        <Header />
      </header>
      <main className='flex-grow bg-colorTwo'>
        <Profil />
      </main>
      <footer className='bg-colorFive h-25 flex justify-center items-center'>
        <Footer/>
      </footer>
    </div>
   </> 
  );
};

export default ProfilPage;
