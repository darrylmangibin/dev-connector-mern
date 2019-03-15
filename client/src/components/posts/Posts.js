import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import Spinner from '../common/spinner';
import { getPosts } from '../../actions/postActions';
import PostFeed from './PostFeed';

class Posts extends Component {

  componentDidMount() {
    this.props.getPosts()
  }

  render() {

    const { posts, loading } = this.props.post;
    let postContent;

    if(posts === null || loading) {
      postContent = <Spinner />
    } else {
      postContent = (
        <PostFeed 
          posts={posts}
        />
      )
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
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

export default connect(mapStateToProps, { getPosts })(Posts);
