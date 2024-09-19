"use server"
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { JwtAuthDecodeType, LoginAuthFormVariables } from "../types";
import {IndividualHospital,createHospital,getAllHospitals} from "../server/hospitals";




export {IndividualHospital,createHospital,getAllHospitals}

  /**
   * Logs in a user and sets their token and role as cookies.
   * @param values - The form values to be sent to the backend.
   * @returns The response data from the backend.
   * @throws AxiosError - If there is an error with the request.
   */
export const UserLoginAuth = async (values: LoginAuthFormVariables) => {
    const url = process.env.BACKEND_URL + "/auth/token";
    try {
      const { data } = await axios.post(url, {
        username: values.username,
        password: values.password,
      });
      const decoded: JwtAuthDecodeType = jwtDecode(data.data[0].token);
      await cookieLogin({
        token: data.data[0].token,
        role: decoded.ROLE,
      });
      // await setTenant(values.hospitalId);
  
      return data;
    } catch (error) {
      return error as AxiosError;

    }
  };


  /**
   * Sets the role and token as cookies.
   * @param token - The jwt token to be set as a cookie.
   * @param role - The role to be set as a cookie.
   */
export async function cookieLogin({
    token,
    role,
  
  }: {
    token: string;
    role: string;
  }) {
    cookies().set({
      name: "role",
      value: role,
    });
    cookies().set({
      name: "token",
      value: token,
    });
  }

  export async function deleteCookie() {
    cookies().delete("role");
    cookies().delete("token");
  }
  

  