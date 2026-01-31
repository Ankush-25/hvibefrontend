import { useNavigate } from "react-router-dom";
import { jobCategories } from "../../../Var";
import CollapsibleCategoryGrid from "../../../../components/CollapsibleCategoryGrid";

import { Api_url } from "../../../../globalConfig";
import axios from "axios";

interface PopularJobtypeProps {
  theme?: "light" | "dark";
}

export function PopularJobtype({ theme = "light" }: PopularJobtypeProps) {
  const navigate = useNavigate();

  const handleCategoryClick = async (Title: string, category?: string) => {
    // Navigate to jobs page with category filter

    try {
      const getCate = await axios.get(
        `${Api_url}/searchJobs?query=${encodeURIComponent(Title)}&category=${encodeURIComponent(category || '')}`
      );
      if (getCate.status === 200) {
        localStorage.setItem("jobSearchResults", JSON.stringify(getCate.data));

        //SendNotification
      }
    } catch (error) {
      console.error("unable to find the Job", error);
      console.log("internal Server Error");
    } finally {
      navigate("/search-results");
    }
  };

  return (
    <CollapsibleCategoryGrid
      categories={jobCategories}
      title="Popular Job Categories"
      subtitle="Explore jobs by category"
      theme={theme}
      onCategoryClick={handleCategoryClick}
    />
  );
}
