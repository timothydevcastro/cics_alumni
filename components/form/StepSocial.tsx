"use client";

import { useFormContext } from "react-hook-form";
import { FormValues } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CONSTANTS } from "@/lib/constants";

export default function StepSocial() {
  const { register, formState: { errors }, setValue, watch } = useFormContext<FormValues>();

  const willing = watch('willingToBeSpeaker');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="linkedinUrl">LinkedIn Profile URL</Label>
        <Input id="linkedinUrl" type="url" placeholder="https://linkedin.com/in/username" {...register("linkedinUrl")} />
        {errors.linkedinUrl && <p className="text-red-500 text-sm">{errors.linkedinUrl.message}</p>}
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="facebookUrl">Facebook Profile URL</Label>
        <Input id="facebookUrl" type="url" placeholder="https://facebook.com/username" {...register("facebookUrl")} />
        {errors.facebookUrl && <p className="text-red-500 text-sm">{errors.facebookUrl.message}</p>}
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label>Willing to be a Resource Speaker?</Label>
        <div className="flex gap-4">
          {CONSTANTS.BOOLEAN_OPTIONS.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => setValue('willingToBeSpeaker', opt as any)}
              className={`flex-1 py-2 rounded-lg border font-medium transition-colors ${
                willing === opt 
                  ? 'bg-[#1A3626] text-white border-[#1A3626]' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        {errors.willingToBeSpeaker && <p className="text-red-500 text-sm">{errors.willingToBeSpeaker.message}</p>}
      </div>
    </div>
  );
}
