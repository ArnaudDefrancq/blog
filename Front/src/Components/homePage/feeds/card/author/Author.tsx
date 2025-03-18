import * as React from 'react';
import { Tools } from '../../../../../Tools/Tools';

interface IAuthorProps {
    pseudo: string,
    created_at: number,
    updated_at: number
}

const Author: React.FunctionComponent<IAuthorProps> = ({ pseudo, created_at, updated_at }) => {
  return (
    <>
      <div className="flex items-center space-x-2 text-gray-600 text-sm">
        <p className="font-semibold">{pseudo}</p>
        <p className='italic'>{Tools.timestampToDate(updated_at === created_at ? created_at : updated_at)}</p>
      </div>
    </>
  );
};

export default Author;
