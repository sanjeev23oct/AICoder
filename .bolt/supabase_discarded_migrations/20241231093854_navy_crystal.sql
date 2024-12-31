/*
  # Update User with Admin Role

  1. Changes
    - Updates specified user with admin role in user_metadata
  
  2. Security
    - Only updates metadata for existing user
    - Preserves existing user data
*/

-- Update user metadata to add admin role
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{role}',
  '"admin"'
)
WHERE email = 'admin@example.com';  -- Replace with your user's email