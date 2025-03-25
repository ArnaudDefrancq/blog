import * as React from 'react';
import { useCommentStore } from '../../Store/CommentStore';
import { Security } from '../../Tools/Security';
import { REGEX_TEXTE } from '../../Tools/configuration';
import { newCom } from '../../Types/Comment';

interface ICreateComProps {
    id_post: number | undefined
}

type Errors = {
    errorContent: boolean
}
const CreateCom: React.FunctionComponent<ICreateComProps> = ({id_post}) => {
    const [content, setContent] = React.useState<string>('');
    const [isClick, setIsClick] = React.useState<boolean>(false);
    const { createComment } = useCommentStore();

    const [error, setError] = React.useState<Errors>({
        errorContent: false
    })

    const checkInput= (value: string, regex: RegExp, key: keyof Errors): void => {
        Security.checkValidity(value, regex, key, setError);    
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        if (!error.errorContent && id_post) {
            const newCom: newCom = {
                content,
                id_post
            }
            createComment(newCom, id_post);
        } else {
            setIsClick(true)
        }
    }
  return (
    <>
        <div className='mt-2 w-full'>
            <input 
                type="text" 
                placeholder="Écrire un commentaire..." 
                className="w-full p-2 border border-gray-300 rounded-lg"
                onChange={(e) => {setContent(e.target.value); checkInput(e.target.value, REGEX_TEXTE, 'errorContent')}}
            />  
            {
                error.errorContent && isClick && <p className='text-error text-sm mt-1'>Commentaire non valide</p>
            }
        </div>
        <button className="mt-2 bg-colorTwo text-white px-4 py-2 rounded-lg hover:bg-colorFive transition cursor-pointer" onClick={(e) => {handleClick(e)}}>
            Envoyer
        </button>
    </>
  );
};

export default CreateCom;
