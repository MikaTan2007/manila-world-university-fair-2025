"use client"

import { useState } from "react";
import { format, getMonth, getYear, setMonth, setYear } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DatePickerProps {
  value: Date | undefined;
  onChange: (date:Date | undefined) => void;
  startYear?: number;
  endYear?: number;
  onDateChanged?: (changed: boolean) => void;
}

export function DatePicker({
  value,
  onChange,
  startYear = getYear(new Date()) - 30,
  endYear = getYear(new Date()),
  onDateChanged,
}: DatePickerProps) {
  const [dateChanged, setDateChanged] = useState(false);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const handleMonthChange = (month: string) => {
    let baseDate = value ?? new Date();
    if (!value) {
      baseDate = new Date(getYear(baseDate), months.indexOf(month), 1)
    }
    const newDate = setMonth(baseDate, months.indexOf(month));
    onChange(newDate);
    setDateChanged(true);
    onDateChanged?.(true);
  }

  const handleYearChange = (year: string) => {
    let baseDate = value ?? new Date();
    if (!value) {
      baseDate = new Date(parseInt(year), 0, 1);
    }
    const newDate = setYear(baseDate, parseInt(year));
    onChange(newDate);
    setDateChanged(true);
    onDateChanged?.(true);
  }

  const handleSelect = (selectedData: Date | undefined) => {
    onChange(selectedData);
    setDateChanged(true);
    onDateChanged?.(true);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="w-60 justify-start text-left font-normal "
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateChanged && value ? format(value, "PPP") : <span>Date of Birth</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex justify-between p-2">
          <Select
            onValueChange={handleMonthChange}
            value={value ? months[getMonth(value)] : ""}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map(month => (
                <SelectItem key={month} value={month}>{month}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleYearChange}
            value={value ? getYear(value).toString() : ""}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Calendar
          mode="single"
          selected={value}
          onSelect={handleSelect}
          initialFocus
          month={value}
          onMonthChange={d => onChange(d)}
        />
      </PopoverContent>
    </Popover>
  )
}