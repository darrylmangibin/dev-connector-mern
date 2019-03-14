import React from 'react';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/textFieldGroup';

class CreateProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      errors: {}
      
    }
  }
  render() {
    return( 
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">Let's et some information to make your profile stand out</p>
              <small className="d-block pb-3">* = required fields</small>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const matStateToProps = (state) => {
  return {
    profile: state.profile,
    errors: state.errors
  }
}

export default connect(matStateToProps)(CreateProfile)