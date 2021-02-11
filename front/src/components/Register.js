import React, { Component } from 'react'
import api from '../services/api.js'
import swal from '../services/swal.js'

export class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            password_confirmation: null,
            rol_id: 1
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        api.post('register', this.state).then(data => {
            swal.alerta(data, 'success')
        }, error => {
            console.log('error', error)
        });
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="container mt-4">
                <div className="card col-lg-6 p-0 offset-lg-3 col-md-8 offset-md-2">
                    <div className="card-header">Registrate aquí</div>
                    <div className="card-body">
                        <form className="px-4" autoComplete="off" onSubmit={this.handleSubmit}>
                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Email <span className="text-danger">*</span></label>
                                <div className="col-sm-8">
                                    <input type="email" name="email" className="form-control" placeholder="user@example.com" onChange={this.onChange} value={this.state.title} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Contraseña <span className="text-danger">*</span></label>
                                <div className="col-sm-8">
                                    <input type="password" name="password" className="form-control" onChange={this.onChange} value={this.state.title} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Confirmar contraseña <span className="text-danger">*</span></label>
                                <div className="col-sm-8">
                                    <input type="password" name="password_confirmation" className="form-control" onChange={this.onChange} value={this.state.title} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary w-100">Registrarse</button>
                                </div>
                            </div >
                        </form >
                    </div >
                </div >
            </div >
        )
    }
}

export default Register
