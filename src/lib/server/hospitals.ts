"use server";

import axios from "axios";
import { cookies } from "next/headers";

const hospitalUrl = process.env.BACKEND_URL + "/hospitals";
const getAllHospitalsUrl = hospitalUrl + "/all";
const authToken = cookies().get("token")?.value;

export const getAllHospitals = async () => {
    try {
      const { data } = await axios.get(getAllHospitalsUrl);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || "An error occurred");
      } else {
        throw new Error("Unexpected error");
      }
    }
  };
  
  // create request
  
  // have to create the type for create hospital in the types
  export const createHospital = async (variables: any) => {
    try {
      const { data } = await axios.post(hospitalUrl, variables, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || "An error occurred");
      } else {
        throw new Error("Unexpected error");
      }
    }
  };
  
  export const IndividualHospital = async (id: number) => {
    try {
      const { data } = await axios.get(hospitalUrl + "/getById/" + id);
      return data;
    } catch (error) { 
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data.message || "An error occurred");
      } else {
        throw new Error("Unexpected error");
      }
    }
  }
  