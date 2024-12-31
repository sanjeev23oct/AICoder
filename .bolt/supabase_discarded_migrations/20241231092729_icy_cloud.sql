/*
  # Update RLS policies for admin users

  1. Changes
    - Add admin-specific policies for tools table
    - Ensure public read access remains
    - Restrict write operations to admin users only

  2. Security
    - Policies check user role in metadata
    - Non-admin users can only read
    - Admin users have full CRUD access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can insert tools" ON tools;
DROP POLICY IF EXISTS "Authenticated users can update tools" ON tools;
DROP POLICY IF EXISTS "Authenticated users can delete tools" ON tools;

-- Create admin-specific policies
CREATE POLICY "Admin users can insert tools"
  ON tools
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin users can update tools"
  ON tools
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin users can delete tools"
  ON tools
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');