"use client";

import { useFormContext } from "react-hook-form";
import { FormValues } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CONSTANTS } from "@/lib/constants";

export default function StepPersonal() {
  const { register, formState: { errors }, setValue, watch } = useFormContext<FormValues>();

  const sex = watch('sex');
  const civilStatus = watch('civilStatus');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input id="firstName" placeholder="Juan" {...register("firstName")} />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="middleName">Middle Name</Label>
        <Input id="middleName" placeholder="Santos" {...register("middleName")} />
        {errors.middleName && <p className="text-red-500 text-sm">{errors.middleName.message}</p>}
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input id="lastName" placeholder="Dela Cruz" {...register("lastName")} />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="sex">Sex / Gender</Label>
        <Select onValueChange={(val) => setValue('sex', val as any)} value={sex}>
          <SelectTrigger id="sex">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {CONSTANTS.SEX.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        {errors.sex && <p className="text-red-500 text-sm">{errors.sex.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="civilStatus">Civil Status</Label>
        <Select onValueChange={(val) => setValue('civilStatus', val as any)} value={civilStatus}>
          <SelectTrigger id="civilStatus">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {CONSTANTS.CIVIL_STATUS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        {errors.civilStatus && <p className="text-red-500 text-sm">{errors.civilStatus.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input id="dateOfBirth" type="date" className="appearance-none block w-full" {...register("dateOfBirth")} />
        {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactNumber">Contact Number</Label>
        <Input id="contactNumber" placeholder="+63 912 345 6789" {...register("contactNumber")} />
        {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber.message}</p>}
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="personalEmail">Personal Email</Label>
        <Input id="personalEmail" type="email" placeholder="juan@email.com" {...register("personalEmail")} />
        {errors.personalEmail && <p className="text-red-500 text-sm">{errors.personalEmail.message}</p>}
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="homeAddress">Home Address</Label>
        <Input id="homeAddress" placeholder="Barangay, City, Province" {...register("homeAddress")} />
        {errors.homeAddress && <p className="text-red-500 text-sm">{errors.homeAddress.message}</p>}
      </div>
    </div>
  );
}
