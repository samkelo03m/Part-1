function updateTelemetry(step) {
    const stateEl = document.getElementById("m-state");
    const freqEl = document.getElementById("m-freq");
    const voltEl = document.getElementById("m-volt");

    if (stateEl) {
        stateEl.textContent = step.telemetry.state;
        stateEl.style.color = step.telemetry.color;
    }
    // Set static target conditions from course guide when clicking step files
    if (freqEl) freqEl.textContent = step.telemetry.freq;
    if (voltEl) voltEl.textContent = step.telemetry.volt;
}