"use client";

import { useFormContext } from "react-hook-form";
import { FormValues } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CONSTANTS } from "@/lib/constants";

export default function StepFurtherStudies() {
  const { register, formState: { errors }, setValue, watch } = useFormContext<FormValues>();

  const pursued = watch('pursuedFurtherEducation');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2 md:col-span-2">
        <Label>Pursued Further Education?</Label>
        <div className="flex gap-4">
          {CONSTANTS.BOOLEAN_OPTIONS.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => setValue('pursuedFurtherEducation', opt as any)}
              className={`flex-1 py-2 rounded-lg border font-medium transition-colors ${
                pursued === opt 
                  ? 'bg-[#1A3626] text-white border-[#1A3626]' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        {errors.pursuedFurtherEducation && <p className="text-red-500 text-sm">{errors.pursuedFurtherEducation.message}</p>}
      </div>

      {pursued === 'Yes' && (
        <>
          <div className="space-y-2">
            <Label htmlFor="degreeCourseTaken">Degree / Course Taken</Label>
            <Input id="degreeCourseTaken" placeholder="e.g. Master of Science in IT" {...register("degreeCourseTaken")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="schoolAttended">School Attended</Label>
            <Input id="schoolAttended" placeholder="University Name" {...register("schoolAttended")} />
          </div>
        </>
      )}
    </div>
  );
}
