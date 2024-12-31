/*
  # Update RLS policies for tools table

  1. Changes
    - Enable public access to tools table
    - Add policy for public read access
    - Remove authentication requirement for SELECT

  Note: This ensures the tools data is publicly accessible without requiring authentication
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view tools" ON tools;
DROP POLICY IF EXISTS "Authenticated users can insert tools" ON tools;
DROP POLICY IF EXISTS "Authenticated users can update their tools" ON tools;
DROP POLICY IF EXISTS "Authenticated users can delete their tools" ON tools;

-- Create new public access policy
CREATE POLICY "Public can view tools"
  ON tools
  FOR SELECT
  TO public
  USING (true);

-- Keep write operations restricted to authenticated users
CREATE POLICY "Authenticated users can insert tools"
  ON tools
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update tools"
  ON tools
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete tools"
  ON tools
  FOR DELETE
  TO authenticated
  USING (true);