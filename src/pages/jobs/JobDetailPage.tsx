import { useParams } from "react-router-dom";
import { Api_url } from "../../config/globalConfig";
import axios from 'axios';
import { useState, useEffect } from "react";
import { JobListing } from "../../types/landingPage";

export function JobDetailPage() {
    const [jobInfo, setJobInfo] = useState<JobListing | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const { jobId } = useParams<{ jobId: string }>();

    useEffect(() => {
        async function getJobDetailApi() {
            if (!jobId) return;
            try {
                setLoading(true);
                const details = await axios.get(`${Api_url}/job/${jobId}`);
                if (!details || details.data === 0) {
                    // Handle error case
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

    if (loading) return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>;
    if (!jobInfo) return <div className="flex items-center justify-center min-h-screen text-white">Job not found</div>;

    return (
        <section className="min-h-screen bg-gradient-to-br from-secondary-950 to-secondary-900 p-8">
            <div className="max-w-4xl mx-auto bg-secondary-800/50 rounded-2xl p-8 border border-secondary-700">
                <h1 className="text-3xl font-bold text-white mb-4">{jobInfo.title}</h1>
                <p className="text-gray-300 text-lg mb-2">{jobInfo.company}</p>
                <p className="text-gray-400">{jobInfo.location}</p>
            </div>
        </section>
    )
}

export default JobDetailPage;
