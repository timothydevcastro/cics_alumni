"use client";

import { useFormContext } from "react-hook-form";
import { FormValues } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CONSTANTS } from "@/lib/constants";

export default function StepOFW() {
  const { register, setValue, watch } = useFormContext<FormValues>();

  const visaType = watch('visaType');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="countryBased">Country Currently Based</Label>
        <Input id="countryBased" placeholder="e.g. United Arab Emirates" {...register("countryBased")} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="visaType">Visa Type</Label>
        <Select onValueChange={(val) => setValue('visaType', val)} value={visaType}>
          <SelectTrigger id="visaType">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {CONSTANTS.VISA_TYPE.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
