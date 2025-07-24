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

interface GenderOptionProps {
  gender: string;
  setGender: (gender: string) => void;
  onGenderChange?: (changed: boolean) => void;
}

export function GenderOption({
  gender,
  setGender,
  onGenderChange
} : GenderOptionProps) {

  const handleGenderChange = (value: string) => {
    setGender(value);
    if (onGenderChange) {
      onGenderChange(false);
    }
  }

  return (
    <Select value = {gender} onValueChange={handleGenderChange}>
      <SelectTrigger className="w-50">
        <SelectValue placeholder="Gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>   
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="non-binary">Non-Binary</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
