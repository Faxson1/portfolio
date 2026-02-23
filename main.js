/* ============================================
   MAIN.JS — Portfolio JavaScript
   ============================================ */

// ── Dynamic footer year ──────────────────────
document.getElementById('footerYear').textContent = new Date().getFullYear();

// ── Navbar scroll effect ─────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile hamburger menu ─────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  hamburger.textContent = isOpen ? '✕' : '☰';
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.textContent = '☰';
    hamburger.setAttribute('aria-expanded', false);
  });
});

// ── Dark / Light mode toggle ──────────────────
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Restore saved theme
const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
body.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
  const current = body.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  body.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
  themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
});

// ── Skill bar animation on scroll ────────────
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const width = target.getAttribute('data-width');
      target.style.width = width + '%';
      skillObserver.unobserve(target);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ── GPA CALCULATOR ────────────────────────────
const addCourseBtn = document.getElementById('addCourse');
const calcGPABtn = document.getElementById('calcGPA');
const resetGPABtn = document.getElementById('resetGPA');
const courseFields = document.getElementById('courseFields');
const calcError = document.getElementById('calcError');
const resultGPA = document.getElementById('resultGPA');
const resultClass = document.getElementById('resultClass');
const resultBreakdown = document.getElementById('resultBreakdown');

let courseCount = 1;
const MAX_COURSES = 8;

// Add a new course row
addCourseBtn.addEventListener('click', () => {
  if (courseCount >= MAX_COURSES) {
    showCalcError(`Maximum of ${MAX_COURSES} courses allowed.`);
    return;
  }
  courseCount++;
  const row = document.createElement('div');
  row.className = 'course-row';
  row.innerHTML = `
    <input type="text" class="course-name" placeholder="Course name" />
    <input type="number" class="course-mark" placeholder="Mark (0–100)" min="0" max="100" />
  `;
  courseFields.appendChild(row);
  clearCalcError();
});

// Calculate GPA
calcGPABtn.addEventListener('click', () => {
  clearCalcError();
  clearFieldErrors();

  const names = document.querySelectorAll('.course-name');
  const marks = document.querySelectorAll('.course-mark');
  const results = [];
  let hasError = false;

  marks.forEach((markInput, i) => {
    const markVal = markInput.value.trim();
    const nameVal = names[i].value.trim() || `Course ${i + 1}`;

    if (markVal === '') {
      markInput.classList.add('error-field');
      hasError = true;
      return;
    }

    const mark = parseFloat(markVal);

    if (isNaN(mark) || mark < 0 || mark > 100) {
      markInput.classList.add('error-field');
      hasError = true;
      return;
    }

    results.push({ name: nameVal, mark });
  });

  if (hasError) {
    showCalcError('Please enter valid marks (0–100) for all courses.');
    return;
  }

  if (results.length === 0) {
    showCalcError('Please add at least one course with a mark.');
    return;
  }

  // Compute GPA on a 4.0 scale using Rwandan grading approximation
  const gpaPoints = results.map(r => markToGPA(r.mark));
  const avgGPA = gpaPoints.reduce((a, b) => a + b, 0) / gpaPoints.length;
  const classification = getClassification(avgGPA);

  // Display results
  resultGPA.textContent = avgGPA.toFixed(2);
  resultClass.textContent = `${classification.label} (${classification.grade})`;
  resultClass.style.color = classification.color;

  const breakdownHTML = results.map((r, i) => {
    return `<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border);">
      <span>${r.name}</span>
      <strong>${r.mark}/100 → ${gpaPoints[i].toFixed(1)}</strong>
    </div>`;
  }).join('');
  resultBreakdown.innerHTML = breakdownHTML;
});

// Reset GPA calculator
resetGPABtn.addEventListener('click', () => {
  courseFields.innerHTML = `
    <div class="course-row">
      <input type="text" class="course-name" placeholder="Course name (e.g. Web Design)" />
      <input type="number" class="course-mark" placeholder="Mark (0–100)" min="0" max="100" />
    </div>`;
  courseCount = 1;
  clearCalcError();
  resultGPA.textContent = '—';
  resultClass.textContent = 'Enter your marks to begin';
  resultClass.style.color = '';
  resultBreakdown.innerHTML = '';
});

// Helper: Convert percentage mark → GPA point (Rwandan/standard scale)
function markToGPA(mark) {
  if (mark >= 90) return 4.0;
  if (mark >= 80) return 3.7;
  if (mark >= 75) return 3.3;
  if (mark >= 70) return 3.0;
  if (mark >= 65) return 2.7;
  if (mark >= 60) return 2.3;
  if (mark >= 55) return 2.0;
  if (mark >= 50) return 1.7;
  if (mark >= 45) return 1.3;
  if (mark >= 40) return 1.0;
  return 0.0;
}

// Helper: Map average GPA → classification
function getClassification(gpa) {
  if (gpa >= 3.7) return { label: 'First Class Honours', grade: 'A', color: '#27ae60' };
  if (gpa >= 3.0) return { label: 'Upper Second Class', grade: 'B+', color: '#2980b9' };
  if (gpa >= 2.3) return { label: 'Lower Second Class', grade: 'B', color: '#8e44ad' };
  if (gpa >= 1.7) return { label: 'Third Class', grade: 'C', color: '#e67e22' };
  if (gpa >= 1.0) return { label: 'Pass', grade: 'D', color: '#e74c3c' };
  return { label: 'Fail', grade: 'F', color: '#c0392b' };
}

function showCalcError(msg) {
  calcError.textContent = msg;
}

function clearCalcError() {
  calcError.textContent = '';
}

function clearFieldErrors() {
  document.querySelectorAll('.course-mark.error-field').forEach(el => el.classList.remove('error-field'));
}

// ── CONTACT FORM VALIDATION ───────────────────
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  clearFormErrors();

  const name = document.getElementById('cName');
  const email = document.getElementById('cEmail');
  const msg = document.getElementById('cMsg');
  let valid = true;

  if (!name.value.trim() || name.value.trim().length < 2) {
    showFieldError('cNameErr', name, 'Please enter your full name (at least 2 characters).');
    valid = false;
  }

  if (!email.value.trim() || !isValidEmail(email.value.trim())) {
    showFieldError('cEmailErr', email, 'Please enter a valid email address.');
    valid = false;
  }

  if (!msg.value.trim() || msg.value.trim().length < 10) {
    showFieldError('cMsgErr', msg, 'Message must be at least 10 characters.');
    valid = false;
  }

  if (valid) {
    formSuccess.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
    contactForm.reset();
    setTimeout(() => { formSuccess.textContent = ''; }, 5000);
  }
});

function showFieldError(errId, inputEl, msg) {
  document.getElementById(errId).textContent = msg;
  inputEl.classList.add('input-error');
}

function clearFormErrors() {
  ['cNameErr', 'cEmailErr', 'cMsgErr'].forEach(id => {
    document.getElementById(id).textContent = '';
  });
  ['cName', 'cEmail', 'cMsg'].forEach(id => {
    document.getElementById(id).classList.remove('input-error');
  });
  formSuccess.textContent = '';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── CV DOWNLOAD (print-friendly HTML page) ────
document.getElementById('downloadCV').addEventListener('click', () => {
  const cvHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>CV — Marie Claire Uwimana</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Georgia, serif; color: #1a1714; font-size: 13px; line-height: 1.6; padding: 48px; max-width: 820px; margin: auto; }
    .cv-top { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #c84b31; padding-bottom: 16px; margin-bottom: 24px; }
    h1 { font-size: 2rem; color: #c84b31; }
    .role { color: #6b6560; font-size: 0.95rem; margin-top: 4px; }
    .contact-info { text-align: right; font-size: 0.85rem; line-height: 1.8; }
    .section { margin-bottom: 24px; }
    h2 { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.12em; color: #c84b31; border-bottom: 1px solid #e2ddd8; padding-bottom: 4px; margin-bottom: 12px; }
    .two-col { display: flex; gap: 40px; }
    .col { flex: 1; }
    .entry { margin-bottom: 12px; }
    .entry strong { display: block; font-size: 0.9rem; }
    .entry .date { color: #c84b31; font-size: 0.78rem; }
    .entry p { color: #6b6560; font-size: 0.85rem; }
    .tags { display: flex; flex-wrap: wrap; gap: 6px; }
    .tag { border: 1px solid #e2ddd8; border-radius: 4px; padding: 2px 8px; font-size: 0.78rem; }
    @media print { body { padding: 24px; } }
  </style>
</head>
<body>
  <div class="cv-top">
    <div>
      <h1>Marie Claire Uwimana</h1>
      <p class="role">Frontend Developer · Year II Computer Science, INES-Ruhengeri</p>
    </div>
    <div class="contact-info">
      <div>📧 mc.uwimana@email.com</div>
      <div>📞 +250 788 000 000</div>
      <div>📍 Musanze, Rwanda</div>
      <div>⑂ github.com/marieclaireuwimana</div>
    </div>
  </div>

  <div class="two-col">
    <div class="col">
      <div class="section">
        <h2>Education</h2>
        <div class="entry">
          <strong>BSc Computer Science</strong>
          <span class="date">2024 – Present</span>
          <p>INES-Ruhengeri, Musanze, Rwanda</p>
        </div>
        <div class="entry">
          <strong>High School — Sciences</strong>
          <span class="date">2021 – 2023</span>
          <p>Ecole Secondaire de Musanze</p>
        </div>
      </div>

      <div class="section">
        <h2>Languages</h2>
        <p>Kinyarwanda (Native) · French (Fluent) · English (Professional)</p>
      </div>

      <div class="section">
        <h2>Profile</h2>
        <p>Passionate frontend developer with strong foundations in semantic HTML5, responsive CSS layouts, and JavaScript DOM manipulation. Committed to building accessible, user-friendly digital solutions for East Africa.</p>
      </div>
    </div>

    <div class="col">
      <div class="section">
        <h2>Technical Skills</h2>
        <div class="tags">
          <span class="tag">HTML5</span><span class="tag">CSS3</span><span class="tag">JavaScript</span>
          <span class="tag">Flexbox</span><span class="tag">CSS Grid</span><span class="tag">Git</span>
          <span class="tag">GitHub</span><span class="tag">Bootstrap</span><span class="tag">Responsive Design</span>
        </div>
      </div>

      <div class="section">
        <h2>Projects</h2>
        <div class="entry">
          <strong>Student Course Portal</strong>
          <p>Mobile-first student schedule and grades viewer. HTML5 · CSS3 · JavaScript</p>
        </div>
        <div class="entry">
          <strong>Musanze Events Board</strong>
          <p>Community platform for local cultural and tourism events. Flexbox · Vanilla JS</p>
        </div>
        <div class="entry">
          <strong>Personal Budget Tracker</strong>
          <p>Real-time income/expense tracker with DOM manipulation. CSS Grid · JS</p>
        </div>
      </div>
    </div>
  </div>

  <script>window.print();</script>
</body>
</html>`;

  const blob = new Blob([cvHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (!win) {
    // Fallback: direct download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Marie_Claire_Uwimana_CV.html';
    a.click();
  }
});
