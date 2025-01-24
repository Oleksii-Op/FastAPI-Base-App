import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { X, ChevronDown } from "lucide-react";

interface SelectFilterProps {
  title: string;
  options: (string | number)[];
  value?: string[];
  placeholder: string;
  onValueChange: (value: string[] | undefined) => void;
  formatOption?: (option: string | number) => string;
}

export function SelectFilter({
  title,
  options,
  value = [],
  placeholder,
  onValueChange,
  formatOption = (option) => String(option),
}: SelectFilterProps) {
  const handleSelect = (option: string | number) => {
    const optionStr = String(option);
    if (!value) {
      onValueChange([optionStr]);
      return;
    }

    const newValue = value.includes(optionStr)
      ? value.filter(v => v !== optionStr)
      : [...value, optionStr];
    
    onValueChange(newValue.length > 0 ? newValue : undefined);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-white">{title}</span>
        {value && value.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-white hover:text-white/80"
            onClick={() => onValueChange(undefined)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between text-white bg-transparent border-white/20 hover:bg-white/10"
            role="combobox"
          >
            {value && value.length > 0
              ? `${value.length} selected`
              : placeholder}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full min-w-[200px] max-h-[300px] overflow-y-auto bg-[#1A1F2C] border-white/20">
          {options.map((option) => (
            <DropdownMenuCheckboxItem
              key={option}
              checked={value?.includes(String(option))}
              onCheckedChange={() => handleSelect(option)}
              className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white"
            >
              {formatOption(option)}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}