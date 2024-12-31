/*
  # Create AI Tools Table

  1. New Tables
    - `tools`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `features` (text array)
      - `url` (text)
      - `pricing` (text)
      - `category` (text)
      - `logo` (text)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `tools` table
    - Add policies for authenticated users to manage their tools
*/

-- Create enum for tool categories
CREATE TYPE tool_category AS ENUM ('IDE', 'Assistant', 'Copilot', 'Other');

-- Create tools table
CREATE TABLE IF NOT EXISTS tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  features text[] NOT NULL DEFAULT '{}',
  url text NOT NULL,
  pricing text NOT NULL,
  category tool_category NOT NULL,
  logo text NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT tools_name_unique UNIQUE (name)
);

-- Enable RLS
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view tools"
  ON tools
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert tools"
  ON tools
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update their tools"
  ON tools
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete their tools"
  ON tools
  FOR DELETE
  TO authenticated
  USING (true);