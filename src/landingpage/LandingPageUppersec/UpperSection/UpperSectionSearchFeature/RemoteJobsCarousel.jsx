import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpRightFromSquare,
  faBuilding,
  faMapMarkerAlt,
  faGlobe,
  faBriefcase,
  faGraduationCap,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import "./UpperSection.css";
import CarouselComponent from "../../../../components/CarouselComponent";
import axios from "axios";
import { Api_url } from "../../../../globalConfig.js";
import { useEffect, useState } from "react";
import {mockRemoteJobs}from "../../../Var.jsx"


const RemoteJobCard = ({ job }) => {
  const navigate = useNavigate();
  
  const handleApplyClick = (e) => {
    e.stopPropagation();
    // Navigate to job application page with job ID
    navigate(`/jobs/${job?.id}/apply`);
  };

  return (
    <div className="internship-card">
      <div className="internship-header">
        <div className="internship-title">{job?.title}</div>
        <div className="internship-badge">
          <FontAwesomeIcon icon={faGlobe} style={{ marginRight: '5px' }} /> Remote
        </div>
      </div>

      <div className="internship-details">
        <div className="internship-info">
          <FontAwesomeIcon icon={faBuilding} className="internship-icon" />
          <span className="internship-company">{job?.company}</span>
        </div>
        <div className="internship-info">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="internship-icon" />
          <span className="internship-location">{job?.location}</span>
        </div>
      </div>

      <div className="internship-tags gap-3">
        <span className="internship-tag">
          <FontAwesomeIcon icon={faBriefcase} /> {job?.type}
        </span>
        <span className="internship-tag">
          <FontAwesomeIcon icon={faGraduationCap} /> {job?.experience}
        </span>
      </div>

      <div className="internship-footer">
        <div className="internship-stipend">{job?.salary}</div>
        <button className="apply-btn" onClick={handleApplyClick}>
          <FontAwesomeIcon icon={faUpRightFromSquare} />
          <span>Apply Now</span>
        </button>
      </div>
    </div>
  );
};

const RemoteJobsCarousel = () => {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  
 

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try to fetch from API first
        // const response = await axios.get(`${Api_url}/RemoteJobs/10`);
        // if (response && response.data && response.data.jobsCollection) {
        //   setJobData(response.data.jobsCollection);
        // } else {
          // Fallback to mock data if API fails
          setJobData(mockRemoteJobs);
        // }
      } catch (err) {
        console.error("Failed to fetch remote jobs:", err);
        // Use mock data as fallback
        setJobData(mockRemoteJobs);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return (
      <div className="internship-section">
        <h2 className="internship-section-title">Remote Jobs</h2>
        <div className="internship-loading">Loading remote jobs...</div>
      </div>
    );
  }

  return (
    <CarouselComponent
      data={jobData}
      renderItem={(item) => <RemoteJobCard job={item} />}
      title="Remote Jobs"
      subtitle="Work from anywhere with these remote job opportunities"
      theme="dark" />
  );
};

export default RemoteJobsCarousel;
