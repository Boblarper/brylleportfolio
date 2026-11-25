# Brylle Elmo Deligero — Portfolio

Complete static website export, including the latest falling book-stack animation.

## Deploy
Extract this ZIP. Upload index.html, style.css, app.js, .nojekyll, and the entire assets directory to your host's website root. Keep the directory structure intact.
No build command, npm install, server backend, API keys, environment variables, or third-party dependencies are required. Fonts are system fonts. Koi and pixel lettering are drawn by the included JavaScript.

## GitHub repository and GitHub Pages
1. Create a GitHub repository (for example, brylle-portfolio).
2. Add the extracted contents to the repository root, with index.html directly in the root. Do not upload only the ZIP.
3. In repository Settings > Pages, select Deploy from a branch, then main and / (root), and save.
4. Use the website URL GitHub provides after deployment.
The .nojekyll file disables Jekyll processing. All asset links are relative, supporting a project Pages URL.

## Local preview
From the extracted directory, run:
    python -m http.server 8000
Then visit http://localhost:8000. Python is only an optional local preview tool, not a production dependency. The copy-email feature uses the browser clipboard API and works on HTTPS or localhost (with a text fallback if unavailable).

## Included content
- Complete HTML, CSS, and JavaScript source
- Animated koi, scrolling effects, project book reader, filters, and falling stack animation
- All deployed PNG previews and original coursework PDFs
- File integrity manifest (SHA-256)

The source reference videos and inspiration image are not embedded or loaded by the website, so they are not runtime assets and are not included. There are no video files used by the finished website.

## Hosting and privacy
This export reproduces the website content and interactions. The original ChatGPT Sites private-access gate is supplied by that hosting platform and is not part of the static website. GitHub Pages or other public hosting makes the website, contact email, and included coursework PDFs accessible to visitors. No credentials or account-specific hosting identifiers are included.

## Editing
Edit index.html for content, style.css for design, and app.js for interactions. Replace files within assets while retaining their names, or update the references in index.html.
