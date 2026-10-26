# TaskSphere Pro

Interface, sidebar, themes, companion, boss, bounty, heatmap and command palette come from the Gemini build. Supabase auth and sync, the per-user RLS schema, PWA install and the offline shell come from the ChatGPT build.

## Run it
1. Serve this folder from localhost or HTTPS (for example VS Code Live Server, or `python3 -m http.server 5500`). `file://` will not support sign-in, install or offline.
2. In Supabase, open SQL Editor and run `supabase.sql` once.
3. Under Authentication, URL Configuration, add your app address to Redirect URLs (for local testing `http://localhost:5500/**` and `http://127.0.0.1:5500/**`; add your deployed URL too).
4. For Google, GitHub or Apple sign-in, set up each provider in Supabase as described in the ChatGPT README. Email sign-in works without that.
5. The Supabase URL and public anon key are already set in `index.html`. Never put a service-role key in this app.

## Added in this merge
- Offline app shell (service worker, cache v11) and install support.
- Timer catches up when you return to the tab, and a browser notification fires if a focus session ends while the tab is hidden.
- Reconnect re-runs cloud sync.

## Limits
Sync is last-write-wins per profile. XP is client-side, so it is not tamper-proof. Live sign-in, sync and offline behaviour have not been tested in this build.

## Makeover (this folder)
A styling layer sits on top of the merged app: IBM Plex type, flat cards with an 8px corner radius, a compact sidebar and top bar, no glow background in Cyber, and sentence-case section labels. Cyber and Zen get the full skin; Retro and Brutalist keep their own looks with the same layout cleanup. All features, shortcuts (Ctrl or Cmd K, N, ?) and the theme hub are unchanged. The `tasksphere-merged` folder is the version before the makeover, kept as a fallback.

## Tabs and new features
- **Five tabs:** Home (stats and quest capture), Quest board, Progress (rank, daily bounty, consistency map, weekly momentum, coming up next, streak shield), Focus mode, and Sanctuary (companion and Procrastination Dragon). Shortcuts: Alt+1 to Alt+5. The sidebar collapses to an icon rail (button at the bottom, automatic on tablets) and becomes a bottom bar on phones.
- **12 ranks:** Ember Initiate, Spark Adept, Ironquill Scribe, Dawnwarden, Stormcaller, Veilbreaker, Starforged Vanguard, Eclipse Sentinel, Aether Architect, Zenith Paragon, Mythic Sovereign, Eternal Ascendant. The first five keep their original XP thresholds, so theme unlocks are unchanged.
- **Companion:** six stages tied to rank. It hatches at Level 2 and evolves at Levels 3, 5, 7 and 10.
- **Settings:** tabbed Account, Preferences and Data panels.
- **Animations:** Tailwind CSS (CDN, preflight off) powers the entrance and press animations, with plain CSS fallbacks. The 365-day consistency map no longer stretches the page.
