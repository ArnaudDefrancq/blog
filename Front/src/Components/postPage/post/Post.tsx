import * as React from 'react';
import { Tools } from '../../../Tools/Tools';
import { Security } from '../../../Tools/Security';
import { REGEX_TEXTE, REGEX_TITLE } from '../../../Tools/configuration';
import { usePostStore } from '../../../Store/PostStore';
import { NewPost } from '../../../Types/Post';
import { useCommentStore } from '../../../Store/CommentStore';
import Comments from '../../comments/Comments';
import CreateCom from '../../createCom/CreateCom';
import CreatePostLike from '../../createLikePost/CreatePostLike';

interface IPostProps {
    id_post: number | undefined,
    title: string,
    content: string,
    media: string | undefined,
    user: number | undefined
    pseudo: string,
    created_at: number,
    updated_at: number
}

type Errors = {
    errorTitle: boolean,
    errorContent: boolean,
    errorFile: boolean
}

const Post: React.FunctionComponent<IPostProps> = ({id_post, title, content, media, user, pseudo, created_at, updated_at}) => {
    const [isEditing, setIsEditing] = React.useState<boolean>(false);
    const [newTitle, setNewTitle] = React.useState<string>('');
    const [newContent, setNewContent] = React.useState<string>(''); 
    const [newMedia, setNewMedia] = React.useState<string | undefined>()
    const [newMediaFile, setNewMediaFile] = React.useState<File | null>();
    const [isClick, setIsClick] = React.useState<boolean>(false);
    const [addCom, setAddCom] = React.useState<boolean>(false);

    const [errors, setErrors] = React.useState<Errors> ({
        errorTitle: false,
        errorContent: false,
        errorFile: false
    }); 

    const { updatePost } = usePostStore();
    const { fetchComment, comments } = useCommentStore();

    React.useEffect(() => {
        if (id_post) {
            fetchComment(id_post);
        }
        if (isEditing) {
          setNewTitle(title);
          setNewContent(content)
          setIsClick(false)
        }
        if (media) {
            setNewMedia(`${import.meta.env.VITE_URL_IMG}imgPost/${user}/${media}`)
        }
    }, [isEditing, title, content, media, user, fetchComment, id_post])

    const changeMode = (): void => {
        return setIsEditing(prevState => !prevState)
    }

    const createCom = (): void => {
        return setAddCom(prevState => !prevState)
    }

    const displayDate = (created_at: number, updated_at: number): string => {
        return (updated_at === created_at) ? Tools.timestampToDate(created_at) : `modifié le ${Tools.timestampToDate(updated_at)}`
    }

    const checkInput = (value: string, regex: RegExp, key: keyof Errors) => {
        Security.checkValidity(value, regex, key, setErrors);
    }


    const checkFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {           
        const file = e.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        
        if (allowedTypes.includes(file.type)) {        
            setNewMediaFile(file);
            setNewMedia(URL.createObjectURL(file))
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

    const handleClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (id_post && !errors.errorTitle && ! errors.errorContent && !errors.errorFile) {
            const upPost: NewPost = {
                title: newTitle,
                content: newContent,
                media: newMediaFile && newMediaFile
            }

            updatePost(id_post, upPost);
            alert('Modification OK')
            changeMode()
        } else {
            setIsClick(true)
        }
    }


  return (
    <>
        <div className="max-w-4xl mx-auto my-8 p-8 bg-gray-50 shadow-md rounded-xl">
            <div className="flex flex-col items-start border-b pb-4 mb-4">
            {
                isEditing ? (
                    <div className="w-full">
                        <input 
                            type="text" 
                            value={newTitle} 
                            className="w-full text-3xl font-semibold border border-gray-300 p-2 rounded" 
                            onChange={(e) => { 
                                setNewTitle(e.target.value); 
                                checkInput(e.target.value, REGEX_TITLE, 'errorTitle');
                            }} 
                        />
                        {errors.errorTitle && isClick && (
                            <p className="text-error font-semibold text-m mt-3">Veuillez entrer un titre valide.</p>
                        )}
                    </div>
                ) : (
                    <div className='w-full flex justify-between items-center'>
                        <h1 className="text-4xl font-bold">{title}</h1>
                        <CreatePostLike />
                    </div>
                )
            }
                <p className="text-gray-500 text-sm mt-2">
                    Publié par <span className="font-semibold">{pseudo}</span> le {displayDate(created_at, updated_at)}
                </p>
            </div>

            {isEditing ? (
                <div className="mb-6">
                    <input
                        type="file"
                        accept=".jpg, .jpeg, .png, .gif"
                        className="w-full p-2 border rounded-md cursor-pointer"
                        onChange={(e) => {checkFile(e)}}
                    />
                {newMedia && (
                    <div className="relative mt-4">
                        <img 
                            src={newMedia} 
                            alt="Nouvelle illustration du post" 
                            className="w-full max-h-[400px] object-cover rounded-lg shadow-md border border-gray-200"
                        />
                        <button
                            onClick={() => {setNewMedia(""); setNewMediaFile(null)}}
                            className="absolute top-2 right-2 bg-red-500 text-white text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full shadow-lg hover:bg-red-600 transition cursor-pointer"
                        >
                            ✖
                        </button>
                    </div>
                    
                )}
                </div>
            ) : (
                media && (
                    <div className="overflow-hidden rounded-lg shadow-md mb-6">
                        <img src={`${import.meta.env.VITE_URL_IMG}imgPost/${user}/${media}`} alt="Illustration du post" className="w-full max-h-[400px] object-cover" />
                        {errors.errorFile && isClick && (
                            <p className="text-error font-semibold text-m mt-3">Veuillez entrer une image valide.</p>
                        )}
                    </div>
                )
            )} 

            <div className="mb-6 my-9">
                {isEditing ? (
                    <div className="w-full">
                        <textarea 
                            value={newContent} 
                            className="w-full p-3 border rounded-lg h-40" 
                            onChange={(e) => { 
                                setNewContent(e.target.value); 
                                checkInput(e.target.value, REGEX_TEXTE, 'errorContent');
                            }}
                        ></textarea>
                        {errors.errorContent && isClick && (
                            <p className="text-error font-semibold text-m mt-3">Veuillez entrer un contenu valide.</p>
                        )}
                    </div>
                ) : (
                    <p className="text-lg text-gray-700 leading-relaxed">{content}</p>
                )}
            </div>

            <div className="flex justify-end gap-4"> 
            {
                isEditing ? (
                    <div className="flex gap-4">
                        <button 
                            className="bg-colorTwo text-white px-4 py-2 rounded-lg hover:bg-green-600 transition cursor-pointer" 
                            onClick={(e) => {handleClick(e)}}
                        >
                            Valider
                        </button>
                        <button 
                            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition cursor-pointer" 
                            onClick={changeMode}
                        >
                            Annuler
                        </button>
                    </div>
                ) : (
                    <button 
                        className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition cursor-pointer" 
                        onClick={changeMode}
                    >
                        Modifier le post
                    </button>
                )
            }
            </div>

            <div className="border-t pt-6 mt-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Commentaires</h2>
                    <button className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition cursor-pointer" onClick={createCom}>
                        Commenter
                    </button>
                </div>

                {addCom && (
                    <div className="mt-4 flex items-center gap-2 mb-2">
                        <CreateCom id_post={id_post}/>
                    </div>
                )}
                {
                    comments.length > 0 ? 
                    comments.map((com) => {
                        return <Comments com={com} key={com.id_comment} />
                    }) :
                    <p className="text-gray-500">Aucun commentaire pour l'instant.</p>
                }
            </div>
        </div>
    </>
  );
};

export default Post;
