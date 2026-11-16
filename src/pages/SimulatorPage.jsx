import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Radio, 
  ArrowLeft, 
  ChevronRight, 
  BookOpen, 
  ArrowRight, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Mic, 
  MicOff, 
  Plane, 
  Check, 
  X, 
  Play, 
  Award, 
  Compass, 
  FileText,
  Clock,
  Sparkles,
  RefreshCw,
  Lock,
  Headphones,
  TowerControl,
  ShieldAlert
} from 'lucide-react';
import { RTR_EXAMS } from '../data/rtrExamsData';
import { speakIndianText } from '../utils/speechUtils';

function SimulatorPage() {
  // Navigation & Exam state
  const [selectedExam, setSelectedExam] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);

  // Audio / Speech Synthesis State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);

  // Push-to-Talk (PTT) / Speech Recognition State
  const [isListening, setIsListening] = useState(false);
  const [isPttActive, setIsPttActive] = useState(false);
  const [transcriptText, setTranscriptText] = useState('');
  const recognitionRef = useRef(null);

  // Radio Console Output Log
  const [radioLog, setRadioLog] = useState([]);

  // Filter / Category selection on main list
  const [examFilter, setExamFilter] = useState('all'); // 'all', 'free', 'important'

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognizer = new SpeechRecognition();
      recognizer.continuous = false;
      recognizer.interimResults = false;
      recognizer.lang = 'en-IN'; // Indian English standard for DGCA

      recognizer.onresult = (event) => {
        const spoken = event.results[0][0].transcript;
        setTranscriptText(spoken);
        addRadioLog('PILOT (MIC)', spoken);
      };

      recognizer.onerror = () => {
        setIsListening(false);
        setIsPttActive(false);
      };

      recognizer.onend = () => {
        setIsListening(false);
        setIsPttActive(false);
      };

      recognitionRef.current = recognizer;
    }
  }, []);

  // Play ATC Voice using Web Speech API with Indian English priority
  const playAtcVoice = (text) => {
    if (!speechEnabled || !window.speechSynthesis || !text) return;

    speakIndianText(text, {
      role: 'atc',
      rate: 0.95,
      pitch: 0.92,
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false),
    });
  };

  // Add entry to Radio Console
  const addRadioLog = (sender, message) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    setRadioLog(prev => [...prev.slice(-14), { sender, message, time: timeStr }]);
  };

  // Start an Exam
  const handleStartExam = (exam) => {
    setSelectedExam(exam);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setIsAnswerSubmitted(false);
    setExamFinished(false);
    setTranscriptText('');

    const initialLogs = [
      { sender: 'AVIONICS', message: `Aircraft initialized: ${exam.callsign} (${exam.registration})`, time: '00:00:01' },
      { sender: 'FLIGHT PLAN', message: `Route: ${exam.route} | Planned Level: ${exam.flightLevel}`, time: '00:00:02' },
      { sender: 'COMM', message: `Tuned COM1: ${exam.questions[0]?.frequency} MHz (${exam.questions[0]?.freqName})`, time: '00:00:03' }
    ];
    setRadioLog(initialLogs);

    if (exam.questions[0]?.atcCall) {
      setTimeout(() => {
        playAtcVoice(exam.questions[0].atcCall);
        addRadioLog('ATC', exam.questions[0].atcCall);
      }, 600);
    }
  };

  // Handle Multiple Choice Answer Selection
  const handleSelectOption = (option) => {
    if (isAnswerSubmitted) return;

    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: {
        selectedOption: option,
        isCorrect: option.correct
      }
    }));
    setIsAnswerSubmitted(true);

    addRadioLog('CADET READBACK', option.text);
    if (option.correct) {
      addRadioLog('ATC EVALUATION', '✓ Readback correct. Good transmission.');
    } else {
      addRadioLog('ATC EVALUATION', '✗ Readback incorrect. Safety items missing or non-standard.');
    }
  };

  // Handle Push-To-Talk Press
  const handlePttDown = () => {
    setIsPttActive(true);
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handlePttUp = () => {
    setIsPttActive(false);
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
        setIsListening(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Proceed to Next Question
  const handleNextQuestion = () => {
    window.speechSynthesis?.cancel();
    setIsPlayingAudio(false);
    setTranscriptText('');

    if (currentQuestionIndex < selectedExam.questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setIsAnswerSubmitted(false);

      const nextQ = selectedExam.questions[nextIndex];
      addRadioLog('COMM', `Frequency active: ${nextQ.frequency} MHz (${nextQ.freqName})`);
      setTimeout(() => {
        playAtcVoice(nextQ.atcCall);
        addRadioLog('ATC', nextQ.atcCall);
      }, 400);
    } else {
      setExamFinished(true);
      window.speechSynthesis?.cancel();
    }
  };

  // Restart Active Exam
  const handleRestartExam = () => {
    window.speechSynthesis?.cancel();
    handleStartExam(selectedExam);
  };

  // Exit Exam
  const handleExitExam = () => {
    window.speechSynthesis?.cancel();
    setSelectedExam(null);
    setExamFinished(false);
  };

  // Calculate Scores
  const correctCount = Object.values(userAnswers).filter(a => a.isCorrect).length;
  const totalQuestions = selectedExam ? selectedExam.questions.length : 0;
  const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const isPassed = scorePercent >= (selectedExam?.passingScore || 50);

  // Filtered exams for main list
  const displayedExams = RTR_EXAMS.filter(exam => {
    if (examFilter === 'free') return exam.isFree;
    if (examFilter === 'important') return exam.badge === 'Important';
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50/80 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-['Montserrat',sans-serif]">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* TOP NAVIGATION & CONTEXT BAR */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
          <Link
            to="/profile"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#203a8c] hover:text-red-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cadet Operations Deck</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/rtr2"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-100 text-[#203a8c] border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition"
            >
              <Radio className="w-4 h-4 text-red-600" />
              <span>RTR 2 Learn Library</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: ACTIVE EXAM SESSION WORKBENCH */}
        {/* ========================================================================= */}
        {selectedExam && !examFinished && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Exam Session Header Bar with Cockpit Identity */}
            <div className="bg-[#09142e] rounded-[2rem] p-6 sm:p-9 text-white shadow-xl relative overflow-hidden border border-slate-800">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold uppercase tracking-wider">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-400/30 rounded-lg">
                      {selectedExam.title}
                    </span>
                    <span className="text-slate-300">Route: <span className="text-cyan-300 font-mono">{selectedExam.route}</span></span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-300">Level: <span className="text-amber-300 font-mono">{selectedExam.flightLevel}</span></span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white flex flex-wrap items-center gap-3 pt-1">
                    <span>Transmission {currentQuestionIndex + 1} of {totalQuestions}</span>
                    <span className="text-xs font-mono px-3 py-1 bg-white/10 rounded-lg text-slate-300 border border-white/10">
                      Flight Stage: {selectedExam.questions[currentQuestionIndex]?.stage}
                    </span>
                  </h1>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block bg-black/30 px-4 py-2.5 rounded-2xl border border-white/10">
                    <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Callsign & Reg</span>
                    <span className="font-mono text-sm font-black text-cyan-400">{selectedExam.callsign} | {selectedExam.registration}</span>
                  </div>

                  <button
                    onClick={handleExitExam}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold uppercase tracking-wider rounded-xl transition border border-white/10 cursor-pointer"
                  >
                    Abort / Exit Exam
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800/80 h-2.5 rounded-full mt-6 overflow-hidden border border-white/5">
                <div 
                  className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 h-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Main Workbench Grid: Question + Cockpit Radios */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* Left Column (8 cols): Question Scenario, ATC Transmission & Answers */}
              <div className="lg:col-span-8 space-y-8">

                {/* Situation Description Box */}
                <div className="bg-white rounded-[2rem] p-7 sm:p-9 border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                      <Compass className="w-4 h-4 text-blue-600" />
                      Flight Deck Situation & Context
                    </span>
                    <span className="text-xs font-mono font-bold text-[#203a8c] bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                      FREQ: {selectedExam.questions[currentQuestionIndex]?.frequency} MHz
                    </span>
                  </div>

                  <p className="text-base sm:text-lg text-slate-900 font-semibold leading-relaxed">
                    {selectedExam.questions[currentQuestionIndex]?.situation}
                  </p>
                </div>

                {/* Incoming ATC Audio Card with Indian English (en-IN) indicator */}
                <div className="bg-gradient-to-br from-[#07122a] via-[#0d1b3e] to-[#12224d] rounded-[2rem] p-7 sm:p-9 text-white shadow-xl space-y-5 border border-slate-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
                      <TowerControl className="w-5 h-5 text-amber-400" />
                      <span>Incoming ATC Transmission ({selectedExam.questions[currentQuestionIndex]?.freqName})</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 text-amber-300 border border-amber-500/25 rounded-xl text-[11px] font-bold">
                        🇮🇳 Indian English (en-IN)
                      </span>
                      <button
                        onClick={() => playAtcVoice(selectedExam.questions[currentQuestionIndex]?.atcCall)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-400/30 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Replay Audio</span>
                      </button>

                      <button
                        onClick={() => setSpeechEnabled(!speechEnabled)}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-slate-300 transition cursor-pointer"
                        title={speechEnabled ? "Mute Voice" : "Unmute Voice"}
                      >
                        {speechEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-red-400" />}
                      </button>
                    </div>
                  </div>

                  <div className="bg-black/60 p-6 rounded-2xl border border-slate-700/60 font-mono text-base sm:text-lg text-cyan-300 font-bold leading-relaxed shadow-inner">
                    &ldquo;{selectedExam.questions[currentQuestionIndex]?.atcCall}&rdquo;
                  </div>

                  {isPlayingAudio && (
                    <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold animate-pulse">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                      <span>Radio Audio Active — Speaking Indian English ATC Call...</span>
                    </div>
                  )}
                </div>

                {/* Multiple Choice Readback Options */}
                <div className="bg-white rounded-[2rem] p-7 sm:p-9 border border-slate-200/80 shadow-sm space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-sm font-black uppercase tracking-wider text-slate-900">
                        Select Pilot Readback Response:
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Choose the strictly compliant ICAO / DGCA transmission
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase hidden sm:block">
                      Standard Phraseology
                    </span>
                  </div>

                  <div className="space-y-4">
                    {selectedExam.questions[currentQuestionIndex]?.options.map((option, idx) => {
                      const letter = String.fromCharCode(65 + idx);
                      const isChosen = userAnswers[currentQuestionIndex]?.selectedOption === option;

                      let btnStyle = "bg-slate-50/80 border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 text-slate-800";
                      if (isAnswerSubmitted) {
                        if (option.correct) {
                          btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-sm";
                        } else if (isChosen && !option.correct) {
                          btnStyle = "bg-red-50 border-red-500 text-red-950 font-bold";
                        } else {
                          btnStyle = "bg-slate-50/40 border-slate-200 text-slate-400 opacity-50";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isAnswerSubmitted}
                          onClick={() => handleSelectOption(option)}
                          className={`w-full p-5 rounded-2xl border-2 text-left font-mono text-xs sm:text-sm transition-all flex items-start gap-4 cursor-pointer ${btnStyle}`}
                        >
                          <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 shadow-sm ${
                            isAnswerSubmitted && option.correct
                              ? 'bg-emerald-600 text-white'
                              : isChosen && !option.correct
                              ? 'bg-red-600 text-white'
                              : 'bg-white border border-slate-300 text-slate-800'
                          }`}>
                            {letter}
                          </span>

                          <span className="flex-1 leading-relaxed text-sm">
                            {option.text}
                          </span>

                          {isAnswerSubmitted && option.correct && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                          )}
                          {isAnswerSubmitted && isChosen && !option.correct && (
                            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Box after selection */}
                  {isAnswerSubmitted && (
                    <div className={`p-6 sm:p-7 rounded-2xl border text-sm space-y-3 animate-in fade-in duration-200 ${
                      userAnswers[currentQuestionIndex]?.isCorrect
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                        : 'bg-red-50 border-red-300 text-red-950'
                    }`}>
                      <div className="flex items-center gap-2.5 font-bold uppercase tracking-wider text-xs">
                        {userAnswers[currentQuestionIndex]?.isCorrect ? (
                          <>
                            <Check className="w-5 h-5 text-emerald-600" />
                            <span className="text-emerald-700">Readback Correct — Flight Cleared</span>
                          </>
                        ) : (
                          <>
                            <X className="w-5 h-5 text-red-600" />
                            <span className="text-red-700">Incorrect Transmission / Readback Error</span>
                          </>
                        )}
                      </div>

                      <p className="leading-relaxed font-medium">
                        {userAnswers[currentQuestionIndex]?.selectedOption?.feedback}
                      </p>

                      <div className="pt-4 flex justify-end">
                        <button
                          onClick={handleNextQuestion}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-[#203a8c] hover:bg-blue-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition cursor-pointer"
                        >
                          <span>{currentQuestionIndex < totalQuestions - 1 ? 'Proceed to Next Transmission →' : 'Complete Exam & View Results'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Push to talk interactive button */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-500">
                      <span className="font-bold text-slate-800 block text-sm">Push-To-Talk Voice Input (PTT):</span>
                      Click and hold to speak your readback into the microphone in Indian English
                    </div>

                    <button
                      onMouseDown={handlePttDown}
                      onMouseUp={handlePttUp}
                      onTouchStart={handlePttDown}
                      onTouchEnd={handlePttUp}
                      className={`px-7 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 shadow-md transition active:scale-95 select-none cursor-pointer ${
                        isPttActive
                          ? 'bg-red-600 text-white animate-pulse shadow-red-500/40'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      {isPttActive ? (
                        <>
                          <Mic className="w-4 h-4 animate-bounce text-white" />
                          <span>Transmitting Voice...</span>
                        </>
                      ) : (
                        <>
                          <MicOff className="w-4 h-4 text-slate-400" />
                          <span>Hold to Transmit (PTT)</span>
                        </>
                      )}
                    </button>
                  </div>

                  {transcriptText && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-xs text-slate-800 font-mono">
                      <span className="font-bold text-[#203a8c]">Cadet Transcribed Speech: </span> &ldquo;{transcriptText}&rdquo;
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column (4 cols): Radio Transceiver & Live Log */}
              <div className="lg:col-span-4 space-y-6">

                {/* Transceiver Display */}
                <div className="bg-[#07122a] border border-slate-800 rounded-[2rem] p-7 text-center text-white shadow-xl space-y-3.5">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                    ACTIVE VHF COM 1 TRANSCEIVER
                  </div>
                  <div className="text-4xl sm:text-5xl font-mono font-black text-cyan-400 tracking-wider">
                    {selectedExam.questions[currentQuestionIndex]?.frequency}
                  </div>
                  <div className="text-xs font-bold text-slate-300 uppercase">
                    {selectedExam.questions[currentQuestionIndex]?.freqName}
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    CARRIER WAVE LOCKED
                  </div>
                </div>

                {/* Real-Time Radio Audio Log */}
                <div className="bg-black/95 border border-slate-800 rounded-[2rem] p-6 shadow-xl font-mono text-xs space-y-3.5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
                    <span className="font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      RADIO CONSOLE LOG
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">LIVE FEED</span>
                  </div>

                  <div className="space-y-2.5 text-[11px] max-h-80 overflow-y-auto pr-1">
                    {radioLog.map((log, i) => (
                      <div key={i} className="leading-relaxed">
                        <span className="text-slate-600 mr-2">[{log.time}]</span>
                        <span className={`font-bold mr-1.5 ${
                          log.sender.includes('ATC')
                            ? 'text-amber-400'
                            : log.sender.includes('CADET') || log.sender.includes('PILOT')
                            ? 'text-cyan-400'
                            : 'text-slate-400'
                        }`}>
                          {log.sender}:
                        </span>
                        <span className="text-slate-300">{log.message}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="bg-white rounded-[2rem] p-6 border border-slate-200/80 shadow-sm space-y-3 text-xs">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    DGCA Examination Rules
                  </span>
                  <div className="space-y-2 text-slate-600 font-medium">
                    <p>• Passing Threshold: <span className="font-bold text-slate-900">{selectedExam.passingScore}%</span></p>
                    <p>• Full aircraft callsign required on initial calls</p>
                    <p>• Runway designators must be acknowledged verbatim</p>
                    <p>• All altimeter settings (QNH) mandatory</p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: EXAM RESULTS DEBRIEF SCREEN */}
        {/* ========================================================================= */}
        {selectedExam && examFinished && (
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-14 border border-slate-200 shadow-xl space-y-8 max-w-2xl mx-auto text-center animate-in zoom-in-95 duration-300">
            <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center ${
              isPassed ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
            }`}>
              <Award className="w-12 h-12" />
            </div>

            <div className="space-y-3">
              <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                isPassed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
              }`}>
                {isPassed ? 'DGCA PART 2 VIVA: PASSED' : 'DGCA PART 2 VIVA: FAILED (RETEST REQUIRED)'}
              </span>

              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 uppercase">
                {scorePercent}% Score
              </h2>

              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                You correctly answered <span className="font-bold text-slate-900">{correctCount}</span> out of <span className="font-bold text-slate-900">{totalQuestions}</span> transmission scenarios in {selectedExam.title}.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Passing Threshold</span>
                <span className="text-base font-black text-slate-900">{selectedExam.passingScore}%</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Examination Result</span>
                <span className={`text-base font-black ${isPassed ? 'text-emerald-600' : 'text-red-600'}`}>
                  {isPassed ? 'QUALIFIED FOR PART 1' : 'MINIMUM 50% REQUIRED'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={handleRestartExam}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#203a8c] hover:bg-blue-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow transition cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retake Flight Exam</span>
              </button>

              <button
                onClick={handleExitExam}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              >
                <span>Select Another Route</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: MAIN EXAMS CATALOG / SELECTION VIEW */}
        {/* ========================================================================= */}
        {!selectedExam && (
          <div className="space-y-8">

            {/* Promo Banner: Link to RTR 2 Learn */}
            <Link
              to="/rtr2"
              className="group flex items-center gap-5 rounded-[2rem] border border-[#203a8c]/20 bg-blue-50/70 p-6 sm:p-7 transition hover:border-[#203a8c]/40 hover:bg-blue-50 shadow-sm"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white bg-gradient-to-br from-[#203a8c] to-[#00d4ff] shadow-md">
                <BookOpen className="h-6 w-6" />
              </span>
              <div className="min-w-0 flex-1 space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-[#203a8c]">
                  New to RTR Part 2 Communications?
                </p>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Master Radiotelephony Phraseology Library
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Practice standard templates, worked example conversations, and phonetics before taking the full simulator exams.
                </p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-[#203a8c] transition group-hover:translate-x-1" />
            </Link>

            {/* Hero Main Card: RTR Part 2 Practice */}
            <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-slate-200/80 shadow-sm text-center space-y-8">
              <div className="mx-auto w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg bg-gradient-to-br from-[#203a8c] to-[#00d4ff]">
                <Radio className="w-10 h-10 text-white" />
              </div>

              <div className="space-y-3 max-w-2xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">
                  RTR Part 2 Simulator
                </h1>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Practice with actual DGCA RTR exam question sets and live simulated AI Air Traffic Control voice responses synthesized in Indian English.
                </p>
              </div>

              {/* Two Feature Highlights Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left pt-2">
                <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-[#203a8c] flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-blue-600" />
                    Simulated Flight Rules
                  </h3>
                  <ul className="text-xs sm:text-sm text-slate-600 font-medium space-y-2">
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span>6 to 17 transmissions per exam route</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span>Passing threshold: 50% minimum</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span>Push-to-talk microphone voice input</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span>AI ATC responds with Indian English voice</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-[#203a8c] flex items-center gap-2">
                    <Plane className="w-4 h-4 text-red-600" />
                    Transmission Scenarios Covered
                  </h3>
                  <ul className="text-xs sm:text-sm text-slate-600 font-medium space-y-2">
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-red-600" />
                      <span>Departure procedures & pushback taxi clearances</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-red-600" />
                      <span>Enroute communications & level change requests</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-red-600" />
                      <span>Holding patterns & precision ILS approach</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-red-600" />
                      <span>Emergency calls (Mayday & Pan-Pan) & diversions</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Plan & Attempts Tracker Pill */}
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-blue-50 border border-blue-200/80 rounded-full text-xs font-bold text-[#203a8c]">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Cadet Pro Flight Deck — Unlimited Practice Flights Enabled</span>
              </div>
            </div>

            {/* Select an Exam Section */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">
                    Select a Flight Exam Route ({RTR_EXAMS.length} Available)
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Choose your flight route to practice live Air Traffic Control readbacks
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setExamFilter('all')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                      examFilter === 'all'
                        ? 'bg-[#203a8c] text-white shadow-sm'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    All Exams
                  </button>
                  <button
                    onClick={() => setExamFilter('important')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                      examFilter === 'important'
                        ? 'bg-[#203a8c] text-white shadow-sm'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    Important
                  </button>
                  <button
                    onClick={() => setExamFilter('free')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                      examFilter === 'free'
                        ? 'bg-[#203a8c] text-white shadow-sm'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    Free
                  </button>
                </div>
              </div>

              {/* Exam Cards List */}
              <div className="space-y-4">
                {displayedExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="bg-white rounded-[1.75rem] p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                  >
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h4 className="font-black text-slate-900 text-base sm:text-lg">
                          {exam.title}
                        </h4>

                        {exam.badge === 'Important' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-red-100 text-red-700 border border-red-200">
                            <AlertTriangle className="w-3 h-3 text-red-600" />
                            Important
                          </span>
                        )}

                        {exam.isFree ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Free Trial
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-blue-50 text-[#203a8c] border border-blue-200">
                            Unlocked
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 font-medium">
                        <span>
                          Callsign: <span className="font-mono font-bold text-slate-900">{exam.callsign}</span>
                        </span>
                        {exam.registration && (
                          <>
                            <span className="text-slate-300">•</span>
                            <span>
                              Reg: <span className="font-mono font-bold text-slate-900">{exam.registration}</span>
                            </span>
                          </>
                        )}
                        <span className="text-slate-300">•</span>
                        <span>{exam.questionsCount} Transmission Scenarios</span>
                      </div>

                      <div className="text-xs font-bold text-blue-700 font-mono pt-0.5">
                        Route: {exam.route}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                      <button
                        onClick={() => handleStartExam(exam)}
                        className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#203a8c] hover:bg-blue-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition cursor-pointer"
                      >
                        <Play className="w-4 h-4" />
                        <span>Start Flight Exam</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default SimulatorPage;
