import "./NavBar.css";
import {Link, Outlet} from "react-router-dom";
const NavBar = () => {
	return (
		<main>
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
					<span className="spn">TWITTERS</span>
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
										{" "}
										<Link className="link" to="/twitts">TWITTS</Link>
									</span>
								</a>
							</li>
							<li className="nav-item active">
								<a className="nav-link">
									<span className="fontnav">
										<Link className="link" to="/consultas">CONSULTAS PARAMETRIZADAS</Link>
									</span>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<section>
				<Outlet />
			</section>
		</main>
	);
};

export default NavBar;
