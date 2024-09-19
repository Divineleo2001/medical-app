import { AxiosError } from "axios";
import { createQuery } from "react-query-kit";
import {
  HospitalResponse,
  IndividualHospitalResponse,
  IndividualHospitalVariables,
} from "../types";
import { getAllHospitals, IndividualHospital } from "../server/hospitals";

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
