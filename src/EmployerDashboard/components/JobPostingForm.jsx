import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../authContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './JobPostingForm.module.css';

const JobPostingForm = () => {
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      title: '',
      company: '',
      location: '',
      jobType: 'Full-time',
      salary: '',
      description: '',
      requirements: '',
      responsibilities: '',
      experienceLevel: 'Entry Level',
      education: '',
      skills: '',
    },
  });

  const onSubmit = async (data) => {
    if (!currentUser) {
      setError('Please log in to post a job');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await axios.post('/api/jobs', {
        ...data,
        postedBy: currentUser.userId,
        company: currentUser.company || data.company,
        skills: data.skills.split(',').map(skill => skill.trim()), // Convert comma-separated string to array
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        toast.success('Job posted successfully!');
        reset();
      }
    } catch (err) {
      console.error('Error posting job:', err);
      setError(err.response?.data?.message || 'Failed to post job. Please try again.');
      toast.error('Failed to post job');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.jobPostingForm}>
      <h2 className={styles.formTitle}>Post a New Job</h2>
      
      {error && (
        <div className={styles.errorMessage} style={{ 
          marginBottom: '1rem', 
          padding: '0.75rem', 
          backgroundColor: '#fef2f2', 
          border: '1px solid #fecaca',
          borderRadius: '4px',
          color: '#b91c1c'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Job Title */}
        <div className={styles.formGroup}>
          <label htmlFor="title" className={`${styles.formLabel} ${styles.required}`}>
            Job Title
          </label>
          <input
            id="title"
            type="text"
            {...register('title', { required: 'Job title is required' })}
            className={styles.formControl}
          />
          {errors.title && (
            <p className={styles.errorMessage}>{errors.title.message}</p>
          )}
        </div>

        {/* Company Name - Only show if not set in user profile */}
        {!currentUser?.company && (
          <div className={styles.formGroup}>
            <label htmlFor="company" className={`${styles.formLabel} ${styles.required}`}>
              Company Name
            </label>
            <input
              id="company"
              type="text"
              {...register('company', { required: 'Company name is required' })}
              className={styles.formControl}
            />
            {errors.company && (
              <p className={styles.errorMessage}>{errors.company.message}</p>
            )}
          </div>
        )}

        {/* Location */}
        <div className={styles.formGroup}>
          <label htmlFor="location" className={`${styles.formLabel} ${styles.required}`}>
            Location
          </label>
          <input
            id="location"
            type="text"
            {...register('location', { required: 'Location is required' })}
            className={styles.formControl}
            placeholder="e.g., Remote, New York, NY"
          />
          {errors.location && (
            <p className={styles.errorMessage}>{errors.location.message}</p>
          )}
        </div>

        {/* Job Type and Experience Level */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div className={styles.formGroup}>
            <label htmlFor="jobType" className={styles.formLabel}>
              Job Type
            </label>
            <select
              id="jobType"
              {...register('jobType')}
              className={styles.formControl}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Temporary">Temporary</option>
              <option value="Internship">Internship</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="experienceLevel" className={styles.formLabel}>
              Experience Level
            </label>
            <select
              id="experienceLevel"
              {...register('experienceLevel')}
              className={styles.formControl}
            >
              <option value="Entry Level">Entry Level</option>
              <option value="Mid Level">Mid Level</option>
              <option value="Senior Level">Senior Level</option>
              <option value="Lead">Lead</option>
              <option value="Manager">Manager</option>
              <option value="Executive">Executive</option>
            </select>
          </div>
        </div>

        {/* Salary */}
        <div className={styles.formGroup}>
          <label htmlFor="salary" className={styles.formLabel}>
            Salary Range
          </label>
          <input
            id="salary"
            type="text"
            {...register('salary')}
            className={styles.formControl}
            placeholder="e.g., $50,000 - $70,000 per year"
          />
        </div>

        {/* Job Description */}
        <div className={styles.formGroup}>
          <label htmlFor="description" className={`${styles.formLabel} ${styles.required}`}>
            Job Description
          </label>
          <textarea
            id="description"
            rows={4}
            {...register('description', { required: 'Job description is required' })}
            className={`${styles.formControl} ${styles.textarea}`}
            placeholder="Detailed description of the job role and responsibilities..."
          />
          {errors.description && (
            <p className={styles.errorMessage}>{errors.description.message}</p>
          )}
        </div>

        {/* Requirements */}
        <div className={styles.formGroup}>
          <label htmlFor="requirements" className={`${styles.formLabel} ${styles.required}`}>
            Requirements
          </label>
          <textarea
            id="requirements"
            rows={4}
            {...register('requirements', { required: 'Requirements are required' })}
            className={`${styles.formControl} ${styles.textarea}`}
            placeholder="List the requirements for this position..."
          />
          {errors.requirements && (
            <p className={styles.errorMessage}>{errors.requirements.message}</p>
          )}
        </div>

        {/* Skills */}
        <div className={styles.formGroup}>
          <label htmlFor="skills" className={`${styles.formLabel} ${styles.required}`}>
            Required Skills (comma separated)
          </label>
          <input
            id="skills"
            type="text"
            {...register('skills', { required: 'At least one skill is required' })}
            className={styles.formControl}
            placeholder="e.g., JavaScript, React, Node.js"
          />
          {errors.skills && (
            <p className={styles.errorMessage}>{errors.skills.message}</p>
          )}
        </div>

        {/* Education */}
        <div className={styles.formGroup}>
          <label htmlFor="education" className={styles.formLabel}>
            Education Requirements
          </label>
          <input
            id="education"
            type="text"
            {...register('education')}
            className={styles.formControl}
            placeholder="e.g., Bachelor's degree in Computer Science or related field"
          />
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={() => reset()}
            className={`${styles.button} ${styles.buttonSecondary}`}
            disabled={isSubmitting}
          >
            Reset
          </button>
          <button
            type="submit"
            className={`${styles.button} ${styles.buttonPrimary}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className={styles.loading}></span>
                Posting...
              </>
            ) : 'Post Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobPostingForm;
