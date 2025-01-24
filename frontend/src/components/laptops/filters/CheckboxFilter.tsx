import { Checkbox } from "@/components/ui/checkbox";

interface CheckboxFilterProps {
  id: string;
  label: string;
  checked?: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function CheckboxFilter({
  id,
  label,
  checked,
  onCheckedChange,
}: CheckboxFilterProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <label htmlFor={id} className="text-sm">{label}</label>
    </div>
  );
}