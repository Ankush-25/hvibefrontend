import React, { useEffect, useState } from "react";
import axios from "axios";
import { Api_url } from "../../../../globalConfig.js";
import { internships } from "../../../Var";
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


function InternshipCard({ data }) {
  const handleApplyClick = () => {
    // Handle application logic here
    console.log("Applied for internship:", data.title);
  };

  return (
    <div className="internship-card">
      <div className="internship-header">
        <div className="internship-title">{data.title}</div>
        <div className="internship-badge">Internship</div>
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
        {data.duration && (
          <div className="internship-info">
            <FontAwesomeIcon icon={faClock} className="internship-icon" />
            <span className="internship-duration">{data.duration || "3-6 months"}</span>
          </div>
        )}
      </div>

      <div className="internship-tags">
        <span className="internship-tag">
          <FontAwesomeIcon icon={faGraduationCap} /> {data.education || "Undergraduate"}
        </span>
        <span className="internship-tag">
          <FontAwesomeIcon icon={faCalendarAlt} /> {data.type || "Full-time"}
        </span>
      </div>

      <div className="internship-footer">
        <div className="internship-stipend">{data.stipend || "₹15,000 - ₹25,000/month"}</div>
        <button className="apply-btn" onClick={handleApplyClick}>
          <FontAwesomeIcon icon={faUpRightFromSquare} />
          <span>Apply Now</span>
        </button>
      </div>
    </div>
  );
}

export function InternshipsCrousel() {
  const [internshipData, setInternshipData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
        const fetchData = async () => {
          try {
            // Try to fetch from API first
            const response = await axios.get(`${Api_url}/FeatureJobs/10`);
            if (response && response.data && response.data.jobsCollection) {
              setInternshipData(response.data.jobsCollection);
            } else {
              // Fallback to mock data if API fails
              setInternshipData(internships.internships);
            }
          } catch (err) {
            console.error("Failed to fetch internships:", err);
            // Use mock data as fallback
            setInternshipData(internships.internships);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }, []);
      if (loading) {
            return (
              <div className="internship-section">
                <h2 className="internship-section-title">Latest Internships</h2>
                <div className="internship-loading">Loading internships...</div>
              </div>
            );
          }
          return(
          <CarouselComponent data={internshipData}  
            renderItem={(item)=>(<InternshipCard data={item}/>)}
            title="Latest Internships"
            subtitle="Kickstart your career with these exciting internship opportunities"
            theme="dark" />
          )
}