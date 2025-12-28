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

/* ::SECTION C-3 – Hormone Definitions & Full Question Bank */
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
      { text: "How excited do you feel when planning to watch a new movie, series, or game release?", category: "Entertainment", weight: 1.0 },
      { text: "How much enjoyment do you get from immersive stories, games, or shows?", category: "Entertainment", weight: 1.0 },
      { text: "How often do you seek out fun distractions or media to feel stimulated?", category: "Entertainment", weight: 0.9 },

      // Social Connection
      { text: "How motivated are you to reach out and talk to friends or acquaintances?", category: "Social Connection", weight: 1.1 },
      { text: "How rewarding does it feel to be included in social activities or group chats?", category: "Social Connection", weight: 1.2 },
      { text: "How much of a mood boost do you get after connecting with someone emotionally?", category: "Social Connection", weight: 1.3 },

      // Romantic Relationship
      { text: "How much joy do you feel when bonding deeply with a romantic partner?", category: "Romantic Relationship", weight: 1.4 },
      { text: "How often do you seek romantic validation through touch, messages, or attention?", category: "Romantic Relationship", weight: 1.2 },
      { text: "How strongly do you crave emotional closeness or passion with someone special?", category: "Romantic Relationship", weight: 1.3 },

      // Achievement
      { text: "How rewarding is it to complete goals or make measurable progress?", category: "Achievement", weight: 2.0 },
      { text: "How often do you set new personal challenges just to see if you can reach them?", category: "Achievement", weight: 1.6 },
      { text: "How much satisfaction do you feel when being recognized for your accomplishments?", category: "Achievement", weight: 1.8 },

      // Physical Activity
      { text: "How much do you crave movement like exercise, dancing, or walking?", category: "Physical Activity", weight: 1.2 },
      { text: "How energized do you feel after working out or being physically active?", category: "Physical Activity", weight: 1.3 },
      { text: "How often do you use physical activity to lift your mood or reduce restlessness?", category: "Physical Activity", weight: 1.1 },

      // Pleasure
      { text: "How much do you anticipate and seek out pleasurable experiences like food or touch?", category: "Pleasure", weight: 1.5 },
      { text: "How often do you indulge in something just because it feels good?", category: "Pleasure", weight: 1.2 },
      { text: "How strong is your urge to seek sensory pleasures when stressed or bored?", category: "Pleasure", weight: 1.4 },

      // Creativity
      { text: "How often do you get excited by starting a new creative project or idea?", category: "Creativity", weight: 1.4 },
      { text: "How rewarding is it to express yourself through writing, drawing, or making things?", category: "Creativity", weight: 1.3 },
      { text: "How driven are you to turn inspiration into something tangible?", category: "Creativity", weight: 1.2 },

      // Learning
      { text: "How much joy do you get from understanding something new or complex?", category: "Learning", weight: 1.5 },
      { text: "How often do you feel a rush from solving problems or making discoveries?", category: "Learning", weight: 1.3 },
      { text: "How motivated are you to explore new knowledge, even without a goal in mind?", category: "Learning", weight: 1.1 },

      // Relaxation
      { text: "How rewarding is the feeling of letting go and doing absolutely nothing?", category: "Relaxation", weight: 1.0 },
      { text: "How often do you crave downtime to reset your mind and body?", category: "Relaxation", weight: 1.0 },
      { text: "How much enjoyment do you find in peaceful environments or gentle routines?", category: "Relaxation", weight: 0.9 },

      // Spirituality
      { text: "How often do you feel uplifted after engaging in spiritual or reflective practices?", category: "Spirituality", weight: 1.1 },
      { text: "How much meaning or purpose do you draw from spiritual or existential beliefs?", category: "Spirituality", weight: 1.3 },
      { text: "How rewarding is the feeling of connection to something greater than yourself?", category: "Spirituality", weight: 1.2 }
    ]
  },

  endorphins: {
    categories: ["Exercise", "Laughter", "Pain Relief", "Social Bonding"],
    questions: [
      // Exercise
      { text: "How strong is your desire to move or exercise to feel better emotionally?", category: "Exercise", weight: 1.5 },
      { text: "How often do you experience a euphoric high after intense physical activity?", category: "Exercise", weight: 1.4 },
      { text: "How much do you rely on exercise to manage stress or boost mood?", category: "Exercise", weight: 1.6 },

      // Laughter
      { text: "How often do you seek out humor to lift your mood or ease tension?", category: "Laughter", weight: 1.2 },
      { text: "How much joy do you feel when laughing deeply with others?", category: "Laughter", weight: 1.1 },
      { text: "How often does laughter help you reset emotionally during difficult times?", category: "Laughter", weight: 1.3 },

      // Pain Relief
      { text: "How rewarding is the sensation of recovery after pain or strain?", category: "Pain Relief", weight: 1.3 },
      { text: "How much do you rely on inner strength to endure and overcome discomfort?", category: "Pain Relief", weight: 1.4 },
      { text: "How often do you notice a calm or clarity after physical exertion or tension?", category: "Pain Relief", weight: 1.3 },

      // Social Bonding
      { text: "How strongly do you feel uplifted when sharing joyful moments with others?", category: "Social Bonding", weight: 1.2 },
      { text: "How much comfort do you find in shared physical or playful activities?", category: "Social Bonding", weight: 1.1 },
      { text: "How often do positive group interactions leave you feeling lighter or more relaxed?", category: "Social Bonding", weight: 1.2 }
    ]
  },

  serotonin: {
    categories: ["Contentment", "Social Harmony", "Stability", "Gratitude"],
    questions: [
      // Contentment
      { text: "How often do you feel emotionally balanced in quiet or simple moments?", category: "Contentment", weight: 1.3 },
      { text: "How much satisfaction do you get from ordinary, peaceful routines?", category: "Contentment", weight: 1.2 },
      { text: "How deeply do you enjoy moments of calm or emotional stillness?", category: "Contentment", weight: 1.3 },

      // Social Harmony
      { text: "How important is maintaining harmony in your social relationships?", category: "Social Harmony", weight: 1.4 },
      { text: "How often do you feel fulfilled after helping others feel safe or heard?", category: "Social Harmony", weight: 1.3 },
      { text: "How much does avoiding conflict improve your overall mood?", category: "Social Harmony", weight: 1.2 },

      // Stability
      { text: "How strongly do you prefer predictability and structured environments?", category: "Stability", weight: 1.5 },
      { text: "How safe or secure do you feel when your routine is undisturbed?", category: "Stability", weight: 1.4 },
      { text: "How much does long-term consistency improve your emotional state?", category: "Stability", weight: 1.4 },

      // Gratitude
      { text: "How frequently do you reflect on what you are thankful for?", category: "Gratitude", weight: 1.3 },
      { text: "How uplifting is it for you to express appreciation toward others?", category: "Gratitude", weight: 1.2 },
      { text: "How much emotional clarity do you feel after reflecting on life’s blessings?", category: "Gratitude", weight: 1.3 }
    ]
  },

  oxytocin: {
    categories: ["Intimacy", "Trust", "Social Bonding", "Caregiving"],
    questions: [
      // Intimacy
      { text: "How much emotional safety do you feel in physically close moments?", category: "Intimacy", weight: 1.5 },
      { text: "How often do you crave deep, affectionate contact with someone you love?", category: "Intimacy", weight: 1.4 },
      { text: "How rewarding is shared vulnerability in romantic or close relationships?", category: "Intimacy", weight: 1.5 },

      // Trust
      { text: "How much do you rely on close relationships for emotional grounding?", category: "Trust", weight: 1.3 },
      { text: "How important is emotional honesty in the people you connect with?", category: "Trust", weight: 1.4 },
      { text: "How often do you feel peace knowing someone dependable has your back?", category: "Trust", weight: 1.4 },

      // Social Bonding
      { text: "How much warmth do you feel when spending time with people who truly know you?", category: "Social Bonding", weight: 1.3 },
      { text: "How important are shared rituals, meals, or traditions in your relationships?", category: "Social Bonding", weight: 1.2 },
      { text: "How often do you bond deeply through group or family activities?", category: "Social Bonding", weight: 1.3 },

      // Caregiving
      { text: "How emotionally fulfilling is it to take care of someone else’s needs?", category: "Caregiving", weight: 1.4 },
      { text: "How much joy do you get from nurturing or emotionally supporting someone?", category: "Caregiving", weight: 1.3 },
      { text: "How often do kind actions make you feel closer to others?", category: "Caregiving", weight: 1.3 }
    ]
  },

  vasopressin: {
    categories: ["Loyalty", "Protection", "Social Hierarchy", "Stability"],
    questions: [
      // Loyalty
      { text: "How important is standing by those you are emotionally committed to?", category: "Loyalty", weight: 1.4 },
      { text: "How strongly do you feel connected to long-term bonds or oaths?", category: "Loyalty", weight: 1.3 },
      { text: "How often do you feel rewarded by remaining loyal through hardship?", category: "Loyalty", weight: 1.5 },

      // Protection
      { text: "How instinctively do you step in to protect people you care about?", category: "Protection", weight: 1.6 },
      { text: "How much responsibility do you feel for defending your close circle?", category: "Protection", weight: 1.5 },
      { text: "How often do you feel driven to guard shared values or territory?", category: "Protection", weight: 1.4 },

      // Social Hierarchy
      { text: "How satisfying is it to earn respect or status among your peers?", category: "Social Hierarchy", weight: 1.3 },
      { text: "How motivated are you to take leadership or assert structure?", category: "Social Hierarchy", weight: 1.4 },
      { text: "How much pride do you take in your position within social groups?", category: "Social Hierarchy", weight: 1.3 },

      // Stability
      { text: "How calming is it to maintain order in your relationships or surroundings?", category: "Stability", weight: 1.4 },
      { text: "How often do you seek control over routines or structures in life?", category: "Stability", weight: 1.3 },
      { text: "How secure do you feel when long-term structures are in place?", category: "Stability", weight: 1.4 }
    ]
  },

  cortisol: {
    categories: ["Stress Response", "Alertness", "Avoidance", "Fatigue"],
    questions: [
      // Stress Response
      { text: "How intensely do you react when faced with unexpected pressure?", category: "Stress Response", weight: 1.6 },
      { text: "How often do you feel tension building in high-demand situations?", category: "Stress Response", weight: 1.5 },
      { text: "How much does your mood shift when overwhelmed by responsibility?", category: "Stress Response", weight: 1.4 },

      // Alertness
      { text: "How often do you become hyper-focused when problems arise?", category: "Alertness", weight: 1.5 },
      { text: "How easily do you detect changes in tone, behavior, or threat?", category: "Alertness", weight: 1.4 },
      { text: "How much do you rely on heightened awareness to stay safe?", category: "Alertness", weight: 1.5 },

      // Avoidance
      { text: "How often do you withdraw to reduce emotional or mental overload?", category: "Avoidance", weight: 1.3 },
      { text: "How likely are you to delay tasks that feel mentally taxing?", category: "Avoidance", weight: 1.2 },
      { text: "How strongly do you avoid confrontations that raise tension?", category: "Avoidance", weight: 1.3 },

      // Fatigue
      { text: "How much do you feel drained after prolonged stress or social effort?", category: "Fatigue", weight: 1.4 },
      { text: "How often do you need to recharge after intense decision-making?", category: "Fatigue", weight: 1.3 },
      { text: "How sensitive are you to burnout or overwork symptoms?", category: "Fatigue", weight: 1.4 }
    ]
  },

  testosterone: {
    categories: ["Drive", "Libido", "Confidence", "Competition"],
    questions: [
      // Drive
      { text: "How much do you push yourself to complete difficult goals?", category: "Drive", weight: 1.5 },
      { text: "How motivated are you to take on new challenges or ventures?", category: "Drive", weight: 1.4 },
      { text: "How often do you feel energized by the pursuit of ambition?", category: "Drive", weight: 1.3 },

      // Libido
      { text: "How strong is your desire for physical intimacy or attraction?", category: "Libido", weight: 1.6 },
      { text: "How often do you experience cravings for romantic or sexual attention?", category: "Libido", weight: 1.5 },
      { text: "How much pleasure do you get from flirtation or sexual tension?", category: "Libido", weight: 1.4 },

      // Confidence
      { text: "How natural is it for you to lead when others are uncertain?", category: "Confidence", weight: 1.5 },
      { text: "How comfortable are you taking charge or leading in uncertain situations?", category: "Confidence", weight: 1.4 },
      { text: "How much does assertiveness come naturally to you in social settings?", category: "Confidence", weight: 1.3 },

      // Competition
      { text: "How motivated are you by comparing yourself to others?", category: "Competition", weight: 1.5 },
      { text: "How much do you enjoy comparing your skills or results with others?", category: "Competition", weight: 1.5 },
      { text: "How often do you feel driven to outperform or win?", category: "Competition", weight: 1.6 }
    ]
  },

  adrenaline: {
    categories: ["Fight or Flight", "Energy", "Alertness", "Thrill-Seeking"],
    questions: [
      // Fight or Flight
      { text: "How often do you instinctively react before thinking in high-stress situations?", category: "Fight or Flight", weight: 1.5 },
      { text: "How quickly do you spring into action when under threat or stress?", category: "Fight or Flight", weight: 1.6 },
      { text: "How often do you react instinctively in high-pressure situations?", category: "Fight or Flight", weight: 1.5 },

      // Energy
      { text: "How driven are you to stay active even when mentally tired?", category: "Energy", weight: 1.3 },
      { text: "How much do you crave high-energy environments or fast-paced activity?", category: "Energy", weight: 1.4 },
      { text: "How often do bursts of energy help you perform under stress?", category: "Energy", weight: 1.3 },

      // Alertness
      { text: "How mentally sharp do you feel during tense or fast-moving moments?", category: "Alertness", weight: 1.5 },
      { text: "How frequently do you notice small shifts or dangers before others?", category: "Alertness", weight: 1.4 },
      { text: "How much do you enjoy the sharp focus that comes in tense moments?", category: "Alertness", weight: 1.5 },

      // Thrill-Seeking
      { text: "How often do you crave unpredictable or risky adventures?", category: "Thrill-Seeking", weight: 1.6 },
      { text: "How excited do you feel when trying risky or extreme experiences?", category: "Thrill-Seeking", weight: 1.6 },
      { text: "How often do you chase activities that give you an adrenaline rush?", category: "Thrill-Seeking", weight: 1.5 }
    ]
  },

  progesterone: {
    categories: ["Calmness", "Sleep Quality", "Empathy", "Emotional Regulation"],
    questions: [
      // Calmness
      { text: "How often do you feel deeply calm during stressful moments?", category: "Calmness", weight: 1.4 },
      { text: "How easily can you slow down mentally after intense stimulation?", category: "Calmness", weight: 1.3 },
      { text: "How naturally does serenity or stillness come to you?", category: "Calmness", weight: 1.2 },

      // Sleep Quality
      { text: "How easily do you fall and stay asleep?", category: "Sleep Quality", weight: 1.5 },
      { text: "How rested do you feel after a night of sleep?", category: "Sleep Quality", weight: 1.4 },
      { text: "How rarely do you wake up during the night?", category: "Sleep Quality", weight: 1.3 },

      // Empathy
      { text: "How often do you intuitively sense what others are feeling?", category: "Empathy", weight: 1.5 },
      { text: "How emotionally affected are you by seeing others in distress?", category: "Empathy", weight: 1.4 },
      { text: "How rewarding is it to emotionally support someone else?", category: "Empathy", weight: 1.3 },

      // Emotional Regulation
      { text: "How stable are your emotions during long or difficult days?", category: "Emotional Regulation", weight: 1.5 },
      { text: "How quickly can you recover from emotional outbursts?", category: "Emotional Regulation", weight: 1.4 },
      { text: "How easily do you manage conflicting emotions in social situations?", category: "Emotional Regulation", weight: 1.3 }
    ]
  },

  estrogen: {
    categories: ["Emotional Sensitivity", "Empathy", "Cycle Regulation", "Mood Stability"],
    questions: [
      // Emotional Sensitivity
      { text: "How emotionally responsive are you to subtle changes in tone or expression?", category: "Emotional Sensitivity", weight: 1.4 },
      { text: "How often do you feel emotionally moved by things others overlook?", category: "Emotional Sensitivity", weight: 1.3 },
      { text: "How sensitive are you to emotional signals in your environment?", category: "Emotional Sensitivity", weight: 1.5 },

      // Empathy
      { text: "How easily do you understand others’ emotions without them saying much?", category: "Empathy", weight: 1.4 },
      { text: "How often do you mirror the emotional state of someone you’re close to?", category: "Empathy", weight: 1.3 },
      { text: "How strong is your urge to emotionally support someone in distress?", category: "Empathy", weight: 1.4 },

      // Cycle Regulation
      { text: "How strongly do you feel affected by hormonal cycles or physical rhythms?", category: "Cycle Regulation", weight: 1.5 },
      { text: "How often do you notice your emotional state following a monthly rhythm?", category: "Cycle Regulation", weight: 1.3 },
      { text: "How aware are you of changes in focus or sensitivity due to hormonal shifts?", category: "Cycle Regulation", weight: 1.4 },

      // Mood Stability
      { text: "How stable is your emotional state across days or weeks?", category: "Mood Stability", weight: 1.5 },
      { text: "How often do you feel balanced emotionally over time?", category: "Mood Stability", weight: 1.4 },
      { text: "How well can you recover emotionally after being upset?", category: "Mood Stability", weight: 1.4 }
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



