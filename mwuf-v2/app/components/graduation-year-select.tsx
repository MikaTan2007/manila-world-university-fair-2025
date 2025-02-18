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

export function GradYearOption() {
  return (
    <Select>
      <SelectTrigger className="w-60">
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
