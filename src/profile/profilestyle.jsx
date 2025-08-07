import styled from 'styled-components';

export const ProfileContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  background: rgb(29, 29, 29);
  color: #f5f5f5;
  min-height: 100vh;
`;

export const ProfileHeader = styled.div`
  display: flex;
  gap: 4rem;
  padding: 2rem;
  margin-bottom: 2rem;
  background: #2c2c2c;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #3a3a3a;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    text-align: center;
    padding: 1.5rem;
  }
`;

export const ProfileImageContainer = styled.div`
  position: relative;
  width: 180px;
  margin: 0 auto;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const ProfileImage = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  border: 3px solid #3897f0;
  box-shadow: 0 4px 15px rgba(56, 151, 240, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 20px rgba(56, 151, 240, 0.4);
  }
`;

export const EditButton = styled.button`
  position: absolute;
  bottom: 52px;
  right: 10px;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  z-index: 10;
  
  &:hover {
    background: #4f46e5;
    transform: scale(1.1);
  }
`;

export const ProfileInfo = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

export const ProfileName = styled.h1`
  font-size: 2.2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #ffffff;
  letter-spacing: -0.5px;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const ProfileUsername = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #b0b0b0;
  background: rgba(56, 151, 240, 0.15);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  text-align: center;
  width: fit-content;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ProfileBio = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  margin: 1rem 0 0 0;
  color: #d0d0d0;
  max-width: 600px;
`;

export const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  
  &.skills {
    flex-direction: row;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
`;

export const ProfileDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: #e0e0e0;
  margin-right: 1rem;
  
  svg {
    color: #8e8e8e;
    width: 16px;
    height: 16px;
  }
  
  &.skill {
    background: rgba(56, 151, 240, 0.1);
    color: #5fb0ff;
    padding: 0.4rem 0.9rem;
    border-radius: 20px;
    font-size: 0.85rem;
    transition: all 0.2s ease;
    border: 1px solid rgba(56, 151, 240, 0.2);
    
    &:hover {
      background: rgba(56, 151, 240, 0.2);
      transform: translateY(-1px);
    }
  }
`;

export const Section = styled.section`
  background: #2c2c2c;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #3a3a3a;
  
  h2 {
    color: #e0e0e0;
    margin: 0 0 1.5rem 0;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid #3a3a3a;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

export const Card = styled.div`
  background: #2c2c2c;
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  border-left: 3px solid #3897f0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  h3 {
    margin: 0 0 0.5rem 0;
    color: #f5f5f5;
    font-size: 1.1rem;
  }
  
  .meta {
    display: flex;
    gap: 1rem;
    color: #b0b0b0;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    margin: 0.5rem 0 0 0;
    color: #d0d0d0;
    line-height: 1.5;
  }
`;

export const ResumeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: rgba(40, 40, 70, 0.5);
  border-radius: 15px;
  margin-top: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(50, 50, 90, 0.7);
    transform: translateY(-3px);
  }
  
  a {
    color: #818cf8;
    font-weight: 600;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
    
    &:hover {
      color: #6366f1;
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #0f0f1b;
`;

export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(99, 102, 241, 0.3);
  border-top: 5px solid #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const EmptyMessage = styled.p`
  color: #a0a0ff;
  text-align: center;
  font-style: italic;
  padding: 30px;
  border: 1px dashed rgba(100, 100, 255, 0.3);
  border-radius: 10px;
`;

export const LoadingSpinnercontainer = styled.div`
  display: flex;
  justifyContent: center;
  alignItems: center;
  minHeight: 200px;
  width: 100%;
`
export const LoadingDiv = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(56, 151, 240, 0.2);
  borderTop: 4px solid #3897f0;
  borderRadius:50%;
  animation: spin 0.2s linear infinite;
`


export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;