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
  const { CurrentUser, logout } = useAuth();
  const [userdetail, setuserdetail] = useState({})
  console.log(CurrentUser)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${Api_url}/profile`, {
          headers: {
            Authorization: `Bearer ${CurrentUser.authtoken}`
          },
        });
        if (!response || response.length <= 0) {
          throw new Error("response not found");
        }
        console.log(response.data);
        setuserdetail(response.data?.response || {});
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (CurrentUser?.authtoken) {
      fetchProfile();
    }
  }, [CurrentUser]);
  console.log(userdetail.name);
  return (

    <ProfileContainer>
      <ProfileHeader>
        <ProfileImage src={Imagepaths.globalProfileAvatar}></ProfileImage>
        <ProfileInfo>
          <ProfileName>{userdetail.name}</ProfileName>
        </ProfileInfo>
      </ProfileHeader>
    </ProfileContainer>)
}
