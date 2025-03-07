import * as React from 'react';
import SignIn from './signin/SignIn';
import SignUp from './signUp/SignUp';


const Connection: React.FunctionComponent = () => {

  const [modal, setModal] = React.useState<boolean>(false);

  function handleClick (e: React.MouseEvent<HTMLButtonElement>): void {
    const target = e.target as HTMLButtonElement;
    setModal(target.id !== "signUp")
  }

  return (
    <>
      <section className='flex items-center justify-center min-h-screen bg-colorOne'>
        <div className='border border-black'>
          <button className='cursor-pointer' onClick={(e) => handleClick(e)} id='signUp'>
            Inscription
          </button>
          <button className='cursor-pointer' onClick={(e) => handleClick(e)} id='signIn'>
            Connexion
          </button>
        </div>
        <div>
          {
            modal ? <SignIn /> : <SignUp />
          }
        </div>
      </section>
    </>
  );
};

export default Connection;
