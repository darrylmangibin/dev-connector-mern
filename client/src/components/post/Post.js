import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../common/spinner';
import { getPost } from '../../actions/postActions';
import { Link } from 'react-router-dom';
import PostItem from '../posts/PostItem';

class Post extends Component {

  componentDidMount() {
    this.props.getPost(this.props.match.params.id)
  }

  render() {
    const { post, loading } = this.props.post
    console.log(this.props)
    let postContent;

    if(post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />
    } else {
      postContent = (
        <div>
          <PostItem 
            post={post}
            showActions={false}
          />
        </div>
      )
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back To Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.posts
  }
}

export default connect(mapStateToProps, {
  getPost
})(Post);