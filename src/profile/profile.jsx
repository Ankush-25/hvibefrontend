import { useEffect, useState } from "react";
import { Imagepaths } from "../assets/Global_Need_files/ImagesPaths";
import { useAuth } from "../authContext";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile, updateNestedFields, addNestedFields, deleteNestedFields } from "../redux/profileSlice.js";
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
  faFilePdf,
  faPlus,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Api_url } from "../globalConfig.js";
import axios from "axios";
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
  const dispatch = useDispatch();
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [addData, setAddData] = useState(false);
  const [editExpData, setEditExpData] = useState(null);
  const [isOpenPosition, setIsOpenPosition] = useState({
    Header: false,
    Skills: false,
  });

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

  const userDetail = useSelector((state) => state.usrProfile);
  const { profile = {} } = userDetail;
  const { experience = [], education = [], skills = [] } = profile;
  const handleOpenExp = (index) => {
    setEditExpData(index);
  };

  const handleCloseExp = () => {
    setEditExpData(null);
  };


  if (loading) {
    return <LoadingSpinner />;
  }
  const handleAddData = () => {
    setAddData(true);
  }
  const handleEditProfilePhoto = (e) => {
    e.stopPropagation();
  };

  const handleCloseEdit = () => {
    setIsOpenPosition({ Header: false });
  };
  const handleEditProfileInfo = () => {
    setIsOpenPosition({ Header: true });
  }
  const handleAddExperience = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        title: e.target.title.value,
        company: e.target.company.value,
        description: e.target.description.value,
        duration: `${e.target.startDate.value} - ${e.target.endDate.value}`
      };
      dispatch(addNestedFields({ section: "experience", value: [...experience, formData] }))
      const updatedData = await axios.patch(`${Api_url}/app/updateProfile`,
        { profile: { experience: [...experience, formData] } },
        { headers: { Authorization: `Bearer ${currentUser?.authtoken}` } }
      );
      if (updatedData.status === 200) {
        e.target.reset();
      }
    } catch (error) {
      console.error("Failed to Add Experience", error);
    }
  }
  const handleUpdateExperienceInfo = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        title: e.target.Title.value,
        company: e.target.Company.value,
        description: e.target.Description.value,
        duration: e.target.Duration.value //change in further update
      }
      var updatedExp = [...experience];
      updatedExp[editExpData] = formData;
      dispatch(updateNestedFields({ section: "experience", index: editExpData, value: formData }))
      const updatedProfile = { profile: { experience: updatedExp } };
      const updatedResponse = await axios.patch(
        `${Api_url}/app/updateProfile`,
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.authtoken}`,
          },
        }
      );

      if (updatedResponse.status === 200) {
        // send notification
        console.log("Experience Updated Successfully", updatedResponse)
      }
      console.log(formData)

    } catch (error) {
      console.error("Failed to Update Experience", error);
    } finally {
      setEditExpData(null);
    }
  }



  const handleOnDelete = async (index) => {
    try {

      //Send toaster confirm notification
      const RemovedExp = experience[index]
      const ExpId = RemovedExp._id
      const deleteExpData = await axios.delete(`${Api_url}/app/profile`, {
        data: { userId: currentUser.userId, expId: ExpId },
        headers: { Authorization: `Bearer ${currentUser?.authtoken}` }
      });
      if (deleteExpData.status === 200) {
        // Send a toster notification

        dispatch(deleteNestedFields({ section: "experience", index: index }));
        console.log(experience);
      }
    } catch (error) {
      console.error("Failed to Delete Experience", error)
    }
  }

  function EditComp({
    title,
    onClose,
    onSubmit,
    editfields,
    usereditDetail }) {
    const [editDetail, setEditDetail] = useState(editfields);


    return (
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <h2>{title}</h2>
            <CloseButton onClick={onClose}>&times;</CloseButton>
          </ModalHeader>
          <form onSubmit={onSubmit} className="form-container">
            {editDetail.map((field, index) => (
              <div className="form-group" key={index}>
                <label className="form-editlabel">{field.label}</label>
                <input
                  type="text"
                  name={field.label}
                  defaultValue={usereditDetail[field.key]}
                  className="form-input"
                />
              </div>
            ))}
            <div className="form-actions">
              <button
                type="button"
                onClick={onClose}
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
        {/* done to add edit comp */}
        <ProfileInfo>
          {isOpenPosition.Header ? (
            <EditComp
              editfields={[
                { label: "Name", key: "FullName" },
                { label: "Role", key: "Role" },
                { label: "Bio", key: "bio" },
                { label: "Email", key: "email" },
                { label: "Phone", key: "PhoneNumber" },
                { label: "Location", key: "location" },
              ]}
              usereditDetail={{
                FullName: userDetail.FullName,
                bio: userDetail.bio,
                Role: userDetail.Role,
                email: userDetail.email,
                PhoneNumber: userDetail.PhoneNumber,
                location: userDetail.location,
              }}
              onClose={handleCloseEdit}
              title={"Edit Profile Info"}
            />)
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
          <button className="editButton" onClick={handleEditProfileInfo}>
            <FontAwesomeIcon icon={faPencil} />
          </button>

        </ProfileInfo>
      </ProfileHeader>
      {/* done to add edit comp */}
      <Section>
        <div className="section-header">
          <FontAwesomeIcon icon={faBriefcase} style={{ color: '#3897f0', paddingBottom: "20px", fontSize: "30px" }} />
          <h2>Experience</h2>
        </div>
        {experience?.length > 0 ? (
          <>
            {editExpData !== null && (
              <EditComp
                editfields={[
                  { label: "Title", key: "title" },
                  { label: "Company", key: "company" },
                  { label: "Description", key: "description" },
                  { label: "Duration", key: "duration" }
                ]}
                usereditDetail={{
                  title: experience[editExpData].title,
                  company: experience[editExpData].company,
                  description: experience[editExpData].description,
                  duration: experience[editExpData].duration
                }}
                onClose={handleCloseExp}
                title={"Edit Experience"}
                onSubmit={handleUpdateExperienceInfo}
              />
            )}
            <>
              {experience.map((exp, index) => (
                <Card key={index} className="experience-card">
                  <div className="ButtonsCon">
                    <div onClick={() => (handleOpenExp(index))}>
                      <FontAwesomeIcon icon={faPencil} />
                    </div>
                    <div onClick={() => handleOnDelete(index)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                  </div>
                  <h3>{exp.title}</h3>
                  <div className="experience-meta">
                    <span>{exp.company}</span>
                    <span>•</span>
                    <span>{exp.duration}</span>
                  </div>
                  {exp.description && (
                    <p className="experience-description">{exp.description}</p>
                  )}
                </Card>
              ))}
            </>
            {addData && (
              <form className="experience-form" onSubmit={handleAddExperience}>
                <h2>Add Experience</h2>
                <input
                  type="text"
                  placeholder="Job Title"
                  name="title"
                  required
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  required
                />
                <div className="duration-set">
                  <label className="form-label">Start Date</label>
                  <input
                    type="month"
                    placeholder="Start MM-YY"
                    name="startDate"
                    pattern="[0-9]{2}-[0-9]{2}"
                    required
                  />
                  <label className="form-label">End Date</label>
                  <input
                    type="month"
                    placeholder="End MM-YY"
                    name="endDate"
                    pattern="[0-9]{2}-[0-9]{2}"
                    required
                  />
                </div>
                <textarea
                  placeholder="Job Description (Optional)"
                  rows="4"
                  name="description"
                ></textarea>
                <div className="experience-form-actions">
                  <button
                    type="button"
                    className="btn cancel-btn"
                    onClick={() => setAddData(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn submit-btn"
                  >
                    Save Experience
                  </button>
                </div>
              </form>
            )}
            <button
              className="add-experience-btn"
              onClick={handleAddData}
              style={{ display: addData ? 'none' : 'inline-flex' }}
            >
              <FontAwesomeIcon icon={faPlus} />
              Add Experience
            </button>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <p className="no-experience" style={{ marginBottom: '1rem' }}>No experience added yet</p>
            {addData && (
              <form className="experience-form" onSubmit={handleAddExperience}>
                <h2>Add Experience</h2>
                <input
                  type="text"
                  placeholder="Job Title"
                  name="title"
                  required
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  required
                />
                <label className="form-label">
                  Start Date
                </label>
                <input
                  type="month"
                  placeholder="Start MM-YY"
                  name="startDate"
                  pattern="[0-9]{2}-[0-9]{2}"
                  required
                />
                <label className="form-label">
                  End Date
                </label>
                <input
                  type="month"
                  placeholder="End MM-YY"
                  name="endDate"
                  pattern="[0-9]{2}-[0-9]{2}"
                  required
                />
                <textarea
                  placeholder="Job Description (Optional)"
                  rows="4"
                  name="description"
                ></textarea>
                <div className="experience-form-actions">
                  <button
                    type="button"
                    className="btn cancel-btn"
                    onClick={() => setAddData(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn submit-btn"
                  >
                    Save Experience
                  </button>
                </div>
              </form>
            )}
            {!addData && <button
              className="add-experience-btn"
              onClick={handleAddData}
            >
              <FontAwesomeIcon icon={faPlus} />
              Add Your First Experience
            </button>}
          </div>
        )}
      </Section>
      <Section>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FontAwesomeIcon icon={faGraduationCap} style={{ color: '#3897f0', paddingBottom: "20px", fontSize: "30px" }} />
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
          <FontAwesomeIcon icon={faCode} style={{ color: '#3897f0', paddingBottom: "20px", fontSize: "30px" }} />
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
            <FontAwesomeIcon icon={faFilePdf} style={{ color: '#3897f0', paddingBottom: "20px", fontSize: "30px" }} />
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