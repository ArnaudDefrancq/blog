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
      <section className='flex items-center justify-center min-h-screen bg-colorOne m-auto'>
        <div className='flex flex-col bg-white shadow-xl rounded-2xl'>
          <div className='flex justify-evenly'>
            <button className='cursor-pointer text-xl p-6 border-b-1 ' onClick={(e) => handleClick(e)} id='signUp'>
              Inscription
            </button>
            <button className='cursor-pointer text-xl p-6 border-l-1 border-b-1' onClick={(e) => handleClick(e)} id='signIn'>
              Connexion
            </button>
          </div>
          <div>
            {
              modal ? <SignIn /> : <SignUp />
            }
          </div>
        </div>
      </section>
    </>
  );
};

export default Connection;
