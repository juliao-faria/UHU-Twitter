import "./NavBar.css"

const NavBar =()=>{
    return(
        <nav className="bg-nav navbar navbar-expand-lg navbar-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <span className="spn">
            TWITTERS
          </span>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link" href={"/signin"}>
                  <span className="fontnav">ESTADISTICA</span>
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href={"/signup"}>
                  <span className="fontnav">REPORTES</span>
                </a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href={"/signup"}>
                  <span className="fontnav">CONSULTAS</span>
                </a>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    )
}

export default NavBar;