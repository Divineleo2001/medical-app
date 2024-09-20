import { useGetAllHospitalService } from './hospital-services';
import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';
import {  LoginAuthFormVariables, LoginAuthResponse } from '../types';
import { UserLoginAuth } from '../server';
import { useGetAllHospitals, useGetIndividualHospital,useCreateHospitals } from '../api/hospitals';

export const useGetToken = createMutation<LoginAuthResponse, LoginAuthFormVariables, AxiosError>({
  mutationFn: async (variables) => await UserLoginAuth(variables)
});


export { useGetAllHospitals, useGetIndividualHospital, useCreateHospitals

  ,useGetAllHospitalService
}