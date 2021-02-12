import React, { Component } from 'react'
import api from '../services/api.js'
import swal from '../services/swal.js'
import SimpleReactValidator from 'simple-react-validator';

export class Register extends Component {

    constructor(props) {
        super(props);
 
        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            className: 'alert alert-danger',
            // messages: {
            //     email: 'El formato de email no es válido',
            //     required: 'El campo es requerido.'
            // },
            locale: 'es'
        });

        this.state = {
            email: null,
            password: null,
            password_confirmation: null,
            rol_id: 1
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        if (this.validator.allValid()) {
            // api.post('register', this.state).then(data => {
            //     swal.alerta(data, 'success')
            // }, error => {
            //     console.log('error', error)
            // });
        } else {
            this.validator.showMessages();
        }
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
                                    <input type="email" name="email" className="form-control" placeholder="user@example.com" onChange={this.onChange} value={this.state.title} onBlur={() => this.validator.showMessageFor('email')} />
                                    {this.validator.message('email', this.state.email, 'required|email')}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Contraseña <span className="text-danger">*</span></label>
                                <div className="col-sm-8">
                                    <input type="password" name="password" className="form-control" onChange={this.onChange} value={this.state.title} onBlur={() => this.validator.showMessageFor('contraseña')} />
                                    {this.validator.message('contraseña', this.state.password, 'required')}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Confirmar contraseña <span className="text-danger">*</span></label>
                                <div className="col-sm-8">
                                    <input type="password" name="password_confirmation" className="form-control" onChange={this.onChange} value={this.state.title} onBlur={() => this.validator.showMessageFor('confirmar contraseña')} />
                                    {this.validator.message('confirmar contraseña', this.state.password_confirmation, 'required')}
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
