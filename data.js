// js/data.js

const steps = [
    {
        title: "1. Fundamentals of Power System Stability",
        viewState: "SCADA",
        telemetry: { state: "Stable Operations", color: "#00ff88", freq: "50.00 Hz", volt: "1.00 pu" },
        highlights: { buses: [], gens: [], lines: [] },
        fault: false,
        narration: [
            {
                text: "Welcome to Part 1 of Module 1 of the Transient Stability Master Series. This master series on transient stability has been prepared as a blend of theory and practical exercises. It’s targeted at engineering students and practising engineers. Rather than using presentation slides with narration, let’s learn about this subject visually, with captivating images and simplified explanations. We will start by laying the Definition of power system stability and its types, before we delve into transient stability.",
                textId: null 
            },
            {
                text: "Please click Next to continue to the next module.",
                textId: null 
            }
        ],
        content: `
            <div style="text-align: center; margin-top: 40px;">
                <h2>Transient Stability Master Series</h2>
                <p style="color: #7c96b2;">Module 1, Part 1</p>
            </div>
        `
    },
    {
        title: "2. Definition of Power System Stability",
        viewState: "VIZ",
        vizType: "equilibrium",
        telemetry: { state: "Stable Operations", color: "#00ff88", freq: "50.00 Hz", volt: "1.00 pu" },
        highlights: { buses: [], gens: [], lines: [] },
        fault: false,
        narration: [
            {
                text: "Many major blackouts have been caused by system instability, underscoring the importance of understanding this subject. Traditionally, rotor angle instability (loss of synchronism after a large disturbance) was the dominant concern, but other forms of instability, such as voltage and frequency instability, have also come to the fore.",
                textId: null
            },
            {
                text: "Power system stability is the ability of an electric power system to remain in a state of equilibrium under normal conditions and to regain a state of equilibrium after being subjected to a physical disturbance.",
                textId: "s2-p1" 
            },
            {
                text: "This implies that for all forms of stability, following a disturbance, system variables (such as generator angles, bus voltages, frequency, etc.) should remain within acceptable limits so that generators and loads stay connected in one coherent system.",
                textId: "s2-p2"
            },
            {
                text: "Power system stability should be understood as a condition or state of equilibrium between opposing forces. Disturbances upset this equilibrium, and stability is essentially about whether the inherent restorative mechanisms are sufficient to restore balance.",
                textId: "s2-p3"
            },
            {
                text: "Please click Next to continue to the next module.",
                textId: null 
            }
        ],
        content: `
            <div class="technical-note">
                <p id="s2-p1" style="margin-bottom: 12px;"><strong>Power system stability</strong> is the ability of an electric power system to remain in a state of equilibrium under normal conditions and to regain a state of equilibrium after being subjected to a physical disturbance.</p>
                <p id="s2-p2" style="margin-bottom: 12px;">This implies that for all forms of stability, following a disturbance, system variables (such as generator angles, bus voltages, frequency, etc.) should remain within acceptable limits so that generators and loads stay connected in one coherent system.</p>
                <p id="s2-p3">Power system stability should be understood as a condition or state of equilibrium between opposing forces. Disturbances upset this equilibrium, and stability is essentially about whether the inherent restorative mechanisms are sufficient to restore balance.</p>
            </div>
        `
    },
    {
        title: "3. Classification of Power System Stability",
        viewState: "VIZ",
        vizType: "static",
        vizHtml: `
            <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
                <div style="background: rgba(0, 229, 255, 0.1); border: 1px solid #00e5ff; padding: 15px 30px; border-radius: 8px; margin-bottom: 20px; font-weight: bold; color: #fff;">Power System Stability</div>
                <div style="display: flex; gap: 20px; width: 100%; justify-content: center; position: relative;">
                    <div style="width: 30%; background: #1a2634; padding: 15px; text-align: center; border-top: 3px solid #00ff88; border-radius: 4px;">1. Nature<br><span style="font-size: 0.8em; color: #7c96b2;">Physical Variable</span></div>
                    <div style="width: 30%; background: #1a2634; padding: 15px; text-align: center; border-top: 3px solid #ffcc00; border-radius: 4px;">2. Size<br><span style="font-size: 0.8em; color: #7c96b2;">Disturbance Magnitude</span></div>
                    <div style="width: 30%; background: #1a2634; padding: 15px; text-align: center; border-top: 3px solid #ff3b3b; border-radius: 4px;">3. Timespan<br><span style="font-size: 0.8em; color: #7c96b2;">Device Dynamics</span></div>
                </div>
            </div>
        `,
        telemetry: { state: "Stable Operations", color: "#00ff88", freq: "50.00 Hz", volt: "1.00 pu" },
        highlights: { buses: [], gens: [], lines: [] },
        fault: false,
        narration: [
            {
                text: "Stability is classified based on three categories.",
                textId: "s3-title"
            },
            {
                text: "First, the physical nature of the instability, which variable or phenomenon is mainly affected.",
                textId: "s3-c1"
            },
            {
                text: "Second, the size of disturbance, small perturbations versus large events.",
                textId: "s3-c2"
            },
            {
                text: "And third, the devices, processes, and time span that characterise the ensuing dynamics.",
                textId: "s3-c3"
            },
            {
                text: "Please click Next to continue to the next module.",
                textId: null 
            }
        ],
        content: `
            <p id="s3-title" style="font-size: 1.1em; color: #fff;">Stability is classified based on three categories:</p>
            <div class="technical-note">
                <ul>
                    <li id="s3-c1" style="margin-bottom: 10px;">The physical nature of the instability (which variable or phenomenon is mainly affected).</li>
                    <li id="s3-c2" style="margin-bottom: 10px;">The size of disturbance (small perturbations vs. large events).</li>
                    <li id="s3-c3">The devices, processes, and time span that characterise the ensuing dynamics.</li>
                </ul>
            </div>
        `
    },
    {
        title: "4. Physical Nature of Disturbance",
        viewState: "VIZ",
        vizType: "static",
        vizHtml: `
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; width: 100%;">
                <div style="background: #111a22; border: 1px solid #334; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 25px 15px;">
                    <div style="width: 60px; height: 60px; border: 4px dashed #00e5ff; border-radius: 50%; animation: spin 4s linear infinite;"></div>
                    <h4 style="color: #fff; margin-top: 15px;">Rotor Angle</h4>
                    <span style="color: #7c96b2; font-size: 0.8em; text-align: center;">Sync Torque</span>
                </div>
                <div style="background: #111a22; border: 1px solid #334; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 25px 15px;">
                    <div style="font-size: 2em; font-weight: bold; color: #00ff88;">50.0Hz</div>
                    <h4 style="color: #fff; margin-top: 15px;">Frequency</h4>
                    <span style="color: #7c96b2; font-size: 0.8em; text-align: center;">Active Power Balance</span>
                </div>
                <div style="background: #111a22; border: 1px solid #334; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 25px 15px;">
                    <div style="width: 100%; height: 60px; border-bottom: 2px solid #7c96b2; position: relative;">
                         <svg width="100%" height="100%" viewBox="0 0 100 60" preserveAspectRatio="none">
                            <path d="M0,10 Q50,10 90,50" fill="none" stroke="#ffcc00" stroke-width="3" />
                         </svg>
                    </div>
                    <h4 style="color: #fff; margin-top: 15px;">Voltage</h4>
                    <span style="color: #7c96b2; font-size: 0.8em; text-align: center;">Reactive Power Balance</span>
                </div>
            </div>
            <style>@keyframes spin { 100% { transform: rotate(360deg); } }</style>
        `,
        telemetry: { state: "Rotor Oscillation Alert", color: "#ffcc00", freq: "50.12 Hz", volt: "0.96 pu" },
        highlights: { buses: [], gens: [], lines: [] },
        fault: false,
        narration: [
            {
                text: "Rotor angle stability depends on sufficient synchronising torque (restoring force proportional to angle deviation) and damping torque (proportional to speed deviation) to bring the machines to equilibrium. Instability in rotor angle manifests as growing angular swings of generators – in extreme cases, one or more generators pull out of step (lose synchronism) with the rest of the system. Loss of synchronism can occur between a single generator and the system, or between entire groups of machines. The result is often severe power oscillations and the tripping of generators or lines by protective relays to prevent equipment damage.",
                textId: null
            },
            {
                text: "As detailed on screen, Rotor angle stability is the ability of synchronous generators to remain in synchronism after a disturbance, focusing on the balance between the opposing mechanical and electrical torque.",
                textId: "s4-c1" 
            },
            {
                text: "Frequency instability is typically triggered by the loss of large generation or system islanding. Instability leads to sustained frequency deviations and activation of under- or over-frequency protection, possibly causing widespread outages.",
                textId: null
            },
            {
                text: "Frequency stability is the ability to maintain steady frequency after a disturbance, relying on the balance between active power supply and demand.",
                textId: "s4-c2"
            },
            {
                text: "Voltage instability appears as a progressive drop (or rise) in voltage and may lead to voltage collapse, often occurring under heavy loading or following line/generator outages.",
                textId: null
            },
            {
                text: "Voltage stability is the ability of a power system to maintain steady, acceptable voltages at all buses following a disturbance, relying on the balance between reactive power supply and demand.",
                textId: "s4-c3"
            },
            {
                text: "Please click Next to continue to the next module.",
                textId: null 
            }
        ],
        content: `
            <div class="technical-note">
                <ul>
                    <li id="s4-c1" style="margin-bottom: 12px;"><strong>Rotor angle stability</strong> - ability of synchronous generators to remain in synchronism after a disturbance (it's about the balance between the opposing mechanical and electrical torque).
                        <div class="equation-box" style="margin-top: 8px;">$$M\\frac{d^2\\delta}{dt^2} = P_m - P_e$$</div>
                    </li>
                    <li id="s4-c2" style="margin-bottom: 12px;"><strong>Frequency stability</strong> - ability to maintain steady frequency after a disturbance (It's about the balance between active power [MW] supply and demand).</li>
                    <li id="s4-c3"><strong>Voltage stability</strong> - ability of a power system to maintain steady, acceptable voltages at all buses following a disturbance – (It’s about the balance between reactive power [MVAr] supply and demand).</li>
                </ul>
            </div>
        `
    },
    {
        title: "5. Size of Disturbance",
        viewState: "VIZ",
        vizType: "transient",
        telemetry: { state: "Voltage Degradation", color: "#ff3b3b", freq: "49.94 Hz", volt: "0.82 pu" },
        highlights: { buses: [], gens: [], lines: [] },
        fault: false,
        narration: [
            {
                text: "Rotor angle stability is divided into small-disturbance (small-signal) stability and large-disturbance (transient) stability. Small-signal stability analyse minor disturbances, such as small load changes, which can be characterised by poorly damped local or inter-area power oscillations, which can often be mitigated using power system stabilisers. Transient stability deals with severe disturbances like faults or major generator outages and focuses on whether generators remain in synchronism during the first few seconds after the disturbance.",
                textId: null
            },
            {
                text: "This aligns with small deviations from the equilibrium operating point caused by small disturbances, such as small load and generation changes.",
                textId: "s5-c1"
            },
            {
                text: "Voltage stability is divided into large-disturbance stability and small-disturbance stability. Large-disturbance voltage stability is the ability of a power system to maintain acceptable voltages after severe events such as faults, generator trips, or large load changes. Such disturbances can cause rapid voltage drops, and if post-fault reactive power demand exceeds supply, voltage collapse may occur within seconds. Small-disturbance voltage stability concerns the system’s ability to maintain steady voltages under minor variations in load or reactive power. It is typically assessed using steady-state methods such as P–V curves, which identify how close the system is to its voltage stability limit. Frequency stability problems are typically associated with large disturbances (like the sudden loss of a major generation plant or the splitting of a system into islands) rather than small perturbations or disturbances.",
                textId: null
            },
            {
                text: "This contrasts with large deviations from the equilibrium operating point due to large disturbances, such as short circuits, or the loss of a large load or generator.",
                textId: "s5-c2"
            },
            {
                text: "Please click Next to continue to the next module.",
                textId: null 
            }
        ],
        content: `
            <div class="technical-note">
                <ul>
                    <li id="s5-c1" style="margin-bottom: 12px;">Small deviations from the equilibrium operating point caused by small disturbances (e.g., small load and generation changes).</li>
                    <li id="s5-c2">Large deviations from the equilibrium operating point due to large disturbances (e.g., short circuits, loss of a large load or generator).</li>
                </ul>
            </div>
        `
    },
    {
        title: "6. Timespan, Devices and Process",
        viewState: "VIZ",
        vizType: "static",
        vizHtml: `
            <div style="width: 100%; height: 200px; display: flex; flex-direction: column; justify-content: center; position: relative;">
                <div style="width: 100%; height: 4px; background: linear-gradient(to right, #00e5ff, #ffcc00, #ff3b3b); border-radius: 2px;"></div>
                
                <div style="position: absolute; top: 50%; left: 10%; transform: translateY(-50%); background: #111a22; border: 2px solid #00e5ff; padding: 10px; border-radius: 8px; text-align: center;">
                    <div style="color: #fff; font-weight: bold;">Milliseconds</div>
                    <div style="color: #7c96b2; font-size: 0.8em;">Power Electronics</div>
                </div>

                <div style="position: absolute; top: 50%; left: 45%; transform: translateY(-50%); background: #111a22; border: 2px solid #ffcc00; padding: 10px; border-radius: 8px; text-align: center;">
                    <div style="color: #fff; font-weight: bold;">Seconds</div>
                    <div style="color: #7c96b2; font-size: 0.8em;">Governors / Inertia</div>
                </div>

                <div style="position: absolute; top: 50%; left: 80%; transform: translateY(-50%); background: #111a22; border: 2px solid #ff3b3b; padding: 10px; border-radius: 8px; text-align: center;">
                    <div style="color: #fff; font-weight: bold;">Minutes</div>
                    <div style="color: #7c96b2; font-size: 0.8em;">Thermal Boilers</div>
                </div>
            </div>
        `,
        telemetry: { state: "Stable Operations", color: "#00ff88", freq: "50.00 Hz", volt: "1.00 pu" },
        highlights: { buses: [], gens: [], lines: [] },
        fault: false,
        narration: [
            {
                text: "Transient stability is usually evaluated in the first few seconds following a disturbance (typically 0–5 seconds for the first swing of a generator angle), while small signal stability is evaluated up to several seconds. Both transient and small-signal stability are studied over a short-term period of tens of seconds. Short-term voltage stability involves fast-acting devices and loads, such as induction motors, power electronic converters (HVDC links), and instantaneous load-voltage dynamics. For example, an event that causes the system to draw excessive current – if the transmission system is weak, this can lead to a rapid collapse within seconds, as voltages cannot recover. Short-term frequency stability refers to the system’s initial response in the seconds following a large disturbance, and the key elements are the inertia of the system, the primary frequency control (governors on generators), and fast automatic load-shedding or generator tripping schemes.",
                textId: null
            },
            {
                text: "Based on the timespan, the devices and processes involved can be categorised into the short term, which is a short period of study from milliseconds to several seconds.",
                textId: "s6-c1"
            },
            {
                text: "In contrast, long-term voltage stability involves slower mechanisms such as tap-changing transformer actions, activation of generator excitation limiters, and thermostatic load recovery, which unfold over minutes. Long-term frequency stability refers to slower-acting responses and mechanisms that kick in over tens of seconds to minutes after an imbalance. These include boiler dynamics in thermal plants, the response of turbine governors as they hit limits, secondary control actions, and possibly load recovery dynamics.",
                textId: null
            },
            {
                text: "This differs from the long term, which spans a few minutes to tens of minutes.",
                textId: "s6-c2"
            },
            {
                text: "Please click Next to continue to the next module.",
                textId: null 
            }
        ],
        content: `
            <p style="font-size: 1.1em; color: #fff;">Based on the timespan, the devices and processes involved:</p>
            <div class="technical-note">
                <ul>
                    <li id="s6-c1" style="margin-bottom: 12px;"><strong>Short term</strong> – short period of study from ms to several secs.</li>
                    <li id="s6-c2"><strong>Long term</strong> – a few minutes to tens of minutes.</li>
                </ul>
            </div>
        `
    },
    {
        title: "7. Power System Stability - Summary",
        viewState: "SCADA",
        telemetry: { state: "Critical Contingency Event", color: "#ff3b3b", freq: "48.71 Hz", volt: "0.95 pu" },
        highlights: { buses: [], gens: [], lines: [] },
        fault: true,
        narration: [
            {
                text: "This series will focus on transient stability, which is the ability of the power system to remain in synchronism when subjected to a severe or large disturbance.",
                textId: null 
            },
            {
                text: "This summarises the types of system stability and their classification based on the nature, size and timespan of the disturbance as described in previous slides.",
                textId: "s7-c1"
            },
            {
                text: "To begin the interactive live testing sequence and see how these dynamics play out in real time, look at the Control Actions panel on your right and click the button labeled Inject Line Fault.",
                textId: "s7-action"
            }
        ],
        interactiveNarrations: {
            lineFaultInjected: [
                {
                    text: "Watch the critical line between Bus 2 and Bus 3 flash red, and notice the Rotor Angle trend graph below the map oscillating violently. Now, click the Toggle Breaker button to clear the fault and restore angular equilibrium.",
                    textId: "s7-action"
                }
            ],
            lineFaultCleared: [
                {
                    text: "Next, let us test voltage stability. Go to your controls and drag the Load Demand slider all the way up to its maximum limit of two point zero. Monitor the Voltage Trend graph and the Bus 3 metric—see how it plummets into a critical degradation zone due to reactive power starvation. Drag the slider back down to one point zero to recover the system. Finally, let us witness a major frequency event. Click the Generator Trip button.",
                    textId: "s7-action"
                }
            ],
            generatorTripped: [
                {
                    text: "Generator 3 instantly drops offline, and your live Frequency Trend plunges sharply downward. This real-time response shows you exactly how rotor alignment, voltage regulation, and frequency response interact to keep the national infrastructure alive. This concludes your interactive training course.",
                    textId: "s7-action"
                }
            ]
        },
        content: `
            <div class="technical-note">
                <p id="s7-c1">Classification framework tracking based on:</p>
                <ul>
                    <li><strong>Nature</strong></li>
                    <li><strong>Size</strong></li>
                    <li><strong>Timespan</strong></li>
                </ul>
            </div>
            <div id="s7-action" class="interactive-prompt-box" style="margin-top: 20px;">
                <strong>🕹️ LIVE SCADA SIMULATION ACTIVE</strong>
                <p>Follow the audio commands to manipulate the controls on the right.</p>
            </div>
        `
    }
];

const componentDetails = {
    gen1: "<strong>Generator 1 Status:</strong> Baseload unit running at 22kV. Essential framework anchor for tracking base grid inertia constants.",
    gen2: "<strong>Generator 2 Status:</strong> Thermal generating assembly operating under active speed governor tracking control loops.",
    gen3: "<strong>Generator 3 Status:</strong> Hydroelectric peaking generator capable of high-speed active power response windows.",
    bus1: "<strong>Bus Bar 1:</strong> Slack node setting voltage references and tracking source phase baselines.",
    bus2: "<strong>Bus Bar 2:</strong> Main transmission tie terminal routing key bulk distribution streams.",
    bus3: "<strong>Bus Bar 3:</strong> Substation transformer distribution junction feeding industrial inductive load centers."
};