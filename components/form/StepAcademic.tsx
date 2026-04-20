"use client";

import { useFormContext } from "react-hook-form";
import { FormValues } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CONSTANTS } from "@/lib/constants";

export default function StepAcademic() {
  const { register, formState: { errors }, setValue, watch } = useFormContext<FormValues>();

  const course = watch('course');
  const latinHonors = watch('latinHonors');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="studentId">Student ID Number</Label>
        <Input id="studentId" placeholder="20XX-XXXXX" {...register("studentId")} />
        {errors.studentId && <p className="text-red-500 text-sm">{errors.studentId.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="batchYear">Batch / Year Graduated</Label>
        <Input id="batchYear" type="text" placeholder="2020" {...register("batchYear")} />
        {errors.batchYear && <p className="text-red-500 text-sm">{errors.batchYear.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="course">Course</Label>
        <Select onValueChange={(val) => setValue('course', val as any)} value={course}>
          <SelectTrigger id="course">
            <SelectValue placeholder="Select Course" />
          </SelectTrigger>
          <SelectContent>
            {CONSTANTS.COURSES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        {errors.course && <p className="text-red-500 text-sm">{errors.course.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="latinHonors">Latin Honors</Label>
        <Select onValueChange={(val) => setValue('latinHonors', val as any)} value={latinHonors}>
          <SelectTrigger id="latinHonors">
            <SelectValue placeholder="None" />
          </SelectTrigger>
          <SelectContent>
            {CONSTANTS.LATIN_HONORS.map(h => <SelectItem key={h} value={h}>{h}</SelectItem>)}
          </SelectContent>
        </Select>
        {errors.latinHonors && <p className="text-red-500 text-sm">{errors.latinHonors.message}</p>}
      </div>
    </div>
  );
}
