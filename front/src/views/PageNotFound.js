import React from "react"

import { Link } from "react-router-dom";

const PageNotFound = () => (
    //ESTA ES OTRA OPCION EN VEZ DE REACT.FRAGMENT
    <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">404</h4>
        <p>Página no encontrada</p>
        <hr />
        <Link className="mb-0 btn btn-primary" to="/">Ir a inicio</Link>
    </div>

)
export default PageNotFound