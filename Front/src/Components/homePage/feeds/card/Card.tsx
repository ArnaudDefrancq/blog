import * as React from 'react';
import { PostWithUser } from '../../../../Types/Post';
import Author from './author/Author';
import { useNavigate } from 'react-router-dom';

interface ICardProps {
  posts : PostWithUser
}

const Card: React.FunctionComponent<ICardProps> = ({posts}) => {
  const navigate = useNavigate()

  const handleClick = (): void => {
    navigate(`/post/${posts.id_post}`)
  }

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-4 my-4 mx-auto w-300">
        <div className="flex items-center space-x-2">
          <Author pseudo={posts.pseudo} created_at={posts.created_at} updated_at={posts.updated_at} />
        </div>
        <div className="mt-2">
          <h2 className="text-xl font-semibold text-gray-800">{posts.title}</h2>
        </div>
        <div className="mt-2 text-gray-600">
          <p>{posts.content.length > 100 ? posts.content.substring(0, 100) + '...' : posts.content}</p>
        </div>
        <div className="mt-4 flex justify-end">
            <button className="bg-colorTwo text-white px-4 py-2 rounded-lg hover:bg-colorThree  hover:text-black transition delay-0.3 cursor-pointer" onClick={handleClick}>
              Plus de détails
            </button>
        </div>
      </div>
    </>
  );
};

export default Card;
