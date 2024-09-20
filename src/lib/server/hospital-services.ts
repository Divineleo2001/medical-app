"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { HospitalServicesFormVariables } from "../types";

const url = process.env.BACKEND_URL + "/api/hospital-services";

export const getAllhosptialServices = async (tenantId: string) => {
  const authToken = cookies().get("token")?.value;

  try {
    const { data } = await axios.get(url, {
      headers: {
        "X-PrivateTenant": tenantId,
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

export const createHospitalService = async (
  variables: HospitalServicesFormVariables
) => {
  const authToken = cookies().get("token")?.value;

  try {
    // Create a FormData object

    const formData = new FormData();

    const payload = {
      serviceName: variables.serviceName,
      description: variables.description,
      overview: variables.overview,
    };
    formData.append("serviceName", variables.serviceName);
    formData.append("description", variables.description);
    formData.append("overview", variables.overview);
    formData.append("baseImage", variables.baseImage);
    formData.append("iconImage", variables.iconImage);

    // Append JSON data as a string

    // Append images to formData

    // Make the Axios request
    const { data } = await axios.post(
      "http://192.168.2.113:8006/api/hospital-services",
      {
        ...variables,
        baseImage: variables.baseImage,
        iconImage: variables.iconImage,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "X-PrivateTenant": "Tenant1",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "An error occurred");
    } else {
      throw new Error("Unexpected error");
    }
  }
};

export async function submitHospitalService(data: FormData) {

  const authToken = cookies().get("token")?.value;

  const response = await fetch("http://192.168.2.113:8006/api/hospital-services", {
    method: "POST",
    headers: {
      "X-PrivateTenant": "Tenant1",
      "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJST0xFIjoiQURNSU4iLCJURU5BTlQiOiJwdWJsaWMiLCJzdWIiOiJhZG1pbiIsImlhdCI6MTcyNjg0MDA0NCwiZXhwIjoxNzI2ODQzNjQ0fQ.VkLl34iddBfgvUg1WKser6hFy3y2CxcOo3tXkNoXTjg`,
      accept: "*/*",
    },
    body: data,
  });

 

  return response.json();
}