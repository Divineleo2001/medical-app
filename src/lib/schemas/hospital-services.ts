import { z } from "zod"

const HospitalServicesFormSchema = z.object({
    serviceName: z.string().min(2, { message: "Service name must be at least 2 characters" }),
    description: z.string().min(2, { message: "Description must be at least 2 characters" }),
    baseImage: z.instanceof(File).refine((file) => file.size <= 5000000, `Max image size is 5MB.`),
    iconImage: z.instanceof(File).refine((file) => file.size <= 1000000, `Max icon size is 1MB.`),
    overview: z.string().min(2, { message: "Overview must be at least 2 characters" }),
  })
export { HospitalServicesFormSchema }