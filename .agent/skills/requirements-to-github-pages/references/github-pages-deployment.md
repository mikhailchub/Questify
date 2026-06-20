# GitHub Pages deployment guidance

Prefer a custom GitHub Actions workflow for deployment.

## Choose the right template

### `assets/github-pages-static.yml`
Use for:
- plain HTML, CSS, and JavaScript apps
- projects with no build command
- repositories where the published artifact can be the repository root or a prepared static directory

### `assets/github-pages-node.yml`
Use for:
- Vite or other build-based apps
- projects that publish a generated directory such as `dist/`

## Repository updates

At minimum, make sure the repository includes:
- application code
- `.github/workflows/` with the chosen Pages workflow
- `README.md` instructions for local run and deployment
- `docs/sdr/` with the architecture decisions

## Vite-specific note

For project Pages sites, configure asset resolution for the repository path. If you choose a build-based app and the deployed site is served from a repository subpath, make sure the build output uses the correct base path or relative asset paths.

## When auth or repo controls are unavailable

Still generate:
- the workflow file
- any needed build configuration
- the implementation notes

Then explain exactly what the user must do manually in GitHub to complete deployment.
