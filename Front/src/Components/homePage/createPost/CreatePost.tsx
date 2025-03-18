import * as React from 'react';

interface ICreatePostProps {
setIsClick:  React.Dispatch<React.SetStateAction<boolean>>
}

const CreatePost: React.FunctionComponent<ICreatePostProps> = ({setIsClick}) => {
  return (
    <>
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-25 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
          onClick={() => setIsClick(false)}
        >
          ✕
        </button>

        <form className="space-y-10">
          <div>
            <label htmlFor="title" className="block font-medium">
              Titre :
            </label>
            <input
              type="text"
              id="title"
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label htmlFor="content" className="block font-medium">
              Votre message :
            </label>
            <textarea
              id="content"
              required
              className="w-full border border-gray-300 p-2 rounded"
            ></textarea>
          </div>
          <div>
            <label htmlFor="image" className="block font-medium">
              Votre image :
            </label>
            <input type="file" id="image" className="w-full border p-2 rounded" />
          </div>
          <div className="text-center">
            <button className="bg-colorTwo text-white px-6 py-2 rounded hover:bg-colorFour hover:text-black transition cursor-pointer">
              Valider
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default CreatePost;
