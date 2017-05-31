var Edit = React.createClass({
  checkValues(){
    var bio = document.getElementById('bioField').value;
    var company = document.getElementById('companyField').value;
    var position = document.getElementById('positionField').value;
    var location = document.getElementById('locationField').value;
    var expertise = document.getElementById('expertiseField').value;
    if (([bio, company, position, location, expertise].includes("")) === false) {
      this.buttonStatus();
    }
  },

  buttonStatus(){
    document.getElementById('acceptingButton').disabled = false;
  },

  getInitialState(){
    return {mentor:{}}
  },

  componentDidMount() {
    $.getJSON(`/api/v1/mentors/${this.props.mentorId}`, function(mentor){
      this.setState({mentor: mentor});
    }.bind(this));

  },

  handleClick() {
    let mentor = this.state.mentor;
    $.ajax({
     url: `/api/v1/mentors/${mentor.id}`,
     type: 'PATCH',
     data: {user: { active: true}},
     success: console.log.bind(this, "yay")
   });
  },

  handleUpdate(updatedInfo){
    let id = this.props.mentorId
    let mentor = {id: id};
    $.ajax({
     url: `/api/v1/mentors/${mentor.id}`,
     type: 'PATCH',
     data: {user: { bio: updatedInfo.bio, company: updatedInfo.company, position: updatedInfo.position, location: updatedInfo.location, expertise: updatedInfo.expertise, first_name: updatedInfo.first_name, last_name: updatedInfo.last_name, email: updatedInfo.email, slack: updatedInfo.slack }},
     success: function(){ window.location = "/mentors"; }
   });
  },

  handleEdit(e) {
    e.preventDefault();
    var bio = this.state.bio;
    var company = this.state.company;
    var position = this.state.position;
    var location = this.state.location;
    var expertise = this.state.expertise;

    var updatedInfo = {bio: bio, company: company, position: position, location: location, expertise: expertise, first_name: first_name, last_name: last_name, slack: slack, email: email }
    this.handleUpdate(updatedInfo);
  },

  render() {
    let mentor = this.state.mentor;

    return (
      <div className="container">
        <div className="edit-page">
          <EditHeader />
            <div className="row">
              <div className="col s4">
                <img src={mentor.avatar} className='dashboard-pic'/>
                <form>
                  <p>
                   <input type="checkbox" id="acceptingButton" disabled="disabled"/>
                   <label htmlFor="acceptingButton">Accepting Students</label>
                  </p>
                  </form>
                  <p><em>This won't be checkable until you fill in bio, company, position, and expertise on this form.</em></p>
              </div>
              <div className="col s6">
                <div className="form-area">
                  <div className="censusInformation">
                    <table>
                      <tbody>
                        <tr>
                          <td><h6 className="edit-headers">First Name:</h6></td>
                          <td><a href={mentor.account_url} target="_blank">{mentor.first_name}</a></td>
                        </tr>
                        <tr>
                          <td><h6 className="edit-headers">Last Name:</h6></td>
                          <td><a href={mentor.account_url} target="_blank">{mentor.last_name}</a></td>
                        </tr>
                        <tr>
                          <td><h6 className="edit-headers">Slack:</h6></td>
                          <td><a href={mentor.account_url} target="_blank">{mentor.slack}</a></td>
                        </tr>
                        <tr>
                          <td><h6 className="edit-headers">Email:</h6></td>
                          <td><a href={mentor.account_url} target="_blank">{mentor.email}</a></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="container-form">
                    <h6><span className="edit-headers">Bio:</span></h6>
                    <input id="bioField" type='text' className="inputField" cols='50' rows='10' onKeyUp={this.checkValues} onChange={ (e) => this.setState({ bio: e.target.value }) }
                      placeholder="Please Enter Your Information To Accept Mentees" value={mentor.bio} />
                    <h6><span className="edit-headers">Company:</span></h6>
                    <input id="companyField" type='text' className="inputField" onKeyUp={this.checkValues} onChange={ (e) => this.setState({ company: e.target.value }) }
                      placeholder="Please Enter Your Information To Accept Mentees" value={mentor.company} />
                    <h6><span className="edit-headers">Position:</span></h6>
                    <input id="positionField" type='text' className="inputField" onKeyUp={this.checkValues} onChange={ (e) => this.setState({ position: e.target.value }) }
                      placeholder="Please Enter Your Information To Accept Mentees" value={mentor.position} />
                    <h6><span className="edit-headers">Location:</span></h6>
                    <input id="locationField" type='text' className="inputField" onKeyUp={this.checkValues} onChange={ (e) => this.setState({ location: e.target.value }) }
                      placeholder="Please Enter Your Information To Accept Mentees" value={mentor.location} />
                    <h6><span className="edit-headers">Expertise:</span></h6>
                    <input id="expertiseField" type='text' className="inputField" onKeyUp={this.checkValues} onChange={ (e) => this.setState({ expertise: e.target.value }) }
                      placeholder="Please Enter Your Information To Accept Mentees" value={mentor.expertise} />
                  </div>
                </div>
                  <div className="edit-submit-button"><button onClick={this.handleEdit}> Submit </button></div>
              </div>
            </div>

          </div>
      </div>

    )

  }
});
