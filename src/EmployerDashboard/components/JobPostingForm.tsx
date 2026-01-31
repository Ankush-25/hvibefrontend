import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../authContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './JobPostingForm.module.css';
import { Api_url } from '../../globalConfig';
import { JobPostingFormProps, JobFormData, JobData } from '../../types/employerDashboard';

const JobPostingForm = ({ userCompany }: JobPostingFormProps) => {
  const { currentUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<JobFormData>({
    defaultValues: {
      title: '',
      company: '',
      location: '',
      jobType: 'Full-time',
      salary: '',
      description: '',
      category: 'IT',
      experienceLevel: 0,
      skillsRequired: '',
    },
  });
  

  const onSubmit = async (data: JobFormData) => {
    if (!currentUser) {
      setError('Please log in to post a job');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const jobData: JobData = {
        ...data,
        postedBy: currentUser.userId,
        company: data.company,
        skillsRequired: data.skillsRequired 
          ? data.skillsRequired.split(',').map(skill => skill.trim())
          : [],
        experienceLevel: Number(data.experienceLevel),
        salary: data.salary ? Number(data.salary) : undefined,
      };

      const response = await axios.post(`${Api_url}/postJob`, jobData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        }
      });

      if (response.data.success) {
        toast.success('Job posted successfully!'); 
        reset();
      }
    } catch (err: any) {
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
            <div className={styles.companyGroup}>
            {userCompany?.map((company, index) => (
              <div key={index} >
                <input
                  type="radio"
                  id={`company-${index}`}
                  value={company.name}
                  {...register('company', { required: 'Company name is required' })}
                />
                <label htmlFor={`company-${index}`}>{company.name}</label>
              </div>
            ))}
            </div>
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

        {/* Job Type, Category, and Experience Level */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="jobType" className={`${styles.formLabel} ${styles.required}`}>
              Job Type
            </label>
            <select
              id="jobType"
              {...register('jobType', { required: 'Job type is required' })}
              className={styles.formControl}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
              <option value="Internship">Internship</option>
            </select>
            {errors.jobType && (
              <p className={styles.errorMessage}>{errors.jobType.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category" className={`${styles.formLabel} ${styles.required}`}>
              Category
            </label>
            <select
              id="category"
              {...register('category', { required: 'Category is required' })}
              className={styles.formControl}
            >
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && (
              <p className={styles.errorMessage}>{errors.category.message}</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="experienceLevel" className={`${styles.formLabel} ${styles.required}`}>
              Experience (Years)
            </label>
            <input
              id="experienceLevel"
              type="number"
              min="0"
              step="0.5"
              {...register('experienceLevel', { 
                required: 'Experience level is required',
                min: { value: 0, message: 'Experience cannot be negative' }
              })}
              className={styles.formControl}
              placeholder="e.g., 2.5"
            />
            {errors.experienceLevel && (
              <p className={styles.errorMessage}>{errors.experienceLevel.message}</p>
            )}
          </div>
        </div>

        {/* Salary */}
        <div className={styles.formGroup}>
          <label htmlFor="salary" className={styles.formLabel}>
            Salary (Annual)
          </label>
          <div className={styles.inputGroup}>
            <span className={styles.inputPrefix}>$</span>
            <input
              id="salary"
              type="number"
              min="0"
              step="1000"
              {...register('salary')}
              className={styles.formControl}
              placeholder="e.g., 60000"
            />
          </div>
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

        {/* Skills Required */}
        <div className={styles.formGroup}>
          <label htmlFor="skillsRequired" className={styles.formLabel}>
            Required Skills
          </label>
          <input
            id="skillsRequired"
            type="text"
            {...register('skillsRequired')}
            className={styles.formControl}
            placeholder="e.g., JavaScript, React, Node.js (comma separated)"
          />
          <p className={styles.helperText}>Separate multiple skills with commas</p>
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
