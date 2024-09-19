import { z } from "zod"

// Need to implement a stricter a validation schema for url 
const HospitalFormSchema = z.object({
    domainUrl: z.string(),
    hospitalName: z.string(),
    hospitalAddress: z.string(),
    contactNumber: z.string(),
    tenantId: z.string(),
    url: z.string()
})

export { HospitalFormSchema }