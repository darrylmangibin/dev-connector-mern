import React, { Component } from 'react';
// import PropTypes from 'prop-type';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileActions'
import Spinner from '../common/spinner';
import { Link } from 'react-router-dom';

class Dashboard extends Component {

  componentDidMount() {
    console.log(this.props)
    this.props.getCurrentProfile()
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if(profile === null || loading) {
      dashboardContent = (
        <Spinner />
      )
    } else {
      if(Object.keys(profile).length > 0) {
        dashboardContent = <h4>TODO: DISPLAY PROFILE</h4>
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-mited">Welcome { user.name }</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
          </div>
        )
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}



const mapStateToprops = (state) => {
  return {
    profile: state.profile,
    auth: state.auth
  }
}

export default connect(mapStateToprops, {
  getCurrentProfile
})(Dashboard);