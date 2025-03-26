import * as React from 'react';
import { useParams } from 'react-router-dom';

const Profil: React.FunctionComponent = () => {

  const { id } = useParams();

  return (
    <>
      <h1>Profil</h1>
    </>
  );
};

export default Profil;
