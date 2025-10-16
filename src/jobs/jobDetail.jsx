import { useParams } from "react-router-dom";
import {Api_url} from "./../globalConfig"
import axios from 'axios';
import { useState } from "react";

export function JobDetailPage(){
    const [jobInfo, setJobInfo] = useState({})
    const jobTittle = "software Developer";
    
    // ??'68a5c7b98a763c85cd58f20b'
    const {jobId} = useParams();
    async function getJobDetailApi(){
        try {
            const details = await axios.get(`${Api_url}/job/${jobId}`);
            if(!details||details.length ===0){
                throw new Error("Details not found");
            }
            console.log(jobId)
            console.log(details.data.jobDetail)
            // setJobInfo(details.data.jobDetail)
        } catch (error) {
            console.Error("error",error)
        }
    };
    getJobDetailApi()
    return(
       <section>
        <div className="border-1">
            {jobInfo.tittle}

            
        </div>
       </section>
    )
}