import { useEffect, useState } from "react";
import { Imagepaths } from "../assets/Global_Need_files/ImagesPaths";
import { useAuth } from "../authContext";
import { Api_url } from "./../globalConfig.js"
import "./profile.css";
import axios from "axios";
import {
  ProfileContainer,
  ProfileHeader,
  ProfileImage,
  ProfileInfo,
  ProfileName,
} from "./profilestyle.jsx";

export function Profile() {
  const { currentUser, logout } = useAuth();
  const [userdetail, setuserdetail] = useState({})
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userDetResponse = await axios.get(`${Api_url}/profile`, {
          headers: {
            Authorization: `Bearer ${currentUser.authtoken}`
          },
        });
        if (!userDetResponse || userDetResponse.length <= 0) {
          throw new Error("response not found");
        }
        console.log(userDetResponse.data.response);
        setuserdetail(userDetResponse.data.response);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
      fetchProfile();
  }, [currentUser]);
  return (

    <ProfileContainer>
      <ProfileHeader>
      <ProfileImage src={userdetail.ProfileImage? userdetail.ProfileImage : Imagepaths.globalProfileAvatar}></ProfileImage>
      <ProfileInfo>
          <ProfileName>{userdetail.username}</ProfileName>
        </ProfileInfo>
      </ProfileHeader>
    </ProfileContainer>)
}
