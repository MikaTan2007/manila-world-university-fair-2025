"use client"

import { useState, useEffect} from "react";
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const majors = [
  { value: "Other", label: "Other" },
  { value: "Accounting", label: "Accounting" },
  { value: "Actuarial Science", label: "Actuarial Science" },
  { value: "Agricultural Science", label: "Agricultural Science" },
  { value: "Anthropology", label: "Anthropology" },
  { value: "Applied Mathematics", label: "Applied Mathematics" },
  { value: "Architecture", label: "Architecture" },
  { value: "Art History", label: "Art History" },
  { value: "Artificial Intelligence", label: "Artificial Intelligence" },
  { value: "Astronomy", label: "Astronomy" },
  { value: "Biochemistry", label: "Biochemistry" },
  { value: "Biology", label: "Biology" },
  { value: "Biomedical Engineering", label: "Biomedical Engineering" },
  { value: "Biotechnology", label: "Biotechnology" },
  { value: "Business Administration", label: "Business Administration" },
  { value: "Business Management", label: "Business Management" },
  { value: "Chemical Engineering", label: "Chemical Engineering" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Civil Engineering", label: "Civil Engineering" },
  { value: "Cognitive Science", label: "Cognitive Science" },
  { value: "Communications", label: "Communications" },
  { value: "Computer Engineering", label: "Computer Engineering" },
  { value: "Computer Science", label: "Computer Science" },
  { value: "Construction Management", label: "Construction Management" },
  { value: "Criminal Justice", label: "Criminal Justice" },
  { value: "Criminology", label: "Criminology" },
  { value: "Culinary Arts", label: "Culinary Arts" },
  { value: "Cybersecurity", label: "Cybersecurity" },
  { value: "Dance", label: "Dance" },
  { value: "Data Analytics", label: "Data Analytics" },
  { value: "Data Science", label: "Data Science" },
  { value: "Dentistry", label: "Dentistry" },
  { value: "Design", label: "Design" },
  { value: "Digital Media", label: "Digital Media" },
  { value: "Early Childhood Education", label: "Early Childhood Education" },
  { value: "Ecology", label: "Ecology" },
  { value: "Economics", label: "Economics" },
  { value: "Education", label: "Education" },
  { value: "Electrical Engineering", label: "Electrical Engineering" },
  { value: "English Literature", label: "English Literature" },
  { value: "Entrepreneurship", label: "Entrepreneurship" },
  { value: "Environmental Engineering", label: "Environmental Engineering" },
  { value: "Environmental Science", label: "Environmental Science" },
  { value: "Event Management", label: "Event Management" },
  { value: "Ethnic Studies", label: "Ethnic Studies" },
  { value: "Exercise Science", label: "Exercise Science" },
  { value: "Fashion Design", label: "Fashion Design" },
  { value: "Film Production", label: "Film Production" },
  { value: "Film Studies", label: "Film Studies" },
  { value: "Finance", label: "Finance" },
  { value: "Fine Arts", label: "Fine Arts" },
  { value: "Food Science", label: "Food Science" },
  { value: "Forensic Science", label: "Forensic Science" },
  { value: "Forestry", label: "Forestry" },
  { value: "Game Design", label: "Game Design" },
  { value: "Genetics", label: "Genetics" },
  { value: "Gender Studies", label: "Gender Studies" },
  { value: "Geography", label: "Geography" },
  { value: "Geology", label: "Geology" },
  { value: "Global Studies", label: "Global Studies" },
  { value: "Graphic Design", label: "Graphic Design" },
  { value: "Health Administration", label: "Health Administration" },
  { value: "Health Informatics", label: "Health Informatics" },
  { value: "Health Sciences", label: "Health Sciences" },
  { value: "History", label: "History" },
  { value: "Hospitality Management", label: "Hospitality Management" },
  { value: "Human Resources", label: "Human Resources" },
  { value: "Human Services", label: "Human Services" },
  { value: "Ideal Major", label: "Ideal Major" },
  { value: "Industrial Design", label: "Industrial Design" },
  { value: "Industrial Engineering", label: "Industrial Engineering" },
  { value: "Information Systems", label: "Information Systems" },
  { value: "Information Technology", label: "Information Technology" },
  { value: "Innovation Management", label: "Innovation Management" },
  { value: "Interior Design", label: "Interior Design" },
  { value: "International Business", label: "International Business" },
  { value: "International Relations", label: "International Relations" },
  { value: "Journalism", label: "Journalism" },
  { value: "Kinesiology", label: "Kinesiology" },
  { value: "Landscape Architecture", label: "Landscape Architecture" },
  { value: "Law", label: "Law" },
  { value: "Library Science", label: "Library Science" },
  { value: "Linguistics", label: "Linguistics" },
  { value: "Management", label: "Management" },
  { value: "Marine Biology", label: "Marine Biology" },
  { value: "Marketing", label: "Marketing" },
  { value: "Materials Science", label: "Materials Science" },
  { value: "Mathematics", label: "Mathematics" },
  { value: "Mechanical Engineering", label: "Mechanical Engineering" },
  { value: "Media Studies", label: "Media Studies" },
  { value: "Medicine", label: "Medicine" },
  { value: "Meteorology", label: "Meteorology" },
  { value: "Microbiology", label: "Microbiology" },
  { value: "Museum Studies", label: "Museum Studies" },
  { value: "Music", label: "Music" },
  { value: "Neuroscience", label: "Neuroscience" },
  { value: "Nonprofit Management", label: "Nonprofit Management" },
  { value: "Nursing", label: "Nursing" },
  { value: "Nutrition", label: "Nutrition" },
  { value: "Oceanography", label: "Oceanography" },
  { value: "Operations Management", label: "Operations Management" },
  { value: "Pharmacy", label: "Pharmacy" },
  { value: "Philosophy", label: "Philosophy" },
  { value: "Photography", label: "Photography" },
  { value: "Physical Therapy", label: "Physical Therapy" },
  { value: "Physics", label: "Physics" },
  { value: "Political Science", label: "Political Science" },
  { value: "Psychology", label: "Psychology" },
  { value: "Public Administration", label: "Public Administration" },
  { value: "Public Health", label: "Public Health" },
  { value: "Public Policy", label: "Public Policy" },
  { value: "Public Relations", label: "Public Relations" },
  { value: "Real Estate", label: "Real Estate" },
  { value: "Religious Studies", label: "Religious Studies" },
  { value: "Robotics", label: "Robotics" },
  { value: "Social Work", label: "Social Work" },
  { value: "Sociology", label: "Sociology" },
  { value: "Software Engineering", label: "Software Engineering" },
  { value: "Special Education", label: "Special Education" },
  { value: "Sports Management", label: "Sports Management" },
  { value: "Statistics", label: "Statistics" },
  { value: "Supply Chain Management", label: "Supply Chain Management" },
  { value: "Sustainability Studies", label: "Sustainability Studies" },
  { value: "Theater Arts", label: "Theater Arts" },
  { value: "Tourism", label: "Tourism" },
  { value: "Urban Planning", label: "Urban Planning" },
  { value: "Veterinary Science", label: "Veterinary Science" },
  { value: "Video Production", label: "Video Production" },
  { value: "Wildlife Conservation", label: "Wildlife Conservation" },
  { value: "Women's Studies", label: "Women's Studies" },
  { value: "Zoology", label: "Zoology" }
];

  interface idealMajorProps {
    idealMajor: string[],
    setIdealMajor: (idealMajor : string[]) => void;
    onIdealMajorChange?: (changed: boolean) => void;
  }

  export function IdealMajor({
    idealMajor,
    setIdealMajor,
    onIdealMajorChange
  } : idealMajorProps) {
    const [open, setOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    useEffect(() => {
      setSelectedValues(idealMajor)
    }, [idealMajor]);

    useEffect(() => {
      if (JSON.stringify(selectedValues) !== JSON.stringify(idealMajor)) {
        setIdealMajor(selectedValues);
        onIdealMajorChange?.(false);
      }
    })
  
    const handleSelect = (currentValue: string) => {
      setSelectedValues(prev => {
        if (prev.includes(currentValue)) {
          return prev.filter(value => value !== currentValue);
        }
        return [...prev, currentValue];
      });
    };
  
    const displayString = selectedValues
      .map(value => majors.find(major => major.value === value)?.label)
      .filter(Boolean)
      .join(", ");
  
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[335px] justify-between"
          >
            <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap pr-2 text-left">
              {selectedValues.length > 0 ? displayString : "Interested Majors (multiple allowed)"}
            </div>
            <ChevronsUpDown className="opacity-50 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
          <Command>
            <CommandInput placeholder="Search major..." className="h-9" />
            <CommandList>
              <CommandEmpty>No major found.</CommandEmpty>
              <CommandGroup>
                {majors.map((major) => (
                  <CommandItem
                    key={major.value}
                    value={major.value}
                    onSelect={() => handleSelect(major.value)}
                  >
                    {major.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedValues.includes(major.value) ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }