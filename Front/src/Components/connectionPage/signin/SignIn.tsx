import * as React from "react";
import { UserController } from "../../../Controllers/UserController";
import { Auth } from "../../../Types/Auth";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../Store/AuthStore";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ISignInProps {}

const SignIn: React.FunctionComponent<ISignInProps> = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [isClick, setIsClick] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<boolean>(false);

  const navigate = useNavigate();

  const { setUser } = useAuthStore();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (email.length > 0 && password.length > 0) {

      const auth: Auth = {
        email,
        password
      }
      try {
        const res = await UserController.signIn(auth);
        if (res) {
          setUser(res.user_id, res.role_id, res.token);
          navigate('/feeds');
        }
        setErrors(true)
      } catch (error) {
        console.error(error)
      }
    }
  };

  return (
    <>
      <form className="max-w-sm mx-auto">
        <div className="m-5">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="email"
          >
            Adresse mail :
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 "
            type="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="m-5">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="password"
          >
            Mot de passe :
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            type="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errors && isClick && (
          <p className="text-error text-sm m-5">
            Mot de passe ou email invalide.
          </p>
        )}
        <div className="m-10 flex justify-center">
          <button
            className="cursor-pointer text-black bg-colorTwo hover:opacity-85 rounded-lg text-m w-40 px-5 py-3 text-center"
            onClick={(e) => {
              handleClick(e);
              setIsClick(true);
            }}
          >
            Valider
          </button>
        </div>
      </form>
    </>
  );
};

export default SignIn;
