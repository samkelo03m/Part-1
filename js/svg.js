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