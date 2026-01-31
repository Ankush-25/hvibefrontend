import { useEffect, useState } from "react";
import { Imagepaths } from "../../assets/Global_Need_files/ImagesPaths";
import { useAuth } from "../../context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile, updateNestedFields, addNestedFields, deleteNestedFields, updateFields } from "../../redux/profileSlice.js";
// import './profile.css';
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
import { Api_url } from "../../config/globalConfig.js";
import axios from "axios";
import { RootState } from "../../types/redux";
import { ProfileUIState, FormEventHandler } from "../../types/profile";
import { cn } from "../../lib/utils";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen bg-[#1d1d1d]">
    <div className="w-12 h-12 border-4 border-[#333] border-t-[#3897f0] rounded-full animate-spin" />
  </div>
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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[1000] backdrop-blur-[3px] p-4" onClick={onClose}>
      <div
        className="bg-[#2d2d2d] rounded-xl w-full max-w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-5 md:px-6 border-b border-[#3d3d3d] flex justify-between items-center">
          <h2 className="m-0 text-white text-2xl font-semibold">{title}</h2>
          <button
            className="bg-transparent border-none text-[#a0a0a0] text-3xl cursor-pointer p-1 lg:px-2.5 leading-none rounded transition-all duration-200 hover:text-white hover:bg-white/10"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {editfields.map((field) => (
              <div key={field.key} className={cn("mb-4", field.key === 'description' ? 'md:col-span-2' : '')}>
                <label htmlFor={field.key} className="block mb-2 text-[#e0e0e0] text-sm font-medium">
                  {field.label}
                  {field.required && <span className="text-[#ff4d4f] ml-1">*</span>}
                </label>
                {field.key === 'description' ? (
                  <div className="relative">
                    <textarea
                      id={field.key}
                      name={field.key}
                      className="w-full px-3.5 py-2.5 border border-[#444] rounded-md bg-[#1e1e1e] text-white text-base transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-vertical min-h-[100px]"
                      defaultValue={usereditDetail?.[field.key] || ""}
                      rows={4}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  </div>
                ) : field.key.includes('Date') ? (
                  <div className="relative">
                    <input
                      type="month"
                      id={field.key}
                      name={field.key}
                      className="w-full px-3.5 py-2.5 border border-[#444] rounded-md bg-[#1e1e1e] text-white text-base transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      defaultValue={usereditDetail?.[field.key] || ""}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  </div>
                ) : (
                  <div className="relative">
                    <input
                      type="text"
                      id={field.key}
                      name={field.key}
                      className="w-full px-3.5 py-2.5 border border-[#444] rounded-md bg-[#1e1e1e] text-white text-base transition-all duration-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                      defaultValue={usereditDetail?.[field.key] || ""}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-[#3d3d3d] mt-2">
            <button
              type="button"
              className="px-5 py-2.5 bg-[#3d3d3d] text-[#e0e0e0] rounded-md font-medium transition-all duration-200 hover:bg-[#4a4a4a] hover:-translate-y-0.5"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-500 text-white rounded-md font-medium transition-all duration-200 hover:bg-indigo-600 hover:-translate-y-0.5"
            >
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
    <div className="w-full max-w-[1000px] mx-auto p-4 md:p-8 bg-[#1d1d1d] text-[#f5f5f5] min-h-screen">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 p-6 md:p-8 mb-8 bg-[#2c2c2c] rounded-xl shadow-md border border-[#3a3a3a] items-center md:items-start md:text-left text-center relative">
        <div className="relative w-[180px] mx-auto md:mx-0 flex-shrink-0 flex flex-col items-center gap-4">
          <div
            className="w-[180px] h-[180px] rounded-full border-[3px] border-[#3897f0] shadow-lg bg-cover bg-center transition-transform duration-300 hover:scale-105"
            style={{ backgroundImage: `url(${userDetail.ProfileImage || Imagepaths.globalProfileAvatar})` }}
          />
          <button
            className="absolute top-0 right-0 bg-[#3897f0] text-white p-2 rounded-full cursor-pointer shadow-md transition-all hover:bg-[#2980b9] hover:scale-110"
            onClick={handleEditProfilePhoto}
          >
            <FontAwesomeIcon icon={faPenToSquare} size="sm" />
          </button>
          <p className="text-xl text-[#a0a0a0] m-0">@{userDetail.username || 'username'}</p>
        </div>
        <div className="flex-1 flex flex-col gap-4">
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
              <div className="relative">
                <h1 className="text-3xl md:text-4xl font-bold text-white m-0">{userDetail.FullName || 'No Name'}</h1>
                <h2 className="text-xl text-[#3897f0] mt-1">{userDetail.Role}</h2>
                {userDetail.bio && <p className="text-[#d0d0d0] leading-relaxed my-4">{userDetail.bio}</p>}

                <button
                  className="absolute top-0 right-[-2.5rem] text-[#a0a0a0] hover:text-white transition-colors"
                  onClick={handleEditProfileInfo}
                >
                  <FontAwesomeIcon icon={faPencil} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-left">
                {userDetail.email && (
                  <div className="flex items-center gap-2 text-[#d0d0d0] text-base">
                    <FontAwesomeIcon icon={faEnvelope} className="text-[#3897f0]" />
                    <span>{userDetail.email}</span>
                  </div>
                )}
                {userDetail.PhoneNumber && (
                  <div className="flex items-center gap-2 text-[#d0d0d0] text-base">
                    <FontAwesomeIcon icon={faPhone} className="text-[#3897f0]" />
                    <span>{userDetail.PhoneNumber}</span>
                  </div>
                )}
                {userDetail.location && (
                  <div className="flex items-center gap-2 text-[#d0d0d0] text-base">
                    <FontAwesomeIcon icon={faMapPin} className="text-[#3897f0]" />
                    <span>{userDetail.location}</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <section className="p-6 md:p-8 bg-[#2c2c2c] rounded-xl border border-[#3a3a3a] mb-8">
        <div className="flex items-center gap-3 mb-6">
          <FontAwesomeIcon icon={faBriefcase} className="text-[#3897f0] text-2xl" />
          <h2 className="text-2xl font-bold text-white m-0">Experience</h2>
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
                <div key={index} className="bg-[#1a1a1a] rounded-lg p-5 border border-[#333] mb-4 relative transition-all duration-300 hover:shadow-md hover:border-[#3897f0] hover:-translate-y-0.5">
                  <div className="flex gap-3 absolute top-5 right-5 z-10 text-[#666]">
                    <button
                      className="hover:text-[#3897f0] transition-colors"
                      onClick={() => handleOpenExp(index)}
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button
                      className="hover:text-red-500 transition-colors"
                      onClick={() => handleOnDelete('experience', index, exp._id!)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 pr-16">{exp.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-[#a0a0a0] text-sm mb-3">
                    <span>{exp.company}</span>
                    <span className="text-[#3897f0]">•</span>
                    <span>{exp.duration}</span>
                  </div>
                  {exp.description && (
                    <p className="text-[#d0d0d0] leading-relaxed mt-2 text-sm">{exp.description}</p>
                  )}
                </div>
              ))}
            </>
            {addData === 'experience' && (
              <form
                className="p-6 md:p-8 bg-[#2c2c2c] rounded-lg border-l-4 border-[#3897f0] mt-6 mb-8 shadow-inner"
                onSubmit={handleAddExperience}
              >
                <h2 className="text-xl font-bold text-white mb-6">Add Experience</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Job Title"
                    name="title"
                    className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-md text-white focus:outline-none focus:border-[#3897f0]"
                    required
                  />
                  <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-md text-white focus:outline-none focus:border-[#3897f0]"
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#a0a0a0] mb-1">Start Date</label>
                      <input
                        type="month"
                        name="startDate"
                        className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-md text-white focus:outline-none focus:border-[#3897f0]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#a0a0a0] mb-1">End Date</label>
                      <input
                        type="month"
                        name="endDate"
                        className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-md text-white focus:outline-none focus:border-[#3897f0]"
                      />
                    </div>
                  </div>
                  <textarea
                    placeholder="Job Description"
                    name="description"
                    className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-md text-white focus:outline-none focus:border-[#3897f0] resize-vertical"
                    rows={4}
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    className="px-5 py-2 bg-[#444] text-white rounded-md hover:bg-[#555] transition-colors"
                    onClick={() => setAddData(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#3897f0] text-white rounded-md hover:bg-[#2980b9] transition-colors"
                  >
                    Add Experience
                  </button>
                </div>
              </form>
            )}
          </>
        ) : (
          <p className="text-[#a0a0a0] italic">No experience added yet.</p>
        )}
        {addData !== 'experience' && (
          <button
            className="flex items-center gap-2 px-5 py-2.5 bg-[#3897f0] text-white rounded-md font-medium transition-all hover:bg-[#2980b9] hover:scale-105 active:scale-100 shadow-md mt-4"
            onClick={() => handleAddData('experience')}
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Experience
          </button>
        )}
      </section>

      <section className="p-6 md:p-8 bg-[#2c2c2c] rounded-xl border border-[#3a3a3a] mb-8">
        <div className="flex items-center gap-3 mb-6">
          <FontAwesomeIcon icon={faGraduationCap} className="text-[#3897f0] text-2xl" />
          <h2 className="text-2xl font-bold text-white m-0">Education</h2>
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
                <div key={index} className="bg-[#1a1a1a] rounded-lg p-5 border border-[#333] mb-4 relative transition-all duration-300 hover:shadow-md hover:border-[#3897f0] hover:-translate-y-0.5">
                  <div className="flex gap-3 absolute top-5 right-5 z-10 text-[#666]">
                    <button
                      className="hover:text-[#3897f0] transition-colors"
                      onClick={() => setEditEduData(index)}
                    >
                      <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button
                      className="hover:text-red-500 transition-colors"
                      onClick={() => handleOnDelete('education', index, edu._id!)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 pr-16">{edu.degree}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-[#a0a0a0] text-sm mb-3">
                    <span>{edu.institution}</span>
                    <span className="text-[#3897f0]">•</span>
                    <span>{edu.duration}</span>
                  </div>
                  {edu.fieldOfStudy && (
                    <p className="text-[#3897f0] text-sm mb-2">{edu.fieldOfStudy}</p>
                  )}
                  {edu.description && (
                    <p className="text-[#d0d0d0] leading-relaxed mt-2 text-sm">{edu.description}</p>
                  )}
                </div>
              ))}
            </>
            {addData === 'education' && (
              <form
                className="p-6 md:p-8 bg-[#2c2c2c] rounded-lg border-l-4 border-[#3897f0] mt-6 mb-8 shadow-inner"
                onSubmit={handleAddEducation}
              >
                <h2 className="text-xl font-bold text-white mb-6">Add Education</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Degree"
                    name="degree"
                    className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-md text-white focus:outline-none focus:border-[#3897f0]"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Institution"
                    name="institution"
                    className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-md text-white focus:outline-none focus:border-[#3897f0]"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Field of Study"
                    name="fieldOfStudy"
                    className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-md text-white focus:outline-none focus:border-[#3897f0]"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#a0a0a0] mb-1">Start Date</label>
                      <input
                        type="month"
                        name="startDate"
                        className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-md text-white focus:outline-none focus:border-[#3897f0]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#a0a0a0] mb-1">End Date</label>
                      <input
                        type="month"
                        name="endDate"
                        className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-md text-white focus:outline-none focus:border-[#3897f0]"
                      />
                    </div>
                  </div>
                  <textarea
                    placeholder="Description"
                    name="description"
                    className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-md text-white focus:outline-none focus:border-[#3897f0] resize-vertical"
                    rows={4}
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    className="px-5 py-2 bg-[#444] text-white rounded-md hover:bg-[#555] transition-colors"
                    onClick={() => setAddData(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#3897f0] text-white rounded-md hover:bg-[#2980b9] transition-colors"
                  >
                    Add Education
                  </button>
                </div>
              </form>
            )}
          </>
        ) : (
          <p className="text-[#a0a0a0] italic">No education added yet.</p>
        )}
        {addData !== 'education' && (
          <button
            className="flex items-center gap-2 px-5 py-2.5 bg-[#3897f0] text-white rounded-md font-medium transition-all hover:bg-[#2980b9] hover:scale-105 active:scale-100 shadow-md mt-4"
            onClick={() => handleAddData('education')}
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Education
          </button>
        )}
      </section>

      <section className="p-6 md:p-8 bg-[#2c2c2c] rounded-xl border border-[#3a3a3a] mb-8">
        <div className="flex items-center gap-3 mb-6">
          <FontAwesomeIcon icon={faCode} className="text-[#3897f0] text-2xl" />
          <h2 className="text-2xl font-bold text-white m-0">Skills</h2>
          {!showAddSkill && editingSkill === null && (
            <button
              className="ml-auto flex items-center gap-2 px-4 py-1.5 bg-[#1d1d1d] text-[#3897f0] border border-[#3897f0] rounded-md text-sm transition-all hover:bg-[#3897f0] hover:text-white"
              onClick={() => setShowAddSkill(true)}
            >
              <FontAwesomeIcon icon={faPlus} />
              Add Skill
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          {localSkills.map((skill, index) => (
            <div key={index} className="flex items-center gap-3 bg-[#1a1a1a] px-4 py-2 rounded-full border border-[#333] group transition-all hover:border-[#3897f0] hover:bg-[#1d1d1d]">
              <span className="text-sm font-medium text-[#d0d0d0] group-hover:text-white">{skill}</span>
              <div className="flex gap-2 text-[#666]">
                <button
                  className="hover:text-[#3897f0] transition-colors text-xs"
                  onClick={() => handleEditSkill(index)}
                >
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <button
                  className="hover:text-red-500 transition-colors text-xs"
                  onClick={() => handleDeleteSkill(index)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
          {localSkills.length === 0 && (
            <p className="text-[#a0a0a0] italic">No skills added yet.</p>
          )}
        </div>

        {(showAddSkill || editingSkill !== null) && (
          <form
            className="flex flex-col sm:flex-row gap-3 mt-8 p-4 bg-[#1a1a1a] rounded-lg border border-[#333]"
            onSubmit={editingSkill !== null ? handleUpdateSkill : handleAddSkill}
          >
            <input
              type="text"
              value={editingSkill !== null ? editSkillValue : newSkill}
              onChange={(e) => editingSkill !== null ? setEditSkillValue(e.target.value) : setNewSkill(e.target.value)}
              placeholder={editingSkill !== null ? "Edit skill" : "Add new skill"}
              className="flex-1 px-4 py-2 bg-[#1d1d1d] border border-[#333] rounded-md text-white focus:outline-none focus:border-[#3897f0]"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-[#3897f0] text-white rounded-md hover:bg-[#2980b9] transition-colors text-sm font-medium"
              >
                {editingSkill !== null ? "Update" : "Add"}
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-[#444] text-white rounded-md hover:bg-[#555] transition-colors text-sm font-medium"
                onClick={() => {
                  setShowAddSkill(false);
                  setEditingSkill(null);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </section>

      <section className="p-6 md:p-8 bg-[#2c2c2c] rounded-xl border border-[#3a3a3a] mb-8">
        <div className="flex items-center gap-3 mb-6">
          <FontAwesomeIcon icon={faFilePdf} className="text-[#3897f0] text-2xl" />
          <h2 className="text-2xl font-bold text-white m-0">Resume</h2>
        </div>
        <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333]">
          {profile.resume ? (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#3897f0]/10 flex items-center justify-center rounded-lg">
                  <FontAwesomeIcon icon={faFilePdf} className="text-[#3897f0]" />
                </div>
                <span className="text-white font-medium">My_Resume.pdf</span>
              </div>
              <div className="flex gap-3">
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#333] text-white rounded-md text-sm hover:bg-[#444] transition-colors"
                >
                  View
                </a>
                <button
                  className="px-4 py-2 bg-[#3897f0] text-white rounded-md text-sm hover:bg-[#2980b9] transition-colors flex items-center gap-2"
                  onClick={() => setIsEditingResume(true)}
                >
                  <FontAwesomeIcon icon={faPencil} size="xs" />
                  Replace
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-[#a0a0a0] mb-4">No resume uploaded yet.</p>
              <button
                className="px-6 py-2 bg-[#3897f0] text-white rounded-md font-medium hover:bg-[#2980b9] transition-colors flex items-center gap-2 mx-auto"
                onClick={() => setIsEditingResume(true)}
              >
                <FontAwesomeIcon icon={faPlus} />
                Add Resume
              </button>
            </div>
          )}

          {isEditingResume && (
            <div className="mt-6 pt-6 border-t border-[#333] animate-fade-in">
              <label className="block text-sm text-[#a0a0a0] mb-2">Resume URL (Drive/PDF link)</label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="url"
                  value={resumeLink}
                  onChange={(e) => setResumeLink(e.target.value)}
                  placeholder="https://example.com/resume.pdf"
                  className="flex-1 px-4 py-2 bg-[#1d1d1d] border border-[#333] rounded-md text-white focus:outline-none focus:border-[#3897f0]"
                />
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 bg-[#3897f0] text-white rounded-md text-sm font-medium hover:bg-[#2980b9]"
                    onClick={handleUpdateResume}
                  >
                    Save Link
                  </button>
                  <button
                    className="px-4 py-2 bg-[#444] text-white rounded-md text-sm font-medium hover:bg-[#555]"
                    onClick={() => setIsEditingResume(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
