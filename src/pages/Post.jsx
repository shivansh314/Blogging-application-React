import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Button from "../components/Button";
import Container from "../components/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";


export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const [likes, setLikes] = useState(post?.like || 0);
  const [likestatus, setLikestatus] = useState(false);

  const likePost = async () => {
    const newLikes = likestatus ? likes - 1 : likes + 1;
    setLikes(newLikes);
    setLikestatus(!likestatus);

    // Update the post in the Appwrite database with the new likes value
    await appwriteService.updatePost(slug, { ...post, like: newLikes });
  };

  return post ? (
    <>
      <Container>
        <div className="w-screen h-screen flex  justify-center overflow-auto">
          <div className="w-1/2 bg-slate-50 h-100">
            <h1 className=" text-5xl font-semibold font-serif p-5">
              {post.title}
            </h1>

            <div className="flex justify-between items-center mt-5 border-b-[0.5px] pb-4">
              <div className="flex justify-center items-center gap-6">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRboVoEAYrMV-u5hZNo6XcbabFgqjhMGGls6Q&s"
                  className="h-[40px] w-[40px] rounded-full object-cover"
                  alt=""
                />
                <h1>{userData.name}</h1>
              </div>
              <div className=" text-gray-500 flex gap-5">
                <Button onClick={likePost} className="text-white bg-black">
                  {" "}
                  like
                </Button>
                <h1>{likes}</h1>
                <h1>Save</h1>
              </div>
            </div>


              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt=""
                className=" w-full object-cover mb-5"
              />
          

          {isAuthor && (
            <div className=" mb-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-black text-white" className="mr-3">
                    Edit
                  </Button>
                </Link>
                <Button bgColor="bg-black text-white" onClick={deletePost}>
                  Delete
                </Button>
              </div>
          )}
              
          
            <div className="h-auto text-2xl font-serif pb-28">
              {parse(post.content)}
            </div>
          </div>
        </div>
      </Container>
    </>
  ) : null;
}
