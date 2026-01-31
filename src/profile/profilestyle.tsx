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

interface ProfileImageProps {
  src?: string;
}

export const ProfileImage = styled.div<ProfileImageProps>`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background-image: url(${props => props.src || ''});
  background-size: cover;
  background-position: center;
  border: 3px solid #3897f0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ProfileName = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const ProfileUsername = styled.p`
  font-size: 1.2rem;
  color: #a0a0a0;
  margin: 0;
`;

export const ProfileDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #d0d0d0;
  font-size: 1rem;
  
  svg {
    color: #3897f0;
  }
`;

export const ProfileBio = styled.p`
  color: #d0d0d0;
  line-height: 1.6;
  margin: 1rem 0;
`;

export const EditButton = styled.button`
  background: #3897f0;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #2980b9;
    transform: translateY(-1px);
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

export const ProfileDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

export const Section = styled.section`
  background: #2c2c2c;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #3a3a3a;
  
  h2 {
    color: #ffffff;
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    svg {
      color: #3897f0;
    }
  }
`;

export const Card = styled.div`
  background: #1a1a1a;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #333;
  
  h3 {
    color: #ffffff;
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
  }
  
  p {
    color: #a0a0a0;
    margin: 0.25rem 0;
    font-size: 0.9rem;
  }
  
  .date {
    color: #3897f0;
    font-size: 0.8rem;
  }
`;

export const LoadingSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: rgb(29, 29, 29);
`;

export const LoadingDiv = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid #333;
  border-top: 3px solid #3897f0;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

// Additional styled components for forms and modals
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #2c2c2c;
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid #3a3a3a;
  
  h2 {
    color: #ffffff;
    margin: 0 0 1.5rem 0;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
  
  label {
    display: block;
    color: #d0d0d0;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input, textarea {
    width: 100%;
    padding: 0.75rem;
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 6px;
    color: #ffffff;
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: #3897f0;
    }
    
    &::placeholder {
      color: #666;
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: #3897f0;
          color: white;
          
          &:hover {
            background: #2980b9;
          }
        `;
      case 'secondary':
        return `
          background: #666;
          color: white;
          
          &:hover {
            background: #555;
          }
        `;
      case 'danger':
        return `
          background: #e74c3c;
          color: white;
          
          &:hover {
            background: #c0392b;
          }
        `;
      default:
        return `
          background: #3897f0;
          color: white;
          
          &:hover {
            background: #2980b9;
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SkillItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1a1a1a;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
  border: 1px solid #333;
  
  span {
    color: #d0d0d0;
  }
  
  .skill-actions {
    display: flex;
    gap: 0.5rem;
    
    button {
      background: none;
      border: none;
      color: #666;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 4px;
      transition: all 0.3s ease;
      
      &:hover {
        background: #333;
        color: #3897f0;
      }
      
      &.delete:hover {
        color: #e74c3c;
      }
    }
  }
`;

export const AddSkillForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  
  input {
    flex: 1;
    padding: 0.5rem;
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 6px;
    color: #ffffff;
    
    &:focus {
      outline: none;
      border-color: #3897f0;
    }
  }
  
  button {
    padding: 0.5rem 1rem;
    background: #3897f0;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: #2980b9;
    }
  }
`;
