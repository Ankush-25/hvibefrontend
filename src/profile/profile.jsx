import { useEffect, useState } from "react";
import { Imagepaths } from "../assets/Global_Need_files/ImagesPaths";
import { useAuth } from "../authContext";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile, updateNestedFields, addNestedFields, deleteNestedFields, updateFields } from "../redux/profileSlice.js";
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
  faTrash,
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
  LoadingSpinnerContainer,
  LoadingDiv,
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
  const [editEduData, setEditEduData] = useState(null);
  const [isOpenPosition, setIsOpenPosition] = useState({
    Header: false,
  })
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

  const [showAddSkill, setShowAddSkill] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [editSkillValue, setEditSkillValue] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [localSkills, setLocalSkills] = useState([]);
  const [isEditingResume, setIsEditingResume] = useState(false);
  const [resumeLink, setResumeLink] = useState('');

  useEffect(() => {
    if (skills?.length > 0) {
      setLocalSkills(skills);
    }
  }, [skills]);


  // Skill management functions
  const handleAddSkill = async (e) => {
    e?.preventDefault();
    try {
      if (newSkill.trim()) {
        const updatedSkills = [...localSkills, newSkill.trim()];
        setLocalSkills([...updatedSkills])
        dispatch(addNestedFields({ section: "skills", value: updatedSkills }));
        const uptprofile = { profile: { ...profile, skills: updatedSkills } }
        const setSkill = await axios.patch(`${Api_url}/app/updateProfile`, uptprofile, { headers: { Authorization: `Bearer ${currentUser?.authtoken}` } })

        if (setSkill.status == 200) {
          console.log(setSkill)
        }
        setNewSkill('');
        setShowAddSkill(false);
      }
    } catch (error) {
      console.error("Unable to update the Skill", error);
      console.log("Internal Server error")

    }
  };

  const handleEditSkill = (index) => {
    setEditingSkill(index);
    setEditSkillValue(localSkills[index]);
  };

  const handleUpdateSkill = async (e) => {
    e?.preventDefault();
    if (editSkillValue.trim()) {
      try {
        const updatedSkills = [...localSkills];
        updatedSkills[editingSkill] = editSkillValue.trim();
        setLocalSkills(updatedSkills);
        dispatch(updateNestedFields({ section: "skills", index: editingSkill, value: editSkillValue.trim() }));
        const uptprofile = { profile: { ...profile, skills: updatedSkills } }
        const updateSkill = await axios.patch(`${Api_url}/app/updateProfile`, uptprofile, { headers: { Authorization: `Bearer ${currentUser?.authtoken}` } })
        if (updateSkill.status == 200) {
          console.log(updateSkill);
        }
      } catch (error) {
        console.error("Unable to Modify the Skills", error);
        console.log("Internal Server Error");
      }

      setEditingSkill(null);
      setEditSkillValue('');
    }
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = localSkills.filter((_, i) => i !== index);  ///use dispach function
    setLocalSkills(updatedSkills);
  };

  const handleUpdateResume = async () => {
    if (!resumeLink) return;
    
    try {
      const response = await axios.patch(
        `${Api_url}/app/updateProfile`,
        { resume: resumeLink },
        { 
          headers: { 
            Authorization: `Bearer ${currentUser?.authtoken}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      
      if (response.status === 200) {
        dispatch(updateFields({
          field: 'resume',
          value: resumeLink
        }));
        setIsEditingResume(false);
      }
    } catch (error) {
      console.error("Error updating resume:", error);
    }
  };

  const handleOpenExp = (index) => {
    setEditExpData(index);
  };
  const handleCloseExp = () => {
    setEditExpData(null);
  };

  const handleCloseEdu = () => {
    setEditEduData(null);
  };


  if (loading) {
    return <LoadingSpinner />;
  }
  const handleAddData = (type) => {
    setAddData(type); // 'experience' or 'education'
  }
  const handleEditProfilePhoto = (e) => {
    e.stopPropagation();
  };

  const handleCloseEdit = () => {
    setIsOpenPosition({ Header: false });
  };
  const handleEditProfileInfo = () => {
    setIsOpenPosition({ Header: true });
  };

  const handleAddEducation = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        degree: e.target.degree.value,
        institution: e.target.institution.value,
        fieldOfStudy: e.target.fieldOfStudy.value,
        description: e.target.description?.value || '',
        duration: `${e.target.startDate.value} - ${e.target.endDate?.value || 'Present'}`
      };
      const uptEdu = [...education, formData];
      // Update Redux state
      dispatch(addNestedFields({
        section: "education",
        value: uptEdu
      }));
      const updatedProfileEdu = { profile: { ...profile, education: uptEdu } }
      // Update backend
      console.log(updatedProfileEdu)
      const response = await axios.patch(
        `${Api_url}/app/updateProfile`,
        updatedProfileEdu,
        { headers: { Authorization: `Bearer ${currentUser?.authtoken}` } }
      );

      if (response.status === 200) {
        e.target.reset();
        setAddData(false);
        // Add success notification
      }
    } catch (error) {
      console.error("Failed to Add Education", error);
      // Add error notification
    }
  };

  const handleUpdateEducationInfo = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        ...education[editEduData],
        degree: e.target.degree.value,
        institution: e.target.institution.value,
        fieldOfStudy: e.target.fieldOfStudy.value,
        description: e.target.description?.value || '',
        duration: `${e.target.startDate.value} - ${e.target.endDate?.value || 'Present'}`
      };

      dispatch(updateNestedFields({
        section: "education",
        index: editEduData,
        value: formData
      }));
      // Updated Redux state

      const updatedEducation = [...education];
      updatedEducation[editEduData] = formData;
      const updatedProfile = { ...profile, education: updatedEducation };
      // Update backend
      const response = await axios.patch(
        `${Api_url}/app/updateProfile`,
        updatedProfile,
        { headers: { Authorization: `Bearer ${currentUser?.authtoken}` } }
      );

      if (response.status === 200) {
        setEditEduData(null);
        // Add success notification
      }
    } catch (error) {
      console.error("Failed to Update Education", error);
      // Add error notification
    }
  };

  //Add Experience handling
  const handleAddExperience = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        title: e.target.title.value,
        company: e.target.company.value,
        description: e.target.description.value,
        duration: `${e.target.startDate.value} - ${e.target.endDate.value}`
      };
      const updExp = [...experience, formData]
      dispatch(addNestedFields({ section: "experience", value: updExp }))
      const updatedProfile = { profile: { ...profile, experience: updExp } };
      const updatedData = await axios.patch(`${Api_url}/app/updateProfile`,
        updatedProfile,
        { headers: { Authorization: `Bearer ${currentUser?.authtoken}` } }
      );
      console.log(updatedProfile)
      if (updatedData.status === 200) {
        e.target.reset();
      }
    } catch (error) {
      console.error("Failed to Add Experience", error);
    }
  }

  // Experience Edit handling
  const handleUpdateExperienceInfo = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        title: e.target.title.value,
        company: e.target.company.value,
        description: e.target.description.value,
        duration: e.target.duration.value //change in further update
      }
      dispatch(updateNestedFields({ section: "experience", index: editExpData, value: formData }))
      var updatedExp = [...experience];
      updatedExp[editExpData] = formData;
      var updatedProfile = { ...profile, experience: updatedExp };
      const updatedResponse = await axios.patch(
        `${Api_url}/app/updateProfile`,
        { profile: updatedProfile },
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
      console.log(updatedProfile);

    } catch (error) {
      console.error("Failed to Update Experience", error);
    } finally {
      setEditExpData(null);
    }
  }



  const handleOnDelete = async (section, index, id) => {
    try {
      const response = await axios.delete(`${Api_url}/app/profile`, {
        data: {
          userId: currentUser.userId,
          [section === 'experience' ? 'expId' : 'eduId']: id
        },
        headers: { Authorization: `Bearer ${currentUser?.authtoken}` }
      });

      if (response.status === 200) {
        dispatch(deleteNestedFields({ section, index }));
        // Add success notification
      }
    } catch (error) {
      console.error(`Failed to Delete ${section.charAt(0).toUpperCase() + section.slice(1)}`, error);
      // Add error notification
    }
  }

  function EditComp({
    title,
    editfields,
    usereditDetail,
    onClose,
    onSubmit,
    isEducation = false
  }) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">{title}</h2>
            <button className="close-button" onClick={onClose} aria-label="Close">
              &times;
            </button>
          </div>
          <form onSubmit={onSubmit} className="edit-form">
            <div className="form-grid">
              {editfields.map((field) => (
                <div key={field.key} className={`form-group ${field.key === 'description' ? 'full-width' : ''}`}>
                  <label htmlFor={field.key} className="form-label">
                    {field.label}
                    {field.required && <span className="required">*</span>}
                  </label>
                  {field.key === 'description' ? (
                    <div className="input-wrapper">
                      <textarea
                        id={field.key}
                        name={field.key}
                        className="form-textarea"
                        defaultValue={usereditDetail?.[field.key] || ""}
                        rows="4"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                    </div>
                  ) : field.key.includes('Date') ? (
                    <div className="input-wrapper">
                      <input
                        type="date"
                        id={field.key}
                        name={field.key}
                        className="form-input"
                        defaultValue={
                          field.key === 'startDate' || field.key === 'endDate'
                            ? usereditDetail?.duration?.split(' - ')[field.key === 'startDate' ? 0 : 1] || ""
                            : ""
                        }
                      />
                    </div>
                  ) : (
                    <div className="input-wrapper">
                      <input
                        type="text"
                        id={field.key}
                        name={field.key}
                        className="form-input"
                        defaultValue={
                          field.key === 'title' || field.key === 'company' ||
                            field.key === 'degree' || field.key === 'institution' || field.key === 'FullName' || field.key === 'Role' || field.key === 'bio' || field.key === 'email' || field.key === 'PhoneNumber' || field.key === 'location' ||
                            field.key === 'fieldOfStudy'
                            ? usereditDetail?.[field.key] || ""
                            : ""
                        }
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        required={field.required !== false}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="form-actions">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
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
                    <div onClick={() => handleOnDelete('experience', index, exp._id)}>
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
            {addData === 'experience' && (
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
              onClick={() => handleAddData('experience')}
              style={{ display: addData === 'experience' ? 'none' : 'inline-flex' }}
            >
              <FontAwesomeIcon icon={faPlus} />
              Add Experience
            </button>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <p className="no-experience" style={{ marginBottom: '1rem' }}>No experience added yet</p>
            {addData === 'experience' && (
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
                  name="description"
                  rows="4"
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
            {addData !== 'experience' && (
              <button
                className="add-experience-btn"
                onClick={() => handleAddData('experience')}
              >
                <FontAwesomeIcon icon={faPlus} />
                Add Your First Experience
              </button>
            )}
          </div>
        )}
      </Section>
      {/* Education Section */}
      <Section>
        <div className="section-header">
          <FontAwesomeIcon icon={faGraduationCap} style={{ color: '#3897f0', paddingBottom: "20px", fontSize: "30px" }} />
          <h2>Education</h2>
        </div>
        {education?.length > 0 ? (
          <>
            {editEduData !== null && (
              <EditComp
                editfields={[
                  { label: "Degree", key: "degree" },
                  { label: "Institution", key: "institution" },
                  { label: "Field of Study", key: "fieldOfStudy" },
                  { label: "Start Date", key: "startDate" },
                  { label: "End Date", key: "endDate" },
                  { label: "Description", key: "description" }
                ]}
                usereditDetail={{
                  ...education[editEduData],
                  ...(education[editEduData].duration && {
                    startDate: education[editEduData].duration.split(' - ')[0],
                    endDate: education[editEduData].duration.split(' - ')[1] || 'Present'
                  })
                }}
                onClose={handleCloseEdu}
                title={"Edit Education"}
                onSubmit={handleUpdateEducationInfo}
                isEducation={true}
              />
            )}
            <>
              {education.map((edu, index) => (
                <Card key={index} className="education-card">
                  <div className="ButtonsCon">
                    <div onClick={() => setEditEduData(index)}>
                      <FontAwesomeIcon icon={faPencil} />
                    </div>
                    <div onClick={() => handleOnDelete('education', index, edu._id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                  </div>
                  <h3>{edu.degree}</h3>
                  <div className="education-meta">
                    <span>{edu.institution}</span>
                    <span>•</span>
                    <span>{edu.fieldOfStudy}</span>
                  </div>
                  <div className="education-duration">
                    <span>{edu.duration}</span>
                  </div>
                  {edu.description && (
                    <p className="education-description">{edu.description}</p>
                  )}
                </Card>
              ))}
            </>
            {addData === 'education' && (
              <form className="education-form" onSubmit={handleAddEducation}>
                <h2>Add Education</h2>
                <input
                  type="text"
                  placeholder="Degree"
                  name="degree"
                  required
                />
                <input
                  type="text"
                  placeholder="Institution"
                  name="institution"
                  required
                />
                <input
                  type="text"
                  placeholder="Field of Study"
                  name="fieldOfStudy"
                  required
                />
                <div className="date-inputs">
                  <div>
                    <label>Start Date</label>
                    <input type="date" name="startDate" required />
                  </div>
                  <div>
                    <label>End Date (or expected)</label>
                    <input type="date" name="endDate" />
                  </div>
                </div>
                <textarea
                  placeholder="Description (Optional)"
                  name="description"
                  rows="4"
                ></textarea>
                <div className="education-form-actions">
                  <button
                    type="button"
                    className="btn cancel-btn"
                    onClick={() => setAddData(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn submit-btn">
                    Save Education
                  </button>
                </div>
              </form>
            )}
            <button
              className="add-education-btn"
              onClick={() => handleAddData('education')}
              style={{ display: addData === 'education' ? 'none' : 'inline-flex' }}
            >
              <FontAwesomeIcon icon={faPlus} />
              Add Education
            </button>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <p className="no-education" style={{ marginBottom: '1rem' }}>No education added yet</p>
            {addData === 'education' && (
              <form className="education-form" onSubmit={handleAddEducation}>
                <h2>Add Education</h2>
                <input
                  type="text"
                  placeholder="Degree"
                  name="degree"
                  required
                />
                <input
                  type="text"
                  placeholder="Institution"
                  name="institution"
                  required
                />
                <input
                  type="text"
                  placeholder="Field of Study"
                  name="fieldOfStudy"
                  required
                />
                <div className="date-inputs">
                  <div>
                    <label>Start Date</label>
                    <input type="date" name="startDate" required />
                  </div>
                  <div>
                    <label>End Date (or expected)</label>
                    <input type="date" name="endDate" />
                  </div>
                </div>
                <textarea
                  placeholder="Description (Optional)"
                  name="description"
                  rows="4"
                ></textarea>
                <div className="education-form-actions">
                  <button
                    type="button"
                    className="btn cancel-btn"
                    onClick={() => setAddData(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn submit-btn">
                    Save Education
                  </button>
                </div>
              </form>
            )}
            {addData !== 'education' && (
              <button
                className="add-education-btn"
                onClick={() => handleAddData('education')}
              >
                <FontAwesomeIcon icon={faPlus} />
                Add Your First Education
              </button>
            )}
          </div>
        )}
      </Section>
     

      {/* Skills Section */}
      <Section>
        <div className="skills-header">
          <div className="skills-title-container">
            <FontAwesomeIcon icon={faCode} className="skills-icon" />
            <h2 className="skills-title">Skills</h2>
          </div>
          <button
            onClick={() => setShowAddSkill(true)}
            className="add-skill-btn"
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Skill
          </button>
        </div>

        {/* Add/Edit Skill Form */}
        {(showAddSkill || editingSkill !== null) && (
          <div className="skill-form-container">
            <h3 className="skill-form-title">
              {editingSkill !== null ? 'Edit Skill' : 'Add New Skill'}
            </h3>
            <div className="skill-form">
              <input
                type="text"
                value={editingSkill !== null ? editSkillValue : newSkill}
                onChange={(e) =>
                  editingSkill !== null
                    ? setEditSkillValue(e.target.value)
                    : setNewSkill(e.target.value)
                }
                placeholder="Enter a skill"
                className="skill-input"
              />
              <button
                onClick={editingSkill !== null ? handleUpdateSkill : handleAddSkill}
                className="skill-form-btn skill-submit-btn"
              >
                {editingSkill !== null ? 'Update' : 'Add'}
              </button>
              <button
                onClick={() => {
                  setShowAddSkill(false);
                  setEditingSkill(null);
                  setEditSkillValue('');
                  setNewSkill('');
                }}
                className="skill-form-btn skill-cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {localSkills?.length > 0 ? (
          <div className="skills-list">
            {localSkills.map((skill, index) => (
              <div key={index} className="skill-tag">
                {skill}
                <button
                  onClick={() => handleEditSkill(index)}
                  className="skill-btn skill-edit-btn"
                  aria-label="Edit skill"
                >
                  <FontAwesomeIcon icon={faPencil} size="xs" />
                </button>
                <button
                  onClick={() => handleDeleteSkill(index)}
                  className="skill-btn skill-delete-btn"
                  aria-label="Delete skill"
                >
                  <FontAwesomeIcon icon={faTrash} size="xs" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-skills-message">
            No skills added yet. Click 'Add Skill' to get started.
          </p>
        )}
      </Section>
       {/* Resume Section */}
       <Section>
        <div className="skills-header">
          <div className="skills-title-container">
            <FontAwesomeIcon icon={faFilePdf} className="skills-icon" />
            <h2 className="skills-title">Resume</h2>
          </div>
          {isEditingResume ? (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleUpdateResume}
                className="add-skill-btn"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditingResume(false)}
                className="add-skill-btn"
                style={{ background: '#dc2626' }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setResumeLink(userDetail.resume || '');
                setIsEditingResume(true);
              }}
              className="add-skill-btn"
            >
              <FontAwesomeIcon icon={faPencil} />
              {userDetail.resume ? 'Edit' : 'Add'} Resume
            </button>
          )}
        </div>
        {isEditingResume ? (
          <div style={{ marginTop: '1rem' }}>
            <input
              type="url"
              value={resumeLink}
              onChange={(e) => setResumeLink(e.target.value)}
              placeholder="Enter resume URL (e.g., Google Drive, Dropbox link)"
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
                marginBottom: '0.5rem'
              }}
            />
            <p style={{ fontSize: '0.875rem', color: '#666' }}>
              Make sure the link is publicly accessible
            </p>
          </div>
        ) : userDetail.resume ? (
          <div style={{ marginTop: '1rem' }}>
            <a
              href={userDetail.resume}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#3b82f6',
                textDecoration: 'none',
                wordBreak: 'break-all',
                display: 'inline-block',
                marginTop: '0.5rem',
                ':hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              {userDetail.resume}
            </a>
          </div>
        ) : (
          <p style={{ marginTop: '1rem', color: '#666' }}>No resume uploaded yet</p>
        )}
      </Section>
    
    </ProfileContainer>
  );
}