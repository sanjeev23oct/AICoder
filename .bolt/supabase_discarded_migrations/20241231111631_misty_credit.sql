/*
  # Add Remarks Column to Tools Table

  1. Changes
    - Add `remarks` column to `tools` table with 5000 character limit
    - Column is nullable to maintain compatibility with existing data
*/

ALTER TABLE tools 
ADD COLUMN IF NOT EXISTS remarks varchar(5000);

COMMENT ON COLUMN tools.remarks IS 'Additional notes or remarks about the tool (max 5000 characters)';