import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useUserStore } from '../../Store/UserStore';
import { User } from '../../Types/User';
import { Tools } from '../../Tools/Tools';
import Feeds from '../homePage/feeds/Feeds';
import { usePostStore } from '../../Store/PostStore';

const Profil: React.FunctionComponent = () => {

  const { id } = useParams();
  const [user, setUser] = React.useState<User | null>();

  const { fetchOneUser } = useUserStore();
  const { posts } = usePostStore();

  React.useEffect(() => {
    if (id) {
      const fetchUser = async () => {
          const fetchedUser = await fetchOneUser(Number(id));
          setUser(fetchedUser);
      };
      fetchUser();
  }
  }, [id, fetchOneUser])

  return (
    <>
      {
        user ? (
          <div className="w-300 mx-auto mt-8">
            <div className="bg-white shadow-lg rounded-lg p-6 px-8 mb-6 flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">{user.pseudo}</h1>
              <div>
                <p className="text-gray-600 mt-2 flex items-center">
                    📅 Compte créé le {Tools.timestampToDate(user.created_at)}
                </p>
                <p className="text-gray-600 flex items-center">
                    📝 Nombre de posts : {posts.filter((post) => id && post.id_user == Number(id)).length}
                </p>
              </div>
            </div>
            <div>
              <Feeds profilPage={true} />
            </div>
          </div>

        ) : (
          <h1>Pas de user trouvé</h1>
        )
      }
    </>
  );
};

export default Profil;
