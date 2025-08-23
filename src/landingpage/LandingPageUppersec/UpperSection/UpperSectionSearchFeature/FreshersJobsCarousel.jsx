import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Api_url } from "../../../../globalConfig.js";
import { freshersJobs } from "../../../Var.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpRightFromSquare,
  faBuilding,
  faMapMarkerAlt,
  faClock,
  faGraduationCap,
  faCalendarAlt,
    
} from "@fortawesome/free-solid-svg-icons";
import "./UpperSection.css";
import CarouselComponent from "../../../../components/CarouselComponent.jsx";

function FresherJobCard({ data }) {
  const handleApplyClick = () => {
    // Handle application logic here
    console.log("Applied for job:", data.title);
  };

  return (
    <div className="internship-card">
      <div className="internship-header">
        <div className="internship-title">{data.title}</div>
        <div className="internship-badge">Fresher</div>
      </div>

      <div className="internship-details">
        <div className="internship-info">
          <FontAwesomeIcon icon={faBuilding} className="internship-icon" />
          <span className="internship-company">{data.company}</span>
        </div>
        <div className="internship-info">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="internship-icon" />
          <span className="internship-location">{data.location}</span>
        </div>
      </div>
      <div className="internship-tags gap-3">
        <span className="internship-tag">
          <FontAwesomeIcon icon={faGraduationCap} /> {data.education || "Any Graduate"}
        </span>
        <span className="internship-tag">
          <FontAwesomeIcon icon={faCalendarAlt} /> {data.type || "Full-time"}
        </span>
      </div>

      <div className="internship-footer">
        <div className="internship-stipend">{data.salary || "₹2.5L - ₹5L/year"}</div>
        <button className="apply-btn" onClick={handleApplyClick}>
          <FontAwesomeIcon icon={faUpRightFromSquare} />
          <span>Apply Now</span>
        </button>
      </div>
    </div>
  );
}

export function FreshersJobsCarousel() {
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try to fetch from API first
        const response = await axios.get(`${Api_url}/FresherJobs/10`);
        if (response && response.data && response.data.jobsCollection) {
          setJobsData(response.data.jobsCollection);
        } else {
          // Fallback to mock data if API fails
          setJobsData(freshersJobs.jobs || []);
        }
      } catch (err) {
        console.error("Failed to fetch freshers jobs:", err);
        // Use mock data as fallback
        setJobsData(freshersJobs.jobs || []);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="internship-section">
        <h2 className="internship-section-title">Freshers Jobs</h2>
        <div className="internship-loading">Loading freshers jobs...</div>
      </div>
    );
  }

  return (
    <CarouselComponent
    data={jobsData}
    renderItem={(item)=>(<FresherJobCard data={item}/>)}
    title="Freshers Jobs"
    subtitle="Start your career journey with these exciting opportunities for freshers"
    theme="dark" />
  );
}