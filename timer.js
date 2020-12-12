class TimerWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: null,
            timer: null,
            selectedTime: null
        };
        this.startTimer = this.startTimer.bind(this);
        this.pause = this.pause.bind(this);
        this.resume = this.resume.bind(this);
        this.cancel = this.cancel.bind(this);
        this.reset = this.reset.bind(this);
    }
    startTimer(timeLeft, originalTime) {

        document.getElementById('end-of-time').load();
        clearInterval(this.state.timer);
        let timer = setInterval(() => {

            let timeLeft = this.state.timeLeft - 1;
            if (timeLeft == 0) {
                clearInterval(timer);
            }

            this.setState({ timeLeft: timeLeft });
        }, 1000);
        let selectedTime = originalTime ? originalTime : this.state.selectedTime;
        return this.setState({ timeLeft: timeLeft, timer: timer, selectedTime: selectedTime });
    }
    pause() {
        clearInterval(this.state.timer);
        this.setState({
            timer: null
        });
    }
    resume() {
        if (this.state.timeLeft > 0) {
            this.startTimer(this.state.timeLeft);
        }
    }
    cancel() {
        clearInterval(this.state.timer);
        this.setState({
            timer: null,
            timeLeft: null
        });
    }
    reset() {
        this.startTimer(this.state.selectedTime);
    }

    render() {
        return React.createElement(
            "div",
            { className: "row-fluid" },
            React.createElement(
                "h2",
                null,
                "Timer"
            ),
            React.createElement(
                "div",
                { className: "btn-group", role: "group" },
                React.createElement(Button, { time: "300", startTimer: this.startTimer }),
                React.createElement(Button, { time: "600", startTimer: this.startTimer }),
                React.createElement(Button, { time: "900", startTimer: this.startTimer })
            ),
            React.createElement(Timer, { timeLeft: this.state.timeLeft }),
            this.state.timeLeft > 0 && React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "btn-group", role: "group" },
                    this.state.timer === null ? React.createElement(
                        "button",
                        { className: "btn-success btn", onClick: this.resume },
                        "Resume"
                    ) : React.createElement(
                        "button",
                        { className: "btn-warning btn", onClick: this.pause },
                        "Pause"
                    ),
                    React.createElement(
                        "button",
                        { className: "btn-danger btn", onClick: this.cancel },
                        "Cancel"
                    ),
                    React.createElement(
                        "button",
                        { className: "btn-primary btn", onClick: this.reset },
                        "Reset"
                    )
                )
            ),
            React.createElement(TimerSound, null)
        );
    }
}

ReactDOM.render(React.createElement(
    "div",
    null,
    React.createElement(TimerWrapper, null)
), document.getElementById('timer-app'));
