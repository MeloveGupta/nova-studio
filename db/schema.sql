CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  image VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO projects (title, category, image) VALUES
  ('E-Commerce Website', 'Web Design', '/images/project1.jpg'),
  ('Portfolio Landing Page', 'Front-End Development', '/images/project2.jpg'),
  ('Brand Identity Pack', 'Branding', '/images/project3.png'),
  ('SaaS Dashboard UI', 'Front-End Development', '/images/project4.jpg'),
  ('Restaurant Website', 'Web Design', '/images/project5.jpg'),
  ('Startup Logo Design', 'Branding', '/images/project6.jpg');