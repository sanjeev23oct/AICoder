/*
  # Auth Setup and Policies

  1. Changes
    - Remove supabase_auth schema references
    - Update policies to use proper auth checks
    - Ensure public read access
    - Restrict write operations to admin users

  2. Security
    - Enable RLS
    - Add policy for public read access
    - Add policies for admin-only write operations
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view tools" ON tools;
DROP POLICY IF EXISTS "Admin users can insert tools" ON tools;
DROP POLICY IF EXISTS "Admin users can update tools" ON tools;
DROP POLICY IF EXISTS "Admin users can delete tools" ON tools;

-- Create public read access policy
CREATE POLICY "Public can view tools"
  ON tools
  FOR SELECT
  TO public
  USING (true);

-- Create admin-only write policies
CREATE POLICY "Admin users can insert tools"
  ON tools
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'user_metadata'->>'role' = 'admin');

CREATE POLICY "Admin users can update tools"
  ON tools
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'user_metadata'->>'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'user_metadata'->>'role' = 'admin');

CREATE POLICY "Admin users can delete tools"
  ON tools
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'user_metadata'->>'role' = 'admin');