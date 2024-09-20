"use server";

import axios from "axios";
import { cookies } from "next/headers";

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



// export const createHospitalService = async (variables: any, baseImage: File, iconImage: File) => {
//   try {
//     // Create a FormData object
//     const formData = new FormData();

//     // Append JSON data as a string
//     formData.append('hospitalServiceDTO', JSON.stringify({
//       serviceName: variables.serviceName,
//       description: variables.description,
//       overview: variables.overview,
//     }));

//     // Append images to formData
//     formData.append('baseImage', baseImage);
//     formData.append('iconImage', iconImage);

//     // Make the Axios request
//     const { data } = await axios.post('http://localhost:8006/api/hospital-services', formData, {
//       headers: {
//         'Authorization': `Bearer ${variables.authToken}`,
//         'X-PrivateTenant': 'Tenant1',
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     return data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       throw new Error(error.response?.data.message || "An error occurred");
//     } else {
//       throw new Error("Unexpected error");
//     }
//   }
// };

