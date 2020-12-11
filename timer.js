class Tooltip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: false,
            toolTipClasses: 'tooltip ' + this.props.positionWhereShowText
        };
        this.toggle = this.toggle.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        if (!this.props.allowOnClick) {
            return false;
        }
        this.toggle();
    }
    onMouseOut() {
        if (!this.props.allowOnMouseOver) {
            return false;
        }
        this.toggle();
    }
    onMouseEnter() {
        if (!this.props.allowOnMouseOver) {
            return false;
        }
        this.toggle();
    }
    toggle() {
        const { offsetTop: top, offsetLeft: left } = ReactDOM.findDOMNode(this);
        this.setState({
            opacity: !this.state.opacity,
            top,
            left
        });
    }

    render() {
        const top = this.state.top || 0;
        const style = {
            zIndex: this.state.opacity ? 1000 : -1000,
            opacity: +this.state.opacity,
            top: top + (this.props.positionWhereShowText === "top" ? -30 : +20),
            left: (this.state.left || 0) - 40

        };

        return React.createElement(
            "div",
            { style: { display: "inline" } },
            React.createElement(
                "span",
                { style: { color: 'blue' },
                    onClick: this.onClick,
                    onMouseEnter: this.onMouseEnter,
                    onMouseOut: this.onMouseOut
                },
                this.props.children
            ),
            React.createElement(
                "div",
                { className: this.state.toolTipClasses, style: style, role: "tooltip" },
                React.createElement("div", { className: "tooltip-arrow" }),
                React.createElement(
                    "div",
                    { className: "tooltip-inner" },
                    this.props.text
                )
            )
        );
    }
}

ReactDOM.render(React.createElement(
    "div",
    null,
    React.createElement(
        Tooltip,
        { text: "The book you're reading now", allowOnMouseOver: true, allowOnClick: false, positionWhereShowText: "top" },
        "React Quickly "
    ),
    "was published in 2017. it's awesome!"
), document.getElementById('tooltip'));
