# Working in this repo

## Commits & merges
- **Batch work, merge once.** Make all the commits for a round of work on the
  working branch, then open a single PR and merge it in one go. Do **not** open
  and merge a separate PR for every small change — accumulate related changes
  and merge them together.
- Squash-merge PRs. The feature branch diverges after each squash, so re-sync
  before new work: `git fetch origin main && git checkout -B <branch> origin/main`.

## Project notes
- React 19 + Vite + TypeScript SPA. The studio site lives at `pages/StudioPage.tsx`
  and renders on the `studio.workwithabhi.online` subdomain (see `App.tsx`).
- To preview the studio locally/in screenshots, temporarily force
  `isStudioSubdomain = true` in `App.tsx`, then revert before committing.
- Work-card previews use a screenshot provider chain (static `shot` → thum.io →
  mShots → wordmark). Drop a file in `/public` and set a project's `shot` field
  for an instant local screenshot.
