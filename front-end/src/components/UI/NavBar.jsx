import "./NavBar.css";
import {Link, Outlet} from "react-router-dom";
const NavBar = ({salir}) => {
	return (
		<main>
			<nav  className="bg-nav navbar navbar-expand-lg navbar-light">
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
					<span className="spn">TWEETS-APP</span>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item active">
								<a className="nav-link">
									<span className="fontnav">
										{" "}
										<Link className="link" to="/estadisticas">ESTADISTICAS</Link>
									</span>
								</a>
							</li>
							<li className="nav-item active">
								<a className="nav-link">
									<span className="fontnav">
										<Link className="link" to="/consultas">PARAMETRIZADAS</Link>
									</span>
								</a>
							</li>
							<li className="nav-item active">
								<a  onClick={salir} className="nav-link salir  pt-2">
									SALIR
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<br />
			<br />
			<section>
				<Outlet />
			</section>
		</main>
	);
};

export default NavBar;
