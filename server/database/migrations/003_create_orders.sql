-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(50) UNIQUE NOT NULL,
  app_id INTEGER REFERENCES applications(id),
  variant VARCHAR(100),
  quantity INTEGER DEFAULT 1,
  total_price DECIMAL(10,2),
  customer_info JSONB,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
