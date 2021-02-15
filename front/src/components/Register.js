import React, { Component } from 'react'
import api from '../services/api.js'
import swal from '../services/swal.js'
import SimpleReactValidator from 'simple-react-validator';
import Error from './partials/Error.js'

export class Register extends Component {

    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator({
            autoForceUpdate: this,
            className: 'alert alert-danger',
            locale: 'es',
        });

        this.state = {
            form: {
                email: '',
                password: '',
                password_confirmation: '',
                rol_id: 1
            },
            errors: null,
            error: null
        }
    }

    handleSubmit = e => {
        e.preventDefault();

        this.limpiar();

        if (this.validator.allValid()) {
            api.post('register', this.state.form).then(data => {
                swal.alerta(data, 'success');
                this.props.history.push('/login');
            }, error => {
                if (error.data.errors) {
                    this.setState({
                        errors: error.data.errors
                    });
                } else {
                    this.setState({
                        error: error.data.error
                    });
                }

            });
        } else {
            this.validator.showMessages();
        }

    }

    limpiar = () => {
        this.setState({
            errors: null,
            error: null
        });
    }

    onChange = e => {
        this.setState(prevState => ({
            form: {                   // object that we want to update
                ...prevState.form,    // keep all other key-value pairs
                [e.target.name]: e.target.value       // update the value of specific key
            }
        }))
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
                                    <input type="email" name="email" className="form-control" placeholder="user@example.com" onChange={this.onChange} value={this.state.form.email} onBlur={() => this.validator.showMessageFor('email')} />
                                    {this.validator.message('email', this.state.form.email, 'required|email')}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Contraseña <span className="text-danger">*</span></label>
                                <div className="col-sm-8">
                                    <input type="password" name="password" className="form-control" onChange={this.onChange} value={this.state.form.password} onBlur={() => this.validator.showMessageFor('contraseña')} />
                                    {this.validator.message('contraseña', this.state.form.password, 'required|min:8')}
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-4 col-form-label">Confirmar contraseña <span className="text-danger">*</span></label>
                                <div className="col-sm-8">
                                    <input type="password" name="password_confirmation" className="form-control" onChange={this.onChange} value={this.state.form.password_confirmation} onBlur={() => this.validator.showMessageFor('confirmar contraseña')} />
                                    {this.validator.message('confirmar contraseña', this.state.form.password_confirmation, `required|min:8|in:${this.state.form.password}`, { messages: { in: 'Contraseña y confirmar contraseña deben ser iguales.' } })}
                                </div>
                            </div>

                            <Error errors={this.state.errors} error={this.state.error} />

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
