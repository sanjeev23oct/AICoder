import { Category } from './categories';

export interface AITool {
  id: string;
  name: string;
  description: string;
  features: string[];
  url: string;
  pricing: string;
  category: Category;
  logo: string;
  remarks?: string;
  llm_provider?: string;
}