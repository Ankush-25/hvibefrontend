import styled from "styled-components";

export const UpperSearchAndTextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  padding-bottom: 100px;
  color: white;

  h1 {
    font-size: 2rem;
    text-align: center;
    padding: 0 20px;

    @media (max-width: 768px) {
      font-size: 1.5rem;
      padding-top: 60px;
      padding-bottom: 20px;
    }

    @media (max-width: 480px) {
      font-size: 1.2rem;
      padding-top: 40px;
      padding-bottom: 15px;
    }
  }
`;

export const MobileSearchBar = styled.div`
  display: none;
  background: white;
  border-radius: 50px;
  width: calc(100% - 32px);
  max-width: 500px;
  margin: 0 auto;
  padding: 6px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    display: flex;
  }

  input {
    flex: 1;
    border: none;
    background: transparent;
    padding: 12px 16px;
    font-size: 16px;
    color: #333;
    outline: none;

    &::placeholder {
      color: #999;
      font-size: 14px;
    }
  }

  .mobile-search-btn {
    background: linear-gradient(135deg, #8e44ad 0%, #b761b7 100%);
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    flex-shrink: 0;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 15px rgba(142, 68, 173, 0.4);
    }

    svg {
      color: white;
      font-size: 18px;
    }
  }
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 50px;
  padding: 8px 8px 8px 20px;
  margin: 0 auto;
  width: 90%;
  max-width: 900px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 1024px) {
    width: 95%;
    max-width: 700px;
  }
`;

export const SearchInput = styled.input`
  flex: ${(props) =>
    props.index === 0 ? "1.4" : props.index === 1 ? "1" : "1"};
  min-width: 0;
  font-size: 16px;
  height: 44px;
  border: none;
  padding: 0 12px;
  color: #333;
  background: transparent;

  &:focus {
    outline: none;
  }

  &::placeholder {
    font-size: 14px;
    color: #999;
  }

  @media (max-width: 1024px) {
    font-size: 14px;
    padding: 0 8px;

    &::placeholder {
      font-size: 12px;
    }
  }
`;

export const SearchButton = styled.button`
  border: none;
  background: linear-gradient(135deg, #8e44ad 0%, #b761b7 100%);
  color: white;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  padding: 14px 32px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(142, 68, 173, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 1024px) {
    font-size: 14px;
    padding: 12px 20px;
  }
`;
