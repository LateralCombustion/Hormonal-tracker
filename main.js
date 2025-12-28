// =============================================
// ::DIVISION D – MAIN APP (main.js)
// =============================================

/* ::SECTION D-1 – Utility */
const $ = (sel) => document.querySelector(sel);

/* ::SECTION D-0 – Compatibility Preferences
   - "similar": prefer closeness (|a-b| <= 2)
   - "contrast": prefer distance (|a-b| >= 5)
*/
const COMP_PREFS = {
  defaults: "similar",

  // Hormone-level prefs
  cortisol: "contrast",      // balance stress reactivity
  oxytocin: "similar",       // align in bonding/attachment needs
  serotonin: "similar",      // align in stability/structure
  progesterone: "similar",   // align in calm/sleep/regulation
  estrogen: "similar",       // align in sensitivity/empathy

  // Category overrides (take precedence)
  overrides: {
    adrenaline:  { "Thrill-Seeking": "contrast" }, // thrill disparity can be good
    vasopressin: { "Protection": "contrast" },     // one protector balances
    testosterone:{ "Competition": "contrast" },    // two highly competitive can clash
    serotonin:   { "Stability": "similar" }        // explicit (already similar)
  }
};

function prefFor(hormone, category) {
  const cat = COMP_PREFS.overrides[hormone]?.[category];
  if (cat) return cat;
  const h = COMP_PREFS[hormone];
  if (h) return h;
  return COMP_PREFS.defaults;
}

function isMatchByPref(pref, a, b) {
  const diff = Math.abs(a - b);
  if (pref === "contrast") return diff >= 5; // strong complement
  return diff <= 2;                          // close alignment
}

/* ::SECTION D-2 – App Class */
class HormoneTracker {

  // PART D-2-1 – Constructor & State
  constructor() {
    // Definitions from cases.js
    this.hormones = window.HORMONE_DEFS;
    this.hormoneDescriptions = window.HORMONE_DESCRIPTIONS;
    this.categoryTips = window.CATEGORY_TIPS;

    // Storage-backed scores
    this.scores = {
      dopamine: JSON.parse(localStorage.getItem('dopamineScores')) || {},
      endorphins: JSON.parse(localStorage.getItem('endorphinsScores')) || {},
      serotonin: JSON.parse(localStorage.getItem('serotoninScores')) || {},
      oxytocin: JSON.parse(localStorage.getItem('oxytocinScores')) || {},
      vasopressin: JSON.parse(localStorage.getItem('vasopressinScores')) || {},
      cortisol: JSON.parse(localStorage.getItem('cortisolScores')) || {},
      testosterone: JSON.parse(localStorage.getItem('testosteroneScores')) || {},
      adrenaline: JSON.parse(localStorage.getItem('adrenalineScores')) || {},
      progesterone: JSON.parse(localStorage.getItem('progesteroneScores')) || {},
      estrogen: JSON.parse(localStorage.getItem('estrogenScores')) || {}
    };

    this.partnerScores = {};

    // Names & settings
    this.yourName = localStorage.getItem('yourName') || 'You';
    this.partnerName = localStorage.getItem('partnerName') || 'Partner';
    this.testLength = localStorage.getItem('testLength') || 'long';
    this.testLengthConfig = {
      long:   { questions: 100, label: 'High (100 questions)' },
      normal: { questions:  80, label: 'Balanced (80 questions)' },
      quick:  { questions:  60, label: 'Lower (60 questions)' }
    };

    // Theme & targets (persisted). Defaults: dark ON, showTargets OFF
    this.theme = localStorage.getItem('theme') || 'dark';
    this.showTargets = localStorage.getItem('showTargets') === 'true';

    this.lastSubmission = this.getLastSubmissionMeta() || null;

    // UI Elements
    this.els = {
      form: $('#hormoneForm'),
      questions: $('#questions'),
      dataOutput: $('#dataOutput'),
      partnerInput: $('#partnerInput'),
      loadPartnerBtn: $('#loadPartnerBtn'),
      submitAnswersBtn: $('#submitAnswersBtn'),
      clearAllBtn: $('#clearAllBtn'),
      chartCanvas: $('#comparisonChart'),
      compatibilityChartCanvas: $('#compatibilityChart'),
      matchPercentage: $('#matchPercentage'),
      attachmentStyles: $('#attachmentStyles'),
      resultHormoneSelect: $('#resultHormoneSelect'),
      yourName: $('#yourName'),
      partnerName: $('#partnerName'),
      randomizeBtn: $('#randomizeBtn'),
      matchStatsNoPartner: $('#matchStats .no-partner-message'),
      compatibilityNoPartner: $('#compatibilityChartContainer .no-partner-message'),
      testLengthSelect: $('#testLengthSelect'),
      accuracyMessage: $('#accuracyMessage'),
      questionInstruction: $('#questionInstruction'),
      aiPromptOutput: $('#aiPromptOutput'),
      generateAIPromptBtn: $('#generateAIPromptBtn'),
      debug: $('#debug'),
      statisticalChartCanvas: $('#statisticalChartCanvas'),
      // Toggles
      showTargetsToggle: $('#showTargetsToggle'),
      themeToggle: $('#themeToggle'),
            // Profile history
      saveProfileBtn: $('#saveProfileBtn'),
      savedProfilesSelect: $('#savedProfilesSelect'),
      loadSavedToPartnerBtn: $('#loadSavedToPartnerBtn'),
      deleteSavedProfileBtn: $('#deleteSavedProfileBtn'),
      // Responses summary mount
      responseList: $('#responseList')
    };

    // Apply theme & targets to body and toggles
    document.body.classList.toggle('theme-dark', this.theme === 'dark');
    if (this.els.themeToggle) this.els.themeToggle.checked = (this.theme === 'dark');

    document.body.classList.toggle('show-targets', this.showTargets);
    if (this.els.showTargetsToggle) this.els.showTargetsToggle.checked = this.showTargets;

    // Charts
    this.chart = null;               // radar
    this.compatibilityChart = null;  // bar
    this.statisticalChart = null;    // averages bar

    // Questionnaire state
    this.currentQuestions = [];
    this.currentResultHormone = 'dopamine';

    // Init basics
    if (this.els.yourName) this.els.yourName.value = this.yourName;
    if (this.els.partnerName) this.els.partnerName.value = this.partnerName;
    if (this.els.testLengthSelect) this.els.testLengthSelect.value = this.testLength;
    this.updateTestLengthUI();
    if (this.els.debug) this.els.debug.hidden = false;

    // Build questionnaire
    this.generateQuestions();
    this.renderQuestions();

    // First render
    this.loadScores();
    this.updateDisplay();
    this.initEventListeners();
    this.refreshSavedProfilesSelect();
    this.updateHistoryButtonState();
  }

  // PART D-2-2 – Event Listeners
  initEventListeners() {
    if (this.els.resultHormoneSelect) {
      this.els.resultHormoneSelect.addEventListener('change', (e) => {
        this.currentResultHormone = e.target.value;
        this.updateDisplay();
      });
    }

    if (this.els.generateAIPromptBtn) {
      this.els.generateAIPromptBtn.addEventListener('click', () => this.generateAIPrompt());
    }

    if (this.els.submitAnswersBtn) {
      this.els.submitAnswersBtn.addEventListener('click', () => this.processAnswers());
    }

    if (this.els.loadPartnerBtn) {
      this.els.loadPartnerBtn.addEventListener('click', () => this.loadPartnerScores());
    }

    if (this.els.clearAllBtn) {
      this.els.clearAllBtn.addEventListener('click', () => this.clearAll());
    }


    // Profile history (local save/load)
    if (this.els.saveProfileBtn) {
      this.els.saveProfileBtn.addEventListener('click', () => this.saveCurrentProfile());
    }
    if (this.els.loadSavedToPartnerBtn) {
      this.els.loadSavedToPartnerBtn.addEventListener('click', () => this.loadSelectedProfileToPartner());
    }
    if (this.els.deleteSavedProfileBtn) {
      this.els.deleteSavedProfileBtn.addEventListener('click', () => this.deleteSelectedSavedProfile());
    }
    if (this.els.savedProfilesSelect) {
      this.els.savedProfilesSelect.addEventListener('change', () => this.updateHistoryButtonState());
    }

    if (this.els.form) {
      this.els.form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Hormone scores saved in localStorage!');
      });
    }

    if (this.els.yourName) {
      this.els.yourName.addEventListener('change', (e) => {
        this.yourName = e.target.value || 'You';
        localStorage.setItem('yourName', this.yourName);
        this.updateDisplay();
      });
    }

    if (this.els.partnerName) {
      this.els.partnerName.addEventListener('change', (e) => {
        this.partnerName = e.target.value || 'Partner';
        localStorage.setItem('partnerName', this.partnerName);
        this.updateDisplay();
      });
    }

    if (this.els.randomizeBtn) {
      this.els.randomizeBtn.addEventListener('click', () => this.randomizeScores());
    }

    if (this.els.testLengthSelect) {
      this.els.testLengthSelect.addEventListener('change', (e) => {
        this.testLength = e.target.value;
        localStorage.setItem('testLength', this.testLength);
        this.updateTestLengthUI();
        this.generateQuestions();
        this.renderQuestions();
      });
    }

    // Theme toggle
    if (this.els.themeToggle) {
      this.els.themeToggle.addEventListener('change', (e) => {
        this.theme = e.target.checked ? 'dark' : 'light';
        document.body.classList.toggle('theme-dark', this.theme === 'dark');
        localStorage.setItem('theme', this.theme);
      });
    }

    // Show-targets toggle
    if (this.els.showTargetsToggle) {
      this.els.showTargetsToggle.addEventListener('change', (e) => {
        this.showTargets = !!e.target.checked;
        document.body.classList.toggle('show-targets', this.showTargets);
        localStorage.setItem('showTargets', String(this.showTargets));
      });
    }
  }

  // PART D-2-3 – UI Helpers
  updateTestLengthUI() {
    const cfg = this.testLengthConfig[this.testLength];
    if (this.els.accuracyMessage) {
      this.els.accuracyMessage.textContent = `Accuracy: ${cfg.label}`;
    }
    if (this.els.questionInstruction) {
      this.els.questionInstruction.textContent =
        `Answer all ${cfg.questions} questions to assess your hormone profiles. Questions are mixed to ensure genuine responses.`;
    }
  }

  // PART D-2-4 – Shuffle
  shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // PART D-2-5 – Question Generation
  generateQuestions() {
    this.currentQuestions = [];
    const totalQuestions = this.testLengthConfig[this.testLength].questions;

    const hormoneKeys = Object.keys(this.hormones);
    const totals = hormoneKeys.map(h => (this.hormones[h].questions || []).length);
    const sumTotals = totals.reduce((a,b)=>a+b, 0);

    if (!sumTotals) {
      this.currentQuestions = [];
      if (this.els.questions) this.els.questions.innerHTML = '<p class="muted">No question bank found.</p>';
      return;
    }

    let desired = hormoneKeys.map((h) =>
      ({ h, want: (this.hormones[h].questions.length / sumTotals) * totalQuestions })
    );
    let counts = desired.map(d => Math.floor(d.want));
    let used = counts.reduce((a,b)=>a+b, 0);
    let remainder = totalQuestions - used;

    const fracOrder = desired
      .map((d, i) => ({ i, frac: d.want - Math.floor(d.want) }))
      .sort((a, b) => b.frac - a.frac);

    for (let k = 0; k < fracOrder.length && remainder > 0; k++) {
      const idx = fracOrder[k].i;
      if (counts[idx] < this.hormones[hormoneKeys[idx]].questions.length) {
        counts[idx] += 1;
        remainder -= 1;
      }
    }

    hormoneKeys.forEach((h, i) => {
      const pool = [...(this.hormones[h].questions || [])];
      this.shuffleArray(pool);
      const take = Math.min(counts[i], pool.length);
      for (let t = 0; t < take; t++) {
        this.currentQuestions.push({ hormone: h, ...pool[t] });
      }
    });

    while (this.currentQuestions.length < totalQuestions) {
      let added = false;
      for (const h of hormoneKeys) {
        const usedCount = this.currentQuestions.filter(q => q.hormone === h).length;
        const totalAvail = (this.hormones[h].questions || []).length;
        if (usedCount < totalAvail) {
          const usedSet = new Set(
            this.currentQuestions.filter(q => q.hormone === h).map(q => q.text)
          );
          const candidate = (this.hormones[h].questions || []).find(q => !usedSet.has(q.text));
          if (candidate) {
            this.currentQuestions.push({ hormone: h, ...candidate });
            added = true;
            if (this.currentQuestions.length >= totalQuestions) break;
          }
        }
      }
      if (!added) break;
    }

    this.shuffleArray(this.currentQuestions);
    this.currentQuestions.length = Math.min(this.currentQuestions.length, totalQuestions);
  }
// PART D-2-5.1 – Scale Resolution & HTML Builder
resolveScaleType(hormone, category, question) {
  // 1) Numeric override
  const idxMap = window.SCALE_INDEX_MAP || {};
  if (question && typeof question.scaleOverride !== 'undefined') {
    const code = Number(question.scaleOverride);
    const mapped = idxMap[code];
    if (mapped && mapped !== 'auto' && window.SCALE_TEMPLATES?.[mapped]) {
      return mapped;
    }
  }

  // 2) String override (legacy support)
  if (question && typeof question.type === 'string' && window.SCALE_TEMPLATES?.[question.type]) {
    return question.type;
  }

  // 3) SPECIAL pre-check: “how much/strongly/emotionally/to what extent” + emotion/energy word → INTENSITY
  const text = (question?.text || '').toLowerCase();
  if (text) {
    const intensityTriggers = /(how\s+much|how\s+strong(ly)?|how\s+emotionally|to\s+what\s+extent)\b/i;
    if (intensityTriggers.test(text)) {
      const terms = window.INTENSITY_EMOTION_TERMS || [];
      const found = terms.some(t => new RegExp(`\\b${t}\\b`, 'i').test(text));
      if (found) return "intensity";
    }
  }

  // 4) Keyword auto-detection (priority order; first match wins)
  const rules = window.KEYWORD_RULES || {};
  if (text) {
    const order = ['quantity','importance','quality','satisfaction','intensity','agreement'];
    for (const t of order) {
      const patterns = rules[t] || [];
      for (const re of patterns) {
        if (re.test(text)) return t;
      }
    }
  }

  // 5) Default
  return "quantity";
}

resolveLabels(hormone, category, type) {
  const labelsMap = window.CATEGORY_LABELS || {};
  const hMap = labelsMap[hormone] || {};
  const custom = hMap[category];
  if (Array.isArray(custom) && custom.length === 5) return custom;
  return (window.SCALE_TEMPLATES && window.SCALE_TEMPLATES[type]) || window.SCALE_TEMPLATES.quantity;
}

buildScaleHTML(index, labels) {
  const min = labels[0], mid = labels[2], max = labels[4];
  const name = `q${index}`;
  const datalistId = `ticks-${index}`;
  return `
    <div class="slider-wrap">
      <div class="slider-labels">
        <span>${min}</span>
        <span>${mid}</span>
        <span>${max}</span>
      </div>
      <div class="slider-track">
        <input type="range" min="0" max="4" step="1" value="2" name="${name}" aria-label="answer scale" list="${datalistId}" />
        <output class="slider-bubble" for="${name}" data-labels='${JSON.stringify(labels)}'>${labels[2]}</output>
        <datalist id="${datalistId}">
          <option value="0"></option><option value="1"></option><option value="2"></option><option value="3"></option><option value="4"></option>
        </datalist>
      </div>
    </div>
  `;
}



  // PART D-2-6 – Render Questions (slider UI + inline override when show-targets is on)
renderQuestions() {
  if (!this.els.questions) return;
  this.els.questions.innerHTML = '';
  if (!this.currentQuestions.length) {
    this.els.questions.innerHTML = '<p class="muted">No questions to display.</p>';
    return;
  }

  const allowDebug = document.body.classList.contains('show-targets');

  this.currentQuestions.forEach((q, index) => {
    const div = document.createElement('div');
    div.className = 'question';

    const type = this.resolveScaleType(q.hormone, q.category, q);
    const labels = this.resolveLabels(q.hormone, q.category, type);
    const scaleHTML = this.buildScaleHTML(index, labels);

    const debugCtl = allowDebug ? `
      <span class="q-ctl">
        <select class="scale-override" data-index="${index}">
          <option value="0"${q.scaleOverride===0||q.scaleOverride===undefined?' selected':''}>Auto</option>
          <option value="1"${q.scaleOverride===1?' selected':''}>Quality</option>
          <option value="2"${q.scaleOverride===2?' selected':''}>Satisfaction</option>
          <option value="3"${q.scaleOverride===3?' selected':''}>Intensity</option>
          <option value="6"${q.scaleOverride===6?' selected':''}>Importance</option>
          <option value="4"${q.scaleOverride===4?' selected':''}>Agreement</option>
          <option value="5"${q.scaleOverride===5?' selected':''}>Quantity</option>
        </select>
      </span>` : '';

    div.innerHTML = `
      <label>${index + 1}.
        <span class="q-target">[${q.hormone.toUpperCase()} · ${q.category} · ${type}]</span>
        ${debugCtl}
        ${q.text}
      </label>
      ${scaleHTML}
      <div class="error">Please select an answer.</div>
    `;
    this.els.questions.appendChild(div);
  });

  // Wire slider bubbles
  this.els.questions.querySelectorAll('.slider-wrap input[type="range"]').forEach((slider) => {
    const bubble = slider.parentElement.querySelector('.slider-bubble');
    const labels = JSON.parse(bubble.getAttribute('data-labels') || '[]');
    const update = () => {
      const v = Number(slider.value || 2);
      bubble.textContent = labels[v] || v;
      bubble.style.setProperty('--val', v);
    };
    slider.addEventListener('input', update);
    update();
  });

  // Wire override dropdowns (live re-render per question)
  if (document.body.classList.contains('show-targets')) {
    this.els.questions.querySelectorAll('.scale-override').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const idx = Number(e.target.getAttribute('data-index'));
        const code = Number(e.target.value);
        this.currentQuestions[idx].scaleOverride = code; // persist in current session
        // Re-render only this question’s control
        const q = this.currentQuestions[idx];
        const type = this.resolveScaleType(q.hormone, q.category, q);
        const labels = this.resolveLabels(q.hormone, q.category, type);
        const wrap = e.target.closest('.question');
        const track = wrap.querySelector('.slider-wrap');
        track.outerHTML = this.buildScaleHTML(idx, labels);

        // Rebind bubble for this slider
        const slider = wrap.querySelector('input[type="range"]');
        const bubble = wrap.querySelector('.slider-bubble');
        const lab = JSON.parse(bubble.getAttribute('data-labels') || '[]');
        const update = () => {
          const v = Number(slider.value || 2);
          bubble.textContent = lab[v] || v;
          bubble.style.setProperty('--val', v);
        };
        slider.addEventListener('input', update);
        update();

        // Update tag to show new type
        const tag = wrap.querySelector('.q-target');
        if (tag) tag.textContent = `[${q.hormone.toUpperCase()} · ${q.category} · ${type}]`;
      });
    });
  }
}



  // PART D-2-7 – Validation Helper
  validateLevel(level) {
    if (level === '') return true;
    const num = Number(level);
    return Number.isInteger(num) && num >= 0 && num <= 9;
  }

  // PART D-2-7b – Submission Meta (used for hard-limit compare)
  getLastSubmissionMeta() {
    try { return JSON.parse(localStorage.getItem('lastSubmissionMeta') || 'null'); }
    catch { return null; }
  }

  setLastSubmissionMeta(meta) {
    try { localStorage.setItem('lastSubmissionMeta', JSON.stringify(meta || null)); }
    catch {}
  }

  isLongComplete(meta) {
    return !!(meta && meta.testLength === 'long' && Number(meta.questionsAnswered) === 100);
  }


 // PART D-2-8 – Process Answers (weighted, normalized to 0–9) + capture response labels
processAnswers() {
  if (!this.els.yourName || !this.els.yourName.value.trim()) {
    alert('Please enter your name before submitting answers.');
    return;
  }

  const totalQuestions = this.testLengthConfig[this.testLength].questions;
  const answers = {};
  let valid = true;

  // Collect answers (slider value 0..4)
  this.els.questions.querySelectorAll('.question').forEach((qEl, index) => {
    const slider = qEl.querySelector(`input[name="q${index}"][type="range"]`);
    const error = qEl.querySelector('.error');
    if (!slider || slider.value === '') {
      error.style.display = 'block';
      valid = false;
    } else {
      error.style.display = 'none';
      answers[index] = Number(slider.value);
    }
  });

  if (!valid) {
    alert(`Please answer all ${totalQuestions} questions.`);
    return;
  }

  // Prepare aggregation buckets
  const raw = {};
  Object.keys(this.hormones).forEach(hormone => {
    raw[hormone] = {};
    this.hormones[hormone].categories.forEach(cat => {
      raw[hormone][cat] = { total: 0, max: 0 };
    });
  });

  // Human-readable capture
  this.lastAnswers = [];

  // Accumulate by category & build lastAnswers
  this.currentQuestions.forEach((q, index) => {
    const val = answers[index];
    const weight = q.weight ?? 1.0;
    const maxVal = 4;

    raw[q.hormone][q.category].total += val * weight;
    raw[q.hormone][q.category].max   += maxVal * weight;

    const type = this.resolveScaleType(q.hormone, q.category, q);
    const labels = this.resolveLabels(q.hormone, q.category, type);
    const label = labels[val];

    this.lastAnswers.push({ hormone: q.hormone, category: q.category, type, text: q.text, value: val, label });
  });

  // Normalize to 0–9 and store
  Object.keys(this.hormones).forEach(hormone => {
    this.scores[hormone] = {};
    Object.entries(raw[hormone]).forEach(([category, agg]) => {
      const score = agg.max > 0 ? Math.round((agg.total / agg.max) * 9) : 0;
      this.scores[hormone][category] = score;
    });
  });

  this.yourName = this.els.yourName.value.trim();
  localStorage.setItem('yourName', this.yourName);

  // record submission meta (used for hard-limit compare)
  this.lastSubmission = {
    testLength: this.testLength,
    questionsAnswered: totalQuestions,
    submittedAt: Date.now()
  };
  this.setLastSubmissionMeta(this.lastSubmission);
  this.saveToStorage();
  this.loadScores();
  this.updateDisplay();
  alert('Answers submitted! Your hormone scores and response summary are ready.');
}



  // PART D-2-9 – Storage
  saveToStorage() {
    try {
      Object.keys(this.scores).forEach(h =>
        localStorage.setItem(`${h}Scores`, JSON.stringify(this.scores[h]))
      );
    } catch (e) {
      console.error('Failed to save scores:', e);
    }
  }

  loadScores() { /* kept for symmetry */ }

  // PART D-2-10 – Partner Data
  hasPartnerScores() {
    return Object.keys(this.partnerScores).some(
      h => this.partnerScores[h] && Object.keys(this.partnerScores[h]).length > 0
    );
  }

  loadPartnerScores() {
    const input = (this.els.partnerInput.value || '').trim();
    if (!input) { alert('Paste partner JSON first.'); return; }
    let data;
    try { data = JSON.parse(input); }
    catch { alert('Invalid JSON.'); return; }

    // Hard limit: only compare if BOTH completed Long (100)
    if (!this.isLongComplete(this.lastSubmission)) {
      alert('Comparison is locked: you must complete the Long (100 questions) test and submit before loading a partner profile.');
      return;
    }

    const partnerMeta = data.meta || null;
    const partnerTestLength = partnerMeta?.testLength || data.testLength || null;
    const partnerAnswered = Number(partnerMeta?.questionsAnswered ?? (partnerTestLength === 'long' ? 100 : NaN));
    if (!(partnerTestLength === 'long' && partnerAnswered === 100)) {
      alert('Comparison is locked: partner must also complete the Long (100 questions) test and submit/export their profile.');
      return;
    }

    const partnerNameFromJson = (partnerMeta?.name || data.name || '').trim();
    if (partnerNameFromJson && this.els.partnerName) {
      this.els.partnerName.value = partnerNameFromJson;
      this.partnerName = partnerNameFromJson;
      localStorage.setItem('partnerName', this.partnerName);
    }

    const valid = {}; let any = false;
    Object.keys(this.hormones).forEach(hormone => {
      valid[hormone] = {};
      const src = (data.scores && data.scores[hormone]) || {};
      Object.entries(src).forEach(([cat, val]) => {
        const okCat = this.hormones[hormone].categories.includes(cat);
        const num = Number(val);
        if (okCat && Number.isFinite(num) && num >= 0 && num <= 9) {
          valid[hormone][cat] = num; any = true;
        }
      });
    });

    if (!any) { alert('No valid partner scores found (0–9 per valid category).'); return; }

    this.partnerScores = valid;
    this.partnerName = this.els.partnerName?.value.trim() || 'Partner';
    localStorage.setItem('partnerName', this.partnerName);
    this.els.partnerInput.value = '';
    this.updateDisplay();
    alert('Partner scores loaded.');
  }

  // PART D-2-11 – Display Orchestration
  updateDisplay() {
    const payload = {
      name: this.yourName,
      testLength: this.testLength,
      meta: {
        name: this.yourName,
        testLength: this.testLength,
        questionsAnswered: this.lastSubmission?.questionsAnswered ?? null,
        submittedAt: this.lastSubmission?.submittedAt ?? null
      },
      scores: this.scores
    };
    if (this.els.dataOutput) this.els.dataOutput.value = JSON.stringify(payload, null, 2);

    this.updateRadarChart();
    this.updateStatisticalComparison();

    const hasPartner = this.hasPartnerScores();
    if (this.els.matchStatsNoPartner) this.els.matchStatsNoPartner.hidden = hasPartner;
    if (this.els.compatibilityNoPartner) this.els.compatibilityNoPartner.hidden = hasPartner;
    if (this.els.compatibilityChartCanvas) this.els.compatibilityChartCanvas.style.display = hasPartner ? 'block' : 'none';

    if (hasPartner) {
      this.updateMatchStats();
      this.updateCompatibilityChart();
    } else {
      if (this.els.matchPercentage) this.els.matchPercentage.textContent = '';
      if (this.els.attachmentStyles) this.els.attachmentStyles.textContent = '';
      if (this.compatibilityChart) { this.compatibilityChart.destroy(); this.compatibilityChart = null; }
    }

    // Keep the responses summary in sync
    this.updateResponseSummary();
  }

  // PART D-2-12 – Radar Chart (with category tooltips)
  updateRadarChart() {
    if (!this.els.chartCanvas) return;
    if (this.chart) this.chart.destroy();
    const hormone = this.currentResultHormone;
    const labels = this.hormones[hormone].categories;

    const yourData = labels.map(c => this.scores[hormone][c] ?? 0);
    const partnerData = labels.map(c => this.partnerScores[hormone]?.[c] ?? 0);

    this.chart = new Chart(this.els.chartCanvas, {
      type: 'radar',
      data: {
        labels,
        datasets: [
          {
            label: `${this.yourName}'s Scores`,
            data: yourData,
            backgroundColor: 'rgba(54,162,235,0.45)',
            borderColor: 'rgba(54,162,235,1)',
            pointBackgroundColor: 'rgba(54,162,235,1)',
            borderWidth: 1
          },
          {
            label: `${this.partnerName}'s Scores`,
            data: partnerData,
            backgroundColor: 'rgba(255,99,132,0.45)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          r: {
            beginAtZero: true,
            max: 9,
            ticks: { stepSize: 1 },
            pointLabels: { font: { size: 12 } }
          }
        },
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: `${hormone[0].toUpperCase() + hormone.slice(1)} Score Comparison` },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const cat = ctx.label;
                const val = ctx.parsed.r ?? ctx.formattedValue;
                const tip = (this.categoryTips[hormone] && this.categoryTips[hormone][cat]) || '';
                return `${ctx.dataset.label}: ${val}/9 — ${cat}. ${tip}`;
              }
            }
          }
        }
      }
    });
  }

  // PART D-2-13 – Statistical Comparison (Averages) with Tooltips
  updateStatisticalComparison() {
    if (!this.els.statisticalChartCanvas) return;
    if (this.statisticalChart) this.statisticalChart.destroy();

    const labels = Object.keys(this.hormones);
    const data = labels.map(h => {
      const vals = Object.values(this.scores[h] || {});
      return vals.length ? (vals.reduce((a,b)=>a+b,0) / vals.length) : 0;
    });

    this.statisticalChart = new Chart(this.els.statisticalChartCanvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Average Activity (0–9)',
          data,
          backgroundColor: 'rgba(153,102,255,0.5)',
          borderColor: 'rgba(153,102,255,1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true, max: 9 } },
        plugins: {
          title: { display: true, text: 'Average Hormone System Activity' },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const hormone = ctx.label;
                const val = ctx.formattedValue;
                const desc = this.hormoneDescriptions[hormone] || '';
                return `${hormone}: ${val}/9 → ${desc}`;
              }
            }
          }
        }
      }
    });
  }

  // PART D-2-14 – Match & Attachment
  computeAttachmentStyle(scores) {
    const avoidance = scores.cortisol?.Avoidance || 0;
    const trust     = scores.oxytocin?.Trust || 0;
    const intimacy  = scores.oxytocin?.Intimacy || 0;
    const loyalty   = scores.vasopressin?.Loyalty || 0;

    if (avoidance <= 3 && trust >= 6 && intimacy >= 6 && loyalty >= 6) return 'Secure';
    if (avoidance >= 6 && intimacy >= 6) return 'Anxious';
    if (avoidance >= 6 && trust <= 3 && intimacy <= 3) return 'Avoidant';
    if (avoidance >= 6 && (trust > 3 || intimacy > 3)) return 'Fearful-Avoidant';
    return 'Mixed';
  }

  updateMatchStats() {
    if (!this.els.matchPercentage || !this.els.attachmentStyles) return;
    const hormone = this.currentResultHormone;
    const cats = this.hormones[hormone].categories;
    let match = 0;

    cats.forEach(cat => {
      const a = this.scores[hormone][cat] || 0;
      const b = this.partnerScores[hormone]?.[cat] || 0;
      const pref = prefFor(hormone, cat);
      if (isMatchByPref(pref, a, b)) match++;
    });

    const pct = cats.length ? Math.round((match / cats.length) * 100) : 0;
    this.els.matchPercentage.textContent =
      `${this.yourName} & ${this.partnerName} – ${hormone[0].toUpperCase() + hormone.slice(1)} Match: ${pct}%`;
    this.els.matchPercentage.className = pct >= 80 ? 'high' : pct >= 50 ? 'medium' : 'low';

    const yourA = this.computeAttachmentStyle(this.scores);
    const partnerA = this.computeAttachmentStyle(this.partnerScores);
    this.els.attachmentStyles.textContent =
      `${this.yourName}'s Attachment Style: ${yourA}, ${this.partnerName}'s Attachment Style: ${partnerA}`;
  }

  // PART D-2-15 – Overall Compatibility Chart
  computeOverallCompatibility() {
    const compat = {};
    Object.keys(this.hormones).forEach(hormone => {
      const cats = this.hormones[hormone].categories;
      let m = 0;
      cats.forEach(cat => {
        const a = this.scores[hormone][cat] || 0;
        const b = this.partnerScores[hormone]?.[cat] || 0;
        const pref = prefFor(hormone, cat);
        if (isMatchByPref(pref, a, b)) m++;
      });
      compat[hormone] = cats.length ? Math.round((m / cats.length) * 100) : 0;
    });
    return compat;
  }

  updateCompatibilityChart() {
    if (!this.els.compatibilityChartCanvas) return;
    if (this.compatibilityChart) this.compatibilityChart.destroy();
    const comp = this.computeOverallCompatibility();
    const labels = Object.keys(comp);
    const data = labels.map(h => comp[h]);
    this.compatibilityChart = new Chart(this.els.compatibilityChartCanvas, {
      type: 'bar',
      data: { labels, datasets: [{ label: 'Compatibility (%)', data,
        backgroundColor: 'rgba(75,192,192,0.5)', borderColor: 'rgba(75,192,192,1)', borderWidth: 1 }] },
      options: {
        responsive: true,
        scales: { y: { beginAtZero: true, max: 100, ticks: { stepSize: 10 } } },
        plugins: { legend: { display: false }, title: { display: true, text: 'Overall Partner Compatibility' } }
      }
    });
  }

  // PART D-2-16 – Randomizer (dev helper)
  randomizeScores() {
    const avgRnd = () => Math.round((Math.floor(Math.random()*10) + Math.floor(Math.random()*10))/2);
    Object.keys(this.hormones).forEach(h => {
      this.scores[h] = {};
      this.hormones[h].categories.forEach(c => { this.scores[h][c] = avgRnd(); });
      this.partnerScores[h] = {};
      this.hormones[h].categories.forEach(c => { this.partnerScores[h][c] = avgRnd(); });
    });
    this.saveToStorage();
    this.updateDisplay();
    alert('Scores randomized for testing.');
  }

  // PART D-2-17 – AI Prompt
  generateAIPrompt() {
    const partnerLoaded = this.hasPartnerScores();
    const promptData = {
      yourName: this.yourName,
      partnerName: this.partnerName,
      yourScores: this.scores,
      partnerScores: partnerLoaded ? this.partnerScores : undefined
    };
    const header = partnerLoaded
      ? 'Analyze both profiles and provide compatibility insights.'
      : 'Provide a self-analysis based on the profile.';
    const prompt =
      `${header}\n\n` +
      JSON.stringify(promptData, null, 2) +
      `\n\nInclude strengths, potential friction, and suggestions.`;
    if (this.els.aiPromptOutput) {
      this.els.aiPromptOutput.value = prompt;
      this.els.aiPromptOutput.scrollTop = 0;
    }
  }

  // PART D-2-18 – Clear All
  clearAll() {
    if (!confirm('Clear all data and reset?')) return;
    Object.keys(this.scores).forEach(h => {
      this.scores[h] = {};
      localStorage.setItem(`${h}Scores`, '{}');
    });
    this.partnerScores = {};
    this.yourName = 'You';
    this.partnerName = 'Partner';
    localStorage.setItem('yourName', this.yourName);
    localStorage.setItem('partnerName', this.partnerName);
    if (this.els.yourName) this.els.yourName.value = this.yourName;
    if (this.els.partnerName) this.els.partnerName.value = '';
    this.updateDisplay();
  }

  // PART D-2-19 – Response Summary Printer
  updateResponseSummary() {
    const mount = this.els.responseList;
    if (!mount) return;

    if (!Array.isArray(this.lastAnswers) || !this.lastAnswers.length) {
      mount.innerHTML = '<p class="muted">Submit answers to see a readable summary.</p>';
      return;
    }

    const byHormone = {};
    this.lastAnswers.forEach(a => {
      const h = a.hormone || 'unknown';
      if (!byHormone[h]) byHormone[h] = [];
      byHormone[h].push(a);
    });

    let html = '';
    Object.keys(byHormone).forEach(hormone => {
      const group = byHormone[hormone] || [];
      const nice = hormone ? (hormone.charAt(0).toUpperCase() + hormone.slice(1)) : 'Unknown';
      html += `<h4 style="margin:10px 0">${nice}</h4>`;
      html += '<ul style="margin:0 0 10px 16px; padding:0;">';
      group.forEach(a => {
        html += `<li><strong>${a.category}</strong> — <em>${a.type}</em>: <span>${a.label}</span></li>`;
      });
      html += '</ul>';
    });

    mount.innerHTML = html;
  }

  // PART D-2-6 – Profile History (LocalStorage)
  getSavedProfiles() {
    try {
      const raw = localStorage.getItem('hormoneProfilesSaved');
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch {
      return [];
    }
  }

  setSavedProfiles(arr) {
    localStorage.setItem('hormoneProfilesSaved', JSON.stringify(arr || []));
  }

  refreshSavedProfilesSelect() {
    if (!this.els.savedProfilesSelect) return;
    const sel = this.els.savedProfilesSelect;
    const saved = this.getSavedProfiles();

    const current = sel.value;
    sel.innerHTML = '<option value="">— Select saved profile —</option>';

    // Newest first
    saved
      .slice()
      .sort((a,b) => (b.createdAt || 0) - (a.createdAt || 0))
      .forEach((p) => {
        const opt = document.createElement('option');
        opt.value = p.id;
        const when = p.createdAt ? new Date(p.createdAt).toLocaleString() : '';
        const label = `${p.label || 'Saved profile'}${when ? ' — ' + when : ''}`;
        opt.textContent = label;
        sel.appendChild(opt);
      });

    // restore selection if possible
    if (current) sel.value = current;
  }

  updateHistoryButtonState() {
    const hasSel = !!(this.els.savedProfilesSelect && this.els.savedProfilesSelect.value);
    if (this.els.loadSavedToPartnerBtn) this.els.loadSavedToPartnerBtn.disabled = !hasSel;
    if (this.els.deleteSavedProfileBtn) this.els.deleteSavedProfileBtn.disabled = !hasSel;
  }

  saveCurrentProfile() {
    const txt = (this.els.dataOutput?.value || '').trim();
    if (!txt) {
      alert('Nothing to save yet. Click “Submit Answers” first to generate your Data Summary.');
      return;
    }

    let data;
    try {
      data = JSON.parse(txt);
    } catch (e) {
      alert('Data Summary is not valid JSON. Please click “Submit Answers” again.');
      return;
    }

    const your = (this.els.yourName?.value || '').trim() || 'You';

    // Ensure the saved JSON includes the user's name (so loads are labeled correctly)
    data.name = your;
    data.meta = data.meta || {};
    data.meta.name = your;

    const label = `${your}`;

    const saved = this.getSavedProfiles();
    const id = `p_${Date.now()}_${Math.random().toString(16).slice(2)}`;

    saved.push({
      id,
      label,
      createdAt: Date.now(),
      data
    });

    // keep last 30 by default (avoid infinite growth)
    const trimmed = saved.slice(-30);
    this.setSavedProfiles(trimmed);

    this.refreshSavedProfilesSelect();
    if (this.els.savedProfilesSelect) this.els.savedProfilesSelect.value = id;
    this.updateHistoryButtonState();

    alert('Saved! You can now load it as “Partner” later for comparison.');
  }

  loadSelectedProfileToPartner() {
    if (!this.els.savedProfilesSelect || !this.els.partnerInput) return;
    const id = this.els.savedProfilesSelect.value;
    if (!id) return;

    const saved = this.getSavedProfiles();
    const found = saved.find(p => p.id === id);
    if (!found) {
      alert('Could not find that saved profile.');
      this.refreshSavedProfilesSelect();
      this.updateHistoryButtonState();
      return;
    }

    // Populate partner name from saved profile (if present)
    const savedName = (found.data?.meta?.name || found.data?.name || found.label || '').trim();
    if (savedName && this.els.partnerName) {
      this.els.partnerName.value = savedName;
      this.partnerName = savedName;
      localStorage.setItem('partnerName', this.partnerName);
    }

    // Load into partner box and trigger existing load flow
    this.els.partnerInput.value = JSON.stringify(found.data, null, 2);
    if (this.els.loadPartnerBtn) this.els.loadPartnerBtn.click();
  }

  deleteSelectedSavedProfile() {
    if (!this.els.savedProfilesSelect) return;
    const id = this.els.savedProfilesSelect.value;
    if (!id) return;

    const saved = this.getSavedProfiles();
    const found = saved.find(p => p.id === id);
    const label = found?.label || 'this profile';
    if (!confirm(`Delete ${label}? This cannot be undone.`)) return;

    const next = saved.filter(p => p.id !== id);
    this.setSavedProfiles(next);

    this.refreshSavedProfilesSelect();
    this.updateHistoryButtonState();
  }

}

/* ::SECTION D-3 – Initialize */
try {
  window.app = new HormoneTracker();
} catch (e) {
  console.error('Init failed', e);
  document.body.insertAdjacentHTML('beforeend', '<p style="color:red">Error loading tracker.</p>');
}
