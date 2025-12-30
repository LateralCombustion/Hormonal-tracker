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
   REFACTOR NOTE
   -------------
   • Structure unchanged: categories[] + questions[{text, category, weight}]
   • Category strings match existing categories exactly
   • Only question texts adjusted to be less generic + more state/trigger/recovery oriented
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
      // Entertainment (stimulation need, novelty drive, rebound)
      { text: "When you have free time, how strongly do you seek stimulation (shows/games/content) instead of staying neutral or bored?", category: "Entertainment", weight: 1.0 },
      { text: "How much does novelty (new content/new experiences) lift your mood compared to familiar routines?", category: "Entertainment", weight: 1.0 },
      { text: "After consuming entertainment, how often do you feel satisfied rather than needing 'one more thing' to feel fully engaged?", category: "Entertainment", weight: 0.9 },

      // Social Connection (reward, initiation, afterglow)
      { text: "How naturally do you initiate contact (message/call) when no one has reached out first?", category: "Social Connection", weight: 1.1 },
      { text: "How energizing does positive social feedback feel (being included, liked, understood)?", category: "Social Connection", weight: 1.2 },
      { text: "After social connection, how long does the mood lift last before you drop back to baseline?", category: "Social Connection", weight: 1.3 },

      // Romantic Relationship (bond-reward, craving vs contentment, sensitivity to distance)
      { text: "How strongly does romantic attention (messages, touch, flirtation) energize you compared to other rewards?", category: "Romantic Relationship", weight: 1.4 },
      { text: "How often do you crave romantic intensity because baseline feels flat or empty?", category: "Romantic Relationship", weight: 1.2 },
      { text: "When romantic closeness reduces, how quickly do you start seeking reassurance or stimulation elsewhere?", category: "Romantic Relationship", weight: 1.3 },

      // Achievement (drive, reward sensitivity, dopamine crash)
      { text: "When you wake up without pressure, how strong is your internal urge to pursue a goal or make progress?", category: "Achievement", weight: 2.0 },
      { text: "How much does visible progress (checklists, metrics, milestones) boost your motivation to continue?", category: "Achievement", weight: 1.6 },
      { text: "After completing a goal, how quickly does your motivation drop or jump to the next target?", category: "Achievement", weight: 1.8 },

      // Physical Activity (restless drive, post-activity reward, avoidance)
      { text: "How often do you feel physically restless until you move (walk, train, clean, pace)?", category: "Physical Activity", weight: 1.2 },
      { text: "How reliably does movement improve your mental state (focus, optimism, calm)?", category: "Physical Activity", weight: 1.3 },
      { text: "When you’re stressed, how likely are you to choose movement as the first solution (instead of avoidance or scrolling)?", category: "Physical Activity", weight: 1.1 },

      // Pleasure (hedonic pull, compensation, satiety)
      { text: "How strong is your pull toward sensory comfort (food, touch, warmth) when you feel flat, stressed, or bored?", category: "Pleasure", weight: 1.5 },
      { text: "How often do you use pleasurable stimuli to change your emotional state quickly?", category: "Pleasure", weight: 1.2 },
      { text: "When you indulge, how easily do you stop at 'enough' rather than chasing more sensation?", category: "Pleasure", weight: 1.4 },

      // Creativity (spark, momentum, follow-through)
      { text: "How often do you get sudden creative sparks that feel exciting or urgent?", category: "Creativity", weight: 1.4 },
      { text: "How strongly does starting a creative task shift your mood upward (even before results)?", category: "Creativity", weight: 1.3 },
      { text: "How often do your creative ideas turn into finished outputs rather than staying as concepts?", category: "Creativity", weight: 1.2 },

      // Learning (curiosity reward, problem-solving high, persistence)
      { text: "How rewarding does it feel to understand something new—enough that you seek it even without a practical need?", category: "Learning", weight: 1.5 },
      { text: "How much of a 'mental high' do you get from solving problems or finding patterns?", category: "Learning", weight: 1.3 },
      { text: "When learning gets difficult, how likely are you to persist rather than switching to easier stimulation?", category: "Learning", weight: 1.1 },

      // Relaxation (ability to downshift, discomfort with stillness, recovery)
      { text: "How easy is it for you to shift from stimulation into calm without needing a distraction?", category: "Relaxation", weight: 1.0 },
      { text: "When you try to relax, how often do you feel restless, guilty, or mentally 'itchy'?", category: "Relaxation", weight: 1.0 },
      { text: "After a rest period, how restored do you feel (rather than bored or unchanged)?", category: "Relaxation", weight: 0.9 },

      // Spirituality (meaning reward, grounding, practice consistency)
      { text: "How strongly do meaning/values give you energy when you feel low or directionless?", category: "Spirituality", weight: 1.1 },
      { text: "How grounding is reflection/meditation/prayer in returning you to a stable inner state?", category: "Spirituality", weight: 1.3 },
      { text: "How often do you maintain spiritual/reflection practices even when motivation is low?", category: "Spirituality", weight: 1.2 }
    ]
  },

  endorphins: {
    categories: ["Exercise", "Laughter", "Pain Relief", "Social Bonding"],
    questions: [
      // Exercise (endorphin access, threshold, afterglow)
      { text: "How reliably does physical exertion create a noticeable mood lift or relief afterward?", category: "Exercise", weight: 1.5 },
      { text: "How often do you push past initial resistance and then feel better once you’re moving?", category: "Exercise", weight: 1.4 },
      { text: "After exercise, how long does the 'afterglow' last before you drop back to baseline?", category: "Exercise", weight: 1.6 },

      // Laughter (tension release, co-regulation, recovery)
      { text: "How quickly can humor break tension for you when things feel heavy?", category: "Laughter", weight: 1.2 },
      { text: "How strongly does shared laughter with others make you feel lighter or safer?", category: "Laughter", weight: 1.1 },
      { text: "After laughing, how much does your body feel relaxed (jaw, shoulders, breathing)?", category: "Laughter", weight: 1.3 },

      // Pain Relief (stress buffering, endurance, rebound calm)
      { text: "When you feel physical discomfort or strain, how well can you stay functional without spiraling emotionally?", category: "Pain Relief", weight: 1.3 },
      { text: "How often do you notice a calm clarity appearing after intense strain or effort?", category: "Pain Relief", weight: 1.4 },
      { text: "How resilient do you feel the day after a physically demanding experience?", category: "Pain Relief", weight: 1.3 },

      // Social Bonding (shared joy, play, closeness-through-activity)
      { text: "How much does shared fun (games, training, jokes) create genuine closeness for you?", category: "Social Bonding", weight: 1.2 },
      { text: "How often do group experiences leave you feeling emotionally lighter rather than drained?", category: "Social Bonding", weight: 1.1 },
      { text: "How strongly do you associate bonding with doing something active together (not just talking)?", category: "Social Bonding", weight: 1.2 }
    ]
  },

  serotonin: {
    categories: ["Contentment", "Social Harmony", "Stability", "Gratitude"],
    questions: [
      // Contentment (baseline satisfaction, calm presence, simplicity tolerance)
      { text: "How often do you feel genuinely okay in quiet moments with nothing to solve or chase?", category: "Contentment", weight: 1.3 },
      { text: "How satisfying are simple routines (meals, walks, ordinary days) without needing excitement?", category: "Contentment", weight: 1.2 },
      { text: "How easily can you feel present and settled without external validation or stimulation?", category: "Contentment", weight: 1.3 },

      // Social Harmony (conflict sensitivity, repair capacity, pro-social regulation)
      { text: "How strongly does interpersonal tension disrupt your mood even if it’s not directed at you?", category: "Social Harmony", weight: 1.4 },
      { text: "How naturally do you act to smooth conflict or create safety in a room?", category: "Social Harmony", weight: 1.3 },
      { text: "After disagreement, how easily can you return to warmth and normal connection?", category: "Social Harmony", weight: 1.2 },

      // Stability (predictability need, change tolerance, baseline security)
      { text: "How much do unexpected changes (plans, messages, uncertainty) shake your inner balance?", category: "Stability", weight: 1.5 },
      { text: "How secure do you feel when your routines and responsibilities are predictable?", category: "Stability", weight: 1.4 },
      { text: "When life becomes messy, how well can you stay steady rather than reactive?", category: "Stability", weight: 1.4 },

      // Gratitude (positive bias, appreciation access, mood-lift reliability)
      { text: "How easily can you notice good things even when you’re stressed or disappointed?", category: "Gratitude", weight: 1.3 },
      { text: "How much does expressing appreciation change your mood in a measurable way?", category: "Gratitude", weight: 1.2 },
      { text: "How often does gratitude feel real (felt-sense) rather than 'forced thinking'?", category: "Gratitude", weight: 1.3 }
    ]
  },

  oxytocin: {
    categories: ["Intimacy", "Trust", "Social Bonding", "Caregiving"],
    questions: [
      // Intimacy (safety in closeness, openness, repair)
      { text: "How safe does physical closeness feel (touch, cuddling, proximity) rather than tense or guarded?", category: "Intimacy", weight: 1.5 },
      { text: "How naturally do you become emotionally open when someone is close and kind to you?", category: "Intimacy", weight: 1.4 },
      { text: "After distance or a misunderstanding, how easily can closeness be restored?", category: "Intimacy", weight: 1.5 },

      // Trust (dependability comfort, suspicion vs ease, co-regulation)
      { text: "How calming is it for you to rely on someone without double-checking or preparing for disappointment?", category: "Trust", weight: 1.3 },
      { text: "How quickly do you feel safe with a person who is consistent over time?", category: "Trust", weight: 1.4 },
      { text: "When you feel stressed, how much does a trusted person’s presence reduce it (even without words)?", category: "Trust", weight: 1.4 },

      // Social Bonding (belonging, warmth in groups, post-social effect)
      { text: "How strongly do you feel a sense of belonging when you’re with familiar people?", category: "Social Bonding", weight: 1.3 },
      { text: "How warm do group rituals (meals, traditions, shared spaces) feel to you internally?", category: "Social Bonding", weight: 1.2 },
      { text: "After social time, how often do you feel connected rather than lonely or disconnected?", category: "Social Bonding", weight: 1.3 },

      // Caregiving (nurture drive, emotional reward, boundaries)
      { text: "How rewarding does it feel to support someone’s wellbeing without expecting anything back?", category: "Caregiving", weight: 1.4 },
      { text: "How naturally do you notice what others need emotionally or practically?", category: "Caregiving", weight: 1.3 },
      { text: "How well can you care for others while still protecting your own energy and boundaries?", category: "Caregiving", weight: 1.3 }
    ]
  },

  vasopressin: {
    categories: ["Loyalty", "Protection", "Social Hierarchy", "Stability"],
    questions: [
      // Loyalty (commitment depth, bond rigidity, betrayal impact)
      { text: "Once you commit to someone, how strongly do you feel anchored to that bond over time?", category: "Loyalty", weight: 1.4 },
      { text: "How hard is it for you to emotionally detach from a bond even when it becomes unhealthy?", category: "Loyalty", weight: 1.3 },
      { text: "When loyalty is questioned, how intensely does it affect your mood or sense of self?", category: "Loyalty", weight: 1.5 },

      // Protection (territory, defend response, responsibility load)
      { text: "How instinctive is your protective response when someone close to you is threatened or mistreated?", category: "Protection", weight: 1.6 },
      { text: "How responsible do you feel for safeguarding your close circle or shared values?", category: "Protection", weight: 1.5 },
      { text: "How strongly do you react to boundary violations (yours or your people’s)?", category: "Protection", weight: 1.4 },

      // Social Hierarchy (status sensitivity, leadership pull, respect threat)
      { text: "How much does respect (or disrespect) from others affect your confidence and mood?", category: "Social Hierarchy", weight: 1.3 },
      { text: "How natural is it for you to take charge and create structure when a group is uncertain?", category: "Social Hierarchy", weight: 1.4 },
      { text: "How strongly do you feel motivated by roles, rank, competence, or being 'the one who handles it'?", category: "Social Hierarchy", weight: 1.3 },

      // Stability (order need, structure reliance, anxiety when unstable)
      { text: "How calming is it for you when agreements, roles, and routines are clearly defined?", category: "Stability", weight: 1.4 },
      { text: "When structure breaks (plans change, promises wobble), how uneasy does it make you?", category: "Stability", weight: 1.3 },
      { text: "How much do long-term plans and clear commitments reduce your stress?", category: "Stability", weight: 1.4 }
    ]
  },

  cortisol: {
    categories: ["Stress Response", "Alertness", "Avoidance", "Fatigue"],
    questions: [
      // Stress Response (baseline tension, spike, rumination)
      { text: "On an average day, how tense does your body feel even before anything stressful happens?", category: "Stress Response", weight: 1.6 },
      { text: "When pressure appears suddenly, how quickly do you shift into urgency or overwhelm?", category: "Stress Response", weight: 1.5 },
      { text: "After stress, how long does your mind keep looping on what could go wrong?", category: "Stress Response", weight: 1.4 },

      // Alertness (threat scanning, startle, tone detection)
      { text: "How often do you scan for problems or subtle danger signs without meaning to?", category: "Alertness", weight: 1.5 },
      { text: "How sensitive are you to shifts in tone, silence, or 'something is off' feelings?", category: "Alertness", weight: 1.4 },
      { text: "How hard is it to fully relax because part of you stays on watch?", category: "Alertness", weight: 1.5 },

      // Avoidance (freeze/escape, procrastination as protection, social withdrawal)
      { text: "When tasks feel heavy, how likely are you to avoid them even if you care about them?", category: "Avoidance", weight: 1.3 },
      { text: "When emotions intensify, how often do you withdraw to reduce input rather than engage?", category: "Avoidance", weight: 1.2 },
      { text: "How often do you postpone difficult conversations to avoid stress in the moment?", category: "Avoidance", weight: 1.3 },

      // Fatigue (crash, recovery time, burnout sensitivity)
      { text: "After stressful periods, how strong is the 'crash' (sleepiness, numbness, low capacity)?", category: "Fatigue", weight: 1.4 },
      { text: "How long does it take for your energy to return after you’ve been under pressure?", category: "Fatigue", weight: 1.3 },
      { text: "How sensitive are you to burnout signals (brain fog, irritability, low motivation)?", category: "Fatigue", weight: 1.4 }
    ]
  },

  testosterone: {
    categories: ["Drive", "Libido", "Confidence", "Competition"],
    questions: [
      // Drive (initiative, persistence, friction tolerance)
      { text: "How strongly do you feel an urge to take initiative and 'make things happen' when nothing forces you?", category: "Drive", weight: 1.5 },
      { text: "How well do you tolerate friction (hard work, resistance, discomfort) while staying motivated?", category: "Drive", weight: 1.4 },
      { text: "When you decide on a goal, how hard is it for outside opinions to shake your commitment?", category: "Drive", weight: 1.3 },

      // Libido (baseline desire, responsiveness, pursuit)
      { text: "How strong is your baseline desire for physical/sexual intimacy over time?", category: "Libido", weight: 1.6 },
      { text: "How responsive is your libido to attraction cues (touch, scent, closeness) when the opportunity appears?", category: "Libido", weight: 1.5 },
      { text: "How likely are you to pursue intimacy proactively rather than waiting for it to happen?", category: "Libido", weight: 1.4 },

      // Confidence (assertiveness, boundary setting, social dominance comfort)
      { text: "How comfortable are you stating what you want without overexplaining or apologizing?", category: "Confidence", weight: 1.5 },
      { text: "How easily do you set boundaries when something feels unfair or disrespectful?", category: "Confidence", weight: 1.4 },
      { text: "How natural is it for you to lead or take space in a group without feeling guilty?", category: "Confidence", weight: 1.3 },

      // Competition (comparison sensitivity, win drive, ego impact)
      { text: "How much does being outperformed affect your motivation (either to improve or to withdraw)?", category: "Competition", weight: 1.5 },
      { text: "How strongly do you enjoy testing yourself against others or measurable standards?", category: "Competition", weight: 1.5 },
      { text: "How driven do you feel to win, achieve rank, or prove competence when stakes appear?", category: "Competition", weight: 1.6 }
    ]
  },

  adrenaline: {
    categories: ["Fight or Flight", "Energy", "Alertness", "Thrill-Seeking"],
    questions: [
      // Fight or Flight (impulse reaction, action-before-thought, freeze tendency)
      { text: "Under pressure, how often does your body react instantly (heart rate, urge to act) before you’ve thought it through?", category: "Fight or Flight", weight: 1.5 },
      { text: "When something feels threatening, how quickly do you move into action (confront, escape, control)?", category: "Fight or Flight", weight: 1.6 },
      { text: "In conflict, how often do you go into automatic mode (fight/flight/freeze) rather than calm problem-solving?", category: "Fight or Flight", weight: 1.5 },

      // Energy (surge capacity, wired-tired, sustained vs burst)
      { text: "How often do you get sudden surges of energy that feel urgent or restless?", category: "Energy", weight: 1.3 },
      { text: "How often do you feel 'wired but tired'—high activation with low calm?", category: "Energy", weight: 1.4 },
      { text: "How well can you sustain energy steadily rather than only in bursts?", category: "Energy", weight: 1.3 },

      // Alertness (sharp focus, hypervigilance, come-down)
      { text: "In tense moments, how sharp and fast does your thinking become?", category: "Alertness", weight: 1.5 },
      { text: "How often do you stay on high alert even after the situation is safe?", category: "Alertness", weight: 1.4 },
      { text: "After intense events, how hard is the comedown (shaky, exhausted, irritable)?", category: "Alertness", weight: 1.5 },

      // Thrill-Seeking (risk appetite, boredom intolerance, consequence disregard)
      { text: "How strongly do you seek excitement when life feels predictable or slow?", category: "Thrill-Seeking", weight: 1.6 },
      { text: "How enjoyable is controlled risk (speed, intensity, uncertainty) compared to calm activities?", category: "Thrill-Seeking", weight: 1.6 },
      { text: "How often do you choose intensity even when you know it may cost you later (sleep, stress, recovery)?", category: "Thrill-Seeking", weight: 1.5 }
    ]
  },

  progesterone: {
    categories: ["Calmness", "Sleep Quality", "Empathy", "Emotional Regulation"],
    questions: [
      // Calmness (downshift ability, inner soothing, nervous system quiet)
      { text: "How easily can you downshift from stimulation into a calm, settled state?", category: "Calmness", weight: 1.4 },
      { text: "When you’re stressed, how naturally does your body soften (breathing slows, muscles release) without effort?", category: "Calmness", weight: 1.3 },
      { text: "How often do you feel a deep, safe calm (not numbness) during ordinary days?", category: "Calmness", weight: 1.2 },

      // Sleep Quality (sleep onset, continuity, restoration)
      { text: "How easily do you fall asleep without racing thoughts or tension?", category: "Sleep Quality", weight: 1.5 },
      { text: "How often do you sleep through the night without waking for long periods?", category: "Sleep Quality", weight: 1.4 },
      { text: "How restored do you feel upon waking (energy, mood, mental clarity)?", category: "Sleep Quality", weight: 1.3 },

      // Empathy (attunement, compassion, boundaries)
      { text: "How naturally do you sense what someone is feeling without them explaining it?", category: "Empathy", weight: 1.5 },
      { text: "When someone is upset, how strongly do you feel moved to comfort them?", category: "Empathy", weight: 1.4 },
      { text: "How well can you stay empathetic without absorbing the other person’s emotion as your own?", category: "Empathy", weight: 1.3 },

      // Emotional Regulation (flooding, recovery speed, self-soothing)
      { text: "When emotions rise, how often do they become overwhelming rather than manageable?", category: "Emotional Regulation", weight: 1.5 },
      { text: "After an emotional spike, how quickly do you return to baseline?", category: "Emotional Regulation", weight: 1.4 },
      { text: "How effectively can you self-soothe without needing external reassurance right away?", category: "Emotional Regulation", weight: 1.3 }
    ]
  },

  estrogen: {
    categories: ["Emotional Sensitivity", "Empathy", "Cycle Regulation", "Mood Stability"],
    questions: [
      // Emotional Sensitivity (signal detection, overstimulation, grounding)
      { text: "How aware are you of subtle emotional shifts in tone, facial expression, or atmosphere?", category: "Emotional Sensitivity", weight: 1.4 },
      { text: "How easily do external emotional signals overstimulate you (noise, conflict, intensity)?", category: "Emotional Sensitivity", weight: 1.3 },
      { text: "How well can you stay grounded while still noticing subtle cues?", category: "Emotional Sensitivity", weight: 1.5 },

      // Empathy (mirroring, compassion response, emotional permeability)
      { text: "How often do you mirror the emotional state of someone you’re close to without choosing to?", category: "Empathy", weight: 1.4 },
      { text: "How strongly do you feel compassion when someone is vulnerable or hurting?", category: "Empathy", weight: 1.3 },
      { text: "How easy is it to separate your emotions from someone else’s when you empathize?", category: "Empathy", weight: 1.4 },

      // Cycle Regulation (pattern awareness, predictability, functional impact)
      { text: "How clearly do you notice your mood or sensitivity changing in a repeating rhythm over time?", category: "Cycle Regulation", weight: 1.5 },
      { text: "How predictable are your emotional shifts—do you usually know what phase you’re in?", category: "Cycle Regulation", weight: 1.3 },
      { text: "How much do these rhythmic shifts affect your relationships or daily functioning?", category: "Cycle Regulation", weight: 1.4 },

      // Mood Stability (baseline steadiness, volatility, recovery)
      { text: "Across days, how steady is your mood without big swings up or down?", category: "Mood Stability", weight: 1.5 },
      { text: "When something upsetting happens, how likely is it to color your whole day?", category: "Mood Stability", weight: 1.4 },
      { text: "How quickly do you emotionally recover after being hurt, criticized, or disappointed?", category: "Mood Stability", weight: 1.4 }
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



