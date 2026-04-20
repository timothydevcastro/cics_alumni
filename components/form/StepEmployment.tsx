"use client";

import { useFormContext } from "react-hook-form";
import { FormValues } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CONSTANTS } from "@/lib/constants";

export default function StepEmployment() {
  const { register, formState: { errors }, setValue, watch } = useFormContext<FormValues>();

  const employmentStatus = watch('employmentStatus');
  const employmentType = watch('employmentType');
  const jobRelated = watch('jobRelatedToCourse');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="employmentStatus">Employment Status</Label>
        <Select onValueChange={(val) => setValue('employmentStatus', val as any)} value={employmentStatus}>
          <SelectTrigger id="employmentStatus">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {CONSTANTS.EMPLOYMENT_STATUS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        {errors.employmentStatus && <p className="text-red-500 text-sm">{errors.employmentStatus.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="employmentType">Employment Type</Label>
        <Select onValueChange={(val) => setValue('employmentType', val as any)} value={employmentType} disabled={employmentStatus === 'Unemployed'}>
          <SelectTrigger id="employmentType">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {CONSTANTS.EMPLOYMENT_TYPE.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label>Is your job related to your course?</Label>
        <div className="flex gap-4">
          {CONSTANTS.BOOLEAN_OPTIONS.map(opt => (
            <button
              key={opt}
              type="button"
              disabled={employmentStatus === 'Unemployed'}
              onClick={() => setValue('jobRelatedToCourse', opt as any)}
              className={`flex-1 py-2 rounded-lg border font-medium transition-colors ${
                jobRelated === opt 
                  ? 'bg-[#1A3626] text-white border-[#1A3626]' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              } disabled:opacity-50`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="currentCompany">Current Company</Label>
        <Input id="currentCompany" placeholder="Company name" disabled={employmentStatus === 'Unemployed'} {...register("currentCompany")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="companyLocation">Company Location</Label>
        <Input id="companyLocation" placeholder="City, Country" disabled={employmentStatus === 'Unemployed'} {...register("companyLocation")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="jobTitle">Position / Job Title</Label>
        <Input id="jobTitle" placeholder="Software Engineer" disabled={employmentStatus === 'Unemployed'} {...register("jobTitle")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="yearsInCompany">Years in Company</Label>
        <Input id="yearsInCompany" type="number" placeholder="2" disabled={employmentStatus === 'Unemployed'} {...register("yearsInCompany")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="officeEmail">Office Email</Label>
        <Input id="officeEmail" type="email" placeholder="juan@company.com" disabled={employmentStatus === 'Unemployed'} {...register("officeEmail")} />
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="officeContact">Office Contact Number</Label>
        <Input id="officeContact" placeholder="+63 2 8XXX XXXX" disabled={employmentStatus === 'Unemployed'} {...register("officeContact")} />
      </div>
    </div>
  );
}
