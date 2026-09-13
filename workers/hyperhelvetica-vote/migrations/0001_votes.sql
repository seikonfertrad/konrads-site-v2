-- One row per counted vote. The token is a random id the voter's browser keeps, so a
-- second vote from the same browser collides on the primary key. ip_hash is a salted
-- SHA-256 of the connecting IP, used only for the per-network daily cap.
CREATE TABLE votes (
  token      TEXT PRIMARY KEY,
  design     TEXT NOT NULL CHECK (design IN ('A', 'B', 'C', 'D')),
  colour     TEXT NOT NULL CHECK (colour IN ('red', 'white')),
  ip_hash    TEXT NOT NULL,
  day        TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX votes_network_day ON votes (ip_hash, day);
