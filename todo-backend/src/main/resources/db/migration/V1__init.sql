-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create tasks table
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    is_important BOOLEAN NOT NULL DEFAULT FALSE,
    due_at TIMESTAMPTZ,
    my_day_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for optimal query performance
CREATE INDEX idx_tasks_user ON tasks(user_id);
CREATE INDEX idx_tasks_user_myday ON tasks(user_id, my_day_date);
CREATE INDEX idx_tasks_user_important ON tasks(user_id, is_important);
CREATE INDEX idx_tasks_user_due ON tasks(user_id, due_at);
CREATE INDEX idx_tasks_user_completed ON tasks(user_id, is_completed);
