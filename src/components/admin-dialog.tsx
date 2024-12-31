import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ToolForm } from "@/components/tool-form";
import { useTools } from "@/hooks/use-tools";
import type { AITool } from "@/data/types";
import { ReactNode } from "react";

interface AdminDialogProps {
  mode?: "add" | "edit";
  tool?: AITool;
  children?: ReactNode;
}

export function AdminDialog({ mode = "add", tool, children }: AdminDialogProps) {
  const { addTool, updateTool } = useTools();

  const handleSubmit = async (data: Omit<AITool, "id" | "features">) => {
    if (mode === "edit" && tool) {
      await updateTool(tool.id, data);
    } else {
      await addTool(data);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Add New Tool" : "Edit Tool"}</DialogTitle>
        </DialogHeader>
        <ToolForm 
          onSubmit={handleSubmit}
          defaultValues={tool}
        />
      </DialogContent>
    </Dialog>
  );
}