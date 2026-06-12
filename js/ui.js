// js/ui.js

let eqAnimationId = null;
let transientAnimationId = null;

document.addEventListener("DOMContentLoaded", () => {
    const components = ["gen1", "gen2", "gen3", "bus1", "bus2", "bus3"];
    
    components.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("click", () => {
                const analysisBox = document.getElementById("analysis-content");
                if (analysisBox && componentDetails[id]) {
                    analysisBox.innerHTML = `
                        <h2>Substation Diagnostics [${id.toUpperCase()}]</h2>
                        <p>${componentDetails[id]}</p>
                        <div class="equation-box">Telemetry Active</div>
                    `;
                    addEvent(`Polled metrics for terminal infrastructure device: ${id.toUpperCase()}`);
                }
            });
        }
    });
});

function updateTelemetry(step) {
    const stateEl = document.getElementById("m-state");
    const freqEl = document.getElementById("m-freq");
    const voltEl = document.getElementById("m-volt");

    if (stateEl) {
        stateEl.textContent = step.telemetry.state;
        stateEl.style.color = step.telemetry.color;
    }
    if (freqEl) freqEl.textContent = step.telemetry.freq;
    if (voltEl) voltEl.textContent = step.telemetry.volt;
}

function renderStep() {
    const step = steps[currentStep];
    const contentBox = document.getElementById("course-content");
    if (!contentBox) return;

    // Clear old animations safely
    if (eqAnimationId) cancelAnimationFrame(eqAnimationId);
    if (transientAnimationId) cancelAnimationFrame(transientAnimationId);

    contentBox.innerHTML = `<h2>${step.title}</h2>${step.content}`;

    if (window.MathJax && window.MathJax.typesetPromise) {
        setTimeout(() => {
            window.MathJax.typesetPromise([contentBox])
                .catch((err) => console.error("MathJax processing error: ", err));
        }, 30);
    }

    // --- VIEWPORT SWAPPING LOGIC ---
    const scadaView = document.getElementById("scada-view");
    const vizView = document.getElementById("dynamic-viz-view");
    
    if (scadaView && vizView) {
        if (step.viewState === "SCADA") {
            scadaView.style.display = "flex";
            vizView.style.display = "none";
            vizView.innerHTML = ""; 
        } else if (step.viewState === "VIZ") {
            scadaView.style.display = "none";
            vizView.style.display = "flex";
            
            if (step.vizType === "equilibrium") {
                renderEquilibriumViz("dynamic-viz-view");
            } else if (step.vizType === "transient") {
                renderTransientViz("dynamic-viz-view");
            } else if (step.vizHtml) {
                vizView.innerHTML = step.vizHtml;
            }
        }
    }

    updateTelemetry(step);
    highlightSVGComponents(step.highlights);
    updateDots();
    runVoiceNarration(step.narration);
}

function buildDots() {
    const dotsContainer = document.getElementById("step-indicators");
    if (!dotsContainer) return;
    dotsContainer.innerHTML = "";
    
    steps.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.style.width = "10px";
        dot.style.height = "10px";
        dot.style.borderRadius = "50%";
        dot.style.background = index === 0 ? "var(--cyan)" : "#14304d";
        dot.style.transition = "all 0.3s";
        dot.className = "step-dot-item";
        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    const items = document.querySelectorAll(".step-dot-item");
    items.forEach((dot, idx) => {
        if (idx === currentStep) {
            dot.style.background = "var(--cyan)";
            dot.style.boxShadow = "0 0 8px var(--cyan)";
        } else {
            dot.style.background = "#14304d";
            dot.style.boxShadow = "none";
        }
    });
}

function highlightSVGComponents(highlights) {
    document.querySelectorAll(".generator").forEach(el => el.style.stroke = "var(--green)");
    document.querySelectorAll(".busbar").forEach(el => el.style.stroke = "#ffffff");
    document.querySelectorAll(".transmission-line").forEach(el => {
        if (!el.classList.contains("critical-line")) el.style.stroke = "#4a6385";
    });

    if (!highlights) return;

    if (highlights.gens) {
        highlights.gens.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.stroke = "var(--cyan)";
        });
    }
    if (highlights.buses) {
        highlights.buses.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.stroke = "var(--yellow)";
        });
    }
    if (highlights.lines) {
        highlights.lines.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.stroke = "var(--cyan)";
        });
    }
}

// --- DYNAMIC CANVAS RENDERING ENGINES ---

function renderEquilibriumViz(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: 20px; box-sizing: border-box;">
            <h3 style="color: white; margin: 0; font-family: sans-serif;">Equilibrium Vs. Disturbance</h3>
            <canvas id="eqCanvas" style="flex: 1; width: 100%; min-height: 0; margin-top: 20px; display: block;"></canvas>
            <p style="color: #8892b0; font-size: 13px; text-align: center; margin: 20px 0 0 0;">
                The inherent restorative mechanisms fighting to maintain the vertical balance point.
            </p>
        </div>
    `;

    const canvas = document.getElementById('eqCanvas');
    const ctx = canvas.getContext('2d');
    let startTime = Date.now();

    function resize() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    function draw() {
        if (steps[currentStep].vizType !== "equilibrium") {
            window.removeEventListener('resize', resize);
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const time = (Date.now() - startTime) / 1000;

        const originX = canvas.width / 2;
        // Set the anchor line explicitly slightly above the bottom boundary
        const originY = canvas.height - 30; 
        
        // Dynamically cap rod length so the sphere NEVER hits the top text
        const maxSafeLength = canvas.height - 80; 
        const length = Math.min(Math.max(40, maxSafeLength), 180); 

        // Swing physics 
        const angle = 0.4 * Math.sin(time * 2.5) * Math.exp(-time * 0.15) + 0.05 * Math.sin(time * 6);

        const endX = originX + length * Math.sin(angle);
        const endY = originY - length * Math.cos(angle);

        // Draw Base 
        ctx.beginPath();
        ctx.moveTo(originX - 100, originY);
        ctx.lineTo(originX + 100, originY);
        ctx.strokeStyle = '#333b4d';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Draw Rod
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 6;
        ctx.stroke();

        // Draw Mass
        ctx.beginPath();
        ctx.arc(endX, endY, 18, 0, Math.PI * 2);
        ctx.fillStyle = '#00e5ff';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#00e5ff';
        ctx.fill();
        ctx.shadowBlur = 0; 

        eqAnimationId = requestAnimationFrame(draw);
    }
    draw();
}

function renderTransientViz(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
        <div style="width: 100%; height: 100%; display: flex; flex-direction: column; padding: 20px; box-sizing: border-box;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
                <h3 style="color: white; margin: 0; font-family: sans-serif;">Transient Response Simulation</h3>
                <div style="text-align: right; font-size: 13px; font-weight: bold;">
                    <div style="color: #00ff88; margin-bottom: 5px;">--- Small Disturbance (Damped)</div>
                    <div style="color: #ff3b3b;">— Large Disturbance (Severe)</div>
                </div>
            </div>
            <canvas id="transientCanvas" style="flex: 1; width: 100%; min-height: 0; display: block;"></canvas>
        </div>
    `;

    const canvas = document.getElementById('transientCanvas');
    const ctx = canvas.getContext('2d');
    let startTime = Date.now();

    function resize() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    function draw() {
        if (steps[currentStep].vizType !== "transient") {
            window.removeEventListener('resize', resize);
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const padX = 10;
        const padY = 20;
        const drawWidth = canvas.width - padX * 2;
        const drawHeight = canvas.height - padY * 2;
        const centerY = padY + (drawHeight / 2);
        
        // Strictly bounds the max wave height to the exact available container space
        const maxAmplitude = (drawHeight / 2) - 10; 
        
        // Draw Axes
        ctx.beginPath();
        ctx.moveTo(padX, padY);
        ctx.lineTo(padX, canvas.height - padY);
        ctx.lineTo(canvas.width - padX, canvas.height - padY);
        ctx.strokeStyle = '#4a5b75';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Oscilloscope Trace Sweep Logic
        const timeProgress = ((Date.now() - startTime) / 5000) % 1.5; 
        const currentDrawLimit = Math.min(drawWidth, drawWidth * (timeProgress / 1.0));

        function plotWave(isSevere, color, isDashed) {
            ctx.beginPath();
            if (isDashed) ctx.setLineDash([6, 6]);
            else ctx.setLineDash([]);
            
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;

            for (let x = 0; x < currentDrawLimit; x++) {
                let t = x / (drawWidth / 12); 
                let yOffset = 0;

                if (isSevere) {
                    yOffset = (maxAmplitude * 0.95) * Math.sin(t * 1.5) * Math.exp(-t * 0.25) + 
                              (maxAmplitude * 0.3) * Math.sin(t * 3.5) * Math.exp(-t * 0.5);
                } else {
                    yOffset = (maxAmplitude * 0.25) * Math.sin(t * 2) * Math.exp(-t * 0.4);
                }

                if (x === 0) ctx.moveTo(padX + x, centerY - yOffset);
                else ctx.lineTo(padX + x, centerY - yOffset);
            }
            ctx.stroke();
            ctx.setLineDash([]); 
        }

        plotWave(false, '#00ff88', true); 
        plotWave(true, '#ff3b3b', false); 

        // Oscilloscope leading dot
        if (currentDrawLimit > 0 && currentDrawLimit < drawWidth) {
            ctx.beginPath();
            ctx.arc(padX + currentDrawLimit, centerY, 3, 0, Math.PI*2);
            ctx.fillStyle = '#fff';
            ctx.fill();
        }

        transientAnimationId = requestAnimationFrame(draw);
    }
    draw();
}