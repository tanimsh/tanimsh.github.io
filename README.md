# Shakhawat H. Tanim — Personal Website

A simple, single-page academic site. Just three files (`index.html`, `style.css`, `script.js`) plus an `images/` folder — no build tools, frameworks, or installs required. Edit, save, and it's live.

## 1. Put it on GitHub Pages (step by step)

**Create the repository**
1. Go to [github.com](https://github.com) and log in as `tanimsh`.
2. Click the **+** in the top-right corner → **New repository**.
3. Name it exactly `tanimsh.github.io` (this exact name makes it your main personal site at `https://tanimsh.github.io`, with no extra folder in the URL).
4. Set it to **Public**. Don't add a README, .gitignore, or license (you already have these files). Click **Create repository**.

**Upload the files**
1. On your new repo's page, click **uploading an existing file** (or drag-and-drop).
2. Drag in `index.html`, `style.css`, `script.js`, and the whole `images` folder together.
3. Scroll down, add a commit message like "Initial site", and click **Commit changes**.

**Turn on Pages**
1. In the repo, go to **Settings** → **Pages** (left sidebar).
2. Under "Build and deployment," Source should already be set to **Deploy from a branch**, Branch: **main**, folder: **/ (root)**. Click **Save** if it wasn't already set.
3. Wait 1–2 minutes, then refresh. GitHub will show a green box: "Your site is live at `https://tanimsh.github.io`."

That's it — no command line needed. Any time you edit a file later, just re-upload it the same way (GitHub will ask to confirm overwriting) and the live site updates automatically in about a minute.

## 2. Editing the site later

Everything text-related lives in `index.html`. Open it in any text editor (or edit directly on GitHub by clicking the pencil icon on the file).

- **Bio, tags, links (top of page):** find `<section id="home" class="hero">` near the top.
- **Add/edit a project card:** each project is one `<article class="project" data-project='{...}'>` block. Copy an existing one, change the `title`, `year`, `img` (must match a filename in `images/`), and `desc`, then update the matching `<h4>`, `<p class="summary">`, and image `src` inside the card body.
- **Publications:** look for `<section id="publications">` — each entry is a `<li class="pub-item">`.
- **Awards & grants:** `<section id="awards">`.
- **Teaching:** `<section id="teaching">` — this still has two placeholder rows marked `replace with your course & term`.
- **Contact email:** it's stored base64-encoded in `data-email="..."` attributes (so spam bots can't scrape it). To change it, base64-encode your new email (e.g. using [base64encode.org](https://www.base64encode.org)) and replace the value in both places it appears near the bottom of the file.

**Swapping images:** just drop a new file into `images/` with the same filename as the one it replaces (or update the `src=` and `img` references if you rename it).

**Colors/fonts/spacing:** all in `style.css`, controlled by the CSS variables at the very top (`--bg`, `--accent`, etc.) — change those instead of hunting through the whole file.

Nothing here needs Node, npm, or a build step. It's plain HTML/CSS/JS, so any edit you save and re-upload just works.

## 3. Sharing it

Once Pages is live, the URL to share is simply:

**https://tanimsh.github.io**

It works on any device, requires no login, and loads fast since there's no backend.
