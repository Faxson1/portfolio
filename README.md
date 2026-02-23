# GAHIMA FAXSON — Personal Portfolio

**Live Portfolio:** [To be added after deployment]  
**GitHub Repository:** [To be added]  
**Assignment:** Advanced Web Design & Development – Ass#1  
**Institution:** INES-Ruhengeri, Department of Computer Science  
**Year:** II FEB Day Program, 2025–2026

---

## Project Structure

```
portfolio/
│
├── index.html          # Main single-page application
├── css/
│   └── styles.css      # All styles (Flexbox, media queries, variables)
├── js/
│   └── main.js         # All JavaScript (GPA calc, form validation, DOM)
├── assets/
│   ├── images/         # Profile and project images
│   └── cv/             # CV assets
└── README.md
```

---

## Features

- ✅ Semantic HTML5 structure (`<nav>`, `<section>`, `<article>`, `<footer>`)
- ✅ CSS Custom Properties (variables) for theming
- ✅ Flexbox layout throughout
- ✅ Fluid typography using `clamp()`
- ✅ Responsive design: mobile (≤600px), tablet (≤900px), desktop
- ✅ Dark/Light mode toggle (persisted in localStorage)
- ✅ GPA Calculator with validation and DOM manipulation
- ✅ Animated skill progress bars (IntersectionObserver)
- ✅ Contact form with full validation
- ✅ Downloadable CV (prints as HTML/PDF)
- ✅ Mobile hamburger menu
- ✅ Dynamic footer year

---

## Sections

1. **Hero** — Name, role, tagline, CTA button
2. **About Me** — Background, program, career goal, skill tags
3. **Technical Skills** — Cards with animated progress bars
4. **Projects** — 3 real academic projects with descriptions, tech stack, GitHub links
5. **GPA Calculator** — Student GPA Calculator (Option A) with input validation
6. **CV Section** — HTML CV preview + download button
7. **Contact** — Email, phone, GitHub, LinkedIn, validated form

---

## JavaScript Features Implemented

- `IntersectionObserver` for skill bar animations
- Dark/light mode with `localStorage` persistence
- Mobile menu toggle (hamburger)
- GPA Calculator with mark-to-GPA conversion and classification logic
- Contact form validation (name, email, message)
- Dynamic footer year
- CV download (Blob URL → new window → print)

---

## AI Usage Declaration

> This declaration is required per the assignment AI Usage Policy.

**What I asked AI:**
- Explained the CSS `clamp()` function and how fluid typography works
- Asked for clarification on the `IntersectionObserver` API syntax
- Used AI to debug a CSS flexbox alignment issue where the hero image was overflowing on mobile
- Asked for the Git commands to initialize a repo and push to GitHub (`git init`, `git add .`, `git commit -m "..."`, `git remote add origin`, `git push`)

**What I implemented myself:**
- All HTML structure 
- All CSS layout architecture (Flexbox, media queries, CSS variables)
- Form validation logic and error display
- Dark mode theming system
- All content (bio, projects, CV information)
- Overall design

**What I modified from AI explanations:**
- The `IntersectionObserver` example I got was for a different use case (lazy loading images); I adapted it to trigger skill bar animations
- The CSS `clamp()` syntax was explained to me in a generic context; I applied it specifically to the hero name font size and section titles

---

## How to Run Locally

```bash
# Clone the repository
git clone https://github.com/marieclaireuwimana/portfolio.git

# Open in browser
cd portfolio
open index.html
# or use VS Code Live Server extension
```

---

## Deployment

Hosted on: [GitHub Pages / Netlify — link to be added]

---

*Submitted: 19th February 2026*
