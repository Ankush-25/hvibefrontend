import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
// import styles from './JobPostingForm.module.css';
import { Api_url } from '../../../config/globalConfig';
import { JobPostingFormProps, JobFormData, JobData } from '../../../types/employerDashboard';
import { cn } from '../../../lib/utils';

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
    <div className="max-w-[800px] mx-auto p-6 md:p-8 bg-[#1e1e1e] rounded-xl shadow-2xl text-[#f3f4f6] border border-[#2d2d2d]">
      <h2 className="text-2xl font-bold text-[#f3f4f6] mb-6 pb-4 border-b border-[#3d3d3d]">Post a New Job</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-900/50 rounded-md text-red-500 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Job Title */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="title" className="text-sm font-medium text-[#d1d5db]">
            Job Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            {...register('title', { required: 'Job title is required' })}
            className="w-full px-4 py-2.5 text-base text-[#f3f4f6] bg-[#2d2d2d] border border-[#3d3d3d] rounded-md transition-all focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 placeholder:text-gray-500"
            placeholder="e.g. Senior Frontend Developer"
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Company Name - Only show if not set in user profile */}
        {!currentUser?.company && (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#d1d5db]">
              Company Name <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-4 p-3 bg-[#2d2d2d] rounded-md border border-[#3d3d3d]">
              {userCompany?.map((company, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="radio"
                    id={`company-${index}`}
                    value={company.name}
                    {...register('company', { required: 'Company name is required' })}
                    className="w-4 h-4 accent-purple-600"
                  />
                  <label htmlFor={`company-${index}`} className="text-sm text-[#f3f4f6] cursor-pointer">{company.name}</label>
                </div>
              ))}
            </div>
            {errors.company && (
              <p className="text-xs text-red-500 mt-1">{errors.company.message}</p>
            )}
          </div>
        )}

        {/* Location */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="location" className="text-sm font-medium text-[#d1d5db]">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            id="location"
            type="text"
            {...register('location', { required: 'Location is required' })}
            className="w-full px-4 py-2.5 text-base text-[#f3f4f6] bg-[#2d2d2d] border border-[#3d3d3d] rounded-md transition-all focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 placeholder:text-gray-500"
            placeholder="e.g., Remote, New York, NY"
          />
          {errors.location && (
            <p className="text-xs text-red-500 mt-1">{errors.location.message}</p>
          )}
        </div>

        {/* Job Type, Category, and Experience Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="jobType" className="text-sm font-medium text-[#d1d5db]">
              Job Type <span className="text-red-500">*</span>
            </label>
            <select
              id="jobType"
              {...register('jobType', { required: 'Job type is required' })}
              className="w-full px-4 py-2.5 text-base text-[#f3f4f6] bg-[#2d2d2d] border border-[#3d3d3d] rounded-md transition-all focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
              <option value="Internship">Internship</option>
            </select>
            {errors.jobType && (
              <p className="text-xs text-red-500 mt-1">{errors.jobType.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="category" className="text-sm font-medium text-[#d1d5db]">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              {...register('category', { required: 'Category is required' })}
              className="w-full px-4 py-2.5 text-base text-[#f3f4f6] bg-[#2d2d2d] border border-[#3d3d3d] rounded-md transition-all focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
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
              <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="experienceLevel" className="text-sm font-medium text-[#d1d5db]">
              Experience (Years) <span className="text-red-500">*</span>
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
              className="w-full px-4 py-2.5 text-base text-[#f3f4f6] bg-[#2d2d2d] border border-[#3d3d3d] rounded-md transition-all focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
              placeholder="e.g., 2.5"
            />
            {errors.experienceLevel && (
              <p className="text-xs text-red-500 mt-1">{errors.experienceLevel.message}</p>
            )}
          </div>
        </div>

        {/* Salary */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="salary" className="text-sm font-medium text-[#d1d5db]">
            Salary (Annual)
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-[#d1d5db] pointer-events-none">$</span>
            <input
              id="salary"
              type="number"
              min="0"
              step="1000"
              {...register('salary')}
              className="w-full pl-8 pr-4 py-2.5 text-base text-[#f3f4f6] bg-[#2d2d2d] border border-[#3d3d3d] rounded-md transition-all focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 placeholder:text-gray-500"
              placeholder="e.g., 60000"
            />
          </div>
        </div>

        {/* Job Description */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="description" className="text-sm font-medium text-[#d1d5db]">
            Job Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            rows={4}
            {...register('description', { required: 'Job description is required' })}
            className="w-full px-4 py-2.5 text-base text-[#f3f4f6] bg-[#2d2d2d] border border-[#3d3d3d] rounded-md transition-all focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 placeholder:text-gray-500 min-h-[120px] resize-vertical"
            placeholder="Detailed description of the job role and responsibilities..."
          />
          {errors.description && (
            <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Skills Required */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="skillsRequired" className="text-sm font-medium text-[#d1d5db]">
            Required Skills
          </label>
          <input
            id="skillsRequired"
            type="text"
            {...register('skillsRequired')}
            className="w-full px-4 py-2.5 text-base text-[#f3f4f6] bg-[#2d2d2d] border border-[#3d3d3d] rounded-md transition-all focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20 placeholder:text-gray-500"
            placeholder="e.g., JavaScript, React, Node.js (comma separated)"
          />
          <p className="mt-1 text-xs text-gray-400">Separate multiple skills with commas</p>
        </div>

        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-[#3d3d3d]">
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-2.5 text-sm font-medium rounded-md transition-all border border-purple-600 text-purple-600 hover:bg-purple-600/10 disabled:text-gray-500 disabled:border-gray-500"
            disabled={isSubmitting}
          >
            Reset
          </button>
          <button
            type="submit"
            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-md transition-all bg-purple-600 text-white border border-transparent hover:bg-purple-700 hover:-translate-y-0.5 shadow-md active:translate-y-0 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white/30 rounded-full border-t-white animate-spin mr-2"></span>
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
