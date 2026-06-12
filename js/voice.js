// js/voice.js

let voiceMuted = false;
let preferredVoice = null;
let narrationQueue = [];
let currentNarrationIndex = 0;
let isPaused = false; 

function loadVoices() {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Online")));
        if (!preferredVoice) {
            preferredVoice = voices.find(v => v.lang.startsWith('en'));
        }
        if (narrationQueue.length > 0 && !voiceMuted && currentNarrationIndex === 0 && !window.speechSynthesis.speaking && !window.speechSynthesis.pending) {
            playNextSegment();
        }
    }
}

if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices(); 
}

function clearVoiceHighlights() {
    document.querySelectorAll('.active-text-highlight').forEach(el => {
        el.classList.remove('active-text-highlight');
        el.style.border = "none";
        el.style.boxShadow = "none";
        el.style.backgroundColor = "transparent";
        el.style.borderRadius = "0px";
        el.style.padding = "0px";
    });
}

function applyVoiceHighlights(textId) {
    clearVoiceHighlights(); 

    if (!textId) return; 

    const targetEl = document.getElementById(textId);
    if (targetEl) {
        targetEl.classList.add('active-text-highlight');
        targetEl.style.transition = "all 0.3s ease";
        targetEl.style.border = "2px solid #00e5ff"; 
        targetEl.style.boxShadow = "0 0 10px rgba(0, 229, 255, 0.3)";
        targetEl.style.backgroundColor = "rgba(0, 229, 255, 0.08)"; 
        targetEl.style.borderRadius = "6px";
        targetEl.style.padding = "6px";
        
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function runVoiceNarration(narrationData) {
    window.speechSynthesis.cancel();
    clearVoiceHighlights();
    
    isPaused = false;
    const pauseBtn = document.getElementById("pause-toggle");
    if (pauseBtn) pauseBtn.innerHTML = "⏸️ Pause";

    if (voiceMuted || !narrationData) return;

    if (Array.isArray(narrationData)) {
        narrationQueue = narrationData;
    } else {
        narrationQueue = [{ text: narrationData, textId: null }];
    }
    
    currentNarrationIndex = 0;
    
    if (window.speechSynthesis.getVoices().length > 0) {
        playNextSegment();
    }
}

function playNextSegment() {
    if (currentNarrationIndex >= narrationQueue.length) {
        clearVoiceHighlights(); 
        return;
    }

    let segment = narrationQueue[currentNarrationIndex];
    
    applyVoiceHighlights(segment.textId);

    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) return; 

    let filteredText = segment.text.replace(/[\$\\\[\]]/g, "");
    const utterance = new SpeechSynthesisUtterance(filteredText);
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onend = () => {
        currentNarrationIndex++;
        if (currentNarrationIndex < narrationQueue.length && !voiceMuted && !isPaused) {
            playNextSegment();
        } else if (currentNarrationIndex >= narrationQueue.length) {
            isPaused = false;
            const pauseBtn = document.getElementById("pause-toggle");
            if (pauseBtn) pauseBtn.innerHTML = "⏸️ Pause";
            clearVoiceHighlights();
        }
    };

    window.speechSynthesis.speak(utterance);
}

function runInteractiveVoice(eventKey) {
    if (voiceMuted || typeof currentStep === 'undefined' || !steps[currentStep]) return;
    
    const interactionMap = steps[currentStep].interactiveNarrations;
    if (interactionMap && interactionMap[eventKey]) {
        runVoiceNarration(interactionMap[eventKey]);
    }
}

function toggleVoice() {
    voiceMuted = !voiceMuted;
    const btn = document.getElementById("voice-toggle");
    if (!btn) return;

    if (voiceMuted) {
        window.speechSynthesis.cancel();
        clearVoiceHighlights();
        btn.innerHTML = "🔇 Voice: OFF";
        btn.style.background = "#2a1414";
    } else {
        btn.innerHTML = "🔊 Voice: ON";
        btn.style.background = "#14304d";
        if (typeof steps !== 'undefined' && steps[currentStep]) {
            runVoiceNarration(steps[currentStep].narration);
        }
    }
}

function pauseNarration() {
    if (!window.speechSynthesis) return;
    const pauseBtn = document.getElementById("pause-toggle");

    if (!isPaused) {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
            isPaused = true;
            if (pauseBtn) pauseBtn.innerHTML = "▶️ Resume";
        }
    } else {
        window.speechSynthesis.resume();
        isPaused = false;
        if (pauseBtn) pauseBtn.innerHTML = "⏸️ Pause";
        
        setTimeout(() => {
            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
            }
        }, 60);
    }
}

window.onbeforeunload = () => { window.speechSynthesis.cancel(); clearVoiceHighlights(); };