import React from 'react';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/textFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

class CreateProfile extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
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

  onSubmit(e) {
    e.preventDefault()
    console.log(this.props)
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const { errors, displaySocialInputs } = this.state

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup 
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup 
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup 
            placeholder="LinkedIn Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup 
            placeholder="Youtube Profile URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />

          <InputGroup 
            placeholder="Instagram Profile URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>
      )
    }

    const options = [
      {
        label: 'Select Professional Status',
        value: 0
      },
      {
        label: 'Developer',
        value: 'Developer'
      },
      {
        label: 'Junior Developer',
        value: 'Junior Developer'
      },
      {
        label: 'Senior Developer',
        value: 'Senior Developer'
      },
      {
        label: 'Manaer',
        value: 'Manger'
      },
      {
        label: 'Student or Learning',
        value: 'Student or Learning'
      },
      {
        label: 'Instructor or Teacher',
        value: 'Instructor or Teacher'
      },
      {
        label: 'Intern',
        value: 'Intern'
      }, 
      {
        label: 'Other',
        value: 'Other'
      }      
    ];

    return( 
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">Let's et some information to make your profile stand out</p>
              <small className="d-block pb-3">* = required fields</small>
              <form
                onSubmit={this.onSubmit}
              >

                <TextFieldGroup 
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle fro you profile URL. You full name, company name nickname"
                />

                <SelectListGroup 
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of where you are at in you career"
                />

                <TextFieldGroup 
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />

                <TextFieldGroup 
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or a company one"
                />

                <TextFieldGroup 
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & Country suggested (eg. Baguio City, Philippines)"
                />

                <TextFieldGroup 
                  placeholder="Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma seperated value (eg. HTML,CSS,Javascript,PHP)"
                />

                 <TextFieldGroup 
                  placeholder="GitHub Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you wat your lates repos and a Github link, include your username"
                />

                <TextAreaFieldGroup 
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell Us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    className="btn btn-light"
                    onClick={() => {
                      this.setState((prevState) => {
                        return {
                          displaySocialInputs: !prevState.displaySocialInputs
                        }
                      })
                    }}
                  >
                    Add Social Netword Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input 
                    type="submit"
                    value="Submit"
                    className="btn btn-info btn-block mt-4"
                />
              </form>
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