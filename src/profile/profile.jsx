import { useEffect, useState } from "react";
import { Imagepaths } from "../assets/Global_Need_files/ImagesPaths";
import { useAuth } from "../authContext";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile, updateFields } from "../redux/profileSlice.js";
import './profile.css';
import {
  faEnvelope,
  faPhone,
  faMapPin,
  faPenToSquare,
  faBriefcase,
  faGraduationCap,
  faCode,
  faPencil,
  faFilePdf
} from "@fortawesome/free-solid-svg-icons";
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
  ProfileDetails,
  Section,
  Card,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  LoadingSpinnerContainer,
  LoadingDiv,
  CloseButton
} from "./profilestyle";

const LoadingSpinner = () => (
  <LoadingSpinnerContainer>
    <LoadingDiv />
  </LoadingSpinnerContainer>
);

export function Profile() {
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.usrProfile);
  console.log(userDetail)

  useEffect(() => {
    try {
      if (currentUser?.authtoken) {
        dispatch(fetchProfile());
      }
    } catch (error) {
      console.error("Failed to Fetch User Profile", error)
    } finally {
      setLoading(false);
    }
  }, [currentUser?.authtoken, dispatch]);

  const { profile = {} } = userDetail;
  const { experience = [], education = [], skills = [] } = profile;

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleEditProfilePhoto = (e) => {
    e.stopPropagation();
    console.log("Edit button clicked");
  };

  const handleCloseEdit = () => {
    setEditMode(false);
  };
  const handleEditProfileInfo = () => {
    console.log("Edit button clicked");
    setEditMode(true);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here


    // redux save option and then api call
    console.log("Form submitted");
    setEditMode(false);
  };

  function EditComp({ editfields, usereditDetail }) {
    const [editDetail, setEditDetail] = useState(editfields);



    const handleCloseEdit = () => {
      setEditMode(false);
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission here


      // redux save option and then api call
      console.log("Form submitted");
      setEditMode(false);
    };

    return (
      <ModalOverlay onClick={handleCloseEdit}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <h2>Edit Profile</h2>
            <CloseButton onClick={handleCloseEdit}>&times;</CloseButton>
          </ModalHeader>
          <form onSubmit={handleSubmit} className="form-container">
            {editDetail.map((field, index) => (
              <div className="form-group" key={index}>
                <label className="form-label">{field.label}</label>
                <input
                  type="text"
                  defaultValue={usereditDetail[field.key] || ''}
                  className="form-input"
                />
              </div>
            ))}
            <div className="form-actions">
              <button
                type="button"
                onClick={handleCloseEdit}
                className="btn cancel-btn"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn submit-btn"
              >
                Save Changes
              </button>
            </div>
          </form>
        </ModalContent>
      </ModalOverlay>
    )
  }





  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileImageContainer>
          <ProfileImage
            src={userDetail.ProfileImage || Imagepaths.globalProfileAvatar}
            alt={userDetail.FullName || 'Profile'}
          />
          <EditButton onClick={handleEditProfilePhoto}>
            <FontAwesomeIcon icon={faPenToSquare} size={16} />
          </EditButton>
          <ProfileUsername>@{userDetail.username || 'username'}</ProfileUsername>
        </ProfileImageContainer>
        <ProfileInfo>
          {editMode ? (
            <EditComp editfields={[{ label: "Name", key: "FullName" }, { label: "Role", key: "Role" }, { label: "Bio", key: "bio" }, { label: "Email", key: "email" }, { label: "Phone", key: "PhoneNumber" }, { label: "Location", key: "location" }]}
              usereditDetail={{ FullName: userDetail.FullName, bio: userDetail.bio ,Role:userDetail.Role, email: userDetail.email, PhoneNumber: userDetail.PhoneNumber, location: userDetail.location}} />)
            :
            (
              <>
                <div>
                  <ProfileName>{userDetail.FullName || 'No Name'}</ProfileName>
                  <h2>{userDetail.Role}</h2>
                  {userDetail.bio && <ProfileBio>{userDetail.bio}</ProfileBio>}
                </div>

                <ProfileDetails>
                  {userDetail.email && (
                    <ProfileDetail>
                      <FontAwesomeIcon icon={faEnvelope} />
                      <span>{userDetail.email}</span>
                    </ProfileDetail>
                  )}
                  {userDetail.PhoneNumber && (
                    <ProfileDetail>
                      <FontAwesomeIcon icon={faPhone} />
                      <span>{userDetail.PhoneNumber}</span>
                    </ProfileDetail>
                  )}
                  {userDetail.location && (
                    <ProfileDetail>
                      <FontAwesomeIcon icon={faMapPin} />
                      <span>{userDetail.location}</span>
                    </ProfileDetail>
                  )}
                </ProfileDetails>
              </>
            )}
          <EditButton onClick={handleEditProfileInfo}>
            <FontAwesomeIcon icon={faPencil} />
          </EditButton>

        </ProfileInfo>
        <EditButton onClick={handleEditProfileInfo}>
          <FontAwesomeIcon icon={faPencil} />
        </EditButton>
      </ProfileHeader>

      <Section>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FontAwesomeIcon icon={faBriefcase} style={{ color: '#3897f0' }} />
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Experience</h2>
        </div>
        {experience?.length > 0 ? (
          experience.map((exp, index) => (
            <Card key={index}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#ffffff' }}>{exp.title}</h3>
              <div style={{ display: 'flex', gap: '1rem', color: '#b0b0b0', marginBottom: '0.5rem' }}>
                <span>{exp.company}</span>
                <span>•</span>
                <span>{exp.duration}</span>
              </div>
              {exp.description && (
                <p style={{ margin: '0.5rem 0 0 0', color: '#d0d0d0' }}>{exp.description}</p>
              )}
            </Card>
          ))
        ) : (
          <p style={{ color: '#999', fontStyle: 'italic' }}>No experience added yet</p>
        )}
      </Section>

      <Section>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FontAwesomeIcon icon={faGraduationCap} style={{ color: '#3897f0' }} />
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Education</h2>
        </div>
        {education?.length > 0 ? (
          education.map((edu, index) => (
            <Card key={index}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#ffffff' }}>{edu.degree}</h3>
              <div style={{ display: 'flex', gap: '1rem', color: '#b0b0b0', marginBottom: '0.5rem' }}>
                <span>{edu.institution}</span>
                {edu.year && (
                  <>
                    <span>•</span>
                    <span>{edu.year}</span>
                  </>
                )}
              </div>
            </Card>
          ))
        ) : (
          <p style={{ color: '#999', fontStyle: 'italic' }}>No education information added yet</p>
        )}
      </Section>

      <Section>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FontAwesomeIcon icon={faCode} style={{ color: '#3897f0' }} />
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Skills</h2>
        </div>
        {skills?.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
            {skills.map((skill, index) => (
              <span
                key={index}
                style={{
                  background: 'rgba(56, 151, 240, 0.1)',
                  color: '#5fb0ff',
                  padding: '0.4rem 0.9rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s ease',
                  border: '1px solid rgba(56, 151, 240, 0.2)'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p style={{ color: '#999', fontStyle: 'italic' }}>No skills added yet</p>
        )}
      </Section>

      {userDetail.resume && (
        <Section>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FontAwesomeIcon icon={faFilePdf} style={{ color: '#3897f0' }} />
            <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Resume</h2>
          </div>
          <a
            href={userDetail.resume}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#3897f0',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: '1px solid #2d2d2d',
              transition: 'all 0.2s ease',
              marginTop: '1rem',
              ':hover': {
                backgroundColor: 'rgba(56, 151, 240, 0.1)',
                borderColor: '#3897f0'
              }
            }}
          >
            <FontAwesomeIcon icon={faFilePdf} />
            View Resume
          </a>
        </Section>
      )}
    </ProfileContainer>
  );
}