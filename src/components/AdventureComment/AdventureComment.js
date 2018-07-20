import React, { Component } from 'react';
import axios from 'axios';
import './AdventureComment.css';
import PropTypes from 'prop-types';
import * as FontAwesome from 'react-icons/lib/fa';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class AdventureComment extends Component {
    constructor() {
        super();

        this.state = {
            displayComments: null,
            comment: null,
            editComment: null,
            userLoggedIn: false,
            editToggle: false,
            userRights: false,
        }
    }

    componentDidMount() {
        let { unique_id } = this.props.adventure
        axios.get(`/api/comments/${unique_id}`).then( response => {
            console.log('comment--', response.data)
            this.setState({
                displayComments: response.data
            })
        })

        if(this.props.userData){
            this.setState({
                userLoggedIn: !this.state.userLoggedIn
            })
        }
    }

    commentHandler = ( e ) => {
        this.setState({
            comment: e
        })
    }

    editCommentHandler = ( e ) => {
        this.setState({
            editComment: e.target.value
        })
    }

    editToggle = () => {
        this.setState({
            editToggle: !this.state.editToggle
        })
    }

    createComment = () => {
        let { unique_id, name } = this.props.adventure
        let newComment = {
            comment: this.state.comment,
            hikingID: unique_id,
            hikingName: name,
            usersID: this.props.userData.id,
        }
        axios.post('/api/createComment', newComment).then( res => {
            console.log('works', res)
            axios.get( `/api/comments/${ unique_id }` ).then( response => {
                console.log('res--', response)
                this.setState({
                    displayComments: response.data
                })
            })
        })
    }

    editComment= ( postid ) => {
        console.log('edit--', postid)
        let { unique_id } = this.props.adventure
        let editComment = {
            comment: this.state.editComment,
            usersID: 2,
            unique_id: unique_id
        }
        axios.put(`/api/editComment/${ postid }`, editComment).then( res => {
            console.log('edit--', res.data)
            this.setState({
                displayComments: res.data
            })
        }).catch( error => {
            console.log(error)
        })
    }
    
    deleteComment = (postid) => {
        let { unique_id } = this.props.adventure
        axios.delete( `/api/deleteComment/${ postid }` ).then( res => {
            axios.get( `/api/comments/${ unique_id }` ).then( response => {
                this.setState({
                    displayComments: response.data
                })
            })
        })
    }
   
    render() {
        console.log('props--', this.props.userData)
        console.log('props--', this.state.displayComments)
        
        let displayComments = this.state.displayComments ? this.state.displayComments.map( (e, i) => {
            return (
                <div key={e.id}>
                    <div className="adventure-comment-box">
                        <div>
                            <img width="100px" src={e.picture} />
                            <div className="adventure-comment-user">{e.username}</div>
                        </div>
                        <div>
                            {this.props.userData && this.props.userData.id  === e.users_id ? <FontAwesome.FaEdit className="adventure-comment-edit" onClick={ this.editToggle } /> : null} 
                            {this.props.userData && this.props.userData.id === e.users_id ? <FontAwesome.FaTrash className="adventure-comment-delete" onClick={ () => this.deleteComment(e.id) } /> : null}
                        </div>
                    </div>
                    <div className="adventure-comment-content">
                        <div dangerouslySetInnerHTML={{__html: e.content}}></div>
                    </div>
                </div>

            )
        }) : <div>Loading Comments. . .</div>

        return (
            <div className="AdventureComment">
                <div className="adventure-comment-container">
                    <h1 className="adventure-comment-title">TIPS & COMMENTS</h1>
                    {displayComments.length ? displayComments : <div className="adventure-comment-first">Be the first one to write a comment!</div>}
                    { this.state.userLoggedIn ? 
                    <div className="adventure-comment-add">
                        <div className="adventure-comment-addTips">
                            <h2>ADD TIPS & COMMENTS</h2>
                        </div>
                        <div>
                            <img width="75px" height="75px" src={ this.props.userData ? this.props.userData.picture : 'https://res.cloudinary.com/dznmdwgn1/image/upload/v1531849384/adventure/w74ytodrltbi7uqgo0dq.jpg' } />
                        </div>
                        <div>
                            <div className="adventure-comment-username">{this.props.userData ? this.props.userData.username : 'hello'}</div> 
                        </div>
                        <div>
                            <ReactQuill className="adventure-comment-input" theme="snow" value={this.state.comment} onChange={this.commentHandler}  />
                        </div>
                        <div>
                            <button className="adventure-comment-save" onClick={this.createComment} >SAVE</button>
                        </div>
                    </div> : 
                    <div className="adventure-comment-add">
                        <div>
                            <h2>ADD TIPS & COMMENTS</h2>
                        </div>
                        <div className="adventure-comment-join">
                            <div className="adventure-comment-join-text">Have updates, photos, alerts, or just want to leave a comment?</div>
                            <div>Join now and share them.</div> 
                        </div>
                    </div> }
                </div>
            </div>
        );
    }
}

AdventureComment.propTypes = {
    adventure: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        userData: state.user
    }
}

export default connect(mapStateToProps)(AdventureComment);