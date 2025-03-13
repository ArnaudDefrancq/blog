import * as React from 'react';

const NavBar: React.FunctionComponent = () => {
  return (
    <>
        <nav>
            <ul className='text-xl flex p-10'>
                <li data-nav="accueil" className='block py-2 px-5 cursor-pointer hover:text-colorTwo transition-colors duration-300'>Accueil</li>
                <li data-nav="profil" className='block py-2 px-5 cursor-pointer hover:text-colorTwo transition-colors duration-300'>Profil</li>
                <li data-nav="params" className='block py-2 px-5 cursor-pointer hover:text-colorTwo transition-colors duration-300'>Paramètres</li>
                <li data-nav="logout" className='block py-2 px-5 cursor-pointer hover:text-colorTwo transition-colors duration-300'>Déconnexion</li>
            </ul>
        </nav>
    </>
  );
};

export default NavBar;
