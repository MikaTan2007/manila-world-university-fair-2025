"use client"

import * as React from "react"
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
    { value: "computer-science", label: "Computer Science" },
    { value: "business-administration", label: "Business Administration" },
    { value: "psychology", label: "Psychology" },
    { value: "nursing", label: "Nursing" },
    { value: "biology", label: "Biology" },
    { value: "electrical-engineering", label: "Electrical Engineering" },
    { value: "mechanical-engineering", label: "Mechanical Engineering" },
    { value: "civil-engineering", label: "Civil Engineering" },
    { value: "accounting", label: "Accounting" },
    { value: "finance", label: "Finance" },
    { value: "marketing", label: "Marketing" },
    { value: "economics", label: "Economics" },
    { value: "political-science", label: "Political Science" },
    { value: "communications", label: "Communications" },
    { value: "english-literature", label: "English Literature" },
    { value: "history", label: "History" },
    { value: "mathematics", label: "Mathematics" },
    { value: "physics", label: "Physics" },
    { value: "chemistry", label: "Chemistry" },
    { value: "environmental-science", label: "Environmental Science" },
    { value: "sociology", label: "Sociology" },
    { value: "anthropology", label: "Anthropology" },
    { value: "philosophy", label: "Philosophy" },
    { value: "art-history", label: "Art History" },
    { value: "graphic-design", label: "Graphic Design" },
    { value: "architecture", label: "Architecture" },
    { value: "urban-planning", label: "Urban Planning" },
    { value: "education", label: "Education" },
    { value: "special-education", label: "Special Education" },
    { value: "health-sciences", label: "Health Sciences" },
    { value: "public-health", label: "Public Health" },
    { value: "kinesiology", label: "Kinesiology" },
    { value: "nutrition", label: "Nutrition" },
    { value: "pharmacy", label: "Pharmacy" },
    { value: "dentistry", label: "Dentistry" },
    { value: "medicine", label: "Medicine" },
    { value: "veterinary-science", label: "Veterinary Science" },
    { value: "agricultural-science", label: "Agricultural Science" },
    { value: "forestry", label: "Forestry" },
    { value: "marine-biology", label: "Marine Biology" },
    { value: "geology", label: "Geology" },
    { value: "astronomy", label: "Astronomy" },
    { value: "data-science", label: "Data Science" },
    { value: "information-technology", label: "Information Technology" },
    { value: "software-engineering", label: "Software Engineering" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "artificial-intelligence", label: "Artificial Intelligence" },
    { value: "biotechnology", label: "Biotechnology" },
    { value: "biomedical-engineering", label: "Biomedical Engineering" },
    { value: "chemical-engineering", label: "Chemical Engineering" },
    { value: "industrial-engineering", label: "Industrial Engineering" },
    { value: "aerospace-engineering", label: "Aerospace Engineering" },
    { value: "robotics", label: "Robotics" },
    { value: "music", label: "Music" },
    { value: "theater-arts", label: "Theater Arts" },
    { value: "film-studies", label: "Film Studies" },
    { value: "journalism", label: "Journalism" },
    { value: "public-relations", label: "Public Relations" },
    { value: "international-relations", label: "International Relations" },
    { value: "criminal-justice", label: "Criminal Justice" },
    { value: "law", label: "Law" },
    { value: "social-work", label: "Social Work" },
    { value: "human-resources", label: "Human Resources" },
    { value: "supply-chain-management", label: "Supply Chain Management" },
    { value: "hospitality-management", label: "Hospitality Management" },
    { value: "tourism", label: "Tourism" },
    { value: "event-management", label: "Event Management" },
    { value: "fashion-design", label: "Fashion Design" },
    { value: "interior-design", label: "Interior Design" },
    { value: "culinary-arts", label: "Culinary Arts" },
    { value: "sports-management", label: "Sports Management" },
    { value: "exercise-science", label: "Exercise Science" },
    { value: "neuroscience", label: "Neuroscience" },
    { value: "cognitive-science", label: "Cognitive Science" },
    { value: "linguistics", label: "Linguistics" },
    { value: "religious-studies", label: "Religious Studies" },
    { value: "gender-studies", label: "Gender Studies" },
    { value: "ethnic-studies", label: "Ethnic Studies" },
    { value: "global-studies", label: "Global Studies" },
    { value: "sustainability-studies", label: "Sustainability Studies" },
    { value: "entrepreneurship", label: "Entrepreneurship" },
    { value: "innovation-management", label: "Innovation Management" },
    { value: "real-estate", label: "Real Estate" },
    { value: "statistics", label: "Statistics" },
    { value: "applied-mathematics", label: "Applied Mathematics" },
    { value: "actuarial-science", label: "Actuarial Science" },
    { value: "geography", label: "Geography" },
    { value: "meteorology", label: "Meteorology" },
    { value: "oceanography", label: "Oceanography" },
    { value: "wildlife-conservation", label: "Wildlife Conservation" },
    { value: "zoology", label: "Zoology" },
    { value: "microbiology", label: "Microbiology" },
    { value: "genetics", label: "Genetics" },
    { value: "biochemistry", label: "Biochemistry" },
    { value: "forensic-science", label: "Forensic Science" },
    { value: "criminology", label: "Criminology" },
    { value: "public-policy", label: "Public Policy" },
    { value: "nonprofit-management", label: "Nonprofit Management" },
    { value: "library-science", label: "Library Science" },
    { value: "museum-studies", label: "Museum Studies" },
  ];

  export function IdealMajor() {
    const [open, setOpen] = React.useState(false);
    const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  
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
            className="w-[325px] justify-between"
          >
            <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap pr-2 text-left">
              {selectedValues.length > 0 ? displayString : "Select ideal major..."}
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