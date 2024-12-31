import './App.css';
import { columns } from './components/columns';
import { DataTable } from "@/components/ui/data-table";
import { Zap } from 'lucide-react';
import { CommandMenu } from './components/command-menu';
import { useTools } from './hooks/use-tools';
import { ThemeProvider } from './components/theme-provider';
import { AdminDialog } from './components/admin-dialog';
import { AuthButton } from './components/auth-button';
import { useAuth } from './lib/auth';
import { Plus } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { Button } from './components/ui/button';
import { useEffect } from 'react';

export default function App() {
  const { tools, loading, error } = useTools();
  const { user, isAdmin, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <div className="container mx-auto py-10">
        <div className="flex items-center gap-4 mb-8 px-8">
          <Zap className="h-10 w-10 text-yellow-500" />
          <div>
            <h1 className="text-4xl font-bold tracking-tight">AI Coder Tools</h1>
            <p className="text-muted-foreground mt-2">
              Manage and discover AI development tools
            </p>
          </div>
          <div className="ml-auto">
            <div className="flex items-center gap-4">
              {isAdmin && (
                <AdminDialog mode="add">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Tool
                  </Button>
                </AdminDialog>
              )}
              <AuthButton />
            </div>
          </div>
        </div>
        
        {error && (
          <div className="rounded-lg border border-destructive p-4 mb-8">
            <p className="text-destructive">Error loading tools: {error.message}</p>
          </div>
        )}
        
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="rounded-lg border bg-card p-8 shadow-lg">
            <DataTable columns={columns} data={tools} />
          </div>
        )}

        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>Data is regularly updated to reflect the latest AI development tools.</p>
        </footer>

        <CommandMenu />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}