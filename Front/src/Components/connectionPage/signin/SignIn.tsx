import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ISignInProps {
}

const SignIn: React.FunctionComponent<ISignInProps> = () => {
  return (
    <>
      <form className='max-w-sm mx-auto'>
        <div className='m-5'>
          <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor="email">Adresse mail :</label>
          <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 ' type="email"  id='email' />
        </div>
        <div className='m-5'>
          <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor="password">Mot de passe :</label>
          <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5' type="password" id="password" />
        </div>
        <div className='m-10 flex justify-center'>
          <button className='cursor-pointer text-black bg-colorTwo hover:opacity-85 rounded-lg text-m w-40 px-5 py-3 text-center'>Valider</button>
        </div>
      </form>
    </>
  );
};

export default SignIn;
