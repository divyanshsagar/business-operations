/*
  # Initial Schema Setup for Autonomous Data Processing System

  1. New Tables
    - `emails`
      - Stores incoming email data and processing results
      - Columns for content, status, processing metrics
    - `processing_metrics`
      - Tracks system performance and processing statistics
    - `compliance_logs`
      - Records compliance-related events and checks

  2. Security
    - Enable RLS on all tables
    - Policies for authenticated access
*/

-- Create emails table
CREATE TABLE IF NOT EXISTS emails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  sender text NOT NULL,
  received_at timestamptz DEFAULT now(),
  processed_at timestamptz,
  status text DEFAULT 'pending',
  sentiment_score float,
  priority int DEFAULT 0,
  category text,
  user_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- Create processing_metrics table
CREATE TABLE IF NOT EXISTS processing_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text NOT NULL,
  metric_value float NOT NULL,
  recorded_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Create compliance_logs table
CREATE TABLE IF NOT EXISTS compliance_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  description text NOT NULL,
  severity text NOT NULL,
  logged_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE processing_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_logs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read their own emails"
  ON emails
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own emails"
  ON emails
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own metrics"
  ON processing_metrics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read their own compliance logs"
  ON compliance_logs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);