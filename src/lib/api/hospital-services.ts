import type { AxiosError } from "axios";
import { createMutation, createQuery } from "react-query-kit";
import {
  createHospitalService,
  getAllhosptialServices,
} from "../server/hospital-services";
import {
  HospitalServicesFormVariables,
  HospitalServicesResponse,
  IndividualDepartmentVariables,
  IndividualHospitalServicesResponse,
} from "../types";

type Variables = {
  tenantId: string;
};

export const useGetAllHospitalService = createQuery<
  HospitalServicesResponse,
  Variables,
  AxiosError
>({
  queryKey: ["hospital-services"],
  fetcher: async (variables) => {
    const data = await getAllhosptialServices(variables.tenantId);
    return data;
  },
});

// export const useCreateHospitalServices = createMutation<
//   IndividualHospitalServicesResponse,
//   HospitalServicesFormVariables,
//   AxiosError
// >({
//   mutationFn: async (variables) => {
//     const data = await createHospitalService();
//     return data;
//   },
// });
