import type { SupabaseClient, User } from '@supabase/supabase-js'

/** Tabele widoczne w `tables` — orientacyjnie, bez introspekcji SQL. */
const KNOWN_PUBLIC_TABLES = [
  'articles',
  'contacts',
  'files',
  'friendships',
  'money',
  'user_colors',
  'user_profiles',
].sort()

function helpText(): string {
  return [
    'Nucleify terminal — komendy Supabase (whitelist, bez shell).',
    '',
    '  help | ?              — lista poleceń',
    '  whoami                — konto z JWT',
    '  profiles me           — user_profiles dla zalogowanego użytkownika',
    '  friendships list [n]  — Twoje znajomości (domyślnie n=25, max 100)',
    '  articles count        — liczba artykułów przypisanych do Ciebie',
    '  tables                — znane tabele publiczne (statyczna lista)',
    '  scripts               — skrypty pnpm supabase:* w repozytorium',
    '',
    'Opcjonalny prefiks:  supabase …  (np. supabase help)',
    '',
    'Pełne migracje / supabase CLI: uruchamiaj lokalnie (Makefile / pnpm).',
  ].join('\n')
}

function scriptsHint(): string {
  return [
    'Przykładowe skrypty w package.json:',
    '  pnpm supabase:merge-sql',
    '  pnpm supabase:migrations:apply:local',
    '  pnpm supabase:setup:local',
    '',
    'Docker / Makefile: make docker-fix-perms (po problemach z uprawnieniami .nuxt).',
  ].join('\n')
}

function friendshipOrFilter(userId: string): string {
  return `recipient_id.eq.${userId},sender_id.eq.${userId},requester_id.eq.${userId}`
}

export async function executeTerminalCommand(
  supabase: SupabaseClient,
  user: User,
  raw: string
): Promise<string> {
  let line = raw.trim().replace(/\s+/g, ' ')
  if (!line) return helpText()

  if (line.toLowerCase().startsWith('supabase ')) {
    line = line.slice('supabase '.length).trim()
  }

  const lower = line.toLowerCase()
  if (
    lower === 'help' ||
    lower === '?' ||
    lower === '--help' ||
    lower === '-h'
  ) {
    return helpText()
  }
  if (lower === 'whoami') {
    return [
      `id: ${user.id}`,
      `email: ${user.email ?? '—'}`,
      `aud: ${user.aud ?? '—'}`,
    ].join('\n')
  }
  if (lower === 'tables') {
    return KNOWN_PUBLIC_TABLES.join('\n')
  }
  if (
    lower === 'scripts' ||
    lower === 'migrations' ||
    lower.startsWith('db ') ||
    lower.startsWith('migration')
  ) {
    return scriptsHint()
  }

  const parts = line.split(/\s+/).filter(Boolean)
  const head = (parts[0] ?? '').toLowerCase()

  if (head === 'profiles' && parts[1]?.toLowerCase() === 'me') {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('id,name,email,role,language,country')
      .eq('id', user.id)
      .maybeSingle()
    if (error) return `profiles me: ${error.message}`
    return data ? JSON.stringify(data, null, 2) : 'Brak wiersza user_profiles.'
  }

  if (head === 'friendships' && parts[1]?.toLowerCase() === 'list') {
    const lim = Math.min(
      100,
      Math.max(1, Number.parseInt(parts[2] ?? '25', 10) || 25)
    )
    const orFilter = friendshipOrFilter(user.id)
    const { data, error } = await supabase
      .from('friendships')
      .select('id,status,sender_id,recipient_id,requester_id,created_at')
      .or(orFilter)
      .order('created_at', { ascending: false })
      .limit(lim)
    if (error) return `friendships list: ${error.message}`
    return data?.length ? JSON.stringify(data, null, 2) : '(brak wierszy)'
  }

  if (head === 'articles' && parts[1]?.toLowerCase() === 'count') {
    const { count, error } = await supabase
      .from('articles')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
    if (error) return `articles count: ${error.message}`
    return `articles (user_id = you): ${count ?? 0}`
  }

  return `Nieznana komenda: "${line}". Wpisz help.`
}
