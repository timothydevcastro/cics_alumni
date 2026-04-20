import * as z from 'zod';
import { CONSTANTS } from './constants';

export const formSchema = z.object({
  // Step 1: Personal
  firstName: z.string().min(2, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(2, 'Last name is required'),
  sex: z.enum(CONSTANTS.SEX as [string, ...string[]]),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  civilStatus: z.enum(CONSTANTS.CIVIL_STATUS as [string, ...string[]]),
  contactNumber: z.string().min(10, 'Valid contact number is required'),
  personalEmail: z.string().email('Valid email is required'),
  homeAddress: z.string().min(5, 'Home address is required'),

  // Step 2: Academic
  studentId: z.string().min(1, 'Student ID is required'),
  course: z.enum(CONSTANTS.COURSES as [string, ...string[]]),
  batchYear: z.string().min(4, 'Valid year required'),
  latinHonors: z.enum(CONSTANTS.LATIN_HONORS as [string, ...string[]]),

  // Step 3: Employment
  employmentStatus: z.enum(CONSTANTS.EMPLOYMENT_STATUS as [string, ...string[]]),
  employmentType: z.enum(CONSTANTS.EMPLOYMENT_TYPE as [string, ...string[]]).optional(),
  jobRelatedToCourse: z.enum(['Yes', 'No']).optional(),
  currentCompany: z.string().optional(),
  companyLocation: z.string().optional(),
  jobTitle: z.string().optional(),
  yearsInCompany: z.string().optional(),
  officeEmail: z.string().optional(),
  officeContact: z.string().optional(),

  // Step 4: OFW (Conditional)
  countryBased: z.string().optional(),
  visaType: z.string().optional(),

  // Step 5: Further Studies
  pursuedFurtherEducation: z.enum(['Yes', 'No']),
  degreeCourseTaken: z.string().optional(),
  schoolAttended: z.string().optional(),

  // Step 6: Social & Extras
  linkedinUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  facebookUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  willingToBeSpeaker: z.enum(['Yes', 'No']),
});

export type FormValues = z.infer<typeof formSchema>;
