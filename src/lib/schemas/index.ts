import {z} from "zod"
import {HospitalFormSchema} from "./hospitals"

const LoginAuthSchema = z.object({
    username: z.string().min(2, "Username is required"),
    password: z.string().min(2, "Password must be at least 2 characters"),
    hospitalId: z.string().optional(), // We'll use the hospital's id for selection
  });




export {LoginAuthSchema, HospitalFormSchema}