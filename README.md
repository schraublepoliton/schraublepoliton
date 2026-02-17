Tarkov Audit — Static site

Local dev
1. Install Node.js (optional — scripts use npx).
2. Run a dev server:
   - npm start          # quick, uses http-server via npx
   - npm run dev        # live-reload (requires internet for npx)

Initialize & push to GitHub (make repo private)
1. Create a private repository on GitHub (or use the GH CLI):
   gh repo create <REPO_NAME> --private --source=. --remote=origin --push

2. Or from terminal (after creating an empty private repo on GitHub):
   git remote add origin git@github.com:<USER>/<REPO>.git
   git push -u origin main

Deploy options
- GitHub Pages (recommended): push the repository to a **private** GitHub repo. The included GitHub Actions workflow will automatically publish the site to GitHub Pages when you push to `main`.
  - After pushing, Pages will be published automatically by the action; check repository Settings → Pages if you need to change the source or visibility.
- Netlify / Vercel: connect the repo and deploy from the `main` branch if you prefer those providers.

Running the production build locally
- npm run build  # outputs a `./dist` folder (used by the GH Actions workflow)

Notes
- This project is static (HTML/CSS/JS). No server-side code included.
- The project is set as `private` in package.json to prevent accidental npm publish.
- The GitHub Pages workflow will deploy the contents of `dist/` on push to `main`.
