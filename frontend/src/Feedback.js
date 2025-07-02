import React, { Component } from 'react';
import { variables } from './Variables';

export class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      type: 'bug',
      description: '',
      message: ''
    };
  }

  changeName = (e) => this.setState({ name: e.target.value });
  changeEmail = (e) => this.setState({ email: e.target.value });
  changeType = (e) => this.setState({ type: e.target.value });
  changeDescription = (e) => this.setState({ description: e.target.value });

  submitFeedback = (e) => {
    e.preventDefault();

    const { name, email, type, description } = this.state;

    if (!description.trim()) {
      this.setState({ message: "Description is required." });
      return;
    }

    fetch(variables.API_URL + 'feedback/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, type, description }),
    })
      .then(res => {
        if (res.ok) {
          this.setState({
            message: "Thank you for your feedback!",
            name: '',
            email: '',
            type: 'bug',
            description: ''
          });
        } else {
          this.setState({ message: "Failed to submit feedback." });
        }
      })
      .catch(() => this.setState({ message: "Network error." }));
  };

  render() {
    const { name, email, type, description, message } = this.state;

    return (
      <div className="container mt-5" style={{ maxWidth: 600 }}>
        <h2>Submit Feedback</h2>
        <form onSubmit={this.submitFeedback}>
          <div className="mb-3">
            <label>Name (optional)</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={this.changeName}
              placeholder="Your name"
            />
          </div>

          <div className="mb-3">
            <label>Email (optional)</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={this.changeEmail}
              placeholder="Your email"
            />
          </div>

          <div className="mb-3">
            <label>Type of Feedback</label>
            <select className="form-select" value={type} onChange={this.changeType}>
              <option value="bug">Bug</option>
              <option value="suggestion">Suggestion</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label>Description <span style={{color: 'red'}}>*</span></label>
            <textarea
              className="form-control"
              value={description}
              onChange={this.changeDescription}
              rows={4}
              required
              placeholder="Describe your feedback"
            />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    );
  }
}

export default Feedback;
