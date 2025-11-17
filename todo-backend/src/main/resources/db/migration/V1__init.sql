CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                       email VARCHAR(255) UNIQUE NOT NULL,
                       password_hash VARCHAR(255) NOT NULL,
                       display_name VARCHAR(100),
                       created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE lists (
                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                       user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                       name VARCHAR(200) NOT NULL,
                       created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE tasks (
                       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                       user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                       list_id UUID REFERENCES lists(id) ON DELETE SET NULL,
                       title TEXT NOT NULL,
                       description TEXT,
                       is_completed BOOLEAN DEFAULT FALSE,
                       is_important BOOLEAN DEFAULT FALSE,
                       due_at TIMESTAMP WITH TIME ZONE,
                       my_day_date DATE,
                       priority SMALLINT DEFAULT 0,
                       created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                       updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX idx_tasks_user ON tasks(user_id);
CREATE INDEX idx_tasks_list ON tasks(list_id);
CREATE INDEX idx_tasks_myday ON tasks(user_id, my_day_date);
