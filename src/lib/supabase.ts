import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { AITool } from '@/data/types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key exists:', !!supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export async function fetchTools() {
  console.log('Fetching from Supabase...');
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Supabase error:', error);
    throw new Error(`Failed to fetch tools: ${error.message}${error.details ? ` (${error.details})` : ''}`);
  }

  console.log('Supabase response length:', data?.length ?? 0);
  console.log('First tool:', data?.[0]);
  return data as AITool[];
}

export async function addTool(tool: Omit<AITool, 'id'>) {
  const { data, error } = await supabase
    .from('tools')
    .insert([tool])
    .select()
    .single();
  
  if (error) throw error;
  return data as AITool;
}

export async function updateTool(id: string, updates: Partial<AITool>) {
  const { data, error } = await supabase
    .from('tools')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as AITool;
}

export async function deleteTool(id: string) {
  const { error } = await supabase
    .from('tools')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
}