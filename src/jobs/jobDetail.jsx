import Api_url from "./../globalConfig"
import axios from 'axios';

export function JobDetailPage(){
    const jobTittle = "software Developer";
    jobId = useParams()??'68a5c7b98a763c85cd58f20b';
    const getJobDetailApi = async()=>{
        try {
            const details = await axios.get(`${Api_url}/job/:jobId`);
            if(!details||details.length ===0){
                throw new Error("Details not found");
            }
        } catch (error) {
            console.Error("error")
        }
    };
    return(
       <section>
        <div>
            {jobTittle}
            
        </div>
       </section>
    )
}