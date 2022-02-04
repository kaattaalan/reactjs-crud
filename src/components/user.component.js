import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'

export default class user extends Component {

    render() {
        return (
            <Modal
                className="text-center"
                show={this.props.show}
                onHide={this.props.handleClose}
                >
                    <div className="">
                        Account
                    <hr/>
                    <div  className="">
                        <div className="">
                            {this.props.user.username}
                        </div>
                        <hr/>
                        <div className="">
                            {this.props.user.email}
                        </div>
                        <hr/>
                        <div className="">
                            <div onClick={this.props.logout} className="btn btn-danger my-2 my-sm-0">
                                Logout
                        </div>
                        </div>
                    </div>
                    </div>
            </Modal>
        )
    }

}