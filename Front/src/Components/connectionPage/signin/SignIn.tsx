import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ISignInProps {
}

const SignIn: React.FunctionComponent<ISignInProps> = () => {
  return (
    <>
      <form>
        <div>
          <label htmlFor="email">Adresse mail :</label>
          <input type="email"  id='email' />
        </div>
        <div>
          <label htmlFor="password">Mot de passe :</label>
          <input type="password" id="password" />
        </div>
        <button>Valider</button>
      </form>
    </>
  );
};

export default SignIn;
