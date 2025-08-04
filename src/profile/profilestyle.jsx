import styled from 'styled-components';
import { Link } from "react-router-dom";

export const ProfileContainer = styled.div`
  width: 100%;
  max-width: 935px;
  margin: 0 auto;
  padding: 30px 20px;
  background: #1d1d1d;
`;

export const ProfileHeader = styled.div`
  display: flex;
  gap: 100px;
  padding: 20px 0;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 30px;
    text-align: center;
  }
`;

export const ProfileImageContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #e1e1e1;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const EditButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  background: #3897f0;
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  
  &:hover {
    background: #2684f0;
    transform: scale(1.05);
  }
`;

export const ProfileInfo = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ProfileName = styled.h1`
  font-size: 28px;
  font-weight: 300;
  margin: 0;
  color: white;
`;

export const ProfileUsername = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin: 5px 0 0 0;
  color: #ffffff;
`;

export const ProfileBio = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin: 10px 0 0 0;
  color: #ffffff;
`;

export const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
`;

export const ProfileDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: white;
  
  svg {
    color: #8e8e8e;
  }
`;

export const EditButtonLink = styled(Link)`
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 20px;
  
  &:hover {
    background-color: #0056b3;
    cursor: pointer;
  }
`;
