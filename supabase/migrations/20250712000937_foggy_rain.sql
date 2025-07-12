/*
  # Create short_links table for link shortener

  1. New Tables
    - `short_links`
      - `id` (uuid, primary key)
      - `slug` (text, unique) - e.g., p1, p2, p3
      - `original_url` (text) - Full destination URL
      - `click_count` (integer, default 0) - Track visits
      - `created_at` (timestamp, default now())

  2. Security
    - Enable RLS on `short_links` table
    - Add policy for public read access (for redirects)
    - Add policy for public insert (for creating links)
*/

CREATE TABLE IF NOT EXISTS short_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  original_url text NOT NULL,
  click_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE short_links ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read short links (needed for redirects)
CREATE POLICY "Public read access"
  ON short_links
  FOR SELECT
  TO anon
  USING (true);

-- Allow anyone to create short links
CREATE POLICY "Public insert access"
  ON short_links
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anyone to update click count
CREATE POLICY "Public update click count"
  ON short_links
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Create index for fast slug lookups
CREATE INDEX IF NOT EXISTS idx_short_links_slug ON short_links(slug);