/*
  # Leukemia Room Database Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `nickname` (text) - User's chosen display name
      - `disease_type` (text) - Type of leukemia (AML, ALL, CML, MDS, other, unknown)
      - `treatment_phase` (text) - Current treatment status
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `conversations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `message` (text) - User's message
      - `response` (jsonb) - AI nurse response with empathy, summary, triage_level, general_info, action
      - `triage_level` (text) - GREEN, YELLOW, or RED
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on both tables
    - Users can only read/write their own profile
    - Users can only read/write their own conversations
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  nickname text NOT NULL,
  disease_type text NOT NULL CHECK (disease_type IN ('AML', 'ALL', 'CML', 'MDS', 'other', 'unknown')),
  treatment_phase text NOT NULL CHECK (treatment_phase IN ('in_treatment', 'follow_up', 'pre_transplant', 'post_transplant', 'unknown')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  message text NOT NULL,
  response jsonb NOT NULL,
  triage_level text NOT NULL CHECK (triage_level IN ('GREEN', 'YELLOW', 'RED')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Conversations policies
CREATE POLICY "Users can view own conversations"
  ON conversations FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own conversations"
  ON conversations FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create index for faster conversation queries
CREATE INDEX IF NOT EXISTS conversations_user_id_created_at_idx 
  ON conversations(user_id, created_at DESC);
