import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/config";
import userService from "../appwrite/profile";
import parse from "html-react-parser";




function Post({ $id , title , content , featuredImage , like , commentcount , publishTime , userId }) {


  function truncateHtmlContent(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.length > 130 ? `${text.substring(0, 130)}.....` : text;
  }

  const [ userInfo , setUserInfo ] = useState([])



  useEffect(() =>{
    const getUserInfo = async() => {
      try {
        const Userinfo = await userService.getProfile(userId)
        setUserInfo(Userinfo)
      } catch (error) {
        console.log(error);
      }
    }

    getUserInfo();

  } , [userId])


  return (
    <Link to={`/post/${$id}`} >
      <div className="h-auto w-[50vw] bg-white p-3 border-t  border-gray-300">
        <div className="flex gap-1.5 items-center font-light text-gray-800 text-xs pt-2.5 pb-2.5">
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRboVoEAYrMV-u5hZNo6XcbabFgqjhMGGls6Q&s"
              alt=""
              className="h-10 w-10 rounded-full object-cover"
            />
          </div>
          <h3 className="font-semibold text-base text-gray-800 ml-2">
            {userInfo.name}
          </h3>
        </div>

        <div className="flex items-center ">
        
          <div className="flex flex-col gap-4 w-3/4">
            <h1 className="leading-8 text-4xl font-semibold ">{title}</h1>
            <p>{truncateHtmlContent(content)}</p>
          </div>
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-lg  h-40 w-52 object-cover ml-4 relative right-0 leading-4"
          />
        </div>

        <div className="flex gap-44 pb-2 font-semibold mt-4">
          <div className="flex gap-4">
            <h4>⭐ {publishTime.substr(0,10)}</h4>
            <h4>👏🏻 {like}</h4>
            <h4>💬 {commentcount}</h4>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Post;
