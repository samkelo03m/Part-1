const SCADA = {
    state: {
        frequency: 50.0,
        voltage: 1.0,
        Pm: 1.0,
        Pe: 1.0,
        breakers: { line23: true },
        alarms: [],
        events: []
    },
    subscribers: [],
    subscribe(fn) {
        this.subscribers.push(fn);
    },
    publish() {
        this.subscribers.forEach(fn => fn(this.state));
    },
    logEvent(message) {
        const timestamp = new Date().toLocaleTimeString();
        this.state.events.push({ time: timestamp, message });
        if (this.state.events.length > 15) this.state.events.shift();
    },
    raiseAlarm(level, message) {
        const timestamp = new Date().toLocaleTimeString();
        this.state.alarms = [{ level, message, time: timestamp }];
    }
};