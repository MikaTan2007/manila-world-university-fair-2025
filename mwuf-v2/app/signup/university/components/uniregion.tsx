"use client"

import { useState} from "react";
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
  { value: "Africa", label: "Africa" },
  { value: "Sub-Saharan Africa", label: "Sub-Saharan Africa" },
  { value: "Caribbean", label: "Caribbean" },
  { value: "North America", label: "North America" },
  { value: "Central America", label: "Central America" },
  { value: "South America", label: "South America" },
  { value: "Central Asia", label: "Central Asia" },
  { value: "North Asia", label: "North Asia" },
  { value: "West Asia", label: "West Asia" },
  { value: "East Asia", label: "East Asia" },
  { value: "South Asia", label: "South Asia" },
  { value: "Southeast Asia", label: "Southeast Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Middle East", label: "Middle East" },
  { value: "Oceania", label: "Oceania" },
];

interface uniRegionProps {
  uniRegion: string[],
  setUniRegion: (uniRegion: string[]) => void;
  onUniRegionChange?: (changed: boolean) => void;
}

export function UniRegion({
  uniRegion,
  setUniRegion,
  onUniRegionChange
}: uniRegionProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = (currentValue: string) => {
    const newUniRegion = uniRegion.includes(currentValue)
      ? uniRegion.filter(value => value !== currentValue)
      : [...uniRegion, currentValue];
    
    setUniRegion(newUniRegion);
    onUniRegionChange?.(false);
  };
  
  const displayString = uniRegion
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
          className="w-full justify-between"
        >
          <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap pr-2 text-left">
            {uniRegion.length > 0 ? displayString : "Select regions (multiple allowed)"}
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
              {region.map((regionItem) => (
                <CommandItem
                  key={regionItem.value}
                  value={regionItem.value}
                  onSelect={() => handleSelect(regionItem.value)}
                >
                  {regionItem.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      uniRegion.includes(regionItem.value) ? "opacity-100" : "opacity-0"
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