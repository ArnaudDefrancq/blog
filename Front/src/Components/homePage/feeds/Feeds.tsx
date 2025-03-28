import * as React from 'react';
import { usePostStore } from '../../../Store/PostStore';
import Card from './card/Card';
import { useParams } from 'react-router-dom';
interface IFeedsProps {
  profilPage: boolean
}

const Feeds: React.FunctionComponent<IFeedsProps> = ({ profilPage }) => {

  const { id } = useParams();
  const { posts, fetchPost } = usePostStore();

  React.useEffect(() => {
    fetchPost()
  }, [fetchPost])


  return (
    <>
      <section>
        {
          profilPage ? 
            posts.filter((post) => id && post.id_user == Number(id)).length > 0 ? posts.filter((post) => id && post.id_user == Number(id)).map((post) => {return <Card posts={post} key={post.id_post}/>}) : <h1>Pas de post trouvé</h1>
            : 
            posts?.map((post) => {
              return <Card posts={post} key={post.id_post}/>
            })
        }  
      </section>        
    </>
  );
};

export default Feeds;

// posts?.map((post) => {
//   if (profilPage) {
//     if (id && Number(id) == post.id_user) {
//       return <Card posts={post} key={post.id_post}/>
//     } else {
//       return <h1>Pas de post trouvé</h1>
//     }
//   } else {
//     return <Card posts={post} key={post.id_post}/>
//   }
//   })