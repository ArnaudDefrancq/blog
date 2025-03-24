import * as React from 'react';
import { useParams } from 'react-router-dom';
import { usePostStore } from '../../Store/PostStore';
import { PostWithUser } from '../../Types/Post';
import Post from './post/Post';

const MainPostPage: React.FunctionComponent = () => {

    const { id } = useParams<{ id: string }>();
    const { fetchOnePost, posts } = usePostStore();
    const [post, setPost] = React.useState<PostWithUser | null>();


    React.useEffect(() => {
        if (id) {
            const fetchPost = async () => {
                const fetchedPost = await fetchOnePost(Number(id));
                setPost(fetchedPost);
            };
            fetchPost();
        }
    }, [id,fetchOnePost, posts])

  return (
    <>
        {
            post ? (          
                <Post id_post={post.id_post} title={post.title} content={post.content} media={post.media} user={post.id_user} pseudo={post.pseudo} created_at={post.created_at} updated_at={post.updated_at}/>
            ) : (
                <h1>Pas de post trouvé</h1>
            )
        }
    </>
  );
};

export default MainPostPage;
