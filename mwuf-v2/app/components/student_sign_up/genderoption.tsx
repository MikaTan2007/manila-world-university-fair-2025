import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function GenderOption() {
  return (
    <Select>
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
