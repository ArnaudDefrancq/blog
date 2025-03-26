import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from '../../Store/AuthStore';
import { useLikePostStore } from '../../Store/LikePostStore';
import { Like_post } from '../../Types/Like_post';

interface ICreatePostLikeProps {
  id_post: number | undefined
}

const CreatePostLike: React.FunctionComponent<ICreatePostLikeProps> = ({id_post}) => {

  const [isLike, setIsLike] = React.useState<boolean>(false)
  const [likeP, setLikeP] = React.useState<Array<Like_post>>()
  const { user_id } = useAuthStore();
  const { likePosts, createLikePost, fetchLikePost, deleteLikePost } = useLikePostStore();

  React.useEffect(() => {
    if (id_post) {
      const fetchLike = async () => {
        const fetchedLike = await fetchLikePost(id_post);
        setLikeP(fetchedLike);
    };
    fetchLike();
    }
  }, [id_post, fetchLikePost])

  React.useEffect(() => {
    if (likeP) {
      postIsLike()
    }
  }, [likeP])

  const handleClickLike = (): void => {
    if (id_post && user_id) {
        const newLike: Like_post = {
          id_post,
          id_user: user_id
        }
        createLikePost(newLike)
        setIsLike(true)
    }
  }

  const handleClickUnlike = (): void => {
    if (id_post && user_id && likePosts) {
        const likePost = likePosts.find((like) => like.id_post == id_post && like.id_user == user_id)
        if (likePost && likePost.id_like_post) {
          deleteLikePost(likePost.id_like_post)
          setIsLike(false)
        }
    }
  }

  const totalLike = (): number => {
    return likePosts.length
  }
  
  const postIsLike = () => {
    if (likeP) {
        const likePost = likeP.find((like) => like.id_post == id_post && like.id_user == user_id);
        if (likePost?.id_like_post) {
          setIsLike(true)
        } else {
          setIsLike(false)
        }
    }
  }

  return (
    <>
        <div className="flex items-center gap-3">
            <button className="cursor-pointer">
                {
                  isLike ? <FontAwesomeIcon className="text-colorTwo text-4xl hover:text-colorFive transition" icon={faThumbsUp} onClick={handleClickUnlike}/> : <FontAwesomeIcon className="text-colorFive text-4xl hover:text-colorTwo transition" icon={faThumbsUp} onClick={handleClickLike}/>
                }
            </button>
            <p className="text-gray-800 text-lg font-semibold">{totalLike()}</p>
        </div>
    </>
  ) ;
};

export default CreatePostLike;
