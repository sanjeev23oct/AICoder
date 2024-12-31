/*
  # Add LLM Provider Column

  1. Changes
    - Add `llm_provider` column to `tools` table
    - Column is nullable to maintain compatibility with existing data
*/

ALTER TABLE tools 
ADD COLUMN IF NOT EXISTS llm_provider text;

COMMENT ON COLUMN tools.llm_provider IS 'The LLM provider used by the tool (e.g., OpenAI, Anthropic, etc.)';