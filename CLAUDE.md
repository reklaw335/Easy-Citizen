# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at http://localhost:3000
npm run build    # Production build
npm run start    # Run production build
```

> **Node.js constraint:** This project uses Next.js 13 (not 14+) because the machine runs Node.js 18.13.0, which is below the 18.17.0 minimum required by Next.js 14. Do not upgrade Next.js without first confirming the Node version.

> **Tailwind constraint:** Tailwind CSS is pinned to v3. Tailwind v4 moved its PostCSS plugin to a separate package (`@tailwindcss/postcss`) and is incompatible with the current `postcss.config.js` and `tailwind.config.ts` setup. Do not upgrade Tailwind without updating the PostCSS config and globals.css directives.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in keys before using live data:

```
VOTESMART_API_KEY=    # register at votesmart.org/share/api
FEC_API_KEY=          # register at api.data.gov/signup
PROPUBLICA_API_KEY=   # email api@propublica.org
```

When all three keys are empty, the app automatically enters **Demo Mode**, serving mock data from `src/lib/mockData.ts`. This is detected server-side in `src/app/page.tsx` and passed as `isDemoMode` prop to the client dashboard.

## Architecture

### Data Flow

All external API calls are proxied through Next.js API routes to keep keys server-side and avoid CORS issues:

```
Client component
  → src/lib/{votesmart,fec,propublica}.ts   (typed client fetchers, call /api/*)
    → src/app/api/{votesmart,fec,propublica}/route.ts   (server proxy routes)
      → External API (or mockData.ts if key is empty)
```

Each proxy route checks if its key is empty and falls back to mock data — no separate code path is needed in the client fetchers.

### API Responsibilities

| API | Data provided | Geographic scope |
|-----|--------------|-----------------|
| VoteSmart (`api.votesmart.org`) | Rep search, bio, voting records, interest group ratings | Local, State, Federal |
| FEC OpenFEC (`api.open.fec.gov/v1`) | Campaign finance totals, top contributors | Federal only |
| ProPublica Congress (`api.propublica.org/congress/v1`) | Sponsored bills, recent votes | Federal only |

The Finance and Bills tabs show a "Federal data only" message when a state/local rep is selected — this is determined by `rep.level` on the `Representative` type.

### VoteSmart `officeTypeId` → level mapping

- `C` (Congress/House), `S` (Senate), `P` (President) → `federal`
- `L` → `local`
- anything else → `state`

### Component Structure

`page.tsx` (server component) checks env vars and passes `isDemoMode` to `Dashboard` (client). `Dashboard` wraps everything in `QueryProvider` (TanStack Query), then renders a split-panel layout: `SearchBar` + `RepresentativeList` on the left, `RepresentativeDetail` on the right.

`RepresentativeDetail` manages tab state and renders one of five tab components, each of which makes its own `useQuery` calls independently:

- `OverviewTab` — VoteSmart bio
- `VotingHistoryTab` — VoteSmart votes
- `BillsTab` — ProPublica bills (first resolves member ID via name search)
- `FinanceTab` — FEC totals + contributors (first resolves FEC candidate ID by name)
- `LobbyingTab` — VoteSmart interest group ratings

### Indirect ID Resolution

ProPublica and FEC don't share IDs with VoteSmart. When a user selects a rep, the Bills and Finance tabs perform a two-step lookup: search by `rep.fullName` to get the external ID, then fetch the actual data. Both steps are separate `useQuery` calls with `enabled: !!externalId`.

### Mock Data

`src/lib/mockData.ts` contains three sample representatives (IDs `9490`, `9491`, `9492`) with full bio, votes, ratings, finance, and bills data. When adding new API endpoints, add corresponding mock entries here keyed by `candidateId` (VoteSmart) or the relevant ID.
