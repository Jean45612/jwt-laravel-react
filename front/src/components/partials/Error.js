import React, { Component } from 'react'

export class Error extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                {this.props.errors &&
                    Object.keys(this.props.errors).map(key => {
                        return this.props.errors[key].map((e, index) => {
                            return <div className="alert alert-danger" key={index}>
                                {e}
                            </div>
                        })
                    })
                }
                {
                    this.props.error && <div className="alert alert-danger">
                        {this.props.error}
                    </div>
                }
            </React.Fragment >
        )
    }
}

export default Error
