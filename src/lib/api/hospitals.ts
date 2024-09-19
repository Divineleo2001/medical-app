import { AxiosError } from "axios";
import { createMutation, createQuery } from "react-query-kit";
import {
  HospitalFormVariables,
  HospitalResponse,
  IndividualHospitalPostResponse,
  IndividualHospitalResponse,
  IndividualHospitalVariables,
} from "../types";
import {
  createHospital,
  getAllHospitals,
  IndividualHospital,
} from "../server/hospitals";

export const useGetAllHospitals = createQuery<
  HospitalResponse,
  void,
  AxiosError
>({
  queryKey: ["hospitals"],
  fetcher: async () => {
    const data = await getAllHospitals();
    return data;
  },
});

export const useGetIndividualHospital = createQuery<
  IndividualHospitalResponse,
  IndividualHospitalVariables,
  AxiosError
>({
  queryKey: ["hospital"],
  fetcher: async (variables) => {
    const data = await IndividualHospital(variables.id);
    return data;
  },
});

export const useCreateHospitals = createMutation<
  IndividualHospitalPostResponse,
  HospitalFormVariables,
  AxiosError
>({
  mutationFn: async (variables) => {
    const data = await createHospital(variables);
    return data;
  },
});
