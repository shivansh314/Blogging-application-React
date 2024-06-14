import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import Container from '../components/Container';
import service from '../appwrite/config';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        service.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    
    return (
        <div className="min-h-screen w-full overflow-auto flex ">
            <h1 className='font-serif text-2xl font-semibold absolute left-44 top-[4.5rem]'> For You </h1>
            <Container>
                <div className=" relative w-1/2 flex flex-col flex-wrap ml-44 mt-12 pb-40">
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <Post {...post} />
                        </div>
                    ))}
                </div>
            </Container>

            <div className='  h-[500px] w-[500px] mr-28 mt-12 border-solid border-2 rounded-lg '></div>
        </div>
    );
}

export default Home;
