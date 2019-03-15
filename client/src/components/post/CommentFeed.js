import React, { Component } from 'react';
import CommentItem from './CommentItem';

class CommentFeed extends Component {
  render() {

    const { comments, postId } = this.props

    return comments.map((comment) => {
      return (
        <CommentItem 
          key={comment._id}
          comment={comment}
          postId={postId}
        />
      )
    })
  }
}

export default CommentFeed;
