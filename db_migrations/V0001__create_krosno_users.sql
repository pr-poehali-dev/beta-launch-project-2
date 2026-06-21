CREATE TABLE IF NOT EXISTS t_p74461000_beta_launch_project_.krosno_users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(30),
  email VARCHAR(150),
  created_at TIMESTAMP DEFAULT NOW()
);