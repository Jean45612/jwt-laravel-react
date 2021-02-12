import React, { Component } from 'react'

export class Error extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                {this.props.errors &&
                    Object.keys(this.props.errors).forEach(key => {
                        this.props.errors[key].map((e, index) => {
                            return <div className="alert alert-danger" key={index}>
                                {e}
                            </div>
                        })
                    })
                }
            </React.Fragment >
        )
    }
}

export default Error
