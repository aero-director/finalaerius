import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Radio, 
  ClipboardList, 
  PlaneTakeoff, 
  Route, 
  PlaneLanding, 
  CloudSun, 
  AlertTriangle, 
  WifiOff, 
  GitBranch, 
  MapPin, 
  HelpCircle,
  Search,
  BookOpen,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Sliders,
  Copy,
  Check,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  Square,
  TowerControl,
  Info,
  ShieldCheck,
  Compass,
  FileText,
  Sparkles,
  Command,
  RotateCcw,
  Headphones
} from 'lucide-react';
import { RTR_CATEGORIES } from '../data/rtrData';
import { speakIndianText } from '../utils/speechUtils';

// Icon mapping helper
const CATEGORY_ICONS = {
  Radio: Radio,
  ClipboardList: ClipboardList,
  PlaneTakeoff: PlaneTakeoff,
  Route: Route,
  PlaneLanding: PlaneLanding,
  CloudSun: CloudSun,
  AlertTriangle: AlertTriangle,
  WifiOff: WifiOff,
  GitBranch: GitBranch,
  MapPin: MapPin,
  HelpCircle: HelpCircle
};

const PHONETIC_ALPHABET = [
  { letter: 'A', word: 'Alpha', ph: 'AL-FAH' },
  { letter: 'B', word: 'Bravo', ph: 'BRAH-VOH' },
  { letter: 'C', word: 'Charlie', ph: 'CHAR-LEE' },
  { letter: 'D', word: 'Delta', ph: 'DELL-TAH' },
  { letter: 'E', word: 'Echo', ph: 'ECK-OH' },
  { letter: 'F', word: 'Foxtrot', ph: 'FOKS-TROT' },
  { letter: 'G', word: 'Golf', ph: 'GOLF' },
  { letter: 'H', word: 'Hotel', ph: 'HOH-TELL' },
  { letter: 'I', word: 'India', ph: 'IN-DEE-AH' },
  { letter: 'J', word: 'Juliett', ph: 'JEW-LEE-ETT' },
  { letter: 'K', word: 'Kilo', ph: 'KEY-LOH' },
  { letter: 'L', word: 'Lima', ph: 'LEE-MAH' },
  { letter: 'M', word: 'Mike', ph: 'MIKE' },
  { letter: 'N', word: 'November', ph: 'NO-VEM-BER' },
  { letter: 'O', word: 'Oscar', ph: 'OSS-CAH' },
  { letter: 'P', word: 'Papa', ph: 'PAH-PAH' },
  { letter: 'Q', word: 'Quebec', ph: 'KEH-BECK' },
  { letter: 'R', word: 'Romeo', ph: 'ROW-ME-OH' },
  { letter: 'S', word: 'Sierra', ph: 'SEE-AIR-RAH' },
  { letter: 'T', word: 'Tango', ph: 'TANG-GO' },
  { letter: 'U', word: 'Uniform', ph: 'YOU-NEE-FORM' },
  { letter: 'V', word: 'Victor', ph: 'VIK-TAH' },
  { letter: 'W', word: 'Whiskey', ph: 'WISS-KEY' },
  { letter: 'X', word: 'X-ray', ph: 'ECKS-RAY' },
  { letter: 'Y', word: 'Yankee', ph: 'YANG-KEY' },
  { letter: 'Z', word: 'Zulu', ph: 'ZOO-LOO' }
];

export default function Rtr2Page() {
  const [activeCategoryId, setActiveCategoryId] = useState(RTR_CATEGORIES[0]?.id || 'general-procedures');
  const [activeTopicId, setActiveTopicId] = useState(RTR_CATEGORIES[0]?.topics[0]?.id || 'initial-contact');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedType, setCopiedType] = useState(null);
  const [showQuickRef, setShowQuickRef] = useState(false);

  // Audio / Speech Synthesis state
  const [currentlySpeaking, setCurrentlySpeaking] = useState(null); // 'pilot', 'atc', 'dialogue', or turn index
  const [isPlayingDialogue, setIsPlayingDialogue] = useState(false);

  // Voice Command Mode State
  const [voiceCommandsActive, setVoiceCommandsActive] = useState(false);
  const [lastVoiceCommand, setLastVoiceCommand] = useState('');
  const [voiceCommandFeedback, setVoiceCommandFeedback] = useState('');

  // Interactive Voice Practice (PTT) State
  const [isPracticingVoice, setIsPracticingVoice] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [matchScore, setMatchScore] = useState(null);
  const practiceRecognizerRef = useRef(null);
  const commandRecognizerRef = useRef(null);

  // Current active category
  const activeCategory = useMemo(() => {
    return RTR_CATEGORIES.find(c => c.id === activeCategoryId) || RTR_CATEGORIES[0];
  }, [activeCategoryId]);

  // Filtered topics within active category based on search
  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return activeCategory.topics;
    const q = searchQuery.toLowerCase();
    return activeCategory.topics.filter(t => 
      t.title.toLowerCase().includes(q) ||
      t.whenToUse.toLowerCase().includes(q) ||
      (t.reference && t.reference.toLowerCase().includes(q))
    );
  }, [activeCategory, searchQuery]);

  // Current active topic
  const activeTopic = useMemo(() => {
    const found = activeCategory.topics.find(t => t.id === activeTopicId);
    return found || activeCategory.topics[0] || null;
  }, [activeCategory, activeTopicId]);

  // Next / Previous navigation within current category
  const currentTopicIndex = activeCategory.topics.findIndex(t => t.id === activeTopic?.id);
  const prevTopic = currentTopicIndex > 0 ? activeCategory.topics[currentTopicIndex - 1] : null;
  const nextTopic = currentTopicIndex < activeCategory.topics.length - 1 ? activeCategory.topics[currentTopicIndex + 1] : null;

  // Total topics across all categories
  const totalTopicsCount = useMemo(() => {
    return RTR_CATEGORIES.reduce((acc, cat) => acc + cat.topics.length, 0);
  }, []);

  // Audio Playback with Web Speech API in Indian English (en-IN)
  const speakText = (text, type, onComplete) => {
    if (!window.speechSynthesis || !text) return;

    setCurrentlySpeaking(type);

    speakIndianText(text, {
      role: type === 'atc' ? 'atc' : type === 'pilot' ? 'pilot' : 'general',
      rate: 0.95,
      pitch: type === 'atc' ? 0.92 : 1.05,
      onEnd: () => {
        setCurrentlySpeaking(null);
        if (onComplete) onComplete();
      },
      onError: () => {
        setCurrentlySpeaking(null);
        if (onComplete) onComplete();
      },
    });
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setCurrentlySpeaking(null);
    setIsPlayingDialogue(false);
  };

  // Play full example conversation sequentially
  const playEntireConversation = () => {
    if (!activeTopic?.example || activeTopic.example.length === 0) return;
    setIsPlayingDialogue(true);

    let idx = 0;
    const playNextTurn = () => {
      if (idx >= activeTopic.example.length) {
        setIsPlayingDialogue(false);
        setCurrentlySpeaking(null);
        return;
      }
      const turn = activeTopic.example[idx];
      setCurrentlySpeaking(`turn-${idx}`);
      idx++;
      speakText(turn.text, turn.speaker, () => {
        setTimeout(playNextTurn, 500); // 500ms pause between turns
      });
    };

    playNextTurn();
  };

  // Play Phonetic Alphabet Sound
  const playPhoneticLetter = (item) => {
    speakText(`${item.letter}. ${item.word}. Pronounced as ${item.ph}.`, 'phonetic');
  };

  // Handle Category Change
  const handleSelectCategory = (catId) => {
    stopSpeaking();
    setActiveCategoryId(catId);
    setSearchQuery('');
    setSpokenTranscript('');
    setMatchScore(null);
    const cat = RTR_CATEGORIES.find(c => c.id === catId);
    if (cat && cat.topics.length > 0) {
      setActiveTopicId(cat.topics[0].id);
    }
  };

  // Copy to clipboard
  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  // Voice Command Intent Handler
  const handleVoiceCommand = (commandText) => {
    const text = commandText.toLowerCase().trim();
    setLastVoiceCommand(text);

    if (text.includes('next')) {
      if (nextTopic) {
        stopSpeaking();
        setActiveTopicId(nextTopic.id);
        setVoiceCommandFeedback(`Switched to Next: ${nextTopic.title}`);
      }
    } else if (text.includes('previous') || text.includes('back')) {
      if (prevTopic) {
        stopSpeaking();
        setActiveTopicId(prevTopic.id);
        setVoiceCommandFeedback(`Switched to Previous: ${prevTopic.title}`);
      }
    } else if (text.includes('play pilot') || text.includes('speak pilot')) {
      if (activeTopic) {
        setVoiceCommandFeedback('Playing Pilot Phraseology Template');
        speakText(activeTopic.pilotTemplate, 'pilot');
      }
    } else if (text.includes('play atc') || text.includes('speak atc')) {
      if (activeTopic) {
        setVoiceCommandFeedback('Playing ATC Response Template');
        speakText(activeTopic.atcTemplate, 'atc');
      }
    } else if (text.includes('play conversation') || text.includes('play example') || text.includes('dialogue')) {
      setVoiceCommandFeedback('Playing Worked Example Transmission');
      playEntireConversation();
    } else if (text.includes('stop') || text.includes('silence') || text.includes('pause')) {
      stopSpeaking();
      setVoiceCommandFeedback('Audio transmission stopped.');
    } else if (text.includes('phonetic') || text.includes('alphabet')) {
      setShowQuickRef(true);
      setVoiceCommandFeedback('Opened ICAO Phonetic Alphabet Guide.');
    }
  };

  // Continuous Voice Command Listener Setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (voiceCommandsActive) {
      const recognizer = new SpeechRecognition();
      recognizer.continuous = true;
      recognizer.interimResults = false;
      recognizer.lang = 'en-IN';

      recognizer.onresult = (event) => {
        const lastIdx = event.results.length - 1;
        const cmd = event.results[lastIdx][0].transcript;
        handleVoiceCommand(cmd);
      };

      recognizer.onerror = () => {
        // Continue listening on minor errors
      };

      try {
        recognizer.start();
        commandRecognizerRef.current = recognizer;
      } catch (err) {
        console.error(err);
      }
    } else {
      if (commandRecognizerRef.current) {
        commandRecognizerRef.current.stop();
        commandRecognizerRef.current = null;
      }
    }

    return () => {
      if (commandRecognizerRef.current) {
        commandRecognizerRef.current.stop();
        commandRecognizerRef.current = null;
      }
    };
  }, [voiceCommandsActive, nextTopic, prevTopic, activeTopic]);

  // Push-to-Talk (PTT) Practice Speech Recognition
  const startVoicePractice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.");
      return;
    }

    setIsPracticingVoice(true);
    setSpokenTranscript('');
    setMatchScore(null);

    const recognizer = new SpeechRecognition();
    recognizer.continuous = false;
    recognizer.interimResults = false;
    recognizer.lang = 'en-IN';

    recognizer.onresult = (event) => {
      const spoken = event.results[0][0].transcript;
      setSpokenTranscript(spoken);
      calculatePhraseMatch(spoken);
    };

    recognizer.onend = () => {
      setIsPracticingVoice(false);
    };

    recognizer.onerror = () => {
      setIsPracticingVoice(false);
    };

    try {
      recognizer.start();
      practiceRecognizerRef.current = recognizer;
    } catch (err) {
      console.error(err);
      setIsPracticingVoice(false);
    }
  };

  const stopVoicePractice = () => {
    if (practiceRecognizerRef.current) {
      practiceRecognizerRef.current.stop();
      practiceRecognizerRef.current = null;
    }
    setIsPracticingVoice(false);
  };

  // Compare spoken speech with target template
  const calculatePhraseMatch = (spoken) => {
    if (!activeTopic) return;
    const target = (activeTopic.example[0]?.text || activeTopic.pilotTemplate).toLowerCase();
    const spokenLower = spoken.toLowerCase();

    // Simple keyword extraction
    const targetWords = target.replace(/[^a-zA-Z0-9 ]/g, '').split(' ').filter(w => w.length > 2);
    let matched = 0;
    targetWords.forEach(w => {
      if (spokenLower.includes(w)) matched++;
    });

    const score = Math.min(100, Math.round((matched / Math.max(1, targetWords.length)) * 100) + 15);
    setMatchScore(score);
  };

  return (
    <div className="min-h-screen bg-slate-50/80 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-['Montserrat',sans-serif]">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Top Header & Breadcrumbs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#203a8c] hover:text-red-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cadet Operations Deck</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            {/* Voice Command Toggle Button */}
            <button
              onClick={() => setVoiceCommandsActive(!voiceCommandsActive)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer ${
                voiceCommandsActive
                  ? 'bg-red-600 text-white shadow-red-500/30 animate-pulse'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
              title="Speak commands: 'Next', 'Previous', 'Play Pilot', 'Stop'"
            >
              {voiceCommandsActive ? (
                <>
                  <Mic className="w-4 h-4 text-white animate-bounce" />
                  <span>Voice Control: ON</span>
                </>
              ) : (
                <>
                  <MicOff className="w-4 h-4 text-slate-400" />
                  <span>Enable Voice Commands</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowQuickRef(!showQuickRef)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Phonetic Alphabet</span>
            </button>

            <Link
              to="/simulator"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition"
            >
              <Sliders className="w-3.5 h-3.5 text-blue-400" />
              <span>Switch to RTS 2 Simulator</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Live Voice Command Notification Banner */}
        {voiceCommandsActive && (
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-[#203a8c] text-white p-5 rounded-2xl border border-blue-400/40 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-3.5">
              <span className="p-2.5 bg-red-500/20 text-red-400 rounded-xl animate-pulse">
                <Mic className="w-5 h-5" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-cyan-300">
                  Voice Commands Active & Listening
                </p>
                <p className="text-xs text-blue-100 mt-0.5">
                  Speak clearly: <span className="font-bold underline">&ldquo;Next&rdquo;</span>, <span className="font-bold underline">&ldquo;Previous&rdquo;</span>, <span className="font-bold underline">&ldquo;Play Pilot&rdquo;</span>, <span className="font-bold underline">&ldquo;Play ATC&rdquo;</span>, or <span className="font-bold underline">&ldquo;Stop&rdquo;</span>.
                </p>
              </div>
            </div>

            {voiceCommandFeedback && (
              <span className="px-4 py-1.5 bg-white/10 rounded-xl text-xs font-mono font-bold text-cyan-300 border border-cyan-400/30">
                {voiceCommandFeedback}
              </span>
            )}
          </div>
        )}

        {/* Hero Banner with Breathable Padding */}
        <div className="bg-gradient-to-r from-[#07122a] via-[#12224d] to-[#1e3a8a] rounded-[2.5rem] p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-500/20 text-red-300 border border-red-500/30 rounded-full text-[11px] font-black uppercase tracking-widest">
              <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
              <span>DGCA & ICAO Radio Telephony Library with Voice Audio</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase">
              RTR Part 2 — RT Phraseology Library
            </h1>
            
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-3xl">
              Comprehensive curriculum for DGCA RTR Part 2 viva examination. Listen to standard pilot transmissions and ATC responses with realistic voice playback in Indian English, or speak using your microphone to test pronunciation and navigate topics hands-free.
            </p>
            
            <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] font-bold text-blue-200">
              <span className="px-3 py-1.5 bg-white/10 rounded-xl">11 Master Categories</span>
              <span className="px-3 py-1.5 bg-white/10 rounded-xl">{totalTopicsCount} Transmission Scenarios</span>
              <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-xl flex items-center gap-1.5">
                🇮🇳 Voice: Indian English (en-IN)
              </span>
              <span className="px-3 py-1.5 bg-white/10 rounded-xl flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                Spoken Pilot & ATC Voice
              </span>
            </div>
          </div>
        </div>

        {/* Quick Reference Modal / Drawer (Phonetics) */}
        {showQuickRef && (
          <div className="bg-white rounded-[2rem] p-7 sm:p-9 border border-slate-200 shadow-xl space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-[#203a8c]" />
                <h3 className="text-base font-black uppercase tracking-wider text-slate-900">
                  ICAO Radiotelephony Phonetic Alphabet (Click Any Card To Listen)
                </h3>
              </div>
              <button
                onClick={() => setShowQuickRef(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-800 uppercase px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
              >
                Close Guide
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {PHONETIC_ALPHABET.map((item) => (
                <button
                  key={item.letter}
                  onClick={() => playPhoneticLetter(item)}
                  className="p-3.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-2xl text-center transition-all group cursor-pointer"
                  title="Click to hear spoken pronunciation"
                >
                  <span className="text-xl font-black text-[#203a8c] block group-hover:scale-110 transition">{item.letter}</span>
                  <span className="text-xs font-bold text-slate-800 uppercase block mt-0.5">{item.word}</span>
                  <span className="text-[10px] text-red-600 font-mono block mt-0.5">{item.ph}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Category Horizontal Scroll Bar with Roomy Pills */}
        <div className="overflow-x-auto pb-3 scrollbar-thin">
          <div className="flex gap-3 min-w-max">
            {RTR_CATEGORIES.map((cat) => {
              const IconComp = CATEGORY_ICONS[cat.icon] || Radio;
              const isActive = cat.id === activeCategoryId;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer ${
                    isActive
                      ? 'bg-[#203a8c] text-white shadow-md shadow-blue-900/20 scale-[1.02]'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? 'text-red-400' : 'text-slate-500'}`} />
                  <span>{cat.label}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {cat.topics.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Topics Sidebar (4 cols on lg) */}
          <div className="lg:col-span-4 bg-white rounded-[2rem] p-6 border border-slate-200/80 shadow-sm space-y-5 sticky top-8">
            
            {/* Search Filter */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`Search ${activeCategory.topics.length} topics...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#203a8c]"
              />
            </div>

            {/* Topics Counter */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
              <span>{activeCategory.label}</span>
              <span>{filteredTopics.length} {filteredTopics.length === 1 ? 'Topic' : 'Topics'}</span>
            </div>

            {/* Topic List */}
            <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
              {filteredTopics.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400 font-medium">
                  No topics found matching "{searchQuery}"
                </div>
              ) : (
                filteredTopics.map((topic, index) => {
                  const isSelected = topic.id === activeTopic?.id;
                  const padIndex = String(index + 1).padStart(2, '0');
                  return (
                    <button
                      key={topic.id}
                      onClick={() => {
                        stopSpeaking();
                        setActiveTopicId(topic.id);
                        setSpokenTranscript('');
                        setMatchScore(null);
                      }}
                      className={`w-full text-left p-3.5 rounded-xl text-xs font-semibold transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50/90 text-[#203a8c] font-bold border-l-4 border-[#203a8c] shadow-sm'
                          : 'text-slate-700 hover:bg-slate-50 border-l-4 border-transparent'
                      }`}
                    >
                      <span className={`text-[11px] font-mono font-bold mt-0.5 ${
                        isSelected ? 'text-[#203a8c]' : 'text-slate-400'
                      }`}>
                        {padIndex}
                      </span>
                      <span className="flex-1 leading-snug">{topic.title}</span>
                      {isSelected && (
                        <ChevronRight className="w-3.5 h-3.5 text-[#203a8c] flex-shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Topic Detail View (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-8">
            {activeTopic ? (
              <div className="space-y-8">

                {/* Topic Header Card */}
                <div className="bg-white rounded-[2rem] p-7 sm:p-9 border border-slate-200/80 shadow-sm space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="px-3.5 py-1 bg-blue-50 text-[#203a8c] text-xs font-black uppercase tracking-wider rounded-lg border border-blue-100">
                        {activeCategory.label}
                      </span>
                      <span className="text-xs text-slate-400 font-mono font-bold">
                        Topic #{String(currentTopicIndex + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {activeTopic.reference && (
                      <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200">
                        <FileText className="w-3.5 h-3.5 text-red-500" />
                        <span>{activeTopic.reference}</span>
                      </div>
                    )}
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    {activeTopic.title}
                  </h2>

                  {/* When to use callout */}
                  <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 space-y-2">
                    <div className="flex items-center gap-2 text-[#203a8c] text-xs font-bold uppercase tracking-wider">
                      <Info className="w-4 h-4 text-blue-600" />
                      <span>Operational Context & When to Use</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                      {activeTopic.whenToUse}
                    </p>
                  </div>
                </div>

                {/* Phraseology Templates (Pilot vs ATC) with Spacious Cards */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  
                  {/* Pilot Template Card */}
                  <div className="bg-white rounded-[2rem] p-7 border-2 border-blue-100 shadow-sm space-y-4 relative flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-blue-50">
                        <div className="flex items-center gap-2 text-blue-700">
                          <Mic className="w-4 h-4" />
                          <span className="text-xs font-black uppercase tracking-wider">Pilot Phraseology Template</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => speakText(activeTopic.pilotTemplate, 'pilot')}
                            className="p-2 text-blue-600 hover:text-blue-800 rounded-xl hover:bg-blue-50 transition cursor-pointer"
                            title="Listen to Pilot Voice (Indian English)"
                          >
                            <Volume2 className={`w-4 h-4 ${currentlySpeaking === 'pilot' ? 'text-cyan-600 animate-bounce' : ''}`} />
                          </button>
                          <button
                            onClick={() => handleCopy(activeTopic.pilotTemplate, 'pilot')}
                            className="p-2 text-slate-400 hover:text-blue-700 rounded-xl hover:bg-blue-50 transition cursor-pointer"
                            title="Copy template"
                          >
                            {copiedType === 'pilot' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 font-mono text-sm text-slate-900 leading-relaxed font-semibold">
                        {activeTopic.pilotTemplate}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-2">
                      <span>* Replace bracketed fields with flight specifics</span>
                      {currentlySpeaking === 'pilot' && (
                        <span className="text-blue-600 font-bold animate-pulse">Speaking Pilot Line...</span>
                      )}
                    </div>
                  </div>

                  {/* ATC Template Card */}
                  <div className="bg-white rounded-[2rem] p-7 border-2 border-slate-200 shadow-sm space-y-4 relative flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <div className="flex items-center gap-2 text-slate-800">
                          <TowerControl className="w-4 h-4 text-[#203a8c]" />
                          <span className="text-xs font-black uppercase tracking-wider">ATC Response Template</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => speakText(activeTopic.atcTemplate, 'atc')}
                            className="p-2 text-[#203a8c] hover:text-blue-900 rounded-xl hover:bg-slate-100 transition cursor-pointer"
                            title="Listen to ATC Voice (Indian English)"
                          >
                            <Volume2 className={`w-4 h-4 ${currentlySpeaking === 'atc' ? 'text-cyan-600 animate-bounce' : ''}`} />
                          </button>
                          <button
                            onClick={() => handleCopy(activeTopic.atcTemplate, 'atc')}
                            className="p-2 text-slate-400 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition cursor-pointer"
                            title="Copy template"
                          >
                            {copiedType === 'atc' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 font-mono text-sm text-slate-900 leading-relaxed font-semibold">
                        {activeTopic.atcTemplate}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-2">
                      <span>* Standard ATC response per ICAO Doc 4444</span>
                      {currentlySpeaking === 'atc' && (
                        <span className="text-[#203a8c] font-bold animate-pulse">Speaking ATC Line...</span>
                      )}
                    </div>
                  </div>

                </div>

                {/* Voice Pronunciation & Readback Practice Card */}
                <div className="bg-gradient-to-r from-[#07122a] via-[#0d1b3e] to-[#12224d] rounded-[2rem] p-7 sm:p-9 text-white shadow-xl space-y-5 border border-slate-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 text-cyan-400">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                      <h3 className="text-xs font-black uppercase tracking-wider">
                        Interactive Voice Readback Practice (PTT)
                      </h3>
                    </div>

                    <div className="text-xs font-bold text-slate-400">
                      Speak into mic to test phraseology accuracy
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Press the microphone button and read the pilot phraseology out loud in Indian English. The system transcribes your speech and verifies phraseology parameters.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
                    <button
                      onMouseDown={startVoicePractice}
                      onMouseUp={stopVoicePractice}
                      onTouchStart={startVoicePractice}
                      onTouchEnd={stopVoicePractice}
                      className={`w-full sm:w-auto px-7 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-md transition select-none cursor-pointer ${
                        isPracticingVoice
                          ? 'bg-red-600 text-white animate-pulse shadow-red-500/40'
                          : 'bg-[#203a8c] hover:bg-blue-900 text-white'
                      }`}
                    >
                      {isPracticingVoice ? (
                        <>
                          <Mic className="w-4 h-4 animate-bounce text-white" />
                          <span>Transmitting Voice...</span>
                        </>
                      ) : (
                        <>
                          <MicOff className="w-4 h-4 text-slate-300" />
                          <span>Hold to Speak Transmission</span>
                        </>
                      )}
                    </button>

                    {matchScore !== null && (
                      <div className="flex items-center gap-2.5 px-5 py-3 bg-white/10 rounded-xl border border-white/20 text-xs font-mono font-bold">
                        <span className="text-slate-300">Accuracy Score:</span>
                        <span className={`${matchScore >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {matchScore}% Match
                        </span>
                      </div>
                    )}
                  </div>

                  {spokenTranscript && (
                    <div className="p-4 bg-black/60 border border-slate-700/80 rounded-2xl font-mono text-xs text-cyan-300 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Cadet Speech Transcript:</span>
                      <p>&ldquo;{spokenTranscript}&rdquo;</p>
                    </div>
                  )}
                </div>

                {/* Worked Example Conversation with Voice Dialogue Audio */}
                {activeTopic.example && activeTopic.example.length > 0 && (
                  <div className="bg-white rounded-[2rem] p-7 sm:p-9 border border-slate-200/80 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
                      <div>
                        <h3 className="text-base font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                          <Radio className="w-5 h-5 text-red-500" />
                          <span>Worked Transmission Example</span>
                        </h3>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          Listen to the two-way exchange in Indian English aviation phraseology
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={isPlayingDialogue ? stopSpeaking : playEntireConversation}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-[#203a8c] border border-blue-200 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition cursor-pointer"
                        >
                          {isPlayingDialogue ? (
                            <>
                              <Square className="w-3.5 h-3.5 text-red-600" />
                              <span>Stop Audio</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 text-blue-600" />
                              <span>Play Full Dialogue</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {activeTopic.example.map((turn, idx) => {
                        const isPilot = turn.speaker === 'pilot';
                        const isTurnPlaying = currentlySpeaking === `turn-${idx}`;
                        return (
                          <div
                            key={idx}
                            className={`p-5 rounded-2xl text-xs leading-relaxed space-y-3 transition-all ${
                              isPilot
                                ? 'bg-blue-50/70 border border-blue-200 text-slate-900 ml-4 sm:ml-10'
                                : 'bg-slate-50 border border-slate-200 text-slate-900 mr-4 sm:mr-10'
                            } ${isTurnPlaying ? 'ring-2 ring-blue-500 shadow-md' : ''}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                                isPilot
                                  ? 'bg-[#203a8c] text-white'
                                  : 'bg-slate-800 text-white'
                              }`}>
                                {isPilot ? 'Pilot Transmission' : 'ATC Transmission'}
                              </span>

                              <button
                                onClick={() => speakText(turn.text, turn.speaker)}
                                className="p-1.5 text-slate-400 hover:text-slate-800 transition cursor-pointer"
                                title="Listen to this line"
                              >
                                <Volume2 className={`w-4 h-4 ${isTurnPlaying ? 'text-blue-600 animate-bounce' : ''}`} />
                              </button>
                            </div>
                            <p className="font-mono font-semibold text-slate-900 text-sm sm:text-base leading-relaxed">
                              "{turn.text}"
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* DGCA Exam Notes & Traps */}
                {activeTopic.notes && activeTopic.notes.length > 0 && (
                  <div className="bg-amber-50/70 rounded-[2rem] p-7 sm:p-9 border border-amber-200 shadow-sm space-y-4">
                    <div className="flex items-center gap-2.5 text-amber-900">
                      <ShieldCheck className="w-5 h-5 text-amber-600" />
                      <h3 className="text-sm font-black uppercase tracking-wider">
                        DGCA Exam Notes & Practical Traps
                      </h3>
                    </div>

                    <ul className="space-y-3 pt-1">
                      {activeTopic.notes.map((note, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                          <span className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Bottom Navigation Pager */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                  <div>
                    {prevTopic ? (
                      <button
                        onClick={() => {
                          stopSpeaking();
                          setActiveTopicId(prevTopic.id);
                        }}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous: {prevTopic.title}</span>
                      </button>
                    ) : (
                      <div />
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      to="/simulator"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#203a8c] hover:bg-blue-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition"
                    >
                      <Sliders className="w-4 h-4 text-blue-300" />
                      <span>Practice in Simulator</span>
                    </Link>

                    {nextTopic && (
                      <button
                        onClick={() => {
                          stopSpeaking();
                          setActiveTopicId(nextTopic.id);
                        }}
                        className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition cursor-pointer"
                      >
                        <span>Next: {nextTopic.title}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ) : null}
          </div>

        </div>

      </div>
    </div>
  );
}
