# Dr. Prarthan KN — Clinical Pharmacy & Research Dossier

Personal academic and clinical pharmacy portfolio for **Dr. Prarthan KN (PharmD PB, B.Pharm)**, pre-configured for **GitHub Pages** using either automatic GitHub Actions builds or instant zero-build hosting from `/docs`.

---

## Why GitHub Pages Might Show a Blank Page or 404

The root `index.html` in this repository is a Vite + React source entry point (`src/main.tsx`), which browsers cannot execute directly without building first. If GitHub Pages is pointed at **Branch: `main` → `/ (root)`**, it will fail to open.

Use **either** of the two working methods below:

---

## Option 1: Automatic Full React Build (Recommended)

A ready-to-run workflow is included at `.github/workflows/deploy.yml`.

1. Push this repository to GitHub (make sure the repository is **Public**, or you have GitHub Pro for private Pages).
2. In your GitHub repository, open **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Push a commit to `main` (or open the **Actions** tab → **Deploy Portfolio to GitHub Pages** → **Run workflow**).
5. Your live URL will appear in **Settings → Pages** within 1–2 minutes.

---

## Option 2: Instant Zero-Build Hosting via `/docs` (No Actions Needed)

A complete standalone zero-build bundle is pre-packaged inside `/docs` (`index.html`, `profile.jpg`, `CV.pdf`, and `.nojekyll`).

1. Push this repository to GitHub.
2. Open **Settings → Pages → Build and deployment**.
3. Set **Source** to **Deploy from a branch**.
4. Select Branch **`main`** and Folder **`/docs`**, then click **Save**.
5. Wait 1–2 minutes and open `https://<your-username>.github.io/<repo-name>/`.

---

## Option 3: Upload Standalone Files to Any Repo Root

Copy all files from `github-pages/` (`index.html`, `profile.jpg`, `CV.pdf`, `.nojekyll`) directly to the root of a new public repository and set **Settings → Pages** to **`main` → `/ (root)`**.
