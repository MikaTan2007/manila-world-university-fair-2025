import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
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
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Gender" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>   
          <SelectItem value="Male">Male</SelectItem>
          <SelectItem value="Female">Female</SelectItem>
          <SelectItem value="Non-binary">Non-Binary</SelectItem>
          <SelectItem value="Other">Other</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
