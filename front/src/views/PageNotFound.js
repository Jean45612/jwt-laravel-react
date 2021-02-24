import React from "react"

import { Link } from "react-router-dom";

const PageNotFound = () => (
    //ESTA ES OTRA OPCION EN VEZ DE REACT.FRAGMENT
    <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading">404</h4>
        <p>Página no encontrada</p>
        <hr />
        <Link class="mb-0 btn btn-primary" to="/">Ir a inicio</Link>
    </div>

)
export default PageNotFound