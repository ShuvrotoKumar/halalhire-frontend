'use client';

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  password: "",
  role: "user",
  dateOfBirth: "",
  countryOrigin: "",
  maritalStatus: "",
  numberOfChildren: 0,
  religiousPractice: "",
  professionalProfile: {
    currentJobTitle: "",
    yearsOfExperience: 0,
    skills: [],
    primaryLanguage: "",
    document: ""
  },
  WorkPreferences: {
    salaryExpectations: "",
    employmentType: "",
    availableFrom: ""
  },
  // Company specific fields
  organizationDetails: {
    industry: "",
    headquartersLocation: "",
    websiteUrl: "",
    companyDescription: ""
  },
  companyVerificationSchema: {
    companyTaxId: ""
  },
  workplace: []
};

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setBasicInfo: (state, action) => {
      const { name, email, password, role } = action.payload;
      state.name = name;
      state.email = email;
      state.password = password;
      state.role = role;
    },
    setPersonalInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
    setProfessionalProfile: (state, action) => {
      state.professionalProfile = { ...state.professionalProfile, ...action.payload };
    },
    setWorkPreferences: (state, action) => {
      state.WorkPreferences = { ...state.WorkPreferences, ...action.payload };
    },
    setOrganizationDetails: (state, action) => {
      state.organizationDetails = { ...state.organizationDetails, ...action.payload };
    },
    setCompanyVerification: (state, action) => {
      state.companyVerificationSchema = { ...state.companyVerificationSchema, ...action.payload };
    },
    setWorkplace: (state, action) => {
      state.workplace = action.payload;
    },
    resetRegistration: () => initialState,
  },
});

export const { 
  setBasicInfo, 
  setPersonalInfo, 
  setProfessionalProfile, 
  setWorkPreferences,
  setOrganizationDetails,
  setCompanyVerification,
  setWorkplace,
  resetRegistration 
} = registrationSlice.actions;

export default registrationSlice.reducer;
