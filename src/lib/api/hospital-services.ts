import type { AxiosError } from "axios";
import { createQuery } from "react-query-kit";
import { getAllhosptialServices } from "../server/hospital-services";
import { HospitalServicesResponse } from "../types";


type Variables = {
  tenantId: string 
};

export const useGetAllHospitalService = createQuery<
  HospitalServicesResponse,
  Variables,
  AxiosError
>({
  queryKey: ["hospital-services"],
  fetcher:  async(variables) => {
   
    const data = await getAllhosptialServices(variables.tenantId);
    return data;
  },
});
