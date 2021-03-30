
-- planner tables 
CREATE TABLE events (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    event VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE notes (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    event_id BIGINT NOT NULL,
    content TEXT NOT NULL
);