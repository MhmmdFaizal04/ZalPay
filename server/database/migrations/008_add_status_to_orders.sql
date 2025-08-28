-- Add status column to orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'completed';

-- Update existing orders to have completed status
UPDATE orders SET status = 'completed' WHERE status IS NULL;

-- Add index for better performance on status queries
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
