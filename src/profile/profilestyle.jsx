import styled from 'styled-components';
import { Link } from "react-router-dom";

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

export const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

export const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e1e1e1;
  margin-bottom: 20px;
`;

export const ProfileName = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin: 0;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background:rgb(0, 0, 0);
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled.span`
  font-weight: bold;
  color: #555;
`;

export const InfoValue = styled.span`
  color: #333;
`;

export const EditButton = styled(Link)`
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
