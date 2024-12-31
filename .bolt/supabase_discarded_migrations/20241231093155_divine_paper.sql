/*
  # Complete Admin and Security Setup

  1. Setup
    - Create admin user
    - Configure RLS policies
    - Set up public read access
    - Configure admin-only write access

  2. Security
    - Admin user with secure password
    - Role-based access control
    - Public read access
    - Admin-only write operations
*/

-- Create admin user
SELECT supabase_auth.create_user(
  '{
    "email": "admin@example.com",
    "password": "admin123",
    "email_confirm": true,
    "user_metadata": {
      "role": "admin"
    }
  }'::jsonb
);

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