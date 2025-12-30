// =============================================
// ::DIVISION C – CASES (cases.js)
// =============================================

/* ::SECTION C-1 – Descriptions & Tooltips (high-level per-hormone) */
window.HORMONE_DESCRIPTIONS = {
  dopamine: "Motivation, reward, creativity, pleasure.",
  endorphins: "Natural pain relief, laughter, exercise highs.",
  serotonin: "Stability, social harmony, gratitude, contentment.",
  oxytocin: "Bonding, intimacy, trust, caregiving.",
  vasopressin: "Loyalty, protection, long-term bonding.",
  cortisol: "Stress reactivity, alertness, avoidance, fatigue.",
  testosterone: "Drive, libido, competition, confidence.",
  adrenaline: "Fight-or-flight readiness, energy bursts, thrill.",
  progesterone: "Calmness, sleep quality, emotional regulation.",
  estrogen: "Emotional sensitivity, empathy, cycle modulation."
};

/* ::SECTION C-2 – Category Tooltips (shown on radar point hover) */
window.CATEGORY_TIPS = {
  dopamine: {
    "Entertainment": "Enjoyment from media and fun stimulation.",
    "Social Connection": "Reward from reaching out and feeling liked.",
    "Romantic Relationship": "Joy from passion and closeness.",
    "Achievement": "Satisfaction from goals and progress.",
    "Physical Activity": "Mood lift from movement and exercise.",
    "Pleasure": "Drive for sensory comfort: food, touch.",
    "Creativity": "Spark to create and express.",
    "Learning": "Curiosity and discovery highs.",
    "Relaxation": "Ability to switch off and recharge.",
    "Spirituality": "Uplift from meaning and reflection."
  },
  endorphins: {
    "Exercise": "Runner's high; relief via exertion.",
    "Laughter": "Mood reset through humor.",
    "Pain Relief": "Resilience after strain or discomfort.",
    "Social Bonding": "Warmth in shared joyful moments."
  },
  serotonin: {
    "Contentment": "Satisfaction with simple routines.",
    "Social Harmony": "Peace from reduced conflict.",
    "Stability": "Preference for predictability.",
    "Gratitude": "Mood lift from appreciation."
  },
  oxytocin: {
    "Intimacy": "Safety in affectionate contact.",
    "Trust": "Reliance on dependable bonds.",
    "Social Bonding": "Closeness in groups/family.",
    "Caregiving": "Joy in nurturing others."
  },
  vasopressin: {
    "Loyalty": "Standing by long-term bonds.",
    "Protection": "Guarding loved ones/values.",
    "Social Hierarchy": "Status/leadership motivation.",
    "Stability": "Order and structure needs."
  },
  cortisol: {
    "Stress Response": "Intensity under pressure.",
    "Alertness": "Hyper-focus when problems arise.",
    "Avoidance": "Withdrawal to reduce load.",
    "Fatigue": "Drain from prolonged stress."
  },
  testosterone: {
    "Drive": "Push to complete tough goals.",
    "Libido": "Desire for physical intimacy.",
    "Confidence": "Comfort taking charge.",
    "Competition": "Motivation to win/outperform."
  },
  adrenaline: {
    "Fight or Flight": "Instant action under threat.",
    "Energy": "Activity despite mental tiredness.",
    "Alertness": "Sharpness in tense moments.",
    "Thrill-Seeking": "Craving risk/unpredictability."
  },
  progesterone: {
    "Calmness": "Ability to settle during stress.",
    "Sleep Quality": "Ease & depth of sleep.",
    "Empathy": "Attunement to others' feelings.",
    "Emotional Regulation": "Recovery after upsets."
  },
  estrogen: {
    "Emotional Sensitivity": "Responsiveness to subtle cues.",
    "Empathy": "Feeling with/for others.",
    "Cycle Regulation": "Rhythms affecting state.",
    "Mood Stability": "Evenness across days."
  }
};
/* ::SECTION C-3 – Hormone Definitions & Full Question Bank
   ADHD-FRIENDLY REFACTOR (ALL HORMONES)
   • Structure unchanged
   • Categories unchanged
   • Weights unchanged
   • Only question text rewritten for clarity & recognition
*/

window.HORMONE_DEFS = {
  dopamine: {
    categories: [
      "Entertainment",
      "Social Connection",
      "Romantic Relationship",
      "Achievement",
      "Physical Activity",
      "Pleasure",
      "Creativity",
      "Learning",
      "Relaxation",
      "Spirituality"
    ],
    questions: [
      // Entertainment
      { text: "How often do you look for videos, games, or scrolling when you have free time?", category: "Entertainment", weight: 1.0 },
      { text: "Do you get bored quickly when nothing interesting is happening?", category: "Entertainment", weight: 1.0 },
      { text: "After entertainment, do you feel satisfied or still want more?", category: "Entertainment", weight: 0.9 },

      // Social Connection
      { text: "Do conversations with people you like give you a noticeable mood boost?", category: "Social Connection", weight: 1.1 },
      { text: "Do you reach out to people easily when you want connection?", category: "Social Connection", weight: 1.2 },
      { text: "After social contact, does your good mood last for a while?", category: "Social Connection", weight: 1.3 },

      // Romantic Relationship
      { text: "Do romantic messages or attention quickly lift your mood?", category: "Romantic Relationship", weight: 1.4 },
      { text: "When you feel low or restless, do you crave romantic closeness?", category: "Romantic Relationship", weight: 1.2 },
      { text: "If romantic contact decreases, do you start thinking about it a lot?", category: "Romantic Relationship", weight: 1.3 },

      // Achievement
      { text: "Do you feel motivated to work on goals without being pushed?", category: "Achievement", weight: 2.0 },
      { text: "Does visible progress (lists, results) boost your motivation?", category: "Achievement", weight: 1.6 },
      { text: "After finishing a goal, do you quickly lose motivation?", category: "Achievement", weight: 1.8 },

      // Physical Activity
      { text: "Do you feel restless if you don’t move your body for a while?", category: "Physical Activity", weight: 1.2 },
      { text: "Does physical activity usually improve your mood?", category: "Physical Activity", weight: 1.3 },
      { text: "When stressed, do you use movement to feel better?", category: "Physical Activity", weight: 1.1 },

      // Pleasure
      { text: "When stressed or bored, do you seek comfort like food or touch?", category: "Pleasure", weight: 1.5 },
      { text: "Do pleasurable things change your mood quickly?", category: "Pleasure", weight: 1.2 },
      { text: "Is it hard to stop once you start indulging?", category: "Pleasure", weight: 1.4 },

      // Creativity
      { text: "Do you often get excited by new ideas or projects?", category: "Creativity", weight: 1.4 },
      { text: "Does creating something improve how you feel?", category: "Creativity", weight: 1.3 },
      { text: "Do you finish creative ideas or leave many unfinished?", category: "Creativity", weight: 1.2 },

      // Learning
      { text: "Do you enjoy learning new things even without a clear goal?", category: "Learning", weight: 1.5 },
      { text: "Does solving problems feel rewarding to you?", category: "Learning", weight: 1.3 },
      { text: "When learning gets difficult, do you lose interest quickly?", category: "Learning", weight: 1.1 },

      // Relaxation
      { text: "Is it easy for you to relax without stimulation?", category: "Relaxation", weight: 1.0 },
      { text: "Do you feel restless when trying to rest?", category: "Relaxation", weight: 1.0 },
      { text: "After resting, do you feel refreshed?", category: "Relaxation", weight: 0.9 },

      // Spirituality
      { text: "Do reflection or spiritual practices improve your mood?", category: "Spirituality", weight: 1.1 },
      { text: "Do meaning or values help you feel motivated?", category: "Spirituality", weight: 1.3 },
      { text: "Do you keep these practices even when motivation is low?", category: "Spirituality", weight: 1.2 }
    ]
  },

  endorphins: {
    categories: ["Exercise", "Laughter", "Pain Relief", "Social Bonding"],
    questions: [
      // Exercise
      { text: "Do you feel better emotionally after physical exercise?", category: "Exercise", weight: 1.5 },
      { text: "Do you ever get a 'good high' after hard training or activity?", category: "Exercise", weight: 1.4 },
      { text: "Do you use exercise to handle stress or improve mood?", category: "Exercise", weight: 1.6 },

      // Laughter
      { text: "Do you look for jokes or humor when you feel tense?", category: "Laughter", weight: 1.2 },
      { text: "Do you feel noticeably better after laughing with others?", category: "Laughter", weight: 1.1 },
      { text: "Does laughing help you reset when things feel difficult?", category: "Laughter", weight: 1.3 },

      // Pain Relief
      { text: "Do you feel a sense of relief after physical discomfort or strain passes?", category: "Pain Relief", weight: 1.3 },
      { text: "Are you able to push through discomfort and still function okay?", category: "Pain Relief", weight: 1.4 },
      { text: "After effort or tension, do you sometimes feel calm or clear-headed?", category: "Pain Relief", weight: 1.3 },

      // Social Bonding
      { text: "Do you feel uplifted when you share fun moments with others?", category: "Social Bonding", weight: 1.2 },
      { text: "Do playful activities with others feel comforting to you?", category: "Social Bonding", weight: 1.1 },
      { text: "After a positive group moment, do you feel lighter or more relaxed?", category: "Social Bonding", weight: 1.2 }
    ]
  },

  serotonin: {
    categories: ["Contentment", "Social Harmony", "Stability", "Gratitude"],
    questions: [
      // Contentment
      { text: "Do you often feel okay in quiet moments with nothing to do?", category: "Contentment", weight: 1.3 },
      { text: "Do simple routines (food, home, chores) feel satisfying to you?", category: "Contentment", weight: 1.2 },
      { text: "Do you enjoy calm moments without needing excitement?", category: "Contentment", weight: 1.3 },

      // Social Harmony
      { text: "Is keeping peace with people important to you?", category: "Social Harmony", weight: 1.4 },
      { text: "Do you feel good when you help others feel safe or understood?", category: "Social Harmony", weight: 1.3 },
      { text: "Does avoiding conflict usually improve your mood?", category: "Social Harmony", weight: 1.2 },

      // Stability
      { text: "Do you prefer predictable routines and clear plans?", category: "Stability", weight: 1.5 },
      { text: "Do you feel safer when your day runs as expected?", category: "Stability", weight: 1.4 },
      { text: "Does long-term consistency help you feel emotionally better?", category: "Stability", weight: 1.4 },

      // Gratitude
      { text: "Do you often think about things you are thankful for?", category: "Gratitude", weight: 1.3 },
      { text: "Do you feel uplifted when you tell someone you appreciate them?", category: "Gratitude", weight: 1.2 },
      { text: "After focusing on what’s good in life, do you feel clearer or calmer?", category: "Gratitude", weight: 1.3 }
    ]
  },

  oxytocin: {
    categories: ["Intimacy", "Trust", "Social Bonding", "Caregiving"],
    questions: [
      // Intimacy
      { text: "Does physical closeness usually feel safe and comforting?", category: "Intimacy", weight: 1.5 },
      { text: "Do you often want affectionate contact with someone you love?", category: "Intimacy", weight: 1.4 },
      { text: "Does being emotionally open with someone feel good and rewarding?", category: "Intimacy", weight: 1.5 },

      // Trust
      { text: "Do you rely on close relationships to feel emotionally grounded?", category: "Trust", weight: 1.3 },
      { text: "Is honesty important for you to feel close to someone?", category: "Trust", weight: 1.4 },
      { text: "Do you feel calm knowing someone dependable has your back?", category: "Trust", weight: 1.4 },

      // Social Bonding
      { text: "Do you feel warm inside when you’re with people who truly know you?", category: "Social Bonding", weight: 1.3 },
      { text: "Do shared routines (meals, traditions) make you feel closer to people?", category: "Social Bonding", weight: 1.2 },
      { text: "Do family or group activities help you bond with others?", category: "Social Bonding", weight: 1.3 },

      // Caregiving
      { text: "Does caring for someone else feel emotionally fulfilling to you?", category: "Caregiving", weight: 1.4 },
      { text: "Do you feel good when you support someone emotionally?", category: "Caregiving", weight: 1.3 },
      { text: "Do kind actions usually make you feel closer to people?", category: "Caregiving", weight: 1.3 }
    ]
  },

  vasopressin: {
    categories: ["Loyalty", "Protection", "Social Hierarchy", "Stability"],
    questions: [
      // Loyalty
      { text: "Is staying loyal to people you commit to very important to you?", category: "Loyalty", weight: 1.4 },
      { text: "Do long-term bonds feel deeply important to you?", category: "Loyalty", weight: 1.3 },
      { text: "Do you feel proud when you stay loyal through hard times?", category: "Loyalty", weight: 1.5 },

      // Protection
      { text: "Do you naturally step in to protect people you care about?", category: "Protection", weight: 1.6 },
      { text: "Do you feel responsible for defending your close circle?", category: "Protection", weight: 1.5 },
      { text: "Do you feel a strong urge to guard shared values or what is 'yours'?", category: "Protection", weight: 1.4 },

      // Social Hierarchy
      { text: "Do you enjoy earning respect or status in a group?", category: "Social Hierarchy", weight: 1.3 },
      { text: "Do you feel motivated to take leadership or create structure?", category: "Social Hierarchy", weight: 1.4 },
      { text: "Do you care about your role or position in social groups?", category: "Social Hierarchy", weight: 1.3 },

      // Stability
      { text: "Do you feel calmer when life and relationships feel organized?", category: "Stability", weight: 1.4 },
      { text: "Do you like having control over routines and structure?", category: "Stability", weight: 1.3 },
      { text: "Do clear long-term plans make you feel more secure?", category: "Stability", weight: 1.4 }
    ]
  },

  cortisol: {
    categories: ["Stress Response", "Alertness", "Avoidance", "Fatigue"],
    questions: [
      // Stress Response
      { text: "Do you often feel tense even on normal days?", category: "Stress Response", weight: 1.6 },
      { text: "When pressure appears, do you feel overwhelmed quickly?", category: "Stress Response", weight: 1.5 },
      { text: "After stress, do worries stay in your mind for a long time?", category: "Stress Response", weight: 1.4 },

      // Alertness
      { text: "Do you often become hyper-focused when something feels wrong?", category: "Alertness", weight: 1.5 },
      { text: "Do you quickly notice small changes in tone, mood, or behavior?", category: "Alertness", weight: 1.4 },
      { text: "Do you feel like you need to stay alert to feel safe?", category: "Alertness", weight: 1.5 },

      // Avoidance
      { text: "When you feel overloaded, do you withdraw to reduce input?", category: "Avoidance", weight: 1.3 },
      { text: "Do you postpone tasks that feel mentally heavy?", category: "Avoidance", weight: 1.2 },
      { text: "Do you avoid confrontations because they raise tension?", category: "Avoidance", weight: 1.3 },

      // Fatigue
      { text: "Do you feel drained after stress or demanding days?", category: "Fatigue", weight: 1.4 },
      { text: "Do you need a lot of recovery time after intense responsibility?", category: "Fatigue", weight: 1.3 },
      { text: "Do you notice burnout signs like brain fog or irritability?", category: "Fatigue", weight: 1.4 }
    ]
  },

  testosterone: {
    categories: ["Drive", "Libido", "Confidence", "Competition"],
    questions: [
      // Drive
      { text: "Do you push yourself to complete difficult goals?", category: "Drive", weight: 1.5 },
      { text: "Do you feel motivated to take on new challenges?", category: "Drive", weight: 1.4 },
      { text: "Do you feel energized by ambition and big goals?", category: "Drive", weight: 1.3 },

      // Libido
      { text: "Do you often feel a strong desire for physical intimacy?", category: "Libido", weight: 1.6 },
      { text: "Do you crave romantic or sexual attention at times?", category: "Libido", weight: 1.5 },
      { text: "Does flirting or sexual tension feel exciting to you?", category: "Libido", weight: 1.4 },

      // Confidence
      { text: "Do you naturally take the lead when others are uncertain?", category: "Confidence", weight: 1.5 },
      { text: "Are you comfortable taking charge in uncertain situations?", category: "Confidence", weight: 1.4 },
      { text: "Does being assertive feel natural to you in social settings?", category: "Confidence", weight: 1.3 },

      // Competition
      { text: "Do you compare yourself to others and feel motivated by it?", category: "Competition", weight: 1.5 },
      { text: "Do you enjoy testing your skills against other people?", category: "Competition", weight: 1.5 },
      { text: "Do you often feel driven to win or outperform?", category: "Competition", weight: 1.6 }
    ]
  },

  adrenaline: {
    categories: ["Fight or Flight", "Energy", "Alertness", "Thrill-Seeking"],
    questions: [
      // Fight or Flight
      { text: "In high stress, do you react first and think later?", category: "Fight or Flight", weight: 1.5 },
      { text: "When something feels urgent, do you jump into action quickly?", category: "Fight or Flight", weight: 1.6 },
      { text: "In pressure situations, do you go into automatic mode (fight/flight)?", category: "Fight or Flight", weight: 1.5 },

      // Energy
      { text: "Do you stay active even when mentally tired?", category: "Energy", weight: 1.3 },
      { text: "Do you crave fast-paced or high-energy environments?", category: "Energy", weight: 1.4 },
      { text: "Do energy bursts help you perform under stress?", category: "Energy", weight: 1.3 },

      // Alertness
      { text: "Do you feel mentally sharp in tense or fast moments?", category: "Alertness", weight: 1.5 },
      { text: "Do you notice small dangers or shifts before others do?", category: "Alertness", weight: 1.4 },
      { text: "Do you enjoy the sharp focus you get in tense moments?", category: "Alertness", weight: 1.5 },

      // Thrill-Seeking
      { text: "Do you crave risky or unpredictable adventures?", category: "Thrill-Seeking", weight: 1.6 },
      { text: "Do extreme or risky experiences feel exciting to you?", category: "Thrill-Seeking", weight: 1.6 },
      { text: "Do you chase activities that give you an adrenaline rush?", category: "Thrill-Seeking", weight: 1.5 }
    ]
  },

  progesterone: {
    categories: ["Calmness", "Sleep Quality", "Empathy", "Emotional Regulation"],
    questions: [
      // Calmness
      { text: "Do you stay calm even when things are stressful?", category: "Calmness", weight: 1.4 },
      { text: "Can you slow down mentally after intense stimulation?", category: "Calmness", weight: 1.3 },
      { text: "Does feeling calm and still come naturally to you?", category: "Calmness", weight: 1.2 },

      // Sleep Quality
      { text: "Do you fall asleep easily and stay asleep?", category: "Sleep Quality", weight: 1.5 },
      { text: "Do you feel rested after a night of sleep?", category: "Sleep Quality", weight: 1.4 },
      { text: "Do you usually sleep through the night without waking up much?", category: "Sleep Quality", weight: 1.3 },

      // Empathy
      { text: "Do you often sense what others feel without them saying it?", category: "Empathy", weight: 1.5 },
      { text: "Do you feel affected when you see someone in distress?", category: "Empathy", weight: 1.4 },
      { text: "Does supporting someone emotionally feel rewarding to you?", category: "Empathy", weight: 1.3 },

      // Emotional Regulation
      { text: "Do your emotions stay steady on long or difficult days?", category: "Emotional Regulation", weight: 1.5 },
      { text: "Do you recover quickly after strong emotions?", category: "Emotional Regulation", weight: 1.4 },
      { text: "Can you handle mixed emotions in social situations without spiraling?", category: "Emotional Regulation", weight: 1.3 }
    ]
  },

  estrogen: {
    categories: ["Emotional Sensitivity", "Empathy", "Cycle Regulation", "Mood Stability"],
    questions: [
      // Emotional Sensitivity
      { text: "Do you notice small changes in tone or facial expression quickly?", category: "Emotional Sensitivity", weight: 1.4 },
      { text: "Do you get emotionally moved by things other people seem to ignore?", category: "Emotional Sensitivity", weight: 1.3 },
      { text: "Do emotional signals around you affect you strongly?", category: "Emotional Sensitivity", weight: 1.5 },

      // Empathy
      { text: "Do you understand what others feel without many words?", category: "Empathy", weight: 1.4 },
      { text: "Do you mirror the emotions of people close to you?", category: "Empathy", weight: 1.3 },
      { text: "Do you feel a strong urge to support someone who is upset?", category: "Empathy", weight: 1.4 },

      // Cycle Regulation
      { text: "Do you feel that your mood changes with body rhythms or cycles?", category: "Cycle Regulation", weight: 1.5 },
      { text: "Do you notice a repeating pattern in your mood over time?", category: "Cycle Regulation", weight: 1.3 },
      { text: "Do you notice changes in focus or sensitivity during hormonal shifts?", category: "Cycle Regulation", weight: 1.4 },

      // Mood Stability
      { text: "Is your mood usually stable across days and weeks?", category: "Mood Stability", weight: 1.5 },
      { text: "Do you often feel emotionally balanced over time?", category: "Mood Stability", weight: 1.4 },
      { text: "After being upset, do you bounce back emotionally fairly well?", category: "Mood Stability", weight: 1.4 }
    ]
  }
};



/* ::SECTION C-4 – Scale Templates & Custom Labels
   Core answer wordings + optional per-category label overrides
*/

window.SCALE_TEMPLATES = {
  quality:      ["Very Poor","Poor","Fair","Good","Excellent"],
  satisfaction: ["Very Unsatisfied","Unsatisfied","Neutral","Satisfied","Very Satisfied"],
  intensity:    ["None","Low","Moderate","High","Extreme"],
  importance:   ["Not important","Somewhat important","Moderately important","Very important","Extremely important"],
  agreement:    ["Strongly Disagree","Disagree","Neutral","Agree","Strongly Agree"],
  quantity:     ["Never","Occasionally","Regularly","Often","Always"],
   strength:    ["Weakest","Weak","Average","Strong","Extremely strong"]
};

/* Optional: per-category custom labels (only add categories you want to override).
   Example:
   window.CATEGORY_LABELS = {
     progesterone: {
       "Sleep Quality": ["Awful","Bad","Okay","Good","Perfect"]
     }
   };
*/
window.CATEGORY_LABELS = {};

/* ::SECTION C-5 – Automated Scale Detection (keywords) & Numeric Overrides
   HOW IT WORKS
   ------------
   • Optional per-question numeric override in HORMONE_DEFS:
       scaleOverride = 0 → Auto (default)
       scaleOverride = 1 → "quality"
       scaleOverride = 2 → "satisfaction"
       scaleOverride = 3 → "intensity"
       scaleOverride = 4 → "agreement"
       scaleOverride = 5 → "quantity"
       scaleOverride = 6 → "importance"

   • Auto-detect uses KEYWORD_RULES below (case-insensitive).
     Priority (first match wins):
       INTENSITY_EMOTION (special) → quantity → importance → quality → satisfaction → intensity → agreement

   • If no keyword matches, default to "quantity".
*/

window.SCALE_INDEX_MAP = {
  0: "auto",
  1: "quality",
  2: "satisfaction",
  3: "intensity",
  4: "agreement",
  5: "quantity",
  6: "importance"
};

/* Strong intensity phrases (“how much/strongly/emotionally/to what extent” + emotion words)
   We check these *before* regular quantity so “How much joy…” becomes INTENSITY, not QUANTITY. */
window.INTENSITY_EMOTION_TERMS = [
  "joy","pleasure","arousal","stress","anxiety","tension","energy","fatigue","excitement","thrill",
  "urge","desire","drive","libido","affection","empathy","sad(ness)?","anger","fear","attraction",
  "motivation","confidence","sensitivity","overwhelm(ed)?","affected"
];

window.KEYWORD_RULES = {
  // Priority #1 after INTENSITY_EMOTION pre-check: frequency / amount (countable) questions
  quantity: [
    /\bhow\s+(often|many|much)\b/i,
    /\bfreq(uent|uency)?\b/i,
    /\busually\b/i, /\bsometimes\b/i, /\balways\b/i, /\bnever\b/i,
    /\bregular(ly)?\b/i, /\boccasionally\b/i, /\brare(ly)?\b/i, /\boften\b/i
  ],

  // Priority #2: importance phrasing
  importance: [
    /\bhow\s+important\b/i, /\bimportance\b/i, /\bpriorit(y|ies|ize|ised|ized)\b/i
  ],

  // Quality of state
  quality: [
    /\bsleep(ing)?\b/i, /\brest(ed|ful)?\b/i, /\bhealth(y)?\b/i, /\bwell[- ]?being\b/i,
    /\bfocus(ed|ing)?\b/i, /\bclarity\b/i, /\bcalm(ness)?\b/i, /\bquality\b/i, /\brefresh(ed|ing)?\b/i
  ],

  // Satisfaction / liking / preference
  satisfaction: [
    /\bsatisf(y|ied|ying|action)\b/i, /\bcontent(ed|ment)?\b/i, /\benjoy(ment|ing|s)?\b/i,
    /\blike(d)?\b/i, /\bprefer\b/i, /\bappreciat(e|ion)\b/i, /\bpleased?\b/i, /\bfulfill(ed|ment)?\b/i,
    /\breward(ing|s|ed)?\b/i, /\brelax(ing|ed|ation)?\b/i, /\bsooth(ing|ed)?\b/i
  ],


  // Intensity / magnitude
  intensity: [
    /\bhow\s+intense\b/i, /\bintens(e|ity)\b/i, /\bstress(ed|ful)?\b/i, /\banxiety|anxious\b/i,
    /\benergy|energized\b/i, /\bemotion(al|s)?\b/i, /\burge(s)?\b/i, /\bdrive\b/i, /\bextreme\b/i,
    /\bto\s+what\s+extent\b/i
  ],

  // Agreement / belief / attitude
  agreement: [
    /\bI\s+(believe|value|think)\b/i, /\bagree|disagree\b/i,
    /\bshould\b/i, /\bprinciple(s)?\b/i, /\battitude(s)?\b/i, /\bI\s+(am|feel)\s+that\b/i
  ]
};



