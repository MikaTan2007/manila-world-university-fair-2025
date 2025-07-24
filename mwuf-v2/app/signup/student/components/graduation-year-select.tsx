import { useState, useEffect} from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface GradYearOptionProps {
  gradYear: string;
  setGradYear: (gradYear: string) => void;
  onGradYearChange?: (changed: boolean) => void;
}

export function GradYearOption({
  gradYear,
  setGradYear,
  onGradYearChange
} : GradYearOptionProps) {

  const handleGradYearChange = (value: string) => {
    setGradYear(value);
    if (onGradYearChange) {
      onGradYearChange(false);
    }
  }

  return (
    <Select value = {gradYear} onValueChange={handleGradYearChange}>
      <SelectTrigger className="w-25">
        <SelectValue placeholder="HS Graduation Year" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>   
          <SelectItem value="2026">2026</SelectItem>
          <SelectItem value="2027">2027</SelectItem>
          <SelectItem value="2028">2028</SelectItem>
          <SelectItem value="2029">2029</SelectItem>
          <SelectItem value="2030">2030</SelectItem>
          <SelectItem value="2031">2031</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
