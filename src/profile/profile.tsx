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
  SkillItem,
  AddSkillForm,
} from "./profilestyle.js";
import { RootState } from "../types/redux";
import { ProfileUIState, FormEventHandler } from "../types/profile";

const LoadingSpinner = () => (
  <LoadingSpinnerContainer>
    <LoadingDiv />
  </LoadingSpinnerContainer>
);

interface EditCompProps {
  title: string;
  editfields: Array<{ label: string; key: string; required?: boolean }>;
  usereditDetail?: any;
  onClose: () => void;
  onSubmit: FormEventHandler;
  isEducation?: boolean;
}

function EditComp({
  title,
  editfields,
  usereditDetail,
  onClose,
  onSubmit,
}: EditCompProps) {
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
                      type="month"
                      id={field.key}
                      name={field.key}
                      className="form-input"
                      defaultValue={usereditDetail?.[field.key] || ""}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  </div>
                ) : (
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id={field.key}
                      name={field.key}
                      className="form-input"
                      defaultValue={usereditDetail?.[field.key] || ""}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function Profile() {
  const dispatch = useDispatch();
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [addData, setAddData] = useState<'experience' | 'education' | null>(null);
  const [editExpData, setEditExpData] = useState<number | null>(null);
  const [editEduData, setEditEduData] = useState<number | null>(null);
  const [isOpenPosition, setIsOpenPosition] = useState<ProfileUIState['isOpenPosition']>({
    Header: false,
  });

  const [showAddSkill, setShowAddSkill] = useState(false);
  const [editingSkill, setEditingSkill] = useState<number | null>(null);
  const [editSkillValue, setEditSkillValue] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [localSkills, setLocalSkills] = useState<string[]>([]);
  const [isEditingResume, setIsEditingResume] = useState(false);
  const [resumeLink, setResumeLink] = useState('');

  useEffect(() => {
    try {
      if (currentUser?.authtoken) {
        dispatch(fetchProfile());
      }
    } catch (error) {
      console.error("Failed to Fetch User Profile", error);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.authtoken, dispatch]);

  const userDetail = useSelector((state: RootState) => state.usrProfile);
  const { profile = {} } = userDetail;
  const { experience = [], education = [], skills = [] } = profile;

  useEffect(() => {
    if (skills?.length > 0) {
      setLocalSkills(skills);
    }
  }, [skills]);

  // Skill management functions
  const handleAddSkill = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      if (newSkill.trim()) {
        const updatedSkills = [...localSkills, newSkill.trim()];
        setLocalSkills([...updatedSkills]);
        dispatch(addNestedFields({ section: "skills", value: updatedSkills }));
        const uptprofile = { profile: { ...profile, skills: updatedSkills } };
        const setSkill = await axios.patch(`${Api_url}/app/updateProfile`, uptprofile, { 
          headers: { Authorization: `Bearer ${currentUser?.authtoken}` } 
        });

        if (setSkill.status === 200) {
          console.log(setSkill);
        }
        setNewSkill('');
        setShowAddSkill(false);
      }
    } catch (error) {
      console.error("Unable to update the Skill", error);
      console.log("Internal Server error");
    }
  };

  const handleEditSkill = (index: number) => {
    setEditingSkill(index);
    setEditSkillValue(localSkills[index]);
  };

  const handleUpdateSkill = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (editSkillValue.trim()) {
      try {
        const updatedSkills = [...localSkills];
        updatedSkills[editingSkill!] = editSkillValue.trim();
        setLocalSkills(updatedSkills);
        dispatch(updateNestedFields({ section: "skills", index: editingSkill!, value: editSkillValue.trim() }));
        const uptprofile = { profile: { ...profile, skills: updatedSkills } };
        const updateSkill = await axios.patch(`${Api_url}/app/updateProfile`, uptprofile, { 
          headers: { Authorization: `Bearer ${currentUser?.authtoken}` } 
        });
        if (updateSkill.status === 200) {
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

  const handleDeleteSkill = (index: number) => {
    const updatedSkills = localSkills.filter((_, i) => i !== index);
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

  const handleOpenExp = (index: number) => {
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

  const handleAddData = (type: 'experience' | 'education') => {
    setAddData(type);
  };

  const handleEditProfilePhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleCloseEdit = () => {
    setIsOpenPosition({ Header: false });
  };

  const handleEditProfileInfo = () => {
    setIsOpenPosition({ Header: true });
  };

  const handleAddEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = {
        degree: (e.target as HTMLFormElement).degree.value,
        institution: (e.target as HTMLFormElement).institution.value,
        fieldOfStudy: (e.target as HTMLFormElement).fieldOfStudy.value,
        description: (e.target as HTMLFormElement).description?.value || '',
        duration: `${(e.target as HTMLFormElement).startDate.value} - ${(e.target as HTMLFormElement).endDate?.value || 'Present'}`
      };
      const uptEdu = [...education, formData];
      // Update Redux state
      dispatch(addNestedFields({
        section: "education",
        value: uptEdu
      }));
      const updatedProfileEdu = { profile: { ...profile, education: uptEdu } };
      // Update backend
      console.log(updatedProfileEdu);
      const response = await axios.patch(
        `${Api_url}/app/updateProfile`,
        updatedProfileEdu,
        { headers: { Authorization: `Bearer ${currentUser?.authtoken}` } }
      );

      if (response.status === 200) {
        (e.target as HTMLFormElement).reset();
        setAddData(null);
        // Add success notification
      }
    } catch (error) {
      console.error("Failed to Add Education", error);
      // Add error notification
    }
  };

  const handleUpdateEducationInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = {
        ...education![editEduData!],
        degree: (e.target as HTMLFormElement).degree.value,
        institution: (e.target as HTMLFormElement).institution.value,
        fieldOfStudy: (e.target as HTMLFormElement).fieldOfStudy.value,
        description: (e.target as HTMLFormElement).description?.value || '',
        duration: `${(e.target as HTMLFormElement).startDate.value} - ${(e.target as HTMLFormElement).endDate?.value || 'Present'}`
      };

      dispatch(updateNestedFields({
        section: "education",
        index: editEduData!,
        value: formData
      }));
      // Updated Redux state

      const updatedEducation = [...education!];
      updatedEducation[editEduData!] = formData;
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
  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = {
        title: (e.target as HTMLFormElement).title.value,
        company: (e.target as HTMLFormElement).company.value,
        description: (e.target as HTMLFormElement).description.value,
        duration: `${(e.target as HTMLFormElement).startDate.value} - ${(e.target as HTMLFormElement).endDate.value}`
      };
      const updExp = [...experience, formData];
      dispatch(addNestedFields({ section: "experience", value: updExp }));
      const updatedProfile = { profile: { ...profile, experience: updExp } };
      const updatedData = await axios.patch(`${Api_url}/app/updateProfile`,
        updatedProfile,
        { headers: { Authorization: `Bearer ${currentUser?.authtoken}` } }
      );
      console.log(updatedProfile);
      if (updatedData.status === 200) {
        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      console.error("Failed to Add Experience", error);
    }
  };

  // Experience Edit handling
  const handleUpdateExperienceInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = {
        title: (e.target as HTMLFormElement).title.value,
        company: (e.target as HTMLFormElement).company.value,
        description: (e.target as HTMLFormElement).description.value,
        duration: (e.target as HTMLFormElement).duration.value //change in further update
      };
      dispatch(updateNestedFields({ section: "experience", index: editExpData!, value: formData }));
      const updatedExp = [...experience!];
      updatedExp[editExpData!] = formData;
      const updatedProfile = { ...profile, experience: updatedExp };
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
        console.log("Experience Updated Successfully", updatedResponse);
      }
      console.log(updatedProfile);

    } catch (error) {
      console.error("Failed to Update Experience", error);
    } finally {
      setEditExpData(null);
    }
  };

  const handleOnDelete = async (section: 'experience' | 'education', index: number, id: string) => {
    try {
      const response = await axios.delete(`${Api_url}/app/profile`, {
        data: {
          userId: currentUser?.userId,
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
  };

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
            />
          ) : (
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
                    <div onClick={() => handleOpenExp(index)}>
                      <FontAwesomeIcon icon={faPencil} />
                    </div>
                    <div onClick={() => handleOnDelete('experience', index, exp._id!)}>
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
                  />
                </div>
                <textarea
                  placeholder="Job Description"
                  name="description"
                  rows={4}
                />
                <div className="form-actions">
                  <button type="button" onClick={() => setAddData(null)}>
                    Cancel
                  </button>
                  <button type="submit">
                    Add Experience
                  </button>
                </div>
              </form>
            )}
          </>
        ) : (
          <p>No experience added yet.</p>
        )}
        {addData !== 'experience' && (
          <button className="add-button" onClick={() => handleAddData('experience')}>
            <FontAwesomeIcon icon={faPlus} />
            Add Experience
          </button>
        )}
      </Section>

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
                  { label: "Description", key: "description" },
                  { label: "Start Date", key: "startDate" },
                  { label: "End Date", key: "endDate" }
                ]}
                usereditDetail={{
                  degree: education[editEduData].degree,
                  institution: education[editEduData].institution,
                  fieldOfStudy: education[editEduData].fieldOfStudy,
                  description: education[editEduData].description,
                  startDate: education[editEduData].startDate,
                  endDate: education[editEduData].endDate
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
                    <div onClick={() => handleOnDelete('education', index, edu._id!)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                  </div>
                  <h3>{edu.degree}</h3>
                  <div className="education-meta">
                    <span>{edu.institution}</span>
                    <span>•</span>
                    <span>{edu.duration}</span>
                  </div>
                  {edu.fieldOfStudy && (
                    <p className="education-field">{edu.fieldOfStudy}</p>
                  )}
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
                  />
                </div>
                <textarea
                  placeholder="Description"
                  name="description"
                  rows={4}
                />
                <div className="form-actions">
                  <button type="button" onClick={() => setAddData(null)}>
                    Cancel
                  </button>
                  <button type="submit">
                    Add Education
                  </button>
                </div>
              </form>
            )}
          </>
        ) : (
          <p>No education added yet.</p>
        )}
        {addData !== 'education' && (
          <button className="add-button" onClick={() => handleAddData('education')}>
            <FontAwesomeIcon icon={faPlus} />
            Add Education
          </button>
        )}
      </Section>

      <Section>
        <div className="section-header">
          <FontAwesomeIcon icon={faCode} style={{ color: '#3897f0', paddingBottom: "20px", fontSize: "30px" }} />
          <h2>Skills</h2>
        </div>
        <div className="skills-section">
          {localSkills.map((skill, index) => (
            <SkillItem key={index}>
              <span>{skill}</span>
              <div className="skill-actions">
                <button onClick={() => handleEditSkill(index)}>
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <button className="delete" onClick={() => handleDeleteSkill(index)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </SkillItem>
          ))}
          {editingSkill !== null && (
            <AddSkillForm onSubmit={handleUpdateSkill}>
              <input
                type="text"
                value={editSkillValue}
                onChange={(e) => setEditSkillValue(e.target.value)}
                placeholder="Edit skill"
              />
              <button type="submit">Save</button>
              <button type="button" onClick={() => setEditingSkill(null)}>
                Cancel
              </button>
            </AddSkillForm>
          )}
          {showAddSkill && (
            <AddSkillForm onSubmit={handleAddSkill}>
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add new skill"
              />
              <button type="submit">Add</button>
              <button type="button" onClick={() => setShowAddSkill(false)}>
                Cancel
              </button>
            </AddSkillForm>
          )}
        </div>
        {!showAddSkill && editingSkill === null && (
          <button className="add-button" onClick={() => setShowAddSkill(true)}>
            <FontAwesomeIcon icon={faPlus} />
            Add Skill
          </button>
        )}
      </Section>

      <Section>
        <div className="section-header">
          <FontAwesomeIcon icon={faFilePdf} style={{ color: '#3897f0', paddingBottom: "20px", fontSize: "30px" }} />
          <h2>Resume</h2>
        </div>
        <div className="resume-section">
          {profile.resume ? (
            <div className="resume-link">
              <a href={profile.resume} target="_blank" rel="noopener noreferrer">
                View Resume
              </a>
              <button onClick={() => setIsEditingResume(true)}>
                <FontAwesomeIcon icon={faPencil} />
                Edit
              </button>
            </div>
          ) : (
            <div className="no-resume">
              <p>No resume uploaded yet.</p>
              <button onClick={() => setIsEditingResume(true)}>
                <FontAwesomeIcon icon={faPlus} />
                Add Resume
              </button>
            </div>
          )}
          {isEditingResume && (
            <div className="resume-edit">
              <input
                type="url"
                value={resumeLink}
                onChange={(e) => setResumeLink(e.target.value)}
                placeholder="Enter resume link"
              />
              <button onClick={handleUpdateResume}>Save</button>
              <button onClick={() => setIsEditingResume(false)}>Cancel</button>
            </div>
          )}
        </div>
      </Section>
    </ProfileContainer>
  );
}
