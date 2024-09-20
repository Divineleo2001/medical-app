import { IndividualHospital } from './../server/hospitals';
import { z } from "zod";
import { HospitalFormSchema, HospitalServicesFormSchema, LoginAuthSchema } from "../schemas";

// Auth Response variable and inference from schema
// ----------------------------------------------------

export type LoginAuthFormVariables = z.infer<typeof LoginAuthSchema>;
interface TokenData {
  token: string;
  expiresIn: number;
}
interface LoginAuthResponse {
  status: number;
  message: string;
  data: TokenData[];
}

enum Role {
  admin = "ADMIN",
  patient = "PATIENT",
  doctor = "DOCTOR",
  technician = "TECHNICIAN",
  user = "USER",
  anonymous = "ANONYMOUS",
}
interface RoleProps {
  role: Role;
}
interface JwtAuthDecodeType {
  ROLE: Role;
  TENANT: string;
  sub: string;
  iat: number; // Issued at (timestamp)
  exp: number; // Expiration time (timestamp)
}
//-------------------------------------------------------

// Hospitals response, variable and inference from schema
// ----------------------------------------------------
interface HospitalResponse {
  status: number;
  message: string;
  data: Hospital[] | null;
}
interface Hospital {
  createdBy: string;
  createdDate: string; // Consider using Date type if you need to work with actual Date objects
  lastModifiedBy: string;
  lastModifiedDate: string; // Same as above, Date type might be better
  id: number;
  domainUrl: string;
  hospitalName: string;
  hospitalAddress: string;
  contactNumber: string;
  tenantId: string;
  url: string;
}

interface IndividualHospitalResponse {
  status: number;
  message: string;
  data: Hospital[] | null;
}
interface IndividualHospitalVariables {
  id: number;
}

interface IndividualHospitalPostResponse {
  status: number;
  message: string;
  data: Hospital[] | null;
}

export type HospitalFormVariables = z.infer<typeof HospitalFormSchema>;
//-------------------------------------------------------


// Hospital Services response, variable and inference from schema
// ----------------------------------------------------
// All Hospital Services
interface HospitalServicesResponse {
  status: number;
  message: string;
  data: HospitalServices[] | null;
}

interface HospitalServices {
  id: number;
  serviceName: string;
  description: string;
  baseImgUrl: string;
  iconImgUrl: string;
  overview: string;
}

// Individual Hospital Services 
interface IndividualHospitalServicesResponse {
  status: number;
  message: string;
  data: HospitalServices[] | null;
}
interface IndividualHospitalServicesVariables { 
  id: number;
}

// Post Individual Hospital Services
interface IndividualHospitalServicesPostResponse {
  status: number;
  message: string;
  data: HospitalServices[] | null;
}

export type HospitalServicesFormVariables = z.infer<typeof HospitalServicesFormSchema>;

//-------------------------------------------------------




// User Categories response, variable and inference from schema
// ----------------------------------------------------
interface UserCategoriesResponse {
  status: number;
  message: string;
  data: UserCateory[] | null;
}

// User category object type
interface UserCategory {
  id: number;
  categoryName: "PATIENT" | "DOCTOR" | "TECHNICIAN" | "USER"; // Enum-like structure
  status: boolean;
}

// Variables for individual user category operations (get/delete by ID)
interface IndividualUserCategoryVariables {
  id: number;
}

// Response for fetching a single user category
interface IndividualUserCategoryResponse {
  status: number;
  message: string;
  data: UserCategory | null;
}

// export type UserCategoryFormVariables = z.infer<typeof UserCategoryFormSchema>;


// Department and internal treatments response, variable and inference from schema
// ----------------------------------------------------
// All Department
interface Department {
  id: number;
  departmentName: string;
  description: string;
  serviceId: number;
  baseImgUrl: string;
  iconImgUrl: string;
  overview: string;
  treatments: Treatment[];
  createdBy: string;
  createdDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
}

interface Treatment {
  id: number;
  departmentId: number;
  treatmentName: string;
  treatmentDescription: string;
}

interface DepartmentResponse {
  status: number;
  message: string;
  data: Department[] | null;
}

interface IndividualDepartmentVariables {
  id: number;
}
interface IndividualDepartmentResponse {
  status: number;
  message: string;
  data: Department[] | null;
}

interface IndividualDepartmentPostResponse {
  status: number;
  message: string;
  data: Department[] | null;
}

// export type DepartmentFormVariables = z.infer<typeof DepartmentFormSchema>;
// -------------------------------------------------------

// Users 
// ----------------------------------------------------
// User authority type
interface UserAuthority {
  authority: string;
}

// User object type
interface User {
  id: number;
  username: string;
  password: string;
  gender: "MALE" | "FEMALE"; // Assuming only "MALE" or "FEMALE" are possible values
  userCategoryId: number;
  email: string;
  phoneNumber: string;
  oauthId: string;
  status: boolean;
  enabled: boolean;
  emailVerified: boolean;
  oauth: boolean;
  authorities: UserAuthority[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
}

// Response for fetching all users
interface UsersResponse {
  status: number;
  message: string;
  data: User[] | null;
}

// Variables for individual user operations (get/delete by ID)
interface IndividualUserVariables {
  id: number;
}

// Response for individual user operations (get/delete by ID)
interface IndividualUserResponse {
  status: number;
  message: string;
  data: User[] | null;
}

// export type UserFormVariables = z.infer<typeof UserFormSchema>;
// -------------------------------------------------------