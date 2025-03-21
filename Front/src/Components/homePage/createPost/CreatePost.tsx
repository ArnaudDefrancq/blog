import * as React from 'react';
import { Security } from '../../../Tools/Security';
import { REGEX_TEXTE, REGEX_TITLE } from '../../../Tools/configuration';
import { NewPost } from '../../../Types/Post';
import { usePostStore } from '../../../Store/PostStore';

interface ICreatePostProps {
setIsClick:  React.Dispatch<React.SetStateAction<boolean>>
}

type Errors = {
  errorTitle: boolean,
  errorContent: boolean,
  errorFile: boolean
}

const CreatePost: React.FunctionComponent<ICreatePostProps> = ({setIsClick}) => {

  const [title, setTitle] = React.useState<string>(""); 
  const [content, setContent] = React.useState<string>(""); 
  const [file, setFile] = React.useState<File | null>(null); 
  const [isClickForm, setIsClickForm] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<Errors>({
    errorTitle: true,
    errorContent: true,
    errorFile: false
  })
  const [errorMsg, setErrorMsg] = React.useState<string>('');

  const { createPost } = usePostStore();


  const checkInput = (value: string, regex: RegExp, key: keyof Errors) => {
    Security.checkValidity(value, regex, key, setErrors)
  }

  const checkFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {           
      const file = e.target.files[0];
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      
      if (allowedTypes.includes(file.type)) {        
        setFile(file);
        setErrors(prevError => ({
            ...prevError,
            errorFile: false,
        }));
      } else {
        console.error('Type de fichier non valide.');
        setErrors(prevError => ({
            ...prevError,
            errorFile: true,
        }));
      }
    } else {
      setErrors(prevError => ({
        ...prevError,
        errorFile: true,
      }));
    } 
  }

  const  handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try  {
      if (!errors.errorTitle && !errors.errorContent) {
        const newPost: NewPost = {
          title,
          content,
          media: file
        };
        
        createPost(newPost);
        setIsClick(false)
        
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('Problème lors de l\'ajout du post');
    }
  }

  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-25 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl cursor-pointer"
          onClick={() => setIsClick(false)}
        >
          ✕
        </button>

        <form className="space-y-10">
          <div>
            <label htmlFor="title" className="block font-medium">
              Titre :
            </label>
            <input
              type="text"
              id="title"
              required
              className="w-full border border-gray-300 p-2 rounded"
              onChange={(e) => {setTitle(e.target.value); checkInput(e.target.value, REGEX_TITLE, 'errorTitle')}}
            />
            {
              (errors.errorTitle && isClickForm) && <p className="text-error text-sm mt-3">Veuillez entrer un titre valide.</p>
            }
          </div>
          <div>
            <label htmlFor="content" className="block font-medium">
              Votre message :
            </label>
            <textarea
              id="content"
              required
              className="w-full border border-gray-300 p-2 rounded resize-none"
              onChange={(e) => {setContent(e.target.value); checkInput(e.target.value, REGEX_TEXTE, 'errorContent')}}
            ></textarea>
            {
              (errors.errorContent && isClickForm) && <p className="text-error text-sm mt-3">Veuillez entrer un message valide.</p>
            }
          </div>
          <div>
            <label htmlFor="image" className="block font-medium">
              Votre image :
            </label>
            <input type="file" id="image" className="w-full border p-2 rounded cursor-pointer" onChange={(e) => checkFile(e)}/>
            {
              (errors.errorFile && isClickForm) && <p className="text-error text-sm mt-3">Veuillez entrer un fichier valide.</p>
            }
          </div>
          <div className="text-center">
            <button className="bg-colorTwo text-white px-6 py-2 rounded hover:bg-colorFour hover:text-black transition duration-300 cursor-pointer" onClick={(e) => {setIsClickForm(true); handleClick(e)}}>
              Valider
            </button>
            {
              isClickForm &&  <p className="text-error text-sm mt-3">{errorMsg}</p>
            }
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default CreatePost;
