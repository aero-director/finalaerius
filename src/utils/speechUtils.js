// Speech Synthesis & Recognition Utility with Indian English (en-IN) priority

let cachedVoices = [];

// Helper to check if a voice is Indian English
export const isIndianVoice = (voice) => {
  if (!voice) return false;
  const lang = (voice.lang || '').replace('_', '-').toLowerCase();
  const name = (voice.name || '').toLowerCase();

  return (
    lang === 'en-in' ||
    lang.startsWith('en-in') ||
    name.includes('india') ||
    name.includes('indian') ||
    name.includes('heera') ||
    name.includes('ravi') ||
    name.includes('neerja') ||
    name.includes('prabhat') ||
    name.includes('veena') ||
    name.includes('rishi') ||
    name.includes('sangeeta') ||
    name.includes('kalpana') ||
    name.includes('mohan')
  );
};

// Populate voices and listen for async loading in Chrome/Edge
export const getVoices = () => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return [];
  const voices = window.speechSynthesis.getVoices();
  if (voices && voices.length > 0) {
    cachedVoices = voices;
    return voices;
  }
  return cachedVoices;
};

// Initialize voice listener
if (typeof window !== 'undefined' && window.speechSynthesis) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

/**
 * Find the best Indian English voice.
 * @param {string} role - 'atc' | 'pilot' | 'male' | 'female' | 'general'
 * @param {SpeechSynthesisVoice[]} [customVoices] - Optional voice list
 * @returns {SpeechSynthesisVoice|null}
 */
export const getIndianVoice = (role = 'general', customVoices = null) => {
  const voices = customVoices && customVoices.length > 0 ? customVoices : getVoices();
  if (!voices || voices.length === 0) return null;

  // 1. Gather all Indian English voices
  const indianVoices = voices.filter(isIndianVoice);

  if (indianVoices.length > 0) {
    const isMalePref = role === 'atc' || role === 'male';
    const isFemalePref = role === 'pilot' || role === 'female';

    if (isMalePref) {
      const maleVoice = indianVoices.find((v) => {
        const name = (v.name || '').toLowerCase();
        return (
          name.includes('ravi') ||
          name.includes('prabhat') ||
          name.includes('rishi') ||
          name.includes('mohan') ||
          name.includes('male')
        );
      });
      if (maleVoice) return maleVoice;
    }

    if (isFemalePref) {
      const femaleVoice = indianVoices.find((v) => {
        const name = (v.name || '').toLowerCase();
        return (
          name.includes('heera') ||
          name.includes('neerja') ||
          name.includes('veena') ||
          name.includes('kalpana') ||
          name.includes('sangeeta') ||
          name.includes('female')
        );
      });
      if (femaleVoice) return femaleVoice;
    }

    return indianVoices[0];
  }

  // 2. Fallback: British English (en-GB) which is phonetically closer to Commonwealth / Indian aviation English
  const gbVoice = voices.find((v) => {
    const lang = (v.lang || '').replace('_', '-').toLowerCase();
    const name = (v.name || '').toLowerCase();
    return lang === 'en-gb' || lang.startsWith('en-gb') || name.includes('uk') || name.includes('british');
  });
  if (gbVoice) return gbVoice;

  // 3. Fallback: Any English voice
  const enVoice = voices.find((v) => (v.lang || '').toLowerCase().startsWith('en'));
  if (enVoice) return enVoice;

  return voices[0] || null;
};

/**
 * Speak text in Indian English.
 * @param {string} text - text to speak
 * @param {object} options
 */
export const speakIndianText = (text, options = {}) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;

  window.speechSynthesis.cancel();

  const {
    role = 'atc', // 'atc' | 'pilot' | 'phonetic'
    rate = 0.95,
    pitch,
    onStart,
    onEnd,
    onError,
  } = options;

  const cleanText = text.replace(/\[.*?\]/g, '').replace(/[—\/]/g, ' ');
  const utterance = new SpeechSynthesisUtterance(cleanText);

  // Set explicit Indian English language tag
  utterance.lang = 'en-IN';
  utterance.rate = rate;

  if (pitch !== undefined) {
    utterance.pitch = pitch;
  } else {
    // Tailored pitch: ATC slightly deeper & formal; Pilot slightly higher & alert
    utterance.pitch = role === 'atc' ? 0.92 : role === 'pilot' ? 1.05 : 1.0;
  }

  const voice = getIndianVoice(role);
  if (voice) {
    utterance.voice = voice;
  }

  if (onStart) utterance.onstart = onStart;
  utterance.onend = (e) => {
    if (onEnd) onEnd(e);
  };
  utterance.onerror = (e) => {
    if (onError) onError(e);
  };

  window.speechSynthesis.speak(utterance);
  return utterance;
};
