class Timer extends React.Component {
    render() {
        if (this.props.timeLeft == 0) {
            document.getElementById('end-of-time').play()
        }
        if (this.props.timeLeft == null || this.props.timeLeft == 0)  return <div> </div>
        return <h1>Time left: {this.props.timeLeft} <br></br>
        {this.props.children}</h1>
    }
       
}

class Button extends React.Component {
    startTimer(event) {
        return this.props.startTimer(this.props.time)
    }
    render() {
        return (
            <button type="button" className="btn-default btn"
            onClick={()=>{this.props.startTimer(this.props.time)}}>
                {this.props.time} seconds
                </button>
        )
    }
}

class TimerWrapper extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            timeLeft : null,
            timer : null
        }
        this.startTimer = this.startTimer.bind(this)
        this.pause = this.pause.bind(this)
        this.resume = this.resume.bind(this)
    }
    startTimer(timeLeft) {
        
        document.getElementById('end-of-time').load()
        clearInterval(this.state.timer)
        let timer = setInterval(() => {
            
            let timeLeft = this.state.timeLeft - 1
            if (timeLeft == 0) clearInterval(timer)
            
            this.setState({timeLeft:timeLeft})
            
        }, 1000)
        return this.setState({timeLeft: timeLeft, timer: timer})
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
    
    render() {
        return (
            <div className="row-fluid">
                <h2>Timer</h2>
                <div className="btn-group" role="group">
                    <Button time="5" startTimer={this.startTimer}></Button>
                    <Button time="10" startTimer={this.startTimer}></Button>
                    <Button time="15" startTimer={this.startTimer}></Button>
                </div>
                <Timer timeLeft={this.state.timeLeft}>{this.state.timeLeft > 0 &&
        <div>
          <div className="btn-group" role="group">
            {this.state.timer === null
              ?
              <button type="button" className="btn-default btn" onClick={this.resume}>Resume</button>
                
              :
              
                <button  type="button" className="btn-default btn" onClick={this.pause}>Pause</button>
            }
            <button className="btn-danger btn" onClick={this.cancelTimer}>Cancel</button>
            <button className="btn-primary btn" onClick={this.resetTimer}>Reset</button>
          </div>
        </div>
        }</Timer>
                
                <audio id="end-of-time" src="01_syberian_beast_meets_mr_moore_wien_original_mix_myzuka.org.mp3" preload="auto"></audio>
            </div>
        )

    }
}

ReactDOM.render(<div>
    <TimerWrapper></TimerWrapper>
    </div>,
document.getElementById('timer-app'))