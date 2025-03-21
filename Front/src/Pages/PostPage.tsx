import * as React from 'react';
import Header from '../Components/header/Header';
import Footer from '../Components/footer/Footer';
import MainPostPage from '../Components/postPage/MainPostPage';

const PostPage: React.FunctionComponent = () => {
  return (
    <>
        <div className='flex flex-col min-h-screen'>
            <header className='flex justify-end bg-stone-50'>
                <Header />
            </header>
            <main className='flex-grow bg-colorTwo'>
                <MainPostPage />
            </main>
            <footer className='bg-colorFive h-25 flex justify-center items-center'>
                <Footer/>
            </footer>
        </div>
    </>
  );
};

export default PostPage;
