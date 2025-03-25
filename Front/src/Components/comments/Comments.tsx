import * as React from 'react';
import { CommentWithUser } from '../../Types/Comment';
import { Tools } from '../../Tools/Tools';

interface ICommentsProps {
    com: CommentWithUser
}

const Comments: React.FunctionComponent<ICommentsProps> = ({com}) => {
  return (
    <>
        <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 mb-2">
            <p className="text-gray-800 leading-relaxed">{com.content}</p>
            <p className="text-sm text-gray-500 mt-2">
                Publié par <span className="font-semibold text-colorFive">{com.pseudo}</span> le {Tools.timestampToDate(com.created_at)}
            </p>
        </div>
    </>
  );
};

export default Comments;
