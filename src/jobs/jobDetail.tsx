import { useParams } from "react-router-dom";
import { Api_url } from "./../globalConfig"
import axios from 'axios';
import { useState, useEffect } from "react";
import { JobListing } from "../types/landingPage";

export function JobDetailPage() {
    const [jobInfo, setJobInfo] = useState<JobListing | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    // const jobTitle = "software Developer";

    // ??'68a5c7b98a763c85cd58f20b'
    const { jobId } = useParams<{ jobId: string }>();

    useEffect(() => {
        async function getJobDetailApi() {
            if (!jobId) return;
            try {
                setLoading(true);
                const details = await axios.get(`${Api_url}/job/${jobId}`);
                if (!details || details.data === 0) { // Adjusted check based on original code, though typically standard axios response check is better
                    // throw new Error("Details not found");
                }
                console.log(jobId)
                console.log(details.data.jobDetail)
                setJobInfo(details.data.jobDetail)
            } catch (error) {
                console.error("error", error)
            } finally {
                setLoading(false);
            }
        };
        getJobDetailApi();
    }, [jobId]);

    if (loading) return <div>Loading...</div>;
    if (!jobInfo) return <div>Job not found</div>;

    return (
        <section>
            <div className="border-1">
                <h1>{jobInfo.title}</h1>
                <p>{jobInfo.company}</p>
                <p>{jobInfo.location}</p>
            </div>
        </section>
    )
}