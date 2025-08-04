import { useEffect, useState } from "react";
import { Imagepaths } from "../assets/Global_Need_files/ImagesPaths";
import { useAuth } from "../authContext";
import { Api_url } from "./../globalConfig.js";
import "./profile.css";
import axios from "axios";
import { faEnvelope, faPhone, faMapPin, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ProfileContainer,
  ProfileHeader,
  ProfileImage,
  ProfileInfo,
  ProfileName,
  ProfileUsername,
  ProfileDetail,
  ProfileBio,
  EditButton,
  ProfileImageContainer,
  ProfileDetails
} from "./profilestyle.jsx";

export function Profile() {
  const { currentUser, logout } = useAuth();
  const [userdetail, setuserdetail] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userDetResponse = await axios.get(`${Api_url}/profile`, {
          headers: {
            Authorization: `Bearer ${currentUser.authtoken}`
          },
        });
        if (!userDetResponse || userDetResponse.length <= 0) {
          throw new Error("Response not found");
        }
        setuserdetail(userDetResponse.data.response);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [currentUser]);
  console.log(userdetail)
  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileImageContainer>
          <ProfileImage
            src={userdetail.ProfileImage || Imagepaths.globalProfileAvatar}
            alt={userdetail.FullName || 'Profile'}
          />
          <EditButton>
            <FontAwesomeIcon icon={faPenToSquare} size={16} />
          </EditButton>
          <ProfileUsername>@{userdetail.username || 'username'}</ProfileUsername>
        </ProfileImageContainer>

        <ProfileInfo>
          <div>
            <ProfileName>{userdetail.FullName || 'No Name'}</ProfileName>
            {userdetail.bio && <ProfileBio>{userdetail.bio}</ProfileBio>}
          </div>
          <ProfileDetails>
            {userdetail.email && (
              <ProfileDetail>
                <FontAwesomeIcon icon={faEnvelope} />
                <span>{userdetail.email}</span>
              </ProfileDetail>
            )}
            {userdetail.phone && (
              <ProfileDetail>
                <FontAwesomeIcon icon={faPhone} />
                <span>{userdetail.phone}</span>
              </ProfileDetail>
            )}
            {userdetail.location && (
              <ProfileDetail>
                <FontAwesomeIcon icon={faMapPin} />
                <span>{userdetail.location}</span>
              </ProfileDetail>
            )}
          </ProfileDetails>
        </ProfileInfo>
      </ProfileHeader>
    </ProfileContainer>
  )
}
