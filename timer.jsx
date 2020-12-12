class TimerWrapper extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            timeLeft : null,
            timer : null,
            selectedTime: null
        }
        this.startTimer = this.startTimer.bind(this)
        this.pause = this.pause.bind(this)
        this.resume = this.resume.bind(this)
        this.cancel = this.cancel.bind(this)
        this.reset = this.reset.bind(this)
    }
    startTimer(timeLeft, originalTime) {
        
        document.getElementById('end-of-time').load()
        clearInterval(this.state.timer)
        let timer = setInterval(() => {
            
            let timeLeft = this.state.timeLeft - 1
            if (timeLeft == 0) {
            clearInterval(timer) }
            
            this.setState({timeLeft:timeLeft})
            
        }, 1000)
        let selectedTime = originalTime ? originalTime : this.state.selectedTime
        return this.setState({timeLeft: timeLeft, timer: timer, selectedTime: selectedTime})
    }
    pause() {
        clearInterval(this.state.timer)
        this.setState({
        timer: null,
    })}
    resume() {
        if(this.state.timeLeft > 0){
        this.startTimer(this.state.timeLeft)
    }
    }
    cancel() {
        clearInterval(this.state.timer)
        this.setState({
        timer: null,
        timeLeft: null
    })
    
    }
    reset() {
        this.startTimer(this.state.selectedTime)
    }
    
    render() {
        return (
            <div className="row-fluid">
                <h2>Timer</h2>
                <div className="btn-group" role="group">
                    <Button time="300" startTimer={this.startTimer}></Button>
                    <Button time="600" startTimer={this.startTimer}></Button>
                    <Button time="900" startTimer={this.startTimer}></Button>
                </div>
                <Timer timeLeft={this.state.timeLeft}/>
                    {this.state.timeLeft > 0 && <div>
                    <div className="btn-group" role="group">
                        {this.state.timer === null
                            ?
                        <button  className="btn-success btn" onClick={this.resume}>Resume</button>
                            :
              
                        <button   className="btn-warning btn" onClick={this.pause}>Pause</button>
                        }
                        <button className="btn-danger btn" onClick={this.cancel}>Cancel</button>
                        <button className="btn-primary btn" onClick={this.reset}>Reset</button>
                    </div>
                </div>
        }
                <TimerSound></TimerSound>
            </div>
        )

    }
}

ReactDOM.render(<div>
    <TimerWrapper></TimerWrapper>
    </div>,
document.getElementById('timer-app'))