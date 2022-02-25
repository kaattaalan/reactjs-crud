import { Component } from "react";

export default class VoteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemId: this.props.itemId,
            voteCount: 0
        }
    }

    render() {
        //item dialogue goes here
        return (
            <div className="btn-group-xs">
                <button className="btn btn-sm" onClick={() => this.props.downVote(this.state.itemId)}>-</button>
                <span className="btn btn-sm">{this.state.voteCount}</span>
                <button className="btn btn-sm" onClick={() => this.props.upVote(this.state.itemId)}>+</button>
            </div>);
    }

}