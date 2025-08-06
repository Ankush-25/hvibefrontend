import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Api_url } from "../globalConfig";


const fetchProfile = createAsyncThunk("usrProfile/fetchProfile", async (thunkAPI) => {
    const authtoken = localStorage.getItem("token");
    try {
        const response = await axios.get(`${Api_url}/profile`, {
            headers: { Authorization: `Bearer ${authtoken}` }
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});


const initialState = {
    _id: '',
    username: '',
    FullName: '',
    email: '',
    ProfileImage: '',
    Role: '',
    bio: '',
    location: '',
    resume: '',
    profile: {
        education: [],
        experience: [],
        skills: []
    },
    savedJobs: [],
    createdAt: '',
    loading: false,
    error: null,
};
const usrProfileSlice = createSlice({
    name: "usrProfile",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            return {
                ...state,
                ...action.payload,
                loading: false,
            }
        },
        updateFields: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
        updateNestedFields:(state, action)=>{
            const { section, field, value } = action.payload;
            state.profile[section][field] = value;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearProfile:()=>{
            return initialState;
        }
    }
})
 
export const {
    setProfile,
    setError,
    setLoading,
    clearProfile,
    updateFields,
    updateNestedFields,

} = usrProfileSlice.actions;

export default usrProfileSlice.reducer;
