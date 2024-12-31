/*
  # Add admin user

  1. New Users
    - Creates an admin user with email/password authentication
    
  2. Security
    - Password is hashed automatically by Supabase Auth
    - User will be added to the authenticated users group
*/

-- Create admin user using Supabase Auth's built-in function
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