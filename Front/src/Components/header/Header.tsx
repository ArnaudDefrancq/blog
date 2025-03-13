import * as React from 'react';
import NavBar from './navBar/NavBar';


const Header: React.FunctionComponent = () => {
  return (
    <>
        <header className='flex justify-end bg-stone-50'>
            <NavBar />
        </header>
    </>
  ) ;
};

export default Header;
