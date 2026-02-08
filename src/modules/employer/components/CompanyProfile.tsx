import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
// import styles from './CompanyProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faGlobe,
  faEdit,
  faSave,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { CompanyProfileProps, CompanyFormData } from '../../../types/employerDashboard';
import { cn } from '../../../lib/utils';

const CompanyProfile = ({ }: CompanyProfileProps) => {
  const { currentUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CompanyFormData>({
    companyName: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    description: '',
    industry: '',
    companySize: '',
    foundedYear: ''
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        companyName: currentUser.companyName || currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        website: currentUser.website || '',
        address: currentUser.address || '',
        description: currentUser.description || '',
        industry: currentUser.industry || '',
        companySize: currentUser.companySize || '',
        foundedYear: currentUser.foundedYear || ''
      });
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.put(
        '/api/employer/profile',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        updateUser(response.data.user);
        toast.success('Profile updated successfully!');
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-[800px] mx-auto p-6 md:p-8 bg-[#1e1e1e] rounded-xl shadow-2xl text-[#f3f4f6] border border-[#2d2d2d]">
      <div className="text-center mb-8 pb-6 border-b border-[#3d3d3d]">
        <div className="w-[100px] h-[100px] mx-auto mb-4 rounded-full bg-purple-600 text-white flex items-center justify-center text-[2.5rem] font-bold">
          {currentUser.companyName ? currentUser.companyName.charAt(0).toUpperCase() : 'C'}
        </div>
        <h2 className="text-2xl font-bold my-2 text-[#f3f4f6]">
          {isEditing ? (
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full max-w-md mx-auto px-4 py-2 text-center text-xl bg-[#2d2d2d] border border-[#3d3d3d] rounded-md text-[#f3f4f6] focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
              disabled={!isEditing}
            />
          ) : (
            formData.companyName || 'Your Company'
          )}
        </h2>
        <div className="text-purple-400 text-lg my-2">
          {isEditing ? (
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full max-w-xs mx-auto px-4 py-2 text-center bg-[#2d2d2d] border border-[#3d3d3d] rounded-md text-[#f3f4f6] focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
              disabled={!isEditing}
            >
              <option value="">Select Industry</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Retail">Retail</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            formData.industry || 'Industry not specified'
          )}
        </div>
      </div>

      <div className="my-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-start pb-6 border-b border-[#3d3d3d]">
          <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6 text-purple-600 mr-4 mt-1 shrink-0" />
          <div className="flex-1">
            <span className="block text-[0.8rem] text-gray-400 uppercase tracking-wider mb-1">Email</span>
            <span className="text-base text-[#f3f4f6] break-words">{currentUser.email}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-start pb-6 border-b border-[#3d3d3d]">
          <FontAwesomeIcon icon={faPhone} className="w-6 h-6 text-purple-600 mr-4 mt-1 shrink-0" />
          <div className="flex-1">
            <span className="block text-[0.8rem] text-gray-400 uppercase tracking-wider mb-1">Phone</span>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 text-base bg-[#2d2d2d] border border-[#3d3d3d] rounded-md text-[#f3f4f6] transition-all focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 placeholder:text-gray-500"
                placeholder="Enter phone number"
              />
            ) : (
              <span className="text-base text-[#f3f4f6] break-words">{formData.phone || 'Not provided'}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-start pb-6 border-b border-[#3d3d3d]">
          <FontAwesomeIcon icon={faGlobe} className="w-6 h-6 text-purple-600 mr-4 mt-1 shrink-0" />
          <div className="flex-1">
            <span className="block text-[0.8rem] text-gray-400 uppercase tracking-wider mb-1">Website</span>
            {isEditing ? (
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-2 text-base bg-[#2d2d2d] border border-[#3d3d3d] rounded-md text-[#f3f4f6] transition-all focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 placeholder:text-gray-500"
                placeholder="https://example.com"
              />
            ) : formData.website ? (
              <a
                href={formData.website.startsWith('http') ? formData.website : `https://${formData.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-400 hover:underline transition-colors"
              >
                {formData.website}
              </a>
            ) : (
              <span className="text-base text-[#f3f4f6] break-words">Not provided</span>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-start pb-6 border-b border-[#3d3d3d]">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="w-6 h-6 text-purple-600 mr-4 mt-1 shrink-0" />
          <div className="flex-1">
            <span className="block text-[0.8rem] text-gray-400 uppercase tracking-wider mb-1">Address</span>
            {isEditing ? (
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 text-base bg-[#2d2d2d] border border-[#3d3d3d] rounded-md text-[#f3f4f6] transition-all focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 placeholder:text-gray-500 min-h-[80px] resize-vertical"
                placeholder="Enter company address"
                rows={2}
              />
            ) : (
              <span className="text-base text-[#f3f4f6] break-words">
                {formData.address || 'Address not provided'}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-start pb-6 border-b border-[#3d3d3d]">
          <FontAwesomeIcon icon={faBuilding} className="w-6 h-6 text-purple-600 mr-4 mt-1 shrink-0" />
          <div className="flex-1">
            <span className="block text-[0.8rem] text-gray-400 uppercase tracking-wider mb-1">Company Size</span>
            {isEditing ? (
              <select
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                className="w-full px-4 py-2 text-base bg-[#2d2d2d] border border-[#3d3d3d] rounded-md text-[#f3f4f6] transition-all focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
              >
                <option value="">Select size</option>
                <option value="1-10">1-10 employees</option>
                <option value="11-50">11-50 employees</option>
                <option value="51-200">51-200 employees</option>
                <option value="201-500">201-500 employees</option>
                <option value="501-1000">501-1000 employees</option>
                <option value="1001-5000">1001-5000 employees</option>
                <option value="5001+">5001+ employees</option>
              </select>
            ) : (
              <span className="text-base text-[#f3f4f6] break-words">
                {formData.companySize || 'Not specified'}
              </span>
            )}
          </div>
        </div>

        {formData.foundedYear && (
          <div className="flex flex-col md:flex-row md:items-start pb-6 last:border-0">
            <FontAwesomeIcon icon={faBuilding} className="w-6 h-6 text-purple-600 mr-4 mt-1 shrink-0" />
            <div className="flex-1">
              <span className="block text-[0.8rem] text-gray-400 uppercase tracking-wider mb-1">Founded</span>
              {isEditing ? (
                <input
                  type="number"
                  name="foundedYear"
                  value={formData.foundedYear}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-base bg-[#2d2d2d] border border-[#3d3d3d] rounded-md text-[#f3f4f6] transition-all focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 placeholder:text-gray-500"
                  min="1800"
                  max={new Date().getFullYear()}
                />
              ) : (
                <span className="text-base text-[#f3f4f6] break-words">{formData.foundedYear}</span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="my-10 p-6 bg-[#2d2d2d] rounded-lg border border-[#3d3d3d]">
        <h3 className="text-xl font-semibold mb-4 text-[#f3f4f6]">About Company</h3>
        {isEditing ? (
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 text-base bg-[#1e1e1e] border border-[#3d3d3d] rounded-md text-[#f3f4f6] focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 placeholder:text-gray-500 min-h-[150px] resize-vertical"
            placeholder="Tell us about your company..."
            rows={5}
          />
        ) : (
          <p className="leading-relaxed text-[#d1d5db] whitespace-pre-line">
            {formData.description || 'No description provided'}
          </p>
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-end gap-4 mt-8 pt-6 border-t border-[#3d3d3d]">
        <button
          type="button"
          onClick={handleSubmit}
          className={cn(
            "inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-md transition-all cursor-pointer shadow-md active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed",
            isEditing ? "bg-emerald-600 text-white hover:bg-emerald-700 hover:-translate-y-0.5" : "bg-purple-600 text-white hover:bg-purple-700 hover:-translate-y-0.5"
          )}
          disabled={isLoading}
        >
          <FontAwesomeIcon
            icon={isEditing ? faSave : faEdit}
            className="mr-2"
          />
          {isLoading ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              // Reset form to original values
              setFormData({
                companyName: currentUser.companyName || currentUser.name || '',
                email: currentUser.email || '',
                phone: currentUser.phone || '',
                website: currentUser.website || '',
                address: currentUser.address || '',
                description: currentUser.description || '',
                industry: currentUser.industry || '',
                companySize: currentUser.companySize || '',
                foundedYear: currentUser.foundedYear || ''
              });
            }}
            className="bg-gray-600 text-white hover:bg-gray-700 active:translate-y-0 inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-md transition-all cursor-pointer"
            disabled={isLoading}
          >
            <FontAwesomeIcon icon={faTimes} className="mr-2" />
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
