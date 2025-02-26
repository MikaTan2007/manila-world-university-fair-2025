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

const region = [
  { value: "north-america", label: "North America" },
  { value: "south-america", label: "South America" },
  { value: "asia", label: "Asia" },
  { value: "europe", label: "Europe" },
  { value: "africa", label: "Africa" }
];

  export function UniRegion() {
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
      .map(value => region.find(region => region.value === value)?.label)
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
              {selectedValues.length > 0 ? displayString : "Region (multiple allowed)"}
            </div>
            <ChevronsUpDown className="opacity-50 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0">
          <Command>
            <CommandInput placeholder="Search region..." className="h-9" />
            <CommandList>
              <CommandEmpty>No region found.</CommandEmpty>
              <CommandGroup>
                {region.map((region) => (
                  <CommandItem
                    key={region.value}
                    value={region.value}
                    onSelect={() => handleSelect(region.value)}
                  >
                    {region.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        selectedValues.includes(region.value) ? "opacity-100" : "opacity-0"
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