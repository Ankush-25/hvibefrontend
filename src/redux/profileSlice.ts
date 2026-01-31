import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Api_url } from "../config/globalConfig";
import { ProfileState } from "../types/redux";

export const fetchProfile = createAsyncThunk(
  "usrProfile/fetchProfile",
  async (_, thunkAPI) => {
    const authtoken = localStorage.getItem("token");
    try {
      const res = await axios.get(`${Api_url}/app/profile`, {
        headers: { Authorization: `Bearer ${authtoken}` },
      });
      return res.data.response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const initialState: ProfileState = {
  _id: "",
  username: "",
  FullName: "",
  email: "",
  ProfileImage: "",
  Role: "",
  bio: "",
  location: "",
  resume: "",
  profile: {
    education: [],
    experience: [],
    skills: [],
  },
  savedJobs: [],
  Recruiter: {
    companies: [],
  },
  createdAt: "",
  loading: false,
  error: null,
};

interface UpdateFieldsPayload {
  field: keyof ProfileState;
  value: any;
}

interface NestedFieldsPayload {
  section: "education" | "experience" | "skills";
  value: any;
}

interface DeleteNestedFieldsPayload {
  section: "education" | "experience" | "skills";
  index: number;
}

interface UpdateNestedFieldsPayload {
  section: "education" | "experience" | "skills";
  index: number;
  value: any;
}

const usrProfileSlice = createSlice({
  name: "usrProfile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Partial<ProfileState>>) => {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    },
    updateFields: (state, action: PayloadAction<UpdateFieldsPayload>) => {
      const { field, value } = action.payload;
      (state as any)[field] = value;
    },
    addNestedFields: (state, action: PayloadAction<NestedFieldsPayload>) => {
      const { section, value } = action.payload;
      state.profile[section] = value;
    },
    deleteNestedFields: (
      state,
      action: PayloadAction<DeleteNestedFieldsPayload>,
    ) => {
      const { section, index } = action.payload;
      (state.profile as any)[section] = (state.profile as any)[section].filter(
        (_: any, i: number) => i !== index,
      );
    },
    updateNestedFields: (
      state,
      action: PayloadAction<UpdateNestedFieldsPayload>,
    ) => {
      const { section, index, value } = action.payload;
      state.profile[section][index] = value;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearProfile: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        Object.assign(state, action.payload);
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch profile";
      });
  },
});

export const {
  setProfile,
  setError,
  setLoading,
  clearProfile,
  updateFields,
  updateNestedFields,
  deleteNestedFields,
  addNestedFields,
} = usrProfileSlice.actions;

export default usrProfileSlice.reducer;
