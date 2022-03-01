import React, { Component } from "react";
import CommentService from "../services/comment.service";
import "../styles/commentlist.component.css";
import { timeSince, hasDeletePermission, checkNested } from '../util/utils';


export default class CommentList extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.state = {
            items: [],
            add_comment: false,
            comment_id: undefined
        };
    }

    componentDidMount() {
        this.fetchCommentList(this.props.itemId);
    }

    fetchCommentList(itemId) {
        CommentService.getAll(itemId).then(response => {
            this.setState({
                items: response === undefined ? "" : response.data
            });
        }, error => {
            console.log(error);
        });
    }

    deleteComment(comment) {
        CommentService.delete(comment.id).then(
            response => {
                console.log('deleted ' + comment.id);
                //Update the state by removing the deleted comment from array
                this.setState({
                    items: this.state.items.filter(function (item) {
                        return item !== comment;
                    })
                });
            },
            error => {
                console.log(error);
            })
    }

    saveComment() {
        CommentService.create({
            title: "",
            description: this.state.description,
            itemId: this.props.itemId
        }).then(response => {
            //Shoddy Workaround because user info not being returned from recently persisted object
            if (response.data && response.data.userInfo && !response.data.userInfo.username) { response.data.userInfo.username = this.props.user.username; }
            this.setState({
                items: [
                    response.data,
                    ...this.state.items
                ]
            });
            this.closeComment();
        }, error => {
            console.log(error);
        });
    }

    updateComment() {
        const id = this.state.comment_id;
        const desc = this.state.description;
        CommentService.update({
            id: id,
            title: "",
            description: desc
        }).then(response => {
            this.setState({
                items: this.state.items.filter(function (item) {
                    if (item.id === id) {
                        item.description = desc;
                    }
                    return item;
                })
            });
            this.closeComment();
        }, error => {
            console.log(error);
        });
    }

    handleChange(evt) {
        const value = evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        this.setState({
            ...this.state,
            [evt.target.name]: value
        });
    }

    newComment() {
        this.setState({ add_comment: true, description: undefined, comment_id: undefined });
    }

    editComment(item) {
        this.setState({ add_comment: true, comment_id: item.id, description: item.description });
    }

    closeComment() {
        this.setState({ add_comment: false, comment_id: undefined });
    }

    render() {
        return (
            <div className="col-md-12 w-100 container">
                <div className="col-md-12">
                    <a href="#" className="" onClick={() => { this.newComment(); }}>Add comment..</a>
                </div>
                {this.state.add_comment ? (
                    <div className="col-md-12 add-comment">
                        <textarea type="text" className="col-md-12" name="description" value={this.state.description} onChange={this.handleChange} />
                        <a href="#" className="text-muted" onClick={() => { this.closeComment(); }}>Close</a>
                        {this.state.comment_id ? (
                            <a href="#" onClick={() => { this.updateComment(); }}>&nbsp;Update</a>) : (
                            <a href="#" onClick={() => { this.saveComment(); }}>&nbsp;Save</a>)}
                    </div>) : ("")}
                <div className="col-md-12 commentlist">
                    {/*Loop through comments*/
                        this.state.items && this.state.items.map(((item) => (

                            <div key={item.id} className="col-md-12">
                                <p>{item.description}</p>
                                <div className="row small">
                                    <div>Posted By <strong>{item.userInfo.username}</strong></div>
                                    <div className="text-muted">&nbsp;{item.createdDate ? timeSince(item.createdDate) + ' ago' : ""}</div>
                                    {/*Check whether the user has privelages to show edit buttons*/
                                        item.userInfo.id === this.props.user.id || hasDeletePermission(this.props.user) ? (
                                            <div className="ml-auto">
                                                {item.userInfo.id === this.props.user.id ? (
                                                    <a href="#" onClick={() => { this.editComment(item); }}>Edit</a>
                                                ) : ("")}
                                                <a href="#" className=" text-muted" onClick={() => { this.deleteComment(item); }}>&nbsp;Delete</a>
                                            </div>
                                        ) : ("")}
                                </div>
                                <hr />
                            </div>

                        )))}

                </div>
            </div >
        );
    }

}