let currentStep = 0;

window.addEventListener("DOMContentLoaded", () => {
    // 1. Core Component Inits
    buildDots();
    renderStep();
    initCharts();

    // 2. Continuous Station Clock Loop
    setInterval(() => {
        const now = new Date();
        const timeEl = document.getElementById("live-time");
        const dateEl = document.getElementById("live-date");
        
        if (timeEl) timeEl.textContent = now.toLocaleTimeString();
        if (dateEl) dateEl.textContent = now.toISOString().split('T')[0];
    }, 1000);

    // 3. User Controls Slider Feedback Links
    const loadSlider = document.getElementById("loadSlider");
    const pmSlider = document.getElementById("pmSlider");

    if (loadSlider) {
        loadSlider.addEventListener("input", (e) => {
            Pe = parseFloat(e.target.value);
            addEvent(`Operator dispatch adjusted system load demand setting to: ${Pe.toFixed(1)} pu`);
        });
    }

    if (pmSlider) {
        pmSlider.addEventListener("input", (e) => {
            Pm = parseFloat(e.target.value);
            addEvent(`Governor reference point shifted input power setting to: ${Pm.toFixed(1)} pu`);
        });
    }

    addEvent("SCADA Control Network online. Operator terminal initialization complete.");
});

function changeStep(direction) {
    currentStep += direction;
    if (currentStep < 0) currentStep = 0;
    if (currentStep >= steps.length) currentStep = steps.length - 1;
    renderStep();
}