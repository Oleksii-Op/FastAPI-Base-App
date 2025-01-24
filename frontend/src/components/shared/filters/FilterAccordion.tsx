import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FilterAccordionProps {
  value: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function FilterAccordion({ value, title, children, className }: FilterAccordionProps) {
  return (
    <AccordionItem value={value} className={cn("border-none", className)}>
      <AccordionTrigger className="text-white hover:text-white/80">
        {title}
      </AccordionTrigger>
      {children}
    </AccordionItem>
  );
}