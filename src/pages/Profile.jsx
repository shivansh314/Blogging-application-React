import React, { useDebugValue } from "react";
import ProfileComponant from "../components/ProfileComponant";
import {useParams} from 'react-router-dom'


function Profile() {

  const link = useParams()
  const slug = link.slug

  

  return (
    <div>
      <ProfileComponant slug = {slug} />
    </div>
  );
}

export default Profile;
