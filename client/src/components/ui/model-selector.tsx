import { MODELS, type ModelType } from "@shared/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles } from "lucide-react";

interface ModelSelectorProps {
  value: ModelType;
  onValueChange: (value: ModelType) => void;
  className?: string;
}

export function ModelSelector({ value, onValueChange, className }: ModelSelectorProps) {
  return (
    <div className={className}>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[240px] bg-secondary/50 border-border/50 backdrop-blur-sm transition-all hover:bg-secondary/80 focus:ring-primary/20">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <SelectValue placeholder="Select Model" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {MODELS.map((model) => (
            <SelectItem key={model} value={model} className="cursor-pointer">
              <span className="font-medium">{model}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
