-- Remove status column from orders table
-- Since every order created means it's completed, we don't need status tracking
ALTER TABLE orders DROP COLUMN IF EXISTS status;
