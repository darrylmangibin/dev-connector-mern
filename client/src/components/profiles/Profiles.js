import React from 'react';
import { connect } from 'react-redux';
import Spinner from '../common/spinner';
import { getProfiles } from '../../actions/profileActions';
import ProfileItem from './ProfileItem';

class Profiles extends React.Component {

  componentDidMount() {
    this.props.getProfiles();
  }

  render() {

    const { profiles, loading } = this.props.profile;
    let profileItems;

    if(profiles === null || loading) {
      profileItems = (
        <Spinner />
      )
    } else {
      if(profiles.length > 0) {
        profileItems = (
          profiles.map((profile) => {
            return (
              <ProfileItem 
                key={profile._id} 
                profile={profile} 
              />
            )
          })
        )
      } else {
        profileItems = (
          <h4>No Profiles found...</h4>
        )
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">
                Developers Profiles
              </h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps, {
  getProfiles
})(Profiles);