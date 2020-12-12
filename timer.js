class Timer extends React.Component {
    render() {
        if (this.props.timeLeft == 0) {
            document.getElementById('end-of-time').play();
        }
        if (this.props.timeLeft == null || this.props.timeLeft == 0) return React.createElement(
            "div",
            null,
            " "
        );
        return React.createElement(
            "h1",
            null,
            "Time left: ",
            this.props.timeLeft,
            " ",
            React.createElement("br", null),
            this.props.children
        );
    }

}

class Button extends React.Component {
    startTimer(event) {
        return this.props.startTimer(this.props.time);
    }
    render() {
        return React.createElement(
            "button",
            { type: "button", className: "btn-default btn",
                onClick: () => {
                    this.props.startTimer(this.props.time);
                } },
            this.props.time,
            " seconds"
        );
    }
}

class TimerWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeLeft: null,
            timer: null
        };
        this.startTimer = this.startTimer.bind(this);
        this.pause = this.pause.bind(this);
        this.resume = this.resume.bind(this);
    }
    startTimer(timeLeft) {

        document.getElementById('end-of-time').load();
        clearInterval(this.state.timer);
        let timer = setInterval(() => {

            let timeLeft = this.state.timeLeft - 1;
            if (timeLeft == 0) clearInterval(timer);

            this.setState({ timeLeft: timeLeft });
        }, 1000);
        return this.setState({ timeLeft: timeLeft, timer: timer });
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
                React.createElement(Button, { time: "5", startTimer: this.startTimer }),
                React.createElement(Button, { time: "10", startTimer: this.startTimer }),
                React.createElement(Button, { time: "15", startTimer: this.startTimer })
            ),
            React.createElement(
                Timer,
                { timeLeft: this.state.timeLeft },
                this.state.timeLeft > 0 && React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        { className: "btn-group", role: "group" },
                        this.state.timer === null ? React.createElement(
                            "button",
                            { type: "button", className: "btn-default btn", onClick: this.resume },
                            "Resume"
                        ) : React.createElement(
                            "button",
                            { type: "button", className: "btn-default btn", onClick: this.pause },
                            "Pause"
                        ),
                        React.createElement(
                            "button",
                            { className: "btn-danger btn", onClick: this.cancelTimer },
                            "Cancel"
                        ),
                        React.createElement(
                            "button",
                            { className: "btn-primary btn", onClick: this.resetTimer },
                            "Reset"
                        )
                    )
                )
            ),
            React.createElement("audio", { id: "end-of-time", src: "01_syberian_beast_meets_mr_moore_wien_original_mix_myzuka.org.mp3", preload: "auto" })
        );
    }
}

ReactDOM.render(React.createElement(
    "div",
    null,
    React.createElement(TimerWrapper, null)
), document.getElementById('timer-app'));
