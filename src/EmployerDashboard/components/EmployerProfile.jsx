import React, { useState, useEffect } from 'react';
import { useAuth } from '../../authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './EmployerProfile.module.css';
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

const EmployerProfile = () => {
  const { currentUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
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
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.avatar}>
          {currentUser.companyName ? currentUser.companyName.charAt(0).toUpperCase() : 'C'}
        </div>
        <h2 className={styles.companyName}>
          {isEditing ? (
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className={styles.editInput}
              disabled={!isEditing}
            />
          ) : (
            formData.companyName || 'Your Company'
          )}
        </h2>
        <p className={styles.industry}>
          {isEditing ? (
            <select
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className={styles.editSelect}
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
        </p>
      </div>

      <div className={styles.profileDetails}>
        <div className={styles.detailRow}>
          <FontAwesomeIcon icon={faEnvelope} className={styles.icon} />
          <div className={styles.detailContent}>
            <span className={styles.detailLabel}>Email</span>
            <span className={styles.detailValue}>{currentUser.email}</span>
          </div>
        </div>

        <div className={styles.detailRow}>
          <FontAwesomeIcon icon={faPhone} className={styles.icon} />
          <div className={styles.detailContent}>
            <span className={styles.detailLabel}>Phone</span>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={styles.editInput}
                placeholder="Enter phone number"
              />
            ) : (
              <span className={styles.detailValue}>{formData.phone || 'Not provided'}</span>
            )}
          </div>
        </div>

        <div className={styles.detailRow}>
          <FontAwesomeIcon icon={faGlobe} className={styles.icon} />
          <div className={styles.detailContent}>
            <span className={styles.detailLabel}>Website</span>
            {isEditing ? (
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className={styles.editInput}
                placeholder="https://example.com"
              />
            ) : formData.website ? (
              <a 
                href={formData.website.startsWith('http') ? formData.website : `https://${formData.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.websiteLink}
              >
                {formData.website}
              </a>
            ) : (
              <span className={styles.detailValue}>Not provided</span>
            )}
          </div>
        </div>

        <div className={styles.detailRow}>
          <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
          <div className={styles.detailContent}>
            <span className={styles.detailLabel}>Address</span>
            {isEditing ? (
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`${styles.editInput} ${styles.textarea}`}
                placeholder="Enter company address"
                rows="2"
              />
            ) : (
              <span className={styles.detailValue}>
                {formData.address || 'Address not provided'}
              </span>
            )}
          </div>
        </div>

        <div className={styles.detailRow}>
          <FontAwesomeIcon icon={faBuilding} className={styles.icon} />
          <div className={styles.detailContent}>
            <span className={styles.detailLabel}>Company Size</span>
            {isEditing ? (
              <select
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                className={styles.editSelect}
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
              <span className={styles.detailValue}>
                {formData.companySize || 'Not specified'}
              </span>
            )}
          </div>
        </div>

        {formData.foundedYear && (
          <div className={styles.detailRow}>
            <FontAwesomeIcon icon={faBuilding} className={styles.icon} />
            <div className={styles.detailContent}>
              <span className={styles.detailLabel}>Founded</span>
              {isEditing ? (
                <input
                  type="number"
                  name="foundedYear"
                  value={formData.foundedYear}
                  onChange={handleChange}
                  className={styles.editInput}
                  min="1800"
                  max={new Date().getFullYear()}
                />
              ) : (
                <span className={styles.detailValue}>{formData.foundedYear}</span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className={styles.aboutSection}>
        <h3 className={styles.sectionTitle}>About Company</h3>
        {isEditing ? (
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`${styles.editTextarea} ${styles.textarea}`}
            placeholder="Tell us about your company..."
            rows="5"
          />
        ) : (
          <p className={styles.aboutText}>
            {formData.description || 'No description provided'}
          </p>
        )}
      </div>

      <div className={styles.actionButtons}>
        <button
          type="button"
          onClick={handleSubmit}
          className={`${styles.button} ${isEditing ? styles.saveButton : styles.editButton}`}
          disabled={isLoading}
        >
          <FontAwesomeIcon 
            icon={isEditing ? faSave : faEdit} 
            className={styles.buttonIcon} 
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
            className={`${styles.button} ${styles.cancelButton}`}
            disabled={isLoading}
          >
            <FontAwesomeIcon icon={faTimes} className={styles.buttonIcon} />
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default EmployerProfile;
