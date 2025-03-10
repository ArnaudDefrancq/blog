import * as React from 'react';
import { Security } from '../../../Tools/Security';
import { REGEX_MAIL, REGEX_PASSWORD, REGEX_PSEUDO } from '../../../Tools/configuration';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ISignUpProps {
}

type Errors = {
  errorEmail: boolean,
  errorPseudo: boolean,
  errorPassword: boolean,
}

const SignUp: React.FunctionComponent<ISignUpProps> = () => {
  const [email, setEmail] = React.useState<string>('');
  const [pseudo, setPseudo] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [isClick, setIsClick] = React.useState<boolean>(false);

  const [errors, setErrors] = React.useState<Errors> ({
    errorEmail: true,
    errorPseudo: true,
    errorPassword: true,
  })

  const checkEmail = (value: string): void => {
    Security.checkValidity(value, REGEX_MAIL, 'errorEmail', setErrors);
  }
  const checkPseudo = (value: string): void => {
    Security.checkValidity(value, REGEX_PSEUDO, 'errorPseudo', setErrors);
  }
  const checkPassword = (value: string): void => {
    Security.checkValidity(value, REGEX_PASSWORD, 'errorPassword', setErrors);
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

  }

 
  return (
    <>
      <form className='max-w-sm mx-auto'>
        <div className='m-5'>
          <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor="email">Adresse mail :</label>
          <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 ' 
                 type="email"  
                 id='email' 
                 required 
                 onChange={(e) => {setEmail(e.target.value); checkEmail(e.target.value)}}
                />
          {
            (errors.errorEmail && isClick) &&  <p className='text-error text-sm mt-3'>Veuillez entrer un mail valide.</p>
          }
        </div>
        <div className='m-5'>
          <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor="pseudo">Pseudo :</label>
          <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5' 
                 type="text" 
                 id="pseudo" 
                 required
                 onChange={(e) => {setPseudo(e.target.value); checkPseudo(e.target.value)}}
                 />
          {
            (errors.errorPseudo && isClick) &&  <p className='text-error text-sm mt-3'>Veuillez entrer un pseudo valide.</p>
          }
        </div>
        <div className='m-5'>
          <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor="password">Mot de passe :</label>
          <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5' 
                 type="password" 
                 id="password" 
                 required
                 onChange={(e) => {setPassword(e.target.value); checkPassword(e.target.value)}}
                 />
          {
            (errors.errorPassword && isClick) &&  <p className='text-error text-sm mt-3'>Veuillez entrer un mot de passe valide.</p>
          }
        </div>
        <div className='m-8 flex justify-center'>
          <button className='cursor-pointer text-black bg-colorTwo hover:opacity-85 rounded-lg text-m w-40 px-5 py-3 text-center'
                   onClick={(e) => {handleClick(e); setIsClick(true)}}>Valider</button>
        </div>
      </form>
    </>
  );
};

export default SignUp;