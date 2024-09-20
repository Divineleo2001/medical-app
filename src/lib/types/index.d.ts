import { IndividualHospital } from './../server/hospitals';
import { z } from "zod";
import { HospitalFormSchema, LoginAuthSchema } from "../schemas";

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

// export type HospitalServicesFormVariables = z.infer<typeof HospitalServicesFormSchema>;

//-------------------------------------------------------


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
// Interface for individual user category
interface UserCategory {
  id: number;
  categoryName: string;
  status: boolean;
}

// Response interface for fetching all user categories
interface UserCategoriesResponse {
  status: number;
  message: string;
  data: UserCategory[] | null;  // Array of UserCategory objects or null if no data
}

// Variables for individual user category operations (get/delete by ID)
interface IndividualUserCategoryVariables {
  id: number;
}

// Response for individual user category operations (get/delete by ID)
interface IndividualUserCategoryResponse {
  status: number;
  message: string;
  data: UserCategory[] | null;
}

// export type UserCategoryFormVariables = z.infer<typeof UserCategoryFormSchema>;
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
// Interface for individual patient profile
interface PatientProfile {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // Use Date type if working with actual Date objects
  gender: "MALE" | "FEMALE";
  contactNumber: string;
  email: string;
  address: string;
  emergencyContact: string;
  imgUrl: string;
  oauthId: string; 
}

// Response interface for fetching a patient profile
interface PatientProfileResponse {
  status: number;
  message: string;
  data: PatientProfile | null;
}

// Variables for individual patient profile operations (get/delete by ID)
interface IndividualPatientProfileVariables {
  id: number;
}

// Response for individual patient profile operations (get/delete by ID)
interface IndividualPatientProfileResponse {
  status: number;
  message: string;
  data: PatientProfile | null;
}

// export type PatientProfileFormVariables = z.infer<typeof PatientProfileFormSchema>;
// -------------------------------------------------------
// Interface for individual doctor profile
interface DoctorProfile {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  specialty: string;
  qualification: string;
  experienceYears: number;
  contactNumber: string;
  email: string;
  languages: string;
  oauthId: string;
  profileStatus: boolean;
  address: string;
  imgUrl: string;
}

// Response interface for fetching all doctor profiles
interface DoctorsResponse {
  status: number;
  message: string;
  data: DoctorProfile[] | null;  // Array of DoctorProfile objects or null if no data
}

// Variables for individual doctor profile operations (get/delete by ID)
interface IndividualDoctorProfileVariables {
  id: number;
}

// Response for individual doctor profile operations (get/delete by ID)
interface IndividualDoctorProfileResponse {
  status: number;
  message: string;
  data: DoctorProfile[] | null;
}

// export type DoctorProfileFormVariables = z.infer<typeof DoctorProfileFormSchema>;
// -------------------------------------------------------
// Interface for individual patient-department-category
interface PatientDepartmentCategory {
  id: number;
  patientId: number;
  departmentId: number;
}

// Response interface for fetching all patient-department-categories
interface PatientDepartmentCategoriesResponse {
  status: number;
  message: string;
  data: PatientDepartmentCategory[] | null;  // Array of PatientDepartmentCategory objects or null if no data
}

// Variables for individual patient-department-category operations (get/delete by ID)
interface IndividualPatientDepartmentCategoryVariables {
  id: number;
}

// Response for individual patient-department-category operations (get/delete by ID)
interface IndividualPatientDepartmentCategoryResponse {
  status: number;
  message: string;
  data: PatientDepartmentCategory[] | null;
}

// export type PatientDepartmentCategoryFormVariables = z.infer<typeof PatientDepartmentCategoryFormSchema>;
// -------------------------------------------------------
// Interface for individual doctor-department-category
interface DoctorDepartmentCategory {
  id: number;
  doctorId: number;
  departmentId: number;
  availableTimeInterval: number;
  chargesPerTimeInterval: number;
}

// Response interface for fetching all doctor-department-categories
interface DoctorDepartmentCategoriesResponse {
  status: number;
  message: string;
  data: DoctorDepartmentCategory[] | null;  // Array of DoctorDepartmentCategory objects or null if no data
}

// Variables for individual doctor-department-category operations (get/delete by ID)
interface IndividualDoctorDepartmentCategoryVariables {
  id: number;
}

// Response for individual doctor-department-category operations (get/delete by ID)
interface IndividualDoctorDepartmentCategoryResponse {
  status: number;
  message: string;
  data: DoctorDepartmentCategory[] | null;
}

// export type DoctorDepartmentCategoryFormVariables = z.infer<typeof DoctorDepartmentCategoryFormSchema>;
// -------------------------------------------------------
// Interface for individual appointment slot
interface AppointmentSlot {
  id: number;
  appointmentDate: string; // Use Date type if working with actual Date objects
  appointStartTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number; // Nanoseconds can be omitted or simplified if not used
  };
  appointEndTime: {
    hour: number;
    minute: number;
    second: number;
    nano: number; // Nanoseconds can be omitted or simplified if not used
  };
  appointIntervalTime: number;
  appointmentCharge: number;
}

// Response interface for fetching all appointment slots
interface AppointmentSlotsResponse {
  status: number;
  message: string;
  data: AppointmentSlot[] | null;  // Array of AppointmentSlot objects or null if no data
}

// Variables for individual appointment slot operations (get/delete by ID)
interface IndividualAppointmentSlotVariables {
  id: number;
}

// Response for individual appointment slot operations (get/delete by ID)
interface IndividualAppointmentSlotResponse {
  status: number;
  message: string;
  data: AppointmentSlot[] | null;
}

// export type AppointmentSlotFormVariables = z.infer<typeof AppointmentSlotFormSchema>;
// -------------------------------------------------------
// Interface for individual appointment
interface Appointment {
  id: number;
  patientId: number;
  docDeptCategoryId: number; // ID representing the doctor-department relationship
  appointmentSlotId: number;  // ID representing the specific appointment slot
  status: "PENDING" | "CONFIRMED" | "CANCELLED"; // Possible appointment statuses
  consultationType: "IN_PERSON" | "VIRTUAL"; // Types of consultations
  notes: string; // Additional notes regarding the appointment
}

// Response interface for fetching all appointments
interface AppointmentsResponse {
  status: number;
  message: string;
  data: Appointment[] | null;  // Array of Appointment objects or null if no data
}

// Variables for individual appointment operations (get/delete by ID)
interface IndividualAppointmentVariables {
  id: number;
}

// Response for individual appointment operations (get/delete by ID)
interface IndividualAppointmentResponse {
  status: number;
  message: string;
  data: Appointment | null; // Single Appointment object or null if not found
}

// export type AppointmentFormVariables = z.infer<typeof AppointmentFormSchema>;
// -------------------------------------------------------
// Interface for individual medical record
interface MedicalRecord {
  id: number;
  patientId: number;
  doctorId: number;
  appointmentId: number; // ID linking to the associated appointment
  diagnosis: string; // Diagnosis information
  prescription: string; // Prescription details
  labResults: string; // Lab results
  followUpDate: string; // Follow-up date, consider using Date type if necessary
}

// Response interface for fetching all medical records
interface MedicalRecordsResponse {
  status: number;
  message: string;
  data: MedicalRecord[] | null;  // Array of MedicalRecord objects or null if no data
}

// Variables for individual medical record operations (get/delete by ID)
interface IndividualMedicalRecordVariables {
  id: number;
}

// Response for individual medical record operations (get/delete by ID)
interface IndividualMedicalRecordResponse {
  status: number;
  message: string;
  data: MedicalRecord | null; // Single MedicalRecord object or null if not found
}

// export type MedicalRecordFormVariables = z.infer<typeof MedicalRecordFormSchema>;
// -------------------------------------------------------
// Interface for individual working time interval
interface WorkingTimeInterval {
  start: string; // Consider using a specific time type if needed
  end: string;
}

// Interface for working-in-day
interface WorkingInDay {
  workingDay: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY"; // Enum for days of the week
  workingStatus: boolean; // Indicates if the doctor is working that day
  workingTimeInterval: {
    intervals: WorkingTimeInterval[]; // Array of working time intervals
  };
  docDeptCategoryId: number; // ID representing the doctor-department relationship
}

// Response interface for fetching working schedule
interface WorkingInDayResponse {
  status: number;
  message: string;
  data: WorkingInDay | null;  // Single WorkingInDay object or null if no data
}

// Variables for individual working-in-day operations (get/delete by ID)
interface IndividualWorkingInDayVariables {
  id: number;
}

// Response for individual working-in-day operations (get/delete by ID)
interface IndividualWorkingInDayResponse {
  status: number;
  message: string;
  data: WorkingInDay | null; // Single WorkingInDay object or null if not found
}

// export type WorkingInDayFormVariables = z.infer<typeof WorkingInDayFormSchema>;
// -------------------------------------------------------
