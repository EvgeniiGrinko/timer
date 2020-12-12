class TimerSound extends React.Component {
    constructor (props) {
        super(props)
        this.handleTimerEnded = this.handleTimerEnded.bind(this)
    }
    componentDidMount(){
        window.addEventListener('TimerEnded', this.handleTimerEnded)
    }
    handleTimerEnded() {
        this.refs.endOfTime.play()
    }
    render() {
        return <audio ref='endOfTime'  id="end-of-time" src="01_syberian_beast_meets_mr_moore_wien_original_mix_myzuka.org.mp3" preload="auto"></audio>
    }
}