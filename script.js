// === Music theory helpers ===
const NOTE_NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];

// All chords as 4-note voicings (pitch-class templates)
const CHORD_TYPES = [
  // --- Basic 7th chords / core set ---
  { name: "maj7",     label: "Major 7",           intervals: [0, 4, 7, 11] },  // 1 3 5 7
  { name: "7",        label: "Dominant 7",        intervals: [0, 4, 7, 10] },  // 1 3 5 b7
  { name: "min7",     label: "Minor 7",           intervals: [0, 3, 7, 10] },  // 1 b3 5 b7
  { name: "m7b5",     label: "Half-dim 7",        intervals: [0, 3, 6, 10] },  // 1 b3 b5 b7
  { name: "dim7",     label: "Diminished 7",      intervals: [0, 3, 6, 9]  },  // 1 b3 b5 bb7
  { name: "minMaj7",  label: "Minor-Maj 7",       intervals: [0, 3, 7, 11] },  // 1 b3 5 7
  { name: "maj6",     label: "Major 6",           intervals: [0, 4, 7, 9]  },  // 1 3 5 6

  // --- Altered dominants & Hendrix style ---
  { name: "7#9",      label: "Dom 7 ♯9",          intervals: [0, 4, 10, 3] },  // 1 3 b7 #9
  { name: "7b9",      label: "Dom 7 ♭9",          intervals: [0, 4, 10, 1] },  // 1 3 b7 b9
  { name: "7#11",     label: "Dom 7 ♯11",         intervals: [0, 4, 10, 6] },  // 1 3 b7 #11
  { name: "7#5",      label: "Dom 7 ♯5",          intervals: [0, 4, 8, 10] },  // 1 3 #5 b7

  // --- Sus chords (extended) ---
  { name: "7sus4",    label: "7sus4",             intervals: [0, 5, 7, 10] },  // 1 4 5 b7
  { name: "7sus2",    label: "7sus2",             intervals: [0, 2, 7, 10] },  // 1 2 5 b7
  { name: "9sus4",    label: "9sus4",             intervals: [0, 5, 10, 2] },  // 1 4 b7 9

  // --- 6/9 chords ---
  { name: "6/9",      label: "6/9",               intervals: [0, 4, 9, 2] },   // 1 3 6 9

  // --- add9 / add11 family ---
  { name: "add9",     label: "add9",              intervals: [0, 4, 7, 2] },   // 1 3 5 9
  { name: "madd9",    label: "m(add9)",           intervals: [0, 3, 7, 2] },   // 1 b3 5 9
  { name: "add11",    label: "add11",             intervals: [0, 4, 7, 5] },   // 1 3 5 11
  { name: "madd11",   label: "m(add11)",          intervals: [0, 3, 7, 5] },   // 1 b3 5 11

  // --- Quartal voicings (stacked 4ths) ---
  { name: "quartal",  label: "Quartal 4ths",      intervals: [0, 5, 10, 3] },  // 1 4 b7 9 (stacky)

  // --- Lydian Maj7 (♯11) ---
  { name: "maj7#11",  label: "Lydian maj7 (♯11)", intervals: [0, 4, 11, 6] },  // 1 3 7 #11

  // --- Extra jazz extensions (4-note shells) ---
  { name: "maj9",     label: "Maj9",              intervals: [0, 4, 11, 2] },  // 1 3 7 9
  { name: "9",        label: "9",                 intervals: [0, 4, 10, 2] },  // 1 3 b7 9
  { name: "min9",     label: "Min9",              intervals: [0, 3, 10, 2] },  // 1 b3 b7 9
  { name: "13",       label: "13",                intervals: [0, 4, 10, 9] },  // 1 3 b7 13
  { name: "min11",    label: "Min11",             intervals: [0, 3, 10, 5] }   // 1 b3 b7 11
];

// Chord metadata: Style and Mood tags
const CHORD_METADATA = {
  "maj7": { styles: ["dreamy", "jazzy"], moods: ["lush", "romantic", "warm"] },
  "maj6": { styles: ["jazzy", "dreamy"], moods: ["hopeful", "warm"] },
  "maj9": { styles: ["dreamy", "jazzy"], moods: ["lush", "cinematic", "open"] },
  "maj7#11": { styles: ["dreamy", "modern"], moods: ["lush", "ethereal", "mysterious"] },
  "6/9": { styles: ["dreamy", "jazzy"], moods: ["hopeful", "lush", "warm"] },
  "add9": { styles: ["dreamy", "modern"], moods: ["hopeful", "open"] },
  "add11": { styles: ["modern"], moods: ["floating", "ethereal", "open"] },
  "quartal": { styles: ["modern", "exotic"], moods: ["mysterious", "cinematic", "open"] },
  "min7": { styles: ["chill", "jazzy"], moods: ["introspective", "groovy", "sad"] },
  "min9": { styles: ["chill", "jazzy"], moods: ["reflective", "melancholy", "lush"] },
  "min11": { styles: ["chill", "modern"], moods: ["melancholic", "cinematic", "introspective"] },
  "madd9": { styles: ["chill"], moods: ["reflective", "hopeful"] },
  "madd11": { styles: ["modern"], moods: ["mysterious", "introspective"] },
  "minMaj7": { styles: ["romantic", "introspective"], moods: ["bittersweet", "cinematic", "tension"] },
  "7": { styles: ["jazzy", "groovy"], moods: ["tense", "energetic"] },
  "9": { styles: ["jazzy", "groovy"], moods: ["energetic", "hopeful"] },
  "13": { styles: ["jazzy", "groovy"], moods: ["energetic", "lush"] },
  "7sus4": { styles: ["modern", "ethereal"], moods: ["floating", "open", "cinematic"] },
  "7sus2": { styles: ["modern", "ethereal"], moods: ["floating", "open"] },
  "9sus4": { styles: ["modern", "ethereal"], moods: ["cinematic", "floating", "open"] },
  "7#9": { styles: ["fusion", "exotic"], moods: ["crunchy", "tense", "dark"] },
  "7b9": { styles: ["exotic", "dark"], moods: ["tense", "mysterious", "dramatic"] },
  "7#11": { styles: ["exotic", "modern"], moods: ["mysterious", "cinematic", "tension"] },
  "7#5": { styles: ["exotic", "fusion"], moods: ["tense", "crunchy", "cinematic"] },
  "m7b5": { styles: ["dark"], moods: ["sad", "tense", "mysterious"] },
  "dim7": { styles: ["dark", "mysterious"], moods: ["unsettling", "dramatic", "tension"] }
};

function midiToNoteName(midi) {
  const octave = Math.floor(midi / 12) - 1;
  const pc = midi % 12;
  return NOTE_NAMES[pc] + octave;
}

function pcToName(pc) {
  return NOTE_NAMES[((pc % 12) + 12) % 12];
}

// === Scale definitions ===
const SCALE_TYPES = {
  ionian:        { label: "Ionian (major)",          intervals: [0, 2, 4, 5, 7, 9, 11] },
  lydian:        { label: "Lydian",                  intervals: [0, 2, 4, 6, 7, 9, 11] },
  mixolydian:    { label: "Mixolydian",              intervals: [0, 2, 4, 5, 7, 9, 10] },
  dorian:        { label: "Dorian",                  intervals: [0, 2, 3, 5, 7, 9, 10] },
  aeolian:       { label: "Aeolian (natural minor)", intervals: [0, 2, 3, 5, 7, 8, 10] },
  phrygian:      { label: "Phrygian",                intervals: [0, 1, 3, 5, 7, 8, 10] },
  locrian:       { label: "Locrian",                 intervals: [0, 1, 3, 5, 6, 8, 10] },
  locrianNat2:   { label: "Locrian ♮2",              intervals: [0, 2, 3, 5, 6, 8, 10] },
  lydianDom:     { label: "Lydian dominant",         intervals: [0, 2, 4, 6, 7, 9, 10] },
  altered:       { label: "Altered (Super-Locrian)", intervals: [0, 1, 3, 4, 6, 8, 10] },
  melodicMinor:  { label: "Melodic minor",           intervals: [0, 2, 3, 5, 7, 9, 11] },
  wholeHalfDim:  { label: "Diminished (whole-half)", intervals: [0, 2, 3, 5, 6, 8, 9, 11] }
};

function buildScale(rootPc, scaleDef) {
  return scaleDef.intervals.map(i => (rootPc + i) % 12).map(pcToName);
}

// Choose likely scales for a given chord type
function suggestScalesForChord(chord) {
  const t = chord.type.name;
  const rootPc = chord.rootPc;
  let keys = [];

  if (["maj7", "maj6", "maj9", "add9", "add11", "6/9"].includes(t)) {
    keys = ["ionian", "lydian"];
  } else if (t === "maj7#11") {
    keys = ["lydian"];
  } else if (["min7", "min9", "min11", "madd9", "madd11"].includes(t)) {
    keys = ["dorian", "aeolian"];
  } else if (t === "minMaj7") {
    keys = ["melodicMinor"];
  } else if (["7", "9", "13", "7sus4", "7sus2", "9sus4"].includes(t)) {
    keys = ["mixolydian", "lydianDom"];
  } else if (["7#9", "7b9", "7#5", "7#11"].includes(t)) {
    keys = ["altered", "phrygian"];
  } else if (t === "m7b5") {
    keys = ["locrian", "locrianNat2"];
  } else if (t === "dim7") {
    keys = ["wholeHalfDim"];
  } else if (t === "quartal") {
    keys = ["dorian", "lydian"];
  } else {
    keys = ["ionian"];
  }

  return keys.map(k => {
    const def = SCALE_TYPES[k];
    return {
      name: `${pcToName(rootPc)} ${def.label}`,
      notes: buildScale(rootPc, def)
    };
  });
}

// Pre-compute chord PC sets for each chord type (performance optimization)
const CHORD_TYPE_PC_SETS = CHORD_TYPES.map(type => 
  new Set(type.intervals)
);

// Cache for chord detection results
const chordCache = new Map();
let lastCacheKey = null;

// Return list of chord matches given active MIDI notes (Set<number>)
function detectChords(activeMidiNotes) {
  const pcs = new Set([...activeMidiNotes].map(n => (n % 12 + 12) % 12));
  if (pcs.size === 0) return [];

  // Create cache key from sorted pitch classes
  const cacheKey = [...pcs].sort((a, b) => a - b).join(',');
  if (cacheKey === lastCacheKey && chordCache.has(cacheKey)) {
    return chordCache.get(cacheKey);
  }

  const results = [];

  for (let rootPc = 0; rootPc < 12; rootPc++) {
    for (let typeIdx = 0; typeIdx < CHORD_TYPES.length; typeIdx++) {
      const type = CHORD_TYPES[typeIdx];
      const basePcSet = CHORD_TYPE_PC_SETS[typeIdx];
      
      // Compute chord PCs as Set for faster operations
      const chordPcs = new Set([...basePcSet].map(i => (rootPc + i) % 12));

      // Check if active PCs are subset of chord PCs (optimized Set operation)
      let isSubset = true;
      for (const pc of pcs) {
        if (!chordPcs.has(pc)) {
          isSubset = false;
          break;
        }
      }
      if (!isSubset) continue;

      // Compute missing PCs (optimized Set operation)
      const missingPcs = [];
      for (const pc of chordPcs) {
        if (!pcs.has(pc)) {
          missingPcs.push(pc);
        }
      }

      results.push({
        rootPc,
        rootName: pcToName(rootPc),
        type,
        chordPcs: [...chordPcs],
        missingPcs
      });
    }
  }

  // Deduplicate using Set (faster than filter)
  const seen = new Set();
  const uniqueResults = [];
  for (const ch of results) {
    const key = ch.rootPc + ":" + ch.type.name;
    if (!seen.has(key)) {
      seen.add(key);
      uniqueResults.push(ch);
    }
  }

  // Cache the result
  if (chordCache.size > 50) {
    // Limit cache size to prevent memory issues
    const firstKey = chordCache.keys().next().value;
    chordCache.delete(firstKey);
  }
  chordCache.set(cacheKey, uniqueResults);
  lastCacheKey = cacheKey;

  return uniqueResults;
}

// "Where next" suggestion engine
function suggestNextChords(chord) {
  const { rootPc, type } = chord;
  const suggestions = [];
  const isMinor = type.name.includes("min");

  // Dominant (V7)
  suggestions.push({
    rootPc: (rootPc + 7) % 12,
    type: "7",
    role: "dominant"
  });

  // Subdominant-ish (IV)
  suggestions.push({
    rootPc: (rootPc + 5) % 12,
    type: isMinor ? "min7" : "maj7",
    role: "subdominant"
  });

  // Relative major/minor
  if (isMinor) {
    suggestions.push({
      rootPc: (rootPc + 3) % 12,
      type: "maj7",
      role: "relative major"
    });
  } else {
    suggestions.push({
      rootPc: (rootPc + 9) % 12,
      type: "min7",
      role: "relative minor"
    });
  }

  const seen = new Set();
  return suggestions.filter(s => {
    const key = s.rootPc + ":" + s.type + ":" + (s.role || "");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// === UI state & elements ===
const activeMidiNotes = new Set();
const bookmarkedChords = new Map(); // Store full chord data: key -> chord object
const keyboardToMidi = new Map(); // Keyboard key -> MIDI note number
const pressedKeys = new Set(); // Track currently pressed keyboard keys
let selectedStyle = ""; // Selected style filter
let selectedMoods = new Set(); // Selected mood filters (can be multiple)

// === Audio context for keyboard sounds ===
let audioContext = null;
const activeOscillators = new Map(); // MIDI note -> oscillator
let masterDelay = null;
let masterReverb = null;
let masterChorus = null;
let masterFilter = null;
let masterLowPass = null;

// Initialize audio context and effects
function initAudio() {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create master effects chain
    // High pass filter
    masterFilter = audioContext.createBiquadFilter();
    masterFilter.type = 'highpass';
    masterFilter.frequency.value = 35; // High pass filter at 35Hz
    masterFilter.Q.value = 1;
    
    // Low pass filter (Grand piano: warm and smooth)
    masterLowPass = audioContext.createBiquadFilter();
    masterLowPass.type = 'lowpass';
    masterLowPass.frequency.value = 3500; // Warm cutoff for smooth piano tone
    masterLowPass.Q.value = 0.8; // Low resonance for smooth, natural sound
    
    // Reverb (Grand piano: natural room reverb)
    masterReverb = audioContext.createConvolver();
    const reverbGain = audioContext.createGain();
    reverbGain.gain.value = 0.3; // Moderate reverb for natural piano room sound
    
    // Create a simple reverb impulse response
    const impulseLength = audioContext.sampleRate * 0.1; // 100ms reverb
    const impulse = audioContext.createBuffer(2, impulseLength, audioContext.sampleRate);
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < impulseLength; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / impulseLength, 2);
      }
    }
    masterReverb.buffer = impulse;
    
    // Connect effects chain: high pass -> low pass -> reverb -> destination
    masterFilter.connect(masterLowPass);
    masterLowPass.connect(masterReverb);
    masterReverb.connect(reverbGain);
    reverbGain.connect(audioContext.destination);
    
  } catch (e) {
    console.warn("Web Audio API not supported:", e);
  }
}

// Convert MIDI note number to frequency
function midiToFrequency(midiNote) {
  return 440 * Math.pow(2, (midiNote - 69) / 12);
}

// Play a note
function playNote(midiNote) {
  if (!audioContext) return;
  
  // Resume audio context if suspended (required by some browsers)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  // Don't play if already playing
  if (activeOscillators.has(midiNote)) return;
  
  const frequency = midiToFrequency(midiNote);
  
  // Fundamental oscillator (Grand piano: smooth sine for warmth)
  const fundamentalOsc = audioContext.createOscillator();
  fundamentalOsc.type = 'sine';
  fundamentalOsc.frequency.value = frequency;
  const fundamentalGain = audioContext.createGain();
  // Grand piano envelope: very fast attack, quick decay, long sustain, smooth release
  fundamentalGain.gain.setValueAtTime(0, audioContext.currentTime);
  fundamentalGain.gain.linearRampToValueAtTime(1.0, audioContext.currentTime + 0.001); // Very fast attack (hammer strike)
  fundamentalGain.gain.linearRampToValueAtTime(0.4, audioContext.currentTime + 0.2); // Quick decay to sustain
  // Sustain: 0.4 (held while note is pressed)
  // Release will be handled in stopNote
  
  // Harmonic oscillator (adds richness - 2nd harmonic)
  const harmonicOsc = audioContext.createOscillator();
  harmonicOsc.type = 'triangle'; // Triangle for smooth harmonics
  harmonicOsc.frequency.value = frequency * 2; // Octave higher (2nd harmonic)
  const harmonicGain = audioContext.createGain();
  harmonicGain.gain.setValueAtTime(0, audioContext.currentTime);
  harmonicGain.gain.linearRampToValueAtTime(0.25, audioContext.currentTime + 0.001);
  harmonicGain.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.2);
  
  // Third harmonic for additional warmth
  const thirdHarmonicOsc = audioContext.createOscillator();
  thirdHarmonicOsc.type = 'sine';
  thirdHarmonicOsc.frequency.value = frequency * 3; // 3rd harmonic
  const thirdHarmonicGain = audioContext.createGain();
  thirdHarmonicGain.gain.setValueAtTime(0, audioContext.currentTime);
  thirdHarmonicGain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.001);
  thirdHarmonicGain.gain.linearRampToValueAtTime(0.06, audioContext.currentTime + 0.2);
  
  // Connect oscillators to their gain nodes
  fundamentalOsc.connect(fundamentalGain);
  harmonicOsc.connect(harmonicGain);
  thirdHarmonicOsc.connect(thirdHarmonicGain);
  
  // Create a master gain node to combine all signals
  const masterGain = audioContext.createGain();
  fundamentalGain.connect(masterGain);
  harmonicGain.connect(masterGain);
  thirdHarmonicGain.connect(masterGain);
  
  // Connect through effects chain: master gain -> high pass -> low pass -> reverb -> destination
  if (masterFilter) {
    masterGain.connect(masterFilter);
  } else {
    masterGain.connect(audioContext.destination);
  }
  
  fundamentalOsc.start();
  harmonicOsc.start();
  thirdHarmonicOsc.start();
  activeOscillators.set(midiNote, { 
    oscillators: [fundamentalOsc, harmonicOsc, thirdHarmonicOsc], 
    gainNodes: [fundamentalGain, harmonicGain, thirdHarmonicGain],
    masterGain 
  });
}

// Stop a note
function stopNote(midiNote) {
  if (!audioContext) return;
  
  const noteData = activeOscillators.get(midiNote);
  if (!noteData) return;
  
  const { oscillators, gainNodes } = noteData;
  
  // Smooth release for all gain nodes (Grand piano: long, natural decay)
  gainNodes.forEach(gainNode => {
    gainNode.gain.cancelScheduledValues(audioContext.currentTime);
    gainNode.gain.setValueAtTime(gainNode.gain.value, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1.3); // Release 1.3s
  });
  
  // Stop all oscillators
  oscillators.forEach(osc => {
    osc.stop(audioContext.currentTime + 1.3);
  });
  activeOscillators.delete(midiNote);
}

const midiStatusEl    = document.getElementById("midi-status");
const keysContainer   = document.getElementById("keys");
const chordsContainer = document.getElementById("chords");
const chordCountEl    = document.getElementById("chord-count");
const styleFilterEl   = document.getElementById("style-filter");
const moodFilterButtonEl = document.getElementById("mood-filter-button");
const moodFilterTextEl = document.getElementById("mood-filter-text");
const moodFilterDropdownEl = document.getElementById("mood-filter-dropdown");
const infoLinkEl      = document.getElementById("info-link");
const infoModalEl     = document.getElementById("info-modal");
const modalCloseBtnEl = document.getElementById("modal-close-btn");

// Generate a unique key for a chord
function getChordKey(chord) {
  return `${chord.rootPc}:${chord.type.name}`;
}

const keyElements = [];
for (let pc = 0; pc < 12; pc++) {
  const div = document.createElement("div");
  div.className = "key";
  div.dataset.pc = pc.toString();

  const label = document.createElement("span");
  label.className = "key-label";
  label.textContent = pcToName(pc);

  const midiNoteSpan = document.createElement("span");
  midiNoteSpan.className = "midi-note-number";
  midiNoteSpan.style.opacity = "0.3";
  midiNoteSpan.style.marginLeft = "4px";
  midiNoteSpan.style.fontSize = "0.65rem";

  div.appendChild(label);
  div.appendChild(midiNoteSpan);
  keysContainer.appendChild(div);
  keyElements.push(div);
}

// Helper function to render text with highlighted active notes
function renderTextWithHighlightedNotes(text, activePcs) {
  const fragment = document.createDocumentFragment();
  
  // Split text by note names, keeping separators
  // Match note names (C, C♯, D, D♯, E, F, F♯, G, A♭, A, B♭, B)
  // Use negative lookahead to exclude:
  // 1. Notes followed by digits (like G7, Cmaj7)
  // 2. Notes followed by letters (like Fmaj7, Gmin7, Gmaj7) - both uppercase and lowercase
  // 3. Notes followed by space and then a word starting with capital letter (like "C Mixolydian", "C Ionian")
  // Note: The order matters - check for letters before checking for digits to catch cases like "Gmaj7"
  const notePattern = /(C♯|D♯|F♯|A♭|B♭|[CDEFGAB])(?![a-zA-Z0-9])(?!\s+[A-Z][a-z])/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  
  while ((match = notePattern.exec(text)) !== null) {
    // Add text before the note
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.substring(lastIndex, match.index) });
    }
    // Add the note
    const noteName = match[0];
    const pc = NOTE_NAMES.indexOf(noteName);
    if (pc !== -1) {
      parts.push({ type: 'note', content: noteName, pc });
    } else {
      // If note not found, treat as regular text
      parts.push({ type: 'text', content: noteName });
    }
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.substring(lastIndex) });
  }
  
  // If no notes found, just add the text as-is
  if (parts.length === 0) {
    fragment.appendChild(document.createTextNode(text));
  } else {
    parts.forEach(part => {
      if (part.type === 'note') {
        const span = document.createElement("span");
        span.textContent = part.content;
        if (activePcs.has(part.pc)) {
          span.style.color = "#ffffff";
        }
        fragment.appendChild(span);
      } else {
        fragment.appendChild(document.createTextNode(part.content));
      }
    });
  }
  
  return fragment;
}

// Helper function to render a single chord card
function renderChordCard(chord, isBookmarked = false) {
  const row = document.createElement("div");
  row.className = "chord-row";

  const header = document.createElement("div");
  header.className = "chord-header";

  const nameDiv = document.createElement("div");
  nameDiv.className = "chord-name";
  const chordToneNames = chord.chordPcs.map(pcToName).join("-");
  nameDiv.textContent = `${chord.rootName} ${chord.type.label}`;

  const chip = document.createElement("div");
  chip.className = "chip";
  
  // Get active pitch classes to highlight pressed notes
  const activePcs = new Set([...activeMidiNotes].map(n => (n % 12 + 12) % 12));
  
  // Render each note separately to color active ones white
  chord.chordPcs.forEach((pc, idx) => {
    if (idx > 0) {
      chip.appendChild(document.createTextNode("-"));
    }
    const noteSpan = document.createElement("span");
    noteSpan.textContent = pcToName(pc);
    if (activePcs.has(pc)) {
      noteSpan.style.color = "#ffffff";
    }
    chip.appendChild(noteSpan);
  });

  // Bookmark button
  const bookmarkBtn = document.createElement("button");
  bookmarkBtn.className = `bookmark-btn ${isBookmarked ? "bookmarked" : ""}`;
  bookmarkBtn.innerHTML = "★";
  bookmarkBtn.title = isBookmarked ? "Remove bookmark" : "Bookmark this chord";
  bookmarkBtn.onclick = (e) => {
    e.stopPropagation();
    const key = getChordKey(chord);
    const currentlyBookmarked = bookmarkedChords.has(key);

    // Optimistically toggle UI state immediately
    const nextState = !currentlyBookmarked;
    bookmarkBtn.classList.toggle("bookmarked", nextState);
    bookmarkBtn.title = nextState ? "Remove bookmark" : "Bookmark this chord";

    if (currentlyBookmarked) {
      bookmarkedChords.delete(key);
    } else {
      bookmarkedChords.set(key, { ...chord });
    }
    // Only re-render chords, keyboard doesn't need updating
    scheduleChordRender();
  };

  const copyBtn = document.createElement("button");
  copyBtn.className = "copy-btn";
  copyBtn.textContent = "Copy";
  copyBtn.onclick = () => {
    // Build the complete text content of the chord card
    let chordText = `${chord.rootName} ${chord.type.label} (${chordToneNames})\n\n`;
    
    // Missing notes
    if (chord.missingPcs.length === 0) {
      chordText += "Missing notes: none\n";
    } else {
      const missingNames = chord.missingPcs.map(pcToName).join(", ");
      chordText += `Missing notes: ${missingNames}\n`;
    }
    
    // "Where next" & voice-leading
    const next = suggestNextChords(chord);
    if (next.length > 0) {
      const currentPcsSet = new Set(chord.chordPcs);
      
      const nextData = next.map(s => {
        const chordType = CHORD_TYPES.find(t => t.name === s.type);
        if (!chordType) return null;
        
        const nextPcs = chordType.intervals.map(i => (s.rootPc + i) % 12);
        const notes = nextPcs.map(pcToName).join("-");
        
        let shortName;
        if (s.type === "min7")       shortName = pcToName(s.rootPc) + "m7";
        else if (s.type === "maj7")  shortName = pcToName(s.rootPc) + "maj7";
        else if (s.type === "7")     shortName = pcToName(s.rootPc) + "7";
        else                         shortName = pcToName(s.rootPc);
        
        let roleWord = "";
        if (s.role === "dominant")            roleWord = "dom";
        else if (s.role === "subdominant")    roleWord = "sub";
        else if (s.role === "relative major") roleWord = "rel";
        else if (s.role === "relative minor") roleWord = "rel";
        
        const nextSet = new Set(nextPcs);
        const keep = [...currentPcsSet].filter(pc => nextSet.has(pc)).map(pcToName);
        const add  = [...nextSet].filter(pc => !currentPcsSet.has(pc)).map(pcToName);
        
        const parts = [];
        if (keep.length) parts.push(`keep ${keep.join(", ")}`);
        if (add.length)  parts.push(`add ${add.join(", ")}`);
        
        const voiceText = parts.length ? parts.join("; ") : "(no change)";
        
        return {
          shortName,
          roleWord,
          notes,
          voiceText
        };
      }).filter(Boolean);
      
      chordText += "\nWhere next:\n";
      nextData.forEach(d => {
        const rolePart = d.roleWord ? ` ${d.roleWord}` : "";
        chordText += `${d.notes} (${d.shortName}${rolePart})\n`;
      });
      
      chordText += "\nVoice-leading:\n";
      nextData.forEach(d => {
        chordText += `to ${d.shortName}: ${d.voiceText}\n`;
      });
    }
    
    // Scale context
    const scales = suggestScalesForChord(chord);
    if (scales.length > 0) {
      chordText += "\nScale context:\n";
      scales.forEach(s => {
        chordText += `${s.name}: ${s.notes.join("-")}\n`;
      });
    }
    
    navigator.clipboard.writeText(chordText.trim()).then(() => {
      copyBtn.textContent = "Copied!";
      copyBtn.classList.add("copied");
      setTimeout(() => {
        copyBtn.textContent = "Copy";
        copyBtn.classList.remove("copied");
      }, 2000);
    }).catch(err => {
      console.error("Failed to copy:", err);
      copyBtn.textContent = "Error";
      setTimeout(() => {
        copyBtn.textContent = "Copy";
      }, 2000);
    });
  };

  header.appendChild(nameDiv);
  header.appendChild(chip);
  header.appendChild(bookmarkBtn);
  header.appendChild(copyBtn);
  row.appendChild(header);

  // Missing notes (bold)
  const missingLine = document.createElement("div");
  missingLine.className = "chord-line";

  if (chord.missingPcs.length === 0) {
    const labelSpan = document.createElement("span");
    labelSpan.className = "chord-section-header";
    labelSpan.textContent = "Missing notes: ";
    missingLine.appendChild(labelSpan);
    missingLine.appendChild(document.createTextNode("none"));
  } else {
    const labelSpan = document.createElement("span");
    labelSpan.className = "chord-section-header";
    labelSpan.textContent = "Missing notes: ";
    missingLine.appendChild(labelSpan);
    chord.missingPcs.forEach((pc, idx) => {
      if (idx > 0) {
        missingLine.appendChild(document.createTextNode(", "));
      }
      const span = document.createElement("span");
      span.style.fontWeight = "700";
      span.style.color = "rgba(34, 197, 94, 0.8)";
      span.textContent = pcToName(pc);
      missingLine.appendChild(span);
    });
  }
  row.appendChild(missingLine);

  // "Where next" & voice-leading
  const next = suggestNextChords(chord);
  if (next.length > 0) {
    const currentPcsSet = new Set(chord.chordPcs);

    const nextData = next.map(s => {
      const chordType = CHORD_TYPES.find(t => t.name === s.type);
      if (!chordType) return null;

      const nextPcs = chordType.intervals.map(i => (s.rootPc + i) % 12);
      const notes = nextPcs.map(pcToName).join("-");

      let shortName;
      if (s.type === "min7")       shortName = pcToName(s.rootPc) + "m7";
      else if (s.type === "maj7")  shortName = pcToName(s.rootPc) + "maj7";
      else if (s.type === "7")     shortName = pcToName(s.rootPc) + "7";
      else                         shortName = pcToName(s.rootPc);

      let roleWord = "";
      if (s.role === "dominant")            roleWord = "dom";
      else if (s.role === "subdominant")    roleWord = "sub";
      else if (s.role === "relative major") roleWord = "rel";
      else if (s.role === "relative minor")  roleWord = "rel";

      const nextSet = new Set(nextPcs);
      const keep = [...currentPcsSet].filter(pc => nextSet.has(pc)).map(pcToName);
      const add  = [...nextSet].filter(pc => !currentPcsSet.has(pc)).map(pcToName);

      const parts = [];
      if (keep.length) parts.push(`keep ${keep.join(", ")}`);
      if (add.length)  parts.push(`add ${add.join(", ")}`);

      const voiceText = parts.length ? parts.join("; ") : "(no change)";

      return {
        shortName,
        roleWord,
        notes,
        voiceText
      };
    }).filter(Boolean);

    const nextHeader = document.createElement("div");
    nextHeader.className = "chord-line chord-section-header";
    nextHeader.textContent = "Where next:";
    row.appendChild(nextHeader);

    nextData.forEach(d => {
      const line = document.createElement("div");
      line.className = "chord-line";
      const rolePart = d.roleWord ? ` ${d.roleWord}` : "";
      const text = `${d.notes} (${d.shortName}${rolePart})`;
      line.appendChild(renderTextWithHighlightedNotes(text, activePcs));
      row.appendChild(line);
    });

    const vlHeader = document.createElement("div");
    vlHeader.className = "chord-line chord-section-header";
    vlHeader.textContent = "Voice-leading:";
    row.appendChild(vlHeader);

    nextData.forEach(d => {
      const vlLine = document.createElement("div");
      vlLine.className = "chord-line";
      const text = `to ${d.shortName}: ${d.voiceText}`;
      vlLine.appendChild(renderTextWithHighlightedNotes(text, activePcs));
      row.appendChild(vlLine);
    });
  }

  // Scale context block
  const scales = suggestScalesForChord(chord);
  if (scales.length > 0) {
    const scHeader = document.createElement("div");
    scHeader.className = "chord-line chord-section-header";
    scHeader.textContent = "Scale context:";
    row.appendChild(scHeader);

    scales.forEach(s => {
      const scLine = document.createElement("div");
      scLine.className = "chord-line";
      const text = `${s.name}: ${s.notes.join("-")}`;
      scLine.appendChild(renderTextWithHighlightedNotes(text, activePcs));
      row.appendChild(scLine);
    });
  }

  return row;
}

// Render scheduling for performance
let renderScheduled = false;
let renderFrameId = null;

// Track current active pitch classes for efficient updates
let currentActivePcs = new Set();

// Fast keyboard update (called immediately on MIDI events)
// Optimized to only update changed keys
function updateKeyboard() {
  const pcs = new Set([...activeMidiNotes].map(n => (n % 12 + 12) % 12));

  // Only update keys that changed state
  for (let pc = 0; pc < 12; pc++) {
    const el = keyElements[pc];
    const wasActive = currentActivePcs.has(pc);
    const isActive = pcs.has(pc);
    
    // Skip if state hasn't changed
    if (wasActive === isActive) continue;
    
    const midiNoteSpan = el.querySelector(".midi-note-number");
    
    if (isActive) {
      el.classList.add("active");
      // Find all active MIDI notes with this pitch class
      const notesForPc = [...activeMidiNotes]
        .filter(note => (note % 12) === pc)
        .sort((a, b) => a - b);
      if (midiNoteSpan) {
        midiNoteSpan.textContent = notesForPc.join(",");
      }
      currentActivePcs.add(pc);
    } else {
      el.classList.remove("active");
      if (midiNoteSpan) {
        midiNoteSpan.textContent = "";
      }
      
      // If note was just released, trigger dissolve animation
      if (wasActive) {
        // Set border to active color first, then transition to default or possible color
        el.style.borderColor = "#a5f3fc";
        // Force reflow to ensure the initial color is applied
        void el.offsetWidth;
        // Now transition to default color (will be overridden by possible class if applicable)
        el.style.borderColor = "rgba(148, 163, 184, 0.15)";
      }
      currentActivePcs.delete(pc);
    }
  }
}

// Expensive chord rendering (deferred to requestAnimationFrame)
function renderChords() {
  const pcs = new Set([...activeMidiNotes].map(n => (n % 12 + 12) % 12));
  const chords = detectChords(activeMidiNotes);
  const holdingPrevious = activeMidiNotes.size === 0;
  if (!holdingPrevious) {
    chordsContainer.innerHTML = "";
  }

  // Collect all chords to display
  const allChords = [];
  const detectedChordKeys = new Set();
  
  if (activeMidiNotes.size === 0) {
    // When no notes are pressed, show all possible chords
    for (let rootPc = 0; rootPc < 12; rootPc++) {
      for (const type of CHORD_TYPES) {
        const chord = {
          rootPc,
          rootName: pcToName(rootPc),
          type,
          chordPcs: type.intervals.map(i => (rootPc + i) % 12),
          missingPcs: []
        };
        const key = getChordKey(chord);
        const isBookmarked = bookmarkedChords.has(key);
        allChords.push({ chord, isBookmarked, isDetected: false });
      }
    }
  } else {
    // Add detected chords
    chords.forEach(chord => {
      const key = getChordKey(chord);
      detectedChordKeys.add(key);
      const isBookmarked = bookmarkedChords.has(key);
      allChords.push({ chord, isBookmarked, isDetected: true });
    });
    
    // Add bookmarked chords that aren't in detected chords
    bookmarkedChords.forEach((chord, key) => {
      if (!detectedChordKeys.has(key)) {
        allChords.push({ chord, isBookmarked: true, isDetected: false });
      }
    });
  }

  // Apply filters
  const filteredChords = allChords.filter(({ chord }) => {
    const metadata = CHORD_METADATA[chord.type.name];
    if (!metadata) return true; // If no metadata, show the chord
    
    // Style filter
    if (selectedStyle && !metadata.styles.includes(selectedStyle)) {
      return false;
    }
    
    // Mood filter (multiple selections)
    if (selectedMoods.size > 0) {
      const matchesMood = metadata.moods.some(mood => selectedMoods.has(mood));
      if (!matchesMood) {
        return false;
      }
    }
    
    return true;
  });

  // Update chord count - always update, even if 0
  if (chordCountEl) {
    chordCountEl.textContent = filteredChords.length.toString();
  }

  // Show message if no chords at all
  if (filteredChords.length === 0) {
    if (!holdingPrevious) {
      chordsContainer.innerHTML = "";
      const div = document.createElement("div");
      div.className = "subtle";
      div.textContent = "No matching chords found for this combination.";
      chordsContainer.appendChild(div);
    }
    // Still need to clear possible keys when no filtered chords
    keyElements.forEach(el => el.classList.remove("possible"));
    return;
  }

  // mark possible chord tones on keyboard (including missing)
  // Only mark keys from filtered chords (optimized with direct array access)
  const possiblePcs = new Set();
  for (let i = 0; i < filteredChords.length; i++) {
    const chordPcs = filteredChords[i].chord.chordPcs;
    for (let j = 0; j < chordPcs.length; j++) {
      possiblePcs.add(chordPcs[j]);
    }
  }
  
  // Update possible keys efficiently
  for (let pc = 0; pc < 12; pc++) {
    const el = keyElements[pc];
    const shouldBePossible = !pcs.has(pc) && possiblePcs.has(pc) && !el.classList.contains("active");
    const isPossible = el.classList.contains("possible");
    
    if (shouldBePossible && !isPossible) {
      el.classList.add("possible");
      el.style.borderColor = "";
    } else if (!shouldBePossible && isPossible) {
      el.classList.remove("possible");
    }
  }
  

  // Render all filtered chords, with starred (bookmarked) first
  // Use document fragment for batch DOM operations (performance optimization)
  const fragment = document.createDocumentFragment();
  filteredChords
    .sort((a, b) => (b.isBookmarked ? 1 : 0) - (a.isBookmarked ? 1 : 0))
    .forEach(({ chord, isBookmarked }) => {
      const row = renderChordCard(chord, isBookmarked);
      fragment.appendChild(row);
    });
  chordsContainer.appendChild(fragment);
}

// Main render function - schedules updates efficiently
function render() {
  // Update keyboard immediately for instant visual feedback
  updateKeyboard();
  
  // Schedule expensive chord rendering
  scheduleChordRender();
}

// === MIDI handling ===
function handleMidiMessage(e) {
  const [status, note, velocity] = e.data;
  const cmd = status & 0xf0;

  // Update note state
  const wasNoteActive = activeMidiNotes.has(note);
  if (cmd === 0x90 && velocity > 0) {
    if (!wasNoteActive) {
      activeMidiNotes.add(note);          // Note On
      // Update keyboard immediately for instant feedback
      updateKeyboard();
      // Schedule chord rendering
      scheduleChordRender();
    }
  } else if (cmd === 0x80 || (cmd === 0x90 && velocity === 0)) {
    if (wasNoteActive) {
      activeMidiNotes.delete(note);       // Note Off
      // Update keyboard immediately for instant feedback
      updateKeyboard();
      // Schedule chord rendering
      scheduleChordRender();
    }
  }
}

// Separate function to schedule chord rendering (reusable)
function scheduleChordRender() {
  if (!renderScheduled) {
    renderScheduled = true;
    if (renderFrameId !== null) {
      cancelAnimationFrame(renderFrameId);
    }
    renderFrameId = requestAnimationFrame(() => {
      renderScheduled = false;
      renderFrameId = null;
      renderChords();
    });
  }
}

let currentMidiInput = null;
let midiAccess = null;

function updateMidiStatus() {
  if (!midiAccess) return;
  
  const inputs = [...midiAccess.inputs.values()];
  const activeInputs = inputs.filter(input => input.state === 'connected');
  
  if (activeInputs.length === 0) {
    midiStatusEl.innerHTML = "No Midi detected. <a href='#' onclick='location.reload(); return false;' style='color: #a5f3fc; text-decoration: underline; margin-left: 8px;'>Reload</a>";
    currentMidiInput = null;
    // Clear any active MIDI notes when device disconnects
    activeMidiNotes.clear();
    updateKeyboard();
    scheduleChordRender();
    return;
  }

  // Find or reconnect to an input
  let input = activeInputs.find(i =>
    (i.name || "").toLowerCase().includes("roland")
  );
  if (!input) input = activeInputs[0];

  // Only update if we have a new input or the current one changed
  if (input !== currentMidiInput) {
    // Remove old handler if exists
    if (currentMidiInput) {
      currentMidiInput.onmidimessage = null;
      currentMidiInput.onstatechange = null;
    }
    
    currentMidiInput = input;
    input.onmidimessage = handleMidiMessage;
    
    // Listen for state changes on this specific input
    input.onstatechange = (e) => {
      if (e.port.state === 'disconnected') {
        updateMidiStatus();
      }
    };
    
    console.log("Using input:", input.name);
    midiStatusEl.textContent = "Connected to Midi Device";
  }
}

function initMidi() {
  if (!navigator.requestMIDIAccess) {
    midiStatusEl.textContent = "Web MIDI not supported in this browser.";
    midiStatusEl.style.borderColor = "#f97373";
    midiStatusEl.style.color = "#fecaca";
    return;
  }

  navigator.requestMIDIAccess()
    .then(access => {
      midiAccess = access;
      
      // Listen for state changes on the MIDI access object
      access.onstatechange = (e) => {
        console.log("MIDI state change:", e.port.name, e.port.state);
        updateMidiStatus();
      };
      
      updateMidiStatus();
    })
    .catch(err => {
      console.error("MIDI error", err);
      midiStatusEl.textContent = "Error accessing MIDI.";
    });
}

// Collect all unique moods from CHORD_METADATA
function getAllMoods() {
  const moodsSet = new Set();
  Object.values(CHORD_METADATA).forEach(metadata => {
    metadata.moods.forEach(mood => moodsSet.add(mood));
  });
  return Array.from(moodsSet).sort();
}

// Initialize mood dropdown
function initMoodDropdown() {
  if (!moodFilterDropdownEl) return;
  
  const moods = getAllMoods();
  moodFilterDropdownEl.innerHTML = "";
  
  moods.forEach(mood => {
    const item = document.createElement("div");
    item.className = "mood-checkbox-item";
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `mood-${mood}`;
    checkbox.value = mood;
    checkbox.checked = selectedMoods.has(mood);
    
    const label = document.createElement("label");
    label.htmlFor = `mood-${mood}`;
    label.textContent = mood;
    
    checkbox.addEventListener("change", (e) => {
      if (e.target.checked) {
        selectedMoods.add(mood);
      } else {
        selectedMoods.delete(mood);
      }
      updateMoodFilterText();
      // Only re-render chords, keyboard doesn't need updating
      scheduleChordRender();
    });
    
    item.appendChild(checkbox);
    item.appendChild(label);
    moodFilterDropdownEl.appendChild(item);
  });
}

function updateMoodFilterText() {
  if (!moodFilterTextEl) return;
  if (selectedMoods.size === 0) {
    moodFilterTextEl.textContent = "All Moods";
  } else if (selectedMoods.size === 1) {
    moodFilterTextEl.textContent = Array.from(selectedMoods)[0];
  } else {
    moodFilterTextEl.textContent = `${selectedMoods.size} selected`;
  }
}

// === Filter event handlers ===
function setupFilters() {
  if (styleFilterEl) {
    styleFilterEl.addEventListener("change", (e) => {
      selectedStyle = e.target.value;
      // Only re-render chords, keyboard doesn't need updating
      scheduleChordRender();
    });
  }

  if (moodFilterButtonEl) {
    moodFilterButtonEl.addEventListener("click", (e) => {
      e.stopPropagation();
      if (moodFilterDropdownEl) {
        moodFilterDropdownEl.classList.toggle("show");
      }
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (moodFilterDropdownEl && moodFilterButtonEl && 
        !moodFilterDropdownEl.contains(e.target) && 
        !moodFilterButtonEl.contains(e.target)) {
      moodFilterDropdownEl.classList.remove("show");
    }
  });

  // Initialize mood dropdown
  initMoodDropdown();
  updateMoodFilterText();
}

// Setup filters when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupFilters);
} else {
  setupFilters();
}

// === Modal handlers ===
if (infoLinkEl) {
  infoLinkEl.addEventListener("click", (e) => {
    e.preventDefault();
    if (infoModalEl) {
      infoModalEl.classList.add("show");
    }
  });
}

if (modalCloseBtnEl) {
  modalCloseBtnEl.addEventListener("click", () => {
    if (infoModalEl) {
      infoModalEl.classList.remove("show");
    }
  });
}

// Close modal when clicking outside
if (infoModalEl) {
  infoModalEl.addEventListener("click", (e) => {
    if (e.target === infoModalEl) {
      infoModalEl.classList.remove("show");
    }
  });
}

// === Keyboard shortcuts mapping ===
// Map keyboard keys to MIDI note numbers (C4 = 60)
keyboardToMidi.set('a', 60);  // C
keyboardToMidi.set('w', 61);  // C#
keyboardToMidi.set('s', 62);  // D
keyboardToMidi.set('e', 63);  // D#
keyboardToMidi.set('d', 64);  // E
keyboardToMidi.set('f', 65);  // F
keyboardToMidi.set('t', 66);  // F#
keyboardToMidi.set('g', 67);  // G
keyboardToMidi.set('y', 68);  // G#
keyboardToMidi.set('h', 69);  // A
keyboardToMidi.set('u', 70);  // A#
keyboardToMidi.set('j', 71);  // B

// Handle keyboard events
function handleKeyDown(e) {
  const key = e.key.toLowerCase();
  if (pressedKeys.has(key)) return; // Already pressed
  
  const midiNote = keyboardToMidi.get(key);
  if (midiNote !== undefined) {
    e.preventDefault(); // Prevent default browser behavior
    pressedKeys.add(key);
    activeMidiNotes.add(midiNote);
    playNote(midiNote);
    // Update keyboard immediately, then schedule chord render
    updateKeyboard();
    scheduleChordRender();
  }
}

function handleKeyUp(e) {
  const key = e.key.toLowerCase();
  if (!pressedKeys.has(key)) return; // Not pressed
  
  const midiNote = keyboardToMidi.get(key);
  if (midiNote !== undefined) {
    pressedKeys.delete(key);
    activeMidiNotes.delete(midiNote);
    stopNote(midiNote);
    // Update keyboard immediately, then schedule chord render
    updateKeyboard();
    scheduleChordRender();
  }
}

// Add keyboard event listeners
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

// Kick off
initAudio();
initMidi();
render();
