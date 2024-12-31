import { useState, useEffect } from 'react';
import { AITool } from '@/data/types';
import { fetchTools, addTool, updateTool, deleteTool } from '@/lib/supabase';
import { toast } from '@/hooks/use-toast';

export function useTools() {
  const [tools, setTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadTools();
  }, []);

  async function loadTools() {
    try {
      console.log('Fetching tools...');
      const startTime = Date.now();
      const data = await fetchTools();
      console.log(`Fetch completed in ${Date.now() - startTime}ms`);
      setTools(data);
      if (data.length === 0) {
        toast({
          title: 'No tools found',
          description: 'Please ensure Supabase is connected and the tools table exists.',
          variant: 'destructive',
        });
      }
    } catch (err) {
      console.error('Error fetching tools:', err);
      setError(err as Error);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      toast({
        title: 'Error loading tools',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleAddTool(tool: Omit<AITool, 'id'>) {
    try {
      const newTool = await addTool(tool);
      setTools([...tools, newTool]);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }

  async function handleUpdateTool(id: string, updates: Partial<AITool>) {
    try {
      const updatedTool = await updateTool(id, updates);
      setTools(tools.map(t => t.id === id ? updatedTool : t));
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }

  async function handleDeleteTool(id: string) {
    try {
      await deleteTool(id);
      setTools(tools.filter(t => t.id !== id));
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }

  return {
    tools,
    loading,
    error,
    addTool: handleAddTool,
    updateTool: handleUpdateTool,
    deleteTool: handleDeleteTool,
  };
}