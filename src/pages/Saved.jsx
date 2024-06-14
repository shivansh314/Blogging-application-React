import React from 'react'
import Container from '../components/Container';
import Post from '../components/Post';
import { useState , useEffect } from 'react';
import { useSelector }  from 'react-redux'
import service from '../appwrite/config';
import { Query } from 'appwrite';

function Saved() {


  const [posts, setPosts] = useState([]);
  const userdata = useSelector((state) => state.auth.userData)
  const userid = userdata.$id



  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await service.getPosts((Query.equal[ "userId", [userid]]));
        setPosts(posts.documents)
      } catch (error) {
        console.log(error);
      }
    };

    getPosts();
  }, [userid]);



  return (
    <div className="min-h-screen w-full overflow-auto flex justify-center">
    <h1 className='font-serif text-2xl font-semibold absolute left-44 top-[4.5rem]'> Saved Post </h1>
    <Container>
        <div className=" relative w-1/2 flex flex-col flex-wrap ml-44 mt-12 pb-40">
            {posts.map((post) => (
                <div key={post.$id}>
                    <Post {...post} />
                </div>
            ))}
        </div>
    </Container>

</div>
  )
}

export default Saved
