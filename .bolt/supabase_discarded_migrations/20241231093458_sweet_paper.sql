/*
  # Fix JWT Policy Expressions

  1. Changes
    - Update policy expressions to use correct JWT metadata access syntax
    - Keep existing policies but fix the JWT checks
    - Maintain public read access

  2. Security
    - Policies remain role-based
    - Admin-only write operations
    - Public read access preserved
*/

-- Drop existing policies
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

-- Create admin-only write policies using correct JWT metadata access
CREATE POLICY "Admin users can insert tools"
  ON tools
  FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role')::text = 'admin');

CREATE POLICY "Admin users can update tools"
  ON tools
  FOR UPDATE
  TO authenticated
  USING ((auth.jwt() -> 'user_metadata' ->> 'role')::text = 'admin')
  WITH CHECK ((auth.jwt() -> 'user_metadata' ->> 'role')::text = 'admin');

CREATE POLICY "Admin users can delete tools"
  ON tools
  FOR DELETE
  TO authenticated
  USING ((auth.jwt() -> 'user_metadata' ->> 'role')::text = 'admin');