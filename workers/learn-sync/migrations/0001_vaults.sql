-- One row per encrypted vault. id and the token are both derived from the passphrase in the
-- browser (HKDF); the Worker keeps only a SHA-256 of the token and never sees a key. blob is the
-- sealed vault envelope as JSON text; rev increments on every write for optimistic concurrency.
CREATE TABLE vaults (
  id         TEXT PRIMARY KEY,
  token_hash TEXT NOT NULL,
  rev        INTEGER NOT NULL,
  blob       TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
