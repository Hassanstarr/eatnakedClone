# Git workflow

Changes flow through GitHub pull requests:

```text
feature/<section> -> production -> main
```

Every merge must happen through a GitHub pull request, including syncing changes back into a feature branch. Never run a local `git merge`, a rebase, or a plain `git pull`. Use `git pull --ff-only` to download already-merged GitHub history without creating a local merge commit. If it fails, stop and resolve the divergence through a GitHub PR instead.

- `main`: stable release branch and GitHub default branch.
- `production`: integration branch where completed sections are combined and checked.
- `feature/*`: isolated work for one page or shared section, starting from `production`.

Despite its name, `production` is the integration branch in this workflow. Configure your live deployment to use `main`.

## Initial branches

```text
main
production
feature/shared-layout
feature/home
feature/about-us
feature/community
feature/our-menu
feature/customer-support
feature/register
feature/login
feature/forgot-password
feature/terms
feature/privacy-policy
```

All initial branches point to the same scaffold commit. A branch will have a meaningful pull request only after it has changes.

## Connect GitHub once

Create an empty GitHub repository without a README, license, or .gitignore. Replace the example URL below with its actual URL:

```bash
git remote add origin https://github.com/YOUR-USERNAME/eatnaked.git
git push -u origin main
git push -u origin production
```

Publish each feature branch when you start using it, for example:

```bash
git push -u origin feature/home
```

To publish all initial branches together instead:

```bash
git push --all origin
```

## Work on a section

Keep the working tree clean before switching branches. For an existing branch:

```bash
git fetch origin
git switch feature/home
git pull --ff-only origin feature/home
```

If this branch needs changes from `production`, first use the sync PR instructions below.

For a new task branch:

```bash
git fetch origin
git switch production
git pull --ff-only origin production
git switch -c feature/home-hero
```

Make changes, check them, commit, and push:

```bash
npm run build
git add src/pages/Home.jsx
git commit -m "Build homepage hero"
git push -u origin HEAD
```

Stage the actual files you changed. Shared files such as App.jsx should be coordinated to reduce conflicts between section branches.

## Merge a section on GitHub

1. Open the repository and select Pull requests > New pull request.
2. Set base to `production` and compare to your `feature/...` branch.
3. Review Files changed, write a descriptive title, and create the pull request.
4. Review and verify the changes, then use Create a merge commit.
5. Delete the merged feature branch on GitHub if the task is finished. Use a new task branch for later work.

To bring another in-progress feature branch up to date after this merge, create a separate GitHub sync PR:

1. Set base to `feature/about-us` and compare to `production`.
2. Review and merge the sync PR on GitHub using Create a merge commit.
3. Download that branch's updated history locally:

```bash
git fetch origin
git switch feature/about-us
git pull --ff-only origin feature/about-us
```

Resolve supported conflicts in GitHub's PR conflict editor, review the result, and complete the PR there. If GitHub cannot resolve a complex conflict in its editor, stop and discuss a recovery approach; do not fall back to a local merge.

## Release production into main

1. Test the combined `production` branch, including `npm run build` and browser checks.
2. On GitHub, create a pull request with base `main` and compare `production`.
3. Review it and use Create a merge commit. Avoid squash/rebase for this long-lived branch pair to preserve shared ancestry.
4. Keep the `production` branch; do not delete it after release.
5. Refresh local branches:

```bash
git switch main
git pull --ff-only origin main
git switch production
git pull --ff-only origin production
```

If main gets an independent hotfix, open a GitHub pull request with base `production` and compare `main` so future work includes the fix.

## GitHub settings

- Keep `main` as the default branch.
- Protect `main` and `production` with rules requiring pull requests.
- Prevent force pushes and branch deletion on both long-lived branches.
- Require an approving review when another reviewer is available. Solo repositories should not require an approval the author cannot provide.
- If CI is added, require its build check after the check has run successfully.
- Keep merge commits enabled. Do not require linear history with this merge strategy.
- The intended source for main PRs is `production`; requiring a PR alone does not enforce that source-branch restriction.

GitHub references:

- https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request
- https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
