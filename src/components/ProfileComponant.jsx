import React, { useEffect, useState } from "react";
import userService from "../appwrite/profile";
import service from "../appwrite/config";
import { Query } from "appwrite";
import Post from "../components/Post";
import Container from "./Container";

function ProfileComponant({ slug }) {
  const userid = { slug }.slug;
  const [userdata, setUserdata] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await userService.getProfile(userid);
        setUserdata(data);
      } catch (error) {
        console.error("Error creating profile:", error);
      }
    };
    getProfile();
  }, [userid]); // Empty dependency array to run the effect only once

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await service.getPosts(Query.equal[("userId", [userid])]);
        setPosts(posts.documents);
      } catch (error) {
        console.log(error);
      }
    };

    getPosts();
  }, [userid]);

  return (
    <div className="h-screen w-screen flex ">
      <div className="w-2/3 h-screen   ">
        <div className="flex  items-center gap-8  w-full h-48 border-b-2 border-solid">
          {userdata?.profileimage ? (
            <img
              src={userService.getImagePreview(userdata.profileimage)}
              className=" h-36 w-36 rounded-full object-fit  ml-10  "
            />
          ) : (
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqKEVAWB8c5SM0Y_9CocOoInvrDIxNbqqezw&s"
              className=" h-36 w-36 rounded-full object-fit ml-10 "
            />
          )}

          <h1 className="text-semibold text-4xl font-serif ">
            {userdata.name}
          </h1>
        </div>
        <div className="min-h-screen w-full overflow-auto flex ">
          <h1 className="absolute top-[259px] left-32 text-3xl font-semibold">
            Your Posts
          </h1>
          <Container>
            <div className=" relative w-48 flex flex-col flex-wrap justify-center items-center mt-20 ml-32  pb-40 ">
              {posts.map((post) => (
                <div key={post.$id}>
                  <Post {...post} />
                </div>
              ))}
            </div>
          </Container>
        </div>
      </div>
      <div className="w-1/3 h-screen text-white bg-black flex flex-col items-center ">
         <h1 className="text-semibold text-4xl font-serif mt-10 ">{userdata.name}</h1> 
         <h1 className="text-semibold text-4xl font-serif text-slate-100 mt-10 mb-10 ">About</h1>
         <p className="p-4 text-lg">
          {userdata.bio}
          </p>    
      </div>
    </div>
  );
}

export default ProfileComponant;
