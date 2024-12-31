import { ColumnDef } from "@tanstack/react-table";
import type { AITool } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { ArrowUpRight, Github, Pencil, Triangle, Zap } from "lucide-react";
import { AdminDialog } from "./admin-dialog";
import { useAuth } from "@/lib/auth";

const iconMap = {
  zap: Zap,
  github: Github,
  triangle: Triangle,
};

export const columns: ColumnDef<AITool>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const tool = row.original;
      const IconComponent = iconMap[tool.logo as keyof typeof iconMap];
      return IconComponent ? (
        <div className="flex items-center gap-2">
          <IconComponent className="h-5 w-5" />
          <span className="font-medium">{tool.name}</span>
        </div>
      ) : (
        <span className="font-medium">{tool.name}</span>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return (
        <Badge variant="secondary" className="font-medium bg-muted">
          {row.original.category}
        </Badge>
      );
    },
  },
  {
    accessorKey: "pricing",
    header: "Pricing",
  },
  {
    accessorKey: "llm_provider",
    header: "LLM Provider",
    cell: ({ row }) => {
      const provider = row.original.llm_provider;
      if (!provider) return null;
      return (
        <Badge variant="outline" className="font-medium">
          {provider}
        </Badge>
      );
    },
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
    cell: ({ row }) => {
      const remarks = row.original.remarks;
      if (!remarks) return null;
      return (
        <div className="max-w-md truncate" title={remarks}>
          {remarks}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const tool = row.original;
      const { isAdmin } = useAuth();
      
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(tool.url, "_blank")}
          >
            Visit <ArrowUpRight className="ml-2 h-4 w-4 text-primary" />
          </Button>
          {isAdmin && (
            <AdminDialog mode="edit" tool={tool}>
              <Button variant="ghost" size="sm">
                <Pencil className="h-4 w-4" />
              </Button>
            </AdminDialog>
          )}
        </div>
      );
    },
  },
];