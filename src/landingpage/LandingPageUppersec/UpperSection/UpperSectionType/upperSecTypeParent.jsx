import React from "react";
import { useNavigate } from "react-router-dom";
import { jobCategories } from "../../../Var.jsx";
import CollapsibleCategoryGrid from "../../../../components/CollapsibleCategoryGrid";
import "./upperSecType.css";
import { Api_url } from "../../../../globalConfig.js";
import axios from "axios";

export function PopularJobtype({ theme = "light" }) {
  const navigate = useNavigate();

  const handleCategoryClick = async (Title, category) => {
    // Navigate to jobs page with category filter
    console.log(`/searchJobs?query=${encodeURIComponent(Title)}&category=${encodeURIComponent(category)}`)
    console.log(Title);
    console.log(category);


    try {
      const getCate = await axios.get(
        `${Api_url}/searchJobs?query=${encodeURIComponent(Title)}&category=${encodeURIComponent(category)}`
      );
      if (getCate.status == 200) {
        localStorage.setItem("jobSearchResults", JSON.stringify(getCate.data));

        //SendNotification
      }
    } catch (error) {
      console.error("unable to find the Job",error);
      console.log("internal Server Error");
    } finally {
      navigate("/search-results");
    }
  };

  return (
    <CollapsibleCategoryGrid
      categories={jobCategories}
      title="Popular Categories"
      subtitle="Explore thousands of jobs in popular categories"
      theme={theme}
      onCategoryClick={handleCategoryClick}
      initialVisibleCount={8}
    />
  );
}
