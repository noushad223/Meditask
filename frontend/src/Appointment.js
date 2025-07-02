import React, { Component } from 'react';
import { variables } from './Variables.js';

export class Appointment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      appointments: [],
      modalTitle: "",
      appointmentId: 0,
      patient_name: "",
      doctor_name: "",
      date: "",
      time: ""
    };
  }

  refreshList() {
    fetch(variables.API_URL + 'appointments')
      .then(response => response.json())
      .then(data => {
        this.setState({ appointments: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  changePatientName = (e) => {
    this.setState({ patient_name: e.target.value });
  }

  changeDoctorName = (e) => {
    this.setState({ doctor_name: e.target.value });
  }

  changeDate = (e) => {
    this.setState({ date: e.target.value });
  }

  changeTime = (e) => {
    this.setState({ time: e.target.value });
  }

  addClick() {
    this.setState({
      modalTitle: "Add Appointment",
      appointmentId: 0,
      patient_name: "",
      doctor_name: "",
      date: "",
      time: ""
    });
  }

  editClick(app) {
    this.setState({
      modalTitle: "Edit Appointment",
      appointmentId: app.id,
      patient_name: app.patient_name,
      doctor_name: app.doctor_name,
      date: app.date,
      time: app.time
    });
  }

  createClick() {
    fetch(variables.API_URL + 'appointments/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patient_name: this.state.patient_name,
        doctor_name: this.state.doctor_name,
        date: this.state.date,
        time: this.state.time
      })
    })
      .then(res => res.json())
      .then(result => {
        alert("Appointment created successfully!");
        this.refreshList();
      });
  }

  updateClick() {
    fetch(variables.API_URL + 'appointments/' + this.state.appointmentId + '/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patient_name: this.state.patient_name,
        doctor_name: this.state.doctor_name,
        date: this.state.date,
        time: this.state.time
      })
    })
      .then(res => res.json())
      .then(result => {
        alert("Appointment updated successfully!");
        this.refreshList();
      });
  }

  deleteClick(id) {
   
    fetch(variables.API_URL + 'appointments/'+ id + '/', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      
    })
    .then(res => {
      if (res.ok) {
        alert("Appointment deleted successfully!");
        this.refreshList();
      } else {
        alert("Failed to delete appointment.");
      }
    });
    
  }




  render() {
    const {
      appointments,
      modalTitle,
      patient_name,
      doctor_name,
      date,
      time
    } = this.state;

    return (
      <div className="container mt-3">
        <button type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.addClick()}>
          Add Appointment
        </button>

        <h3 className="mb-4">Appointments</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Doctor Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app, index) => (
              <tr key={index}>
                <td>{app.patient_name}</td>
                <td>{app.doctor_name}</td>
                <td>{app.date}</td>
                <td>{app.time}</td>
                <td>
                  <button type="button"
                    className="btn btn-sm btn-light"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(app)}>
                    Edit
                  </button>
                  <button type="button"
                  className='btn btn-sm btn-light'
                  onClick={()=>this.deleteClick(app.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div className="modal-body">
                <input type="text" className="form-control mb-2"
                  value={patient_name}
                  onChange={this.changePatientName}
                  placeholder="Patient Name" />

                <input type="text" className="form-control mb-2"
                  value={doctor_name}
                  onChange={this.changeDoctorName}
                  placeholder="Doctor Name" />

                <input type="date" className="form-control mb-2"
                  value={date}
                  onChange={this.changeDate} />

                <input type="time" className="form-control mb-2"
                  value={time}
                  onChange={this.changeTime} />
              </div>

              <div className="modal-footer">
                {this.state.appointmentId === 0 ?
                  <button type="button" className="btn btn-primary"
                    onClick={() => this.createClick()}>
                    Create
                  </button> :
                  <button type="button" className="btn btn-primary"
                    onClick={() => this.updateClick()}>
                    Update
                  </button>
                }
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Appointment;
