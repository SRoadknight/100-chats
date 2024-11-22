BEGIN;

CREATE TABLE alembic_version (
    version_num VARCHAR(32) NOT NULL, 
    CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num)
);

-- Running upgrade  -> 2466a2f834ff

CREATE TABLE profiles (
    user_id UUID NOT NULL, 
    discord_handle VARCHAR NOT NULL, 
    avatar_url VARCHAR NOT NULL, 
    PRIMARY KEY (user_id)
);

SELECT enable_rls_alembic_version();

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

INSERT INTO alembic_version (version_num) VALUES ('2466a2f834ff') RETURNING alembic_version.version_num;

COMMIT;

