import * as React from 'react';
import { usePostStore } from '../../../Store/PostStore';
import Card from './card/Card';

const Feeds: React.FunctionComponent = () => {

  const { posts, fetchPost } = usePostStore();

  React.useEffect(() => {
      fetchPost()
  }, [fetchPost])

  return (
    <>
      <section>
        {
          posts?.map((post) => {
            return <Card posts={post} key={post.id_post}/>
          })
        }  
      </section>        
    </>
  );
};

export default Feeds;
