import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import ItemList from "./itemlist.component";
import ItemDialogue from './item.component'

export default class ItemView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showitem: false,
            activeItemId: undefined
        };
    }


    showEditItemDialogue = (itemID) => {
        this.setState({ showItem: true, activeItemId: itemID })
    };

    hideItemDialogue = (itemID) => {
        this.setState({ showItem: false, activeItemId: undefined })
    };

    showNewItemDialogue = (itemID) => {
        this.setState({ showItem: true, activeItemId: undefined })
    };

    componentDidUpdate(prevProps) {
        if (this.props.query !== prevProps.query) {
            this.setState({ showItem: false, activeItemId: undefined })
        }
    }


    render() {
        return (
            <div className="container">
                <div className="col-xl">
                    {!this.state.showItem ? (
                        <div>
                            <ItemList logout={this.props.logout} query={this.props.query} showItem={this.showEditItemDialogue} newItem={this.showNewItemDialogue} />
                        </div>
                    ) : (
                        <div>
                            <ItemDialogue logout={this.props.logout} itemId={this.state.activeItemId} handleClose={this.hideItemDialogue} user={this.props.user} />
                        </div>
                    )}
                </div>
            </div>
        );
    }
}