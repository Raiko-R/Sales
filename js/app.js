/* ═══════════════════════════════════════════════════════════════
   SALESLAB UNIVERSITY — MAIN APPLICATION
   ═══════════════════════════════════════════════════════════════ */

'use strict';

// ── Merge course data ──────────────────────────────────────────
// Combines base courses (courses.js) with Phase 2 courses (new_courses.js)
if (typeof NEW_COURSES_DATA !== 'undefined' && Array.isArray(NEW_COURSES_DATA)) {
  NEW_COURSES_DATA.forEach(nc => {
    if (!COURSES_DATA.find(c => c.id === nc.id)) COURSES_DATA.push(nc);
  });
}

// ── State ──────────────────────────────────────────────────────
const STATE = {
  currentPage: 'home',
  currentCourseId: null,
  currentModuleId: null,
  currentStep: 'theory',   // theory | quiz | scenario | complete
  quizAnswered: false,
  scenarioAnswered: false,
  jobsFilter: 'all',
  libraryFilter: 'all',
};

// ── Progress (localStorage) ────────────────────────────────────
const PROGRESS = {
  get() {
    try { return JSON.parse(localStorage.getItem('sl_progress') || '{}'); }
    catch { return {}; }
  },
  save(data) {
    try { localStorage.setItem('sl_progress', JSON.stringify(data)); } catch {}
  },
  getXP() {
    const p = this.get();
    return p.totalXP || 0;
  },
  getCompletedModules() {
    const p = this.get();
    return p.completed || {};
  },
  isModuleComplete(moduleId) {
    return !!this.getCompletedModules()[moduleId];
  },
  completeModule(moduleId, xp) {
    const p = this.get();
    if (!p.completed) p.completed = {};
    if (!p.completed[moduleId]) {
      p.completed[moduleId] = { xp, completedAt: Date.now() };
      p.totalXP = (p.totalXP || 0) + xp;
      p.lastActivity = Date.now();
      this.updateStreak(p);
    }
    this.save(p);
    return p;
  },
  updateStreak(p) {
    const now = Date.now();
    const today = new Date(now).toDateString();
    if (!p.lastStreakDate) {
      p.streak = 1;
      p.lastStreakDate = today;
    } else if (p.lastStreakDate !== today) {
      const yesterday = new Date(now - 86400000).toDateString();
      p.streak = p.lastStreakDate === yesterday ? (p.streak || 0) + 1 : 1;
      p.lastStreakDate = today;
    }
  },
  getCourseProgress(courseId) {
    const course = COURSES_DATA.find(c => c.id === courseId);
    if (!course) return { completed: 0, total: 0, pct: 0 };
    const completed = this.getCompletedModules();
    const done = course.modules.filter(m => completed[m.id]).length;
    return { completed: done, total: course.modules.length, pct: Math.round((done / course.modules.length) * 100) };
  }
};

// ── Helpers ────────────────────────────────────────────────────
function $(sel, ctx = document) { return ctx.querySelector(sel); }
function $$(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

function el(tag, cls, html = '') {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html) e.innerHTML = html;
  return e;
}

function escHtml(s) {
  if (!s) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function levelColor(level) {
  const map = { Beginner: 'var(--beginner)', Intermediate: 'var(--intermediate)', Advanced: 'var(--advanced)', Expert: 'var(--expert)' };
  return map[level] || 'var(--accent)';
}

function levelBadgeStyle(level) {
  const colors = {
    Beginner:     { bg: 'rgba(16,185,129,0.12)',  color: '#10B981' },
    Intermediate: { bg: 'rgba(168,85,247,0.12)', color: '#A855F7' },
    Advanced:     { bg: 'rgba(245,158,11,0.12)',  color: '#F59E0B' },
    Expert:       { bg: 'rgba(239,68,68,0.12)',   color: '#EF4444' },
  };
  const c = colors[level] || colors.Beginner;
  return `background:${c.bg};color:${c.color};`;
}

function xpLevel(xp) {
  if (xp >= 15000) return { level: 10, name: 'Grand Master', icon: '👑' };
  if (xp >= 10000) return { level: 9,  name: 'Elite Closer', icon: '💎' };
  if (xp >= 7000)  return { level: 8,  name: 'Deal Architect', icon: '🏆' };
  if (xp >= 5000)  return { level: 7,  name: 'Enterprise Seller', icon: '⚡' };
  if (xp >= 3500)  return { level: 6,  name: 'Consultative Pro', icon: '🔥' };
  if (xp >= 2500)  return { level: 5,  name: 'Pipeline Builder', icon: '🎯' };
  if (xp >= 1500)  return { level: 4,  name: 'Cold Outreach Pro', icon: '📞' };
  if (xp >= 750)   return { level: 3,  name: 'Discovery Learner', icon: '🔍' };
  if (xp >= 250)   return { level: 2,  name: 'Sales Apprentice', icon: '📚' };
  return              { level: 1,  name: 'Rookie', icon: '🌱' };
}

function showXPToast(xp) {
  const toast = $('#xp-toast');
  const text = $('#xp-toast-text');
  if (!toast || !text) return;
  text.textContent = `+${xp} XP`;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 2800);
}

// ── Router ─────────────────────────────────────────────────────
function navigate(page, params = {}) {
  // Hide all pages
  $$('.page').forEach(p => p.classList.add('hidden'));
  // Show target
  const target = $(`#page-${page}`);
  if (!target) { navigate('home'); return; }
  target.classList.remove('hidden');
  STATE.currentPage = page;

  // Update nav links
  $$('.nav-link').forEach(l => {
    l.classList.toggle('active', l.dataset.page === page);
  });

  // Scroll to top
  window.scrollTo(0, 0);

  // Update hash for bookmarking
  if (page === 'lesson' && params.course && params.module) {
    history.replaceState(null, '', `#lesson/${params.course}/${params.module}`);
  } else if (page !== 'home') {
    history.replaceState(null, '', `#${page}`);
  } else {
    history.replaceState(null, '', window.location.pathname);
  }

  // Render page
  switch (page) {
    case 'home':    renderHome(); break;
    case 'library': renderLibrary(params.filter); break;
    case 'lesson':  renderLesson(params.course, params.module); break;
    case 'jobs':    renderJobs(); break;
    case 'glossary': renderGlossary(); break;
    case 'profile': renderProfile(); break;
  }

  updateNavXP();
}

function updateNavXP() {
  const xp = PROGRESS.getXP();
  const el = $('#nav-xp-value');
  if (el) el.textContent = `${xp.toLocaleString()} XP`;
}

// ── Global Click Handler ───────────────────────────────────────
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-page]');
  if (btn) {
    e.preventDefault();
    const page = btn.dataset.page;
    const params = {};
    if (btn.dataset.course) params.course = btn.dataset.course;
    if (btn.dataset.module) params.module = btn.dataset.module;
    if (btn.dataset.filter) params.filter = btn.dataset.filter;
    navigate(page, params);
  }
});

// Hamburger menu
$('#nav-hamburger')?.addEventListener('click', () => {
  $('#nav-mobile-menu')?.classList.toggle('open');
});

// ═══════════════════════════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════════════════════════
function renderHome() {
  renderPathsGrid();
  renderCoursesPreviewGrid();
}

function renderPathsGrid() {
  const grid = $('#paths-grid');
  if (!grid) return;
  const levels = [
    { level: 'Beginner', emoji: '🌱', desc: 'Zero to first sales job. Cold email, cold calling, LinkedIn, interview mastery.', courses: 4 },
    { level: 'Intermediate', emoji: '⚡', desc: 'SDR to AE. Outbound prospecting, discovery calls, demos, consultative selling.', courses: 6 },
    { level: 'Advanced', emoji: '🔥', desc: 'AE mastery. Account management, customer success, negotiation, sales engineering.', courses: 6 },
    { level: 'Expert', emoji: '💎', desc: 'Sales leadership, operations, high-ticket selling, and mastery synthesis.', courses: 4 },
  ];
  grid.innerHTML = levels.map(p => `
    <div class="path-card" data-page="library" data-filter="${p.level}" style="cursor:pointer">
      <div class="path-level-badge" style="${levelBadgeStyle(p.level)}">${p.emoji} ${p.level}</div>
      <h3>${p.level} Track</h3>
      <p>${p.desc}</p>
      <div class="path-course-count">${p.courses} courses in this track →</div>
    </div>
  `).join('');
}

function renderCoursesPreviewGrid() {
  const grid = $('#courses-preview-grid');
  if (!grid) return;
  grid.innerHTML = COURSES_DATA.map(c => `
    <div class="course-mini-card" data-page="library" style="--course-color:${c.color}">
      <div class="cmc-emoji">${c.emoji}</div>
      <div class="cmc-name">${c.name}</div>
      <div class="cmc-meta">
        <span class="cmc-level" style="color:${levelColor(c.level)}">${c.level}</span>
        <span class="cmc-xp">⚡ ${c.totalXP.toLocaleString()} XP</span>
      </div>
    </div>
  `).join('');
}

// ═══════════════════════════════════════════════════════════════
// COURSE LIBRARY
// ═══════════════════════════════════════════════════════════════
function renderLibrary(filterOverride) {
  if (filterOverride) {
    STATE.libraryFilter = filterOverride;
  }

  const filters = $$('.filter-btn', $('#library-filters'));
  filters.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === STATE.libraryFilter ||
      (STATE.libraryFilter === 'all' && btn.dataset.filter === 'all'));
  });

  // Filter button clicks
  $$('.filter-btn', $('#library-filters')).forEach(btn => {
    btn.onclick = () => {
      STATE.libraryFilter = btn.dataset.filter;
      renderLibrary();
    };
  });

  const grid = $('#courses-grid');
  if (!grid) return;

  const filtered = STATE.libraryFilter === 'all'
    ? COURSES_DATA
    : COURSES_DATA.filter(c => c.level === STATE.libraryFilter);

  const completed = PROGRESS.getCompletedModules();

  grid.innerHTML = filtered.map(course => {
    const prog = PROGRESS.getCourseProgress(course.id);
    const isStarted = prog.completed > 0;
    const firstModule = course.modules[0];
    return `
      <div class="course-card" data-page="lesson" data-course="${course.id}" data-module="${firstModule.id}">
        <div class="course-card-top">
          <div class="cc-color-bar" style="background:${course.color}"></div>
          <div class="cc-emoji">${course.emoji}</div>
          <div class="cc-level" style="${levelBadgeStyle(course.level)}">${course.level}</div>
          <div class="cc-name">Course ${course.number}: ${course.name}</div>
          <div class="cc-premise">${escHtml(course.premise || '')}</div>
        </div>
        ${isStarted ? `<div class="cc-progress"><div class="cc-progress-bar" style="width:${prog.pct}%"></div></div>` : ''}
        <div class="course-card-bottom">
          <span class="cc-modules">7 modules ${isStarted ? `· ${prog.pct}% complete` : ''}</span>
          <span class="cc-xp">⚡ ${course.totalXP.toLocaleString()} XP</span>
        </div>
      </div>
    `;
  }).join('');
}

// ═══════════════════════════════════════════════════════════════
// LESSON PLAYER
// ═══════════════════════════════════════════════════════════════
function renderLesson(courseId, moduleId) {
  const course = COURSES_DATA.find(c => c.id === courseId);
  if (!course) { navigate('library'); return; }

  const moduleIndex = moduleId
    ? course.modules.findIndex(m => m.id === moduleId)
    : 0;
  const modIdx = Math.max(0, moduleIndex);
  const module = course.modules[modIdx];
  if (!module) { navigate('library'); return; }

  STATE.currentCourseId = courseId;
  STATE.currentModuleId = module.id;
  STATE.currentStep = 'theory';
  STATE.quizAnswered = false;
  STATE.scenarioAnswered = false;

  renderSidebar(course, module);
  renderLessonTopbar(course, module);
  renderTheoryStep(course, module);
  renderQuizStep(module);
  renderScenarioStep(module);

  // Show theory
  showStep('theory');
}

function showStep(step) {
  STATE.currentStep = step;
  $$('.lesson-step').forEach(s => s.classList.add('hidden'));
  $(`#lesson-step-${step}`)?.classList.remove('hidden');
  $('#lesson-main')?.scrollTo(0, 0);
  // Scroll lesson main to top
  const main = document.querySelector('.lesson-main');
  if (main) main.scrollTo(0, 0);
}

// Sidebar
function renderSidebar(course, activeModule) {
  const nameEl = $('#sidebar-course-name');
  if (nameEl) nameEl.textContent = `Course ${course.number}: ${course.name}`;

  const prog = PROGRESS.getCourseProgress(course.id);
  const barEl = $('#sidebar-progress-bar');
  const textEl = $('#sidebar-progress-text');
  if (barEl) barEl.style.width = `${prog.pct}%`;
  if (textEl) textEl.textContent = `${prog.pct}%`;

  const nav = $('#sidebar-nav');
  if (!nav) return;
  nav.innerHTML = course.modules.map((mod, i) => {
    const isActive = mod.id === activeModule.id;
    const isDone = PROGRESS.isModuleComplete(mod.id);
    return `
      <button class="sidebar-module-btn ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}"
        data-course="${course.id}" data-module="${mod.id}" data-page="lesson">
        <span class="smb-number">${isDone ? '' : i + 1}</span>
        <span class="smb-text">
          <span class="smb-title">${escHtml(mod.title)}</span>
          <span class="smb-xp">⚡ ${mod.xp} XP</span>
        </span>
      </button>
    `;
  }).join('');

  // Back button
  const backBtn = $('.back-btn', document.querySelector('.lesson-sidebar'));
  if (backBtn) backBtn.onclick = () => navigate('library');
}

// Topbar
function renderLessonTopbar(course, module) {
  const breadcrumb = $('#lesson-breadcrumb');
  if (breadcrumb) breadcrumb.innerHTML = `
    <span style="cursor:pointer;color:var(--accent)" data-page="library">Library</span>
    <span style="color:var(--text-faint)"> / </span>
    <strong>${course.name}</strong>
    <span style="color:var(--text-faint)"> / </span>
    M${module.number}
  `;
  const xpBadge = $('#lesson-xp-badge');
  if (xpBadge) xpBadge.textContent = `⚡ ${module.xp} XP`;
}

// Theory Step
function renderTheoryStep(course, module) {
  const area = $('#lesson-content-area');
  if (!area) return;

  let html = '';
  html += `
    <div class="lesson-module-header">
      <h1>${escHtml(module.title)}</h1>
      <div class="subtitle">${escHtml(module.subtitle)}</div>
    </div>
  `;

  // Render sections in order of appearance (preserving authored sequence)
  // Fallback order for section types that appear once:
  // 0. Learning objectives (always first if present)
  // 1. Terminology
  // 2. Theory paragraphs
  // 3. Career path
  // 4. Frameworks, templates, insights, warnings, case_study, recruiter_view, manager_insight, common_mistakes, reflection_questions

  // Merge in enrichments if available (from ENRICHMENTS data file)
  let sections = [...(module.sections || [])];
  if (typeof ENRICHMENTS !== 'undefined' && ENRICHMENTS[module.id]) {
    const enrich = ENRICHMENTS[module.id];
    if (enrich.learning_objectives && !sections.find(s => s.type === 'learning_objectives')) {
      sections.unshift({ type: 'learning_objectives', objectives: enrich.learning_objectives });
    }
    if (enrich.case_study && !sections.find(s => s.type === 'case_study')) {
      sections.push({ type: 'case_study', title: enrich.case_study.title, story: enrich.case_study.story });
    }
    if (enrich.recruiter_view && !sections.find(s => s.type === 'recruiter_view')) {
      sections.push({ type: 'recruiter_view', content: enrich.recruiter_view });
    }
    if (enrich.manager_insight && !sections.find(s => s.type === 'manager_insight')) {
      sections.push({ type: 'manager_insight', content: enrich.manager_insight });
    }
    if (enrich.common_mistakes && !sections.find(s => s.type === 'common_mistakes')) {
      sections.push({ type: 'common_mistakes', mistakes: enrich.common_mistakes });
    }
    if (enrich.reflection_questions && !sections.find(s => s.type === 'reflection_questions')) {
      sections.push({ type: 'reflection_questions', questions: enrich.reflection_questions });
    }
  }

  const termSection       = sections.find(s => s.type === 'terminology');
  const loSection         = sections.find(s => s.type === 'learning_objectives');
  const theorySection     = sections.find(s => s.type === 'theory');
  const careerSection     = sections.find(s => s.type === 'career_path');
  const frameworks        = sections.filter(s => s.type === 'framework');
  const templates         = sections.filter(s => s.type === 'template');
  const insights          = sections.filter(s => s.type === 'insight');
  const warnings          = sections.filter(s => s.type === 'warning');
  const caseStudies       = sections.filter(s => s.type === 'case_study');
  const recruiterViews    = sections.filter(s => s.type === 'recruiter_view');
  const managerInsights   = sections.filter(s => s.type === 'manager_insight');
  const commonMistakes    = sections.filter(s => s.type === 'common_mistakes');
  const reflections       = sections.filter(s => s.type === 'reflection_questions');

  // Learning Objectives (always first)
  if (loSection && loSection.objectives && loSection.objectives.length) {
    html += `
      <div class="learning-objectives">
        <div class="lo-header">🎯 Learning Objectives</div>
        <ul class="lo-list">
          ${loSection.objectives.map(o => `<li>${escHtml(o)}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  // Terminology
  if (termSection && termSection.terms && termSection.terms.length) {
    html += `
      <div class="terminology-box">
        <div class="terminology-header">Key Terms</div>
        ${termSection.terms.map(t => `
          <div class="term-row">
            <span class="term-name">${escHtml(t.term)}</span>
            <span class="term-def">${escHtml(t.def)}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Theory
  if (theorySection && theorySection.paragraphs) {
    html += theorySection.paragraphs.map(p => `<p class="theory-p">${escHtml(p)}</p>`).join('');
  }

  // Career path
  if (careerSection && careerSection.items) {
    html += `<div class="career-path">`;
    const icons = ['🌱', '⚡', '🔥', '💎', '👑'];
    careerSection.items.forEach((step, i) => {
      html += `
        <div class="career-step">
          <div class="career-dot">${icons[i] || (i + 1)}</div>
          <div class="career-text">
            <h4>${escHtml(step.title)}</h4>
            <p>${escHtml(step.desc)}</p>
          </div>
        </div>
      `;
    });
    html += `</div>`;
  }

  // Frameworks
  frameworks.forEach(fw => {
    html += renderFramework(fw);
  });

  // Copy Templates
  templates.forEach(t => {
    html += renderTemplate(t);
  });

  // Insights
  insights.forEach(ins => {
    html += `
      <div class="callout callout-info">
        <div class="callout-header">💡 Expert Insight</div>
        <div class="callout-body"><p>${escHtml(ins.content)}</p></div>
      </div>
    `;
  });

  // Warnings (legacy)
  warnings.forEach(w => {
    html += `
      <div class="callout callout-warn">
        <div class="callout-header">⚠️ Watch Out</div>
        <div class="callout-body"><p>${escHtml(w.content)}</p></div>
      </div>
    `;
  });

  // Case Studies
  caseStudies.forEach(cs => {
    html += `
      <div class="case-study-box">
        <div class="cs-header">🏢 Case Study</div>
        <div class="cs-title">${escHtml(cs.title || '')}</div>
        <div class="cs-story">${escHtml(cs.story || '')}</div>
      </div>
    `;
  });

  // Recruiter's View
  recruiterViews.forEach(rv => {
    html += `
      <div class="recruiter-view">
        <div class="rv-header">👤 Recruiter's View</div>
        <div class="rv-body">${escHtml(rv.content || '')}</div>
      </div>
    `;
  });

  // Manager Insight
  managerInsights.forEach(mi => {
    html += `
      <div class="manager-insight">
        <div class="mi-header">📊 Sales Manager Insight</div>
        <div class="mi-body">${escHtml(mi.content || '')}</div>
      </div>
    `;
  });

  // Common Mistakes
  commonMistakes.forEach(cm => {
    if (!cm.mistakes || !cm.mistakes.length) return;
    html += `
      <div class="common-mistakes">
        <div class="cm-header">⚡ Top Common Mistakes</div>
        <div class="cm-list">
          ${cm.mistakes.map(m => `
            <div class="cm-item">
              <div class="cm-title">${escHtml(m.title || m.name || '')}</div>
              <div class="cm-why">Why it happens: ${escHtml(m.why || '')}</div>
              <div class="cm-fix">How to avoid it: ${escHtml(m.fix || '')}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });

  // Reflection Questions
  reflections.forEach(rq => {
    if (!rq.questions || !rq.questions.length) return;
    html += `
      <div class="reflection-questions">
        <div class="rq-header">🔍 Reflection Questions</div>
        <ol class="rq-list">
          ${rq.questions.map(q => `<li>${escHtml(q)}</li>`).join('')}
        </ol>
      </div>
    `;
  });

  area.innerHTML = html;

  // Bind nav buttons
  const prevBtn = $('#prev-module-btn');
  const nextBtn = $('#go-to-quiz-btn');

  if (prevBtn) {
    const course = COURSES_DATA.find(c => c.id === STATE.currentCourseId);
    const modIdx = course ? course.modules.findIndex(m => m.id === STATE.currentModuleId) : -1;
    if (modIdx > 0) {
      prevBtn.style.display = '';
      prevBtn.onclick = () => {
        const prevMod = course.modules[modIdx - 1];
        navigate('lesson', { course: STATE.currentCourseId, module: prevMod.id });
      };
    } else {
      prevBtn.style.display = 'none';
    }
  }

  const quizSection = module.sections.find(s => s.type === 'quiz');
  const scenarioSection = module.sections.find(s => s.type === 'scenario');

  if (nextBtn) {
    if (quizSection) {
      nextBtn.textContent = 'Knowledge Check →';
      nextBtn.onclick = () => showStep('quiz');
    } else if (scenarioSection) {
      nextBtn.textContent = 'Situational Challenge →';
      nextBtn.onclick = () => showStep('scenario');
    } else {
      nextBtn.textContent = 'Complete Module →';
      nextBtn.onclick = () => completeCurrentModule();
    }
  }
}

function renderFramework(fw) {
  // Parse raw text into structured items
  const items = [];
  if (fw.raw) {
    fw.raw.split('\n').forEach(line => {
      line = line.trim();
      if (line.startsWith('- ') || line.startsWith('**')) {
        items.push(line.replace(/^-\s*/, '').replace(/\*\*/g, ''));
      } else if (/^\d+\./.test(line)) {
        items.push(line.replace(/^\d+\.\s*/, ''));
      } else if (line) {
        items.push(line);
      }
    });
  } else if (fw.items) {
    fw.items.forEach(i => items.push(i));
  }

  return `
    <div class="callout callout-tip">
      <div class="callout-header">Framework</div>
      <div class="callout-title">${escHtml(fw.title)}</div>
      <div class="callout-body">
        <ul>${items.filter(i => i.trim()).map(i => `<li>${escHtml(i)}</li>`).join('')}</ul>
      </div>
    </div>
  `;
}

function renderTemplate(t) {
  const content = t.content || '';
  return `
    <div class="copy-template">
      <div class="copy-template-label">Copy Template — Use on Real Calls</div>
      <div style="position:relative">
        <pre class="code-block">${escHtml(content)}</pre>
        <button class="copy-btn" onclick="copyTemplate(this)">Copy</button>
      </div>
    </div>
  `;
}

window.copyTemplate = function(btn) {
  const pre = btn.previousElementSibling;
  if (pre) {
    navigator.clipboard.writeText(pre.textContent).then(() => {
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = 'Copy', 2000);
    }).catch(() => {});
  }
};

// Quiz Step
function renderQuizStep(module) {
  const quizSection = module.sections.find(s => s.type === 'quiz');
  const scenarioSection = module.sections.find(s => s.type === 'scenario');
  const container = $('#quiz-container');
  if (!container) return;

  if (!quizSection) {
    container.innerHTML = `<div style="text-align:center;padding:60px 0;color:var(--text-muted)">Loading next step...</div>`;
    return;
  }

  container.innerHTML = buildMCQ(
    quizSection,
    'Knowledge Check',
    '🧠',
    false,
    () => {
      if (scenarioSection) {
        showStep('scenario');
      } else {
        completeCurrentModule();
      }
    }
  );
}

function renderScenarioStep(module) {
  const scenarioSection = module.sections.find(s => s.type === 'scenario');
  const container = $('#scenario-container');
  if (!container) return;

  if (!scenarioSection) {
    container.innerHTML = '';
    return;
  }

  let html = `
    <div class="quiz-step-indicator" style="margin-bottom:28px">
      <div class="step-dot done">1</div>
      <div class="step-line done"></div>
      <div class="step-dot active">2</div>
      <div class="step-line"></div>
      <div class="step-dot">✓</div>
    </div>
    <div class="scenario-label">Situational Challenge</div>
    <div class="scenario-box">${escHtml(scenarioSection.scenario || '')}</div>
  `;

  // Options
  html += `<div class="quiz-options" id="scenario-opts">`;
  (scenarioSection.options || []).forEach((opt, i) => {
    const letter = ['A','B','C','D'][i];
    html += `
      <button class="quiz-option" data-idx="${i}" onclick="handleScenario(this, ${i}, ${scenarioSection.correctIndex})">
        <span class="opt-letter">${letter}</span>
        <span class="opt-text">${escHtml(opt)}</span>
      </button>
    `;
  });
  html += `</div>`;

  html += `
    <div class="quiz-explanation" id="scenario-explanation">
      <div class="qe-label">Expert Answer Explanation</div>
      <div class="qe-text">${escHtml(scenarioSection.explanation || '')}</div>
    </div>
    <button class="btn btn-primary quiz-next-btn hidden" id="scenario-next-btn" onclick="completeCurrentModule()">
      Complete Module & Earn XP →
    </button>
  `;

  container.innerHTML = html;
}

window.handleScenario = function(btn, idx, correctIdx) {
  if (STATE.scenarioAnswered) return;
  STATE.scenarioAnswered = true;

  $$('.quiz-option', btn.closest('.quiz-options')).forEach((opt, i) => {
    opt.disabled = true;
    if (i === correctIdx) opt.classList.add('correct');
    else if (i === idx && idx !== correctIdx) opt.classList.add('wrong');
  });

  $('#scenario-explanation')?.classList.add('show');
  $('#scenario-next-btn')?.classList.remove('hidden');
};

function buildMCQ(section, label, icon, isScenario, onComplete) {
  const questionText = isScenario ? (section.scenario || '') : (section.question || '');
  const options = section.options || [];
  const correctIndex = section.correctIndex || 0;
  const explanation = section.explanation || '';

  let html = `
    <div class="quiz-step-indicator" style="margin-bottom:28px">
      <div class="step-dot active">1</div>
      <div class="step-line"></div>
      <div class="step-dot">2</div>
      <div class="step-line"></div>
      <div class="step-dot">✓</div>
    </div>
    <div class="quiz-header">
      <div class="quiz-header-label">${icon} ${label}</div>
      <div class="quiz-question">${escHtml(questionText)}</div>
    </div>
    <div class="quiz-options" id="quiz-opts">
  `;

  options.forEach((opt, i) => {
    const letter = ['A','B','C','D'][i];
    html += `
      <button class="quiz-option" data-idx="${i}" onclick="handleQuiz(this, ${i}, ${correctIndex})">
        <span class="opt-letter">${letter}</span>
        <span class="opt-text">${escHtml(opt)}</span>
      </button>
    `;
  });

  html += `
    </div>
    <div class="quiz-explanation" id="quiz-explanation">
      <div class="qe-label">Explanation</div>
      <div class="qe-text">${escHtml(explanation)}</div>
    </div>
    <button class="btn btn-primary quiz-next-btn hidden" id="quiz-next-btn">
      Continue →
    </button>
  `;

  // We'll bind the next button after rendering
  setTimeout(() => {
    const nextBtn = $('#quiz-next-btn');
    if (nextBtn) nextBtn.onclick = onComplete;
  }, 0);

  return html;
}

window.handleQuiz = function(btn, idx, correctIdx) {
  if (STATE.quizAnswered) return;
  STATE.quizAnswered = true;

  $$('.quiz-option', btn.closest('.quiz-options')).forEach((opt, i) => {
    opt.disabled = true;
    if (i === correctIdx) opt.classList.add('correct');
    else if (i === idx && idx !== correctIdx) opt.classList.add('wrong');
  });

  $('#quiz-explanation')?.classList.add('show');
  $('#quiz-next-btn')?.classList.remove('hidden');
};

// Complete Module
function completeCurrentModule() {
  const course = COURSES_DATA.find(c => c.id === STATE.currentCourseId);
  const module = course?.modules.find(m => m.id === STATE.currentModuleId);
  if (!course || !module) return;

  const alreadyDone = PROGRESS.isModuleComplete(module.id);
  const p = PROGRESS.completeModule(module.id, module.xp);

  if (!alreadyDone) {
    showXPToast(module.xp);
  }

  // Update nav XP
  updateNavXP();

  // Show complete screen
  showStep('complete');
  renderCompleteScreen(course, module, p, alreadyDone);

  // Update sidebar
  renderSidebar(course, module);
}

function renderCompleteScreen(course, module, progress, alreadyDone) {
  const container = $('#complete-container');
  if (!container) return;

  const totalXP = progress.totalXP || 0;
  const lvl = xpLevel(totalXP);
  const modIdx = course.modules.findIndex(m => m.id === module.id);
  const nextMod = course.modules[modIdx + 1];
  const prog = PROGRESS.getCourseProgress(course.id);

  container.innerHTML = `
    <div class="complete-icon">${alreadyDone ? '✅' : '🎉'}</div>
    <div class="complete-title">${alreadyDone ? 'Module Revisited' : 'Module Complete!'}</div>
    <div class="complete-subtitle">
      ${escHtml(module.title)} · Course ${course.number}: ${escHtml(course.name)}
    </div>
    <div class="complete-xp">
      ${alreadyDone ? '' : `+${module.xp}`} ${alreadyDone ? 'Already earned' : 'XP Earned'}
      <span>Total: ${totalXP.toLocaleString()} XP · ${lvl.icon} ${lvl.name} · Level ${lvl.level}</span>
    </div>
    <div style="margin-bottom:24px;font-size:14px;color:var(--text-muted)">
      Course progress: ${prog.completed}/${prog.total} modules (${prog.pct}%)
    </div>
    <div class="complete-actions">
      ${nextMod ? `
        <button class="btn btn-primary" data-page="lesson" data-course="${course.id}" data-module="${nextMod.id}">
          Next: ${escHtml(nextMod.title)} →
        </button>
      ` : `
        <button class="btn btn-primary" data-page="library">
          Back to Library →
        </button>
      `}
      <button class="btn btn-outline" data-page="profile">View My Progress</button>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════════
// JOBS BOARD
// ═══════════════════════════════════════════════════════════════
function renderJobs() {
  const grid = $('#jobs-grid');
  if (!grid) return;

  // Bind filter buttons
  $$('[data-jobs-filter]').forEach(btn => {
    btn.onclick = () => {
      STATE.jobsFilter = btn.dataset.jobsFilter;
      $$('[data-jobs-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderJobsList(grid);
    };
  });

  renderJobsList(grid);
}

function renderJobsList(grid) {
  const filtered = STATE.jobsFilter === 'all'
    ? JOBS_DATA
    : JOBS_DATA.filter(j => j.type === STATE.jobsFilter);

  grid.innerHTML = filtered.map(job => `
    <div class="job-card">
      <div class="job-logo">${job.logo}</div>
      <div class="job-info">
        <div class="job-title">${escHtml(job.title)}</div>
        <div class="job-company">${escHtml(job.company)} · ${escHtml(job.location)}</div>
        <div class="job-meta">
          <span class="job-tag">${escHtml(job.type)}</span>
          <span class="job-tag tag-salary">💰 ${escHtml(job.salary)}</span>
          ${job.tags.map(t => `<span class="job-tag">${escHtml(t)}</span>`).join('')}
        </div>
      </div>
      <a href="${job.url}" class="job-apply" target="_blank">Apply →</a>
    </div>
  `).join('');
}

// ═══════════════════════════════════════════════════════════════
// GLOSSARY
// ═══════════════════════════════════════════════════════════════
function renderGlossary() {
  const list = $('#glossary-list');
  const search = $('#glossary-search');

  function renderList(filter = '') {
    const f = filter.toLowerCase();
    const filtered = f
      ? GLOSSARY.filter(g => g.term.toLowerCase().includes(f) || g.def.toLowerCase().includes(f))
      : GLOSSARY;

    const sorted = [...filtered].sort((a, b) => a.term.localeCompare(b.term));

    list.innerHTML = sorted.map(g => `
      <div class="glossary-item">
        <div class="glossary-term">${escHtml(g.term)}</div>
        <div class="glossary-def">${escHtml(g.def)}</div>
      </div>
    `).join('');
  }

  renderList();

  if (search) {
    search.oninput = () => renderList(search.value);
  }
}

// ═══════════════════════════════════════════════════════════════
// PROFILE
// ═══════════════════════════════════════════════════════════════
function renderProfile() {
  const p = PROGRESS.get();
  const totalXP = p.totalXP || 0;
  const completed = p.completed || {};
  const completedCount = Object.keys(completed).length;
  const lvl = xpLevel(totalXP);

  // Determine courses started
  const coursesStarted = COURSES_DATA.filter(c =>
    c.modules.some(m => completed[m.id])
  ).length;

  // Update hero
  $('#profile-level').textContent = `Level ${lvl.level} — ${lvl.name}`;
  $('#profile-xp-total').textContent = `${totalXP.toLocaleString()} / 21,000 XP`;
  $('#profile-avatar').textContent = lvl.icon;

  // Stats
  $('#pstat-modules').textContent = completedCount;
  $('#pstat-courses').textContent = coursesStarted;
  $('#pstat-xp').textContent = totalXP.toLocaleString();
  $('#pstat-streak').textContent = p.streak || 0;

  // Course progress list
  const progressContainer = $('#profile-courses-progress');
  if (!progressContainer) return;

  progressContainer.innerHTML = `
    <h2 style="font-size:20px;font-weight:700;margin-bottom:16px">Course Progress</h2>
    ${COURSES_DATA.map(course => {
      const prog = PROGRESS.getCourseProgress(course.id);
      const firstMod = course.modules[0];
      return `
        <div class="course-progress-row" data-page="lesson" data-course="${course.id}" data-module="${firstMod.id}">
          <span class="cpr-emoji">${course.emoji}</span>
          <div class="cpr-info">
            <div class="cpr-name">Course ${course.number}: ${escHtml(course.name)}</div>
            <div class="cpr-meta">${prog.completed}/${prog.total} modules · ${course.level}</div>
          </div>
          <div class="cpr-bar-outer">
            <div class="cpr-bar-inner" style="width:${prog.pct}%"></div>
          </div>
          <span class="cpr-pct">${prog.pct}%</span>
        </div>
      `;
    }).join('')}
  `;
}

// ═══════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════
function init() {
  // Handle hash routing for GitHub Pages — initial page load only
  const hash = window.location.hash || '';
  const parts = hash.replace(/^#/, '').split('/');
  const page = parts[0] || 'home';

  if (page === 'lesson' && parts[1] && parts[2]) {
    navigate('lesson', { course: parts[1], module: parts[2] });
  } else if (['home','library','jobs','glossary','profile'].includes(page)) {
    navigate(page);
  } else {
    navigate('home');
  }
}

// ── Boot ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
