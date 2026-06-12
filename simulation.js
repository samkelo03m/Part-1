// js/simulation.js

let frequency = 50.0;
let voltage = 1.0;
let delta = 0.0;
let omega = 0.0;
let Pm = 1.0;
let Pe = 1.0;

const dt = 0.05;
const H = 5.0; 
let faultActive = false;
let breakerOpen = false;

let interactiveStage = 0; 

let freqChartInstance, voltChartInstance, rotorChartInstance;
let dataPointsCounter = 0;

function initCharts() {
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { display: false },
            y: { grid: { color: "#14304d" }, ticks: { color: "#7c96b2", font: { size: 9 } } }
        },
        plugins: { legend: { display: false } },
        elements: { line: { tension: 0.2, borderWidth: 2 }, point: { radius: 0 } }
    };

    freqChartInstance = new Chart(document.getElementById("freqChart").getContext("2d"), {
        type: 'line',
        data: { labels: [], datasets: [{ data: [], borderColor: '#00e5ff', fill: false }] },
        options: chartOptions
    });

    voltChartInstance = new Chart(document.getElementById("voltChart").getContext("2d"), {
        type: 'line',
        data: { labels: [], datasets: [{ data: [], borderColor: '#00ff88', fill: false }] },
        options: chartOptions
    });

    rotorChartInstance = new Chart(document.getElementById("rotorChart").getContext("2d"), {
        type: 'line',
        data: { labels: [], datasets: [{ data: [], borderColor: '#ffcc00', fill: false }] },
        options: chartOptions
    });
}

setInterval(() => {
    if (!freqChartInstance) return; 

    let acceleration = (Pm - Pe) / (2 * H);
    omega += acceleration * dt;
    omega *= 0.95; 
    delta += omega * dt;

    if (faultActive) {
        omega += 0.04 * (Math.random() - 0.5);
    }

    frequency += (Pm - Pe) * 0.03 + omega * 0.1;
    frequency += (50.0 - frequency) * 0.02; 
    frequency = Math.max(46.5, Math.min(53.5, frequency));

    let loadEffect = (Pe - 1.0) * 0.05;
    voltage -= loadEffect;
    voltage += (1.0 - voltage) * 0.04; 
    if (faultActive) voltage -= 0.03;
    voltage = Math.max(0.5, Math.min(1.2, voltage));

    updateSCADADisplays();
}, 100);

function updateSCADADisplays() {
    document.getElementById("m-freq").textContent = frequency.toFixed(2) + " Hz";
    document.getElementById("m-volt").textContent = voltage.toFixed(2) + " pu";

    const stateEl = document.getElementById("m-state");
    let systemState = "Stable";

    if (frequency < 49.0 || voltage < 0.85) {
        systemState = "Critical";
        stateEl.textContent = "Critical";
        stateEl.style.color = "#ff3b3b";
        addAlarm("CRITICAL", "Grid voltage breakdown/underfrequency event!");
    } else if (frequency < 49.5 || voltage < 0.93) {
        systemState = "Warning";
        stateEl.textContent = "Warning";
        stateEl.style.color = "#ffcc00";
        addAlarm("WARNING", "Grid boundary variance detected.");
    } else {
        stateEl.textContent = "Stable";
        stateEl.style.color = "#00ff88";
    }

    updateAnalysisContent(systemState);
    pushChartTelemetry();
}

function pushChartTelemetry() {
    dataPointsCounter++;
    const label = dataPointsCounter.toString();

    [freqChartInstance, voltChartInstance, rotorChartInstance].forEach((chart, index) => {
        let val = index === 0 ? frequency : (index === 1 ? voltage : delta * 50);
        chart.data.labels.push(label);
        chart.data.datasets[0].data.push(val);

        if (chart.data.labels.length > 25) {
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
        }
        chart.update('none'); 
    });
}

function addAlarm(type, msg) {
    const box = document.getElementById("alarm-box");
    if (!box) return;
    box.innerHTML = `
        <div class="alarm ${type}">
            <strong>[${type}]</strong> <small>${new Date().toLocaleTimeString()}</small>
            <p>${msg}</p>
        </div>
    ` + box.innerHTML;
}

function addEvent(msg) {
    const log = document.getElementById("event-log");
    if (!log) return;
    const item = document.createElement("div");
    item.className = "event";
    item.innerHTML = `<strong>${new Date().toLocaleTimeString()}</strong> - ${msg}`;
    log.prepend(item);
    while (log.children.length > 6) log.removeChild(log.lastChild);
}

function injectFault(type) {
    const isInteractivePhase = typeof currentStep !== 'undefined' && steps[currentStep] && steps[currentStep].interactiveNarrations;

    if (isInteractivePhase) {
        if (type === 'line' && interactiveStage === 0) {
            faultActive = true;
            addEvent(`Fault injected: ${type.toUpperCase()} failure mode.`);
            Pe += 0.4;
            document.getElementById("line-2-3").style.stroke = "var(--red)";
            
            if (typeof runInteractiveVoice === "function") runInteractiveVoice("lineFaultInjected");
            interactiveStage = 1; 
        } 
        else if (type === 'generator' && interactiveStage === 2) {
            faultActive = true;
            addEvent(`Fault injected: ${type.toUpperCase()} failure mode.`);
            Pm -= 0.5;
            document.getElementById("gen3").style.stroke = "var(--red)"; 
            
            if (typeof runInteractiveVoice === "function") runInteractiveVoice("generatorTripped");
            interactiveStage = 3; 
        } 
        else {
            addEvent("SCADA Blocked: Follow the audio instructions sequence.");
        }
    } 
    else {
        faultActive = true;
        addEvent(`Fault injected: ${type.toUpperCase()} failure mode.`);
        
        if (type === 'line') { Pe += 0.4; document.getElementById("line-2-3").style.stroke = "var(--red)"; }
        if (type === 'generator') { Pm -= 0.5; document.getElementById("gen1").style.stroke = "var(--red)"; }

        setTimeout(() => {
            faultActive = false;
            let pmSlider = document.getElementById("pmSlider");
            let loadSlider = document.getElementById("loadSlider");
            if (pmSlider) Pm = parseFloat(pmSlider.value);
            if (loadSlider) Pe = parseFloat(loadSlider.value);
            
            addEvent("Fault isolated. Line protection cleared standard zones.");
            if (typeof clearVoiceHighlights === "function") {
                clearVoiceHighlights();
            }
        }, 4000);
    }
}

function toggleBreaker() {
    const isInteractivePhase = typeof currentStep !== 'undefined' && steps[currentStep] && steps[currentStep].interactiveNarrations;

    if (isInteractivePhase && interactiveStage !== 1) {
        addEvent("SCADA Blocked: Breaker sequence lock active.");
        return; 
    }

    breakerOpen = !breakerOpen;
    addEvent(`Breaker tracking: Line 2-3 opened = ${breakerOpen}`);
    document.getElementById("line-2-3").style.stroke = breakerOpen ? "#10243d" : "var(--red)";
    Pe = breakerOpen ? Pe + 0.3 : Pe - 0.3;

    if (isInteractivePhase && interactiveStage === 1 && breakerOpen) {
        faultActive = false; 
        if (typeof runInteractiveVoice === "function") runInteractiveVoice("lineFaultCleared");
        interactiveStage = 2; 
    }
}

function updateAnalysisContent(state) {
    const analysisEl = document.getElementById("analysis-content");
    if (!analysisEl) return;

    if (state === "Stable") {
        analysisEl.innerHTML = `
            <h2>Steady-State Safe Conditions</h2>
            <p>Active mechanical generation energy balances electrical loads plus distribution line losses perfectly.</p>
            <div class="equation-box">P_m = P_e</div>
        `;
    } else if (state === "Warning") {
        analysisEl.innerHTML = `
            <h2>Transient Rotor Acceleration Warning</h2>
            <p>Electrical line loading variations have broken generator balances, sparking transient phase drift angles.</p>
            <div class="equation-box">M(d²δ/dt²) = P_m - P_e</div>
        `;
    } else {
        analysisEl.innerHTML = `
            <h2>Critical Voltage Grid Collapse Imminent</h2>
            <p>System reactive loading profiles transcend current corridor transport boundaries, depressing tracking indicators.</p>
            <div class="equation-box">Q_demand > Q_supply</div>
        `;
    }
}