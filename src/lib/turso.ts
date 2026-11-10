import { createClient, Client } from "@libsql/client";

declare global {
  // eslint-disable-next-line no-var
  var __tursoSuiteClient: Client | null | undefined;
  // eslint-disable-next-line no-var
  var __tursoSuiteSchemaEnsured: boolean | undefined;
}

export function getTursoClient(): Client | null {
  if (global.__tursoSuiteClient !== undefined) {
    return global.__tursoSuiteClient;
  }

  const url =
    process.env.TURSO_TRIVIA_URL ||
    process.env.TURSO_DATABASE_URL ||
    process.env.DATABASE_URL;
  const authToken =
    process.env.TURSO_TRIVIA_AUTH_TOKEN ||
    process.env.TURSO_AUTH_TOKEN ||
    process.env.DATABASE_AUTH_TOKEN;

  if (!url) {
    global.__tursoSuiteClient = null;
    return null;
  }

  try {
    const client = createClient({
      url,
      authToken,
    });
    global.__tursoSuiteClient = client;
    return client;
  } catch (err) {
    console.error("Failed to initialize Turso client:", err);
    global.__tursoSuiteClient = null;
    return null;
  }
}

export async function ensureSuiteSchema(): Promise<void> {
  if (global.__tursoSuiteSchemaEnsured) return;
  const client = getTursoClient();
  if (!client) return;

  try {
    await Promise.all([
      client.execute(`
        CREATE TABLE IF NOT EXISTS suite_events (
          id TEXT PRIMARY KEY,
          slug TEXT UNIQUE NOT NULL,
          title TEXT NOT NULL,
          date TEXT NOT NULL,
          location TEXT,
          admin_token TEXT NOT NULL,
          enabled_modules TEXT NOT NULL,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        );
      `),
      client.execute(`
        CREATE TABLE IF NOT EXISTS suite_rsvps (
          id TEXT PRIMARY KEY,
          event_id TEXT NOT NULL,
          guest_name TEXT NOT NULL,
          attending INTEGER NOT NULL,
          companions_count INTEGER NOT NULL DEFAULT 0,
          companion_names TEXT,
          dietary_restrictions TEXT,
          message TEXT,
          created_at TEXT NOT NULL
        );
      `),
      client.execute(`
        CREATE TABLE IF NOT EXISTS suite_photos (
          id TEXT PRIMARY KEY,
          event_id TEXT NOT NULL,
          photo_url TEXT NOT NULL,
          author_name TEXT NOT NULL,
          table_number INTEGER,
          caption TEXT,
          approved INTEGER NOT NULL DEFAULT 1,
          created_at TEXT NOT NULL
        );
      `),
      client.execute(`
        CREATE TABLE IF NOT EXISTS suite_trivia_questions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          event_id TEXT NOT NULL,
          order_num INTEGER NOT NULL DEFAULT 1,
          question TEXT NOT NULL,
          options TEXT NOT NULL,
          correct_index INTEGER NOT NULL DEFAULT 0,
          explanation TEXT
        );
      `),
      client.execute(`
        CREATE TABLE IF NOT EXISTS suite_trivia_players (
          id TEXT PRIMARY KEY,
          event_id TEXT NOT NULL,
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          avatar TEXT NOT NULL DEFAULT '🎉',
          score INTEGER NOT NULL DEFAULT 0,
          total_time_ms INTEGER NOT NULL DEFAULT 0,
          is_finished INTEGER NOT NULL DEFAULT 0,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        );
      `),
      client.execute(`
        CREATE TABLE IF NOT EXISTS suite_invitations (
          id TEXT PRIMARY KEY,
          event_id TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          person_name TEXT NOT NULL,
          headline TEXT NOT NULL,
          subheadline TEXT NOT NULL,
          event_number TEXT,
          badge_text TEXT NOT NULL,
          target_date TEXT NOT NULL,
          venue_name TEXT NOT NULL,
          venue_address TEXT NOT NULL,
          venue_maps_url TEXT,
          venue_calendar_url TEXT,
          gift_bank_name TEXT,
          gift_alias TEXT,
          gift_cbu TEXT,
          gift_holder_name TEXT,
          audio_track_path TEXT,
          footer_phrase TEXT,
          carousel_images TEXT,
          template TEXT NOT NULL DEFAULT 'classic-gold',
          allow_companions INTEGER NOT NULL DEFAULT 1,
          allow_dietary INTEGER NOT NULL DEFAULT 1,
          is_default INTEGER NOT NULL DEFAULT 0,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        );
      `),
    ]);
    global.__tursoSuiteSchemaEnsured = true;
  } catch (err) {
    console.error("Error creating suite tables in Turso:", err);
  }
}

