import "./Login.css";
import Card from "../UI/Card";
import {useState} from "react";
import axios from "axios";

const Login = ({estaLogueado}) => {
	const [datosUsuario, setUsuario] = useState({usuario: "", contraseña: ""});

	const inputChange = (e) => {
		setUsuario({
			...datosUsuario,
			[e.target.name]: e.target.value,
		});
	};

	const buscarUsuario = (e) => {
		e.preventDefault();
		let token = "";
		axios
			.post("http://localhost:9876/auth/login", {
				user: {
					username: datosUsuario.usuario,
					password: datosUsuario.contraseña,
				},
			})
			.then((response) => {
				token = response.data.access_token;
				if (token!=undefined) {
					estaLogueado(token);
					setUsuario({usuario: "", contraseña: ""});
				}
			}).catch((err)=>{
                alert("Usuario Incorrecto")
            });
	};

	return (
		<section className="container-fluid">
			<section className="row justify-content-center">
				<div className="form-containerLibro col-12 col-md-8 col-lg-8">
					<br />
					<br />
					<br />
					<Card>
						<br />
						<h4 className="mb-1 text-center">Autenticar Primero</h4>
						<br />
						<br />
						<form className="row g-3 mr-4 ml-4" encType="multipart/form-data">
							<div className="col-12">
								<label htmlfor="titulo" class="form-label">
									Usuario
								</label>
								<input
									type="text"
									id="tituloLibro"
									className="form-control"
									name="usuario"
									onChange={inputChange}
									datosUsuario={datosUsuario.usuario}
									value={datosUsuario.usuario}
                                    required
									
								/>
							</div>
							<div class="col-12">
								<label htmlfor="editor" class="form-label">
									Contraseña
								</label>
								<input
									type="text"
									className="form-control"
									name="contraseña"
									onChange={inputChange}
									datosUsuario={datosUsuario.contraseña}
									value={datosUsuario.contraseña}
                                    required
								/>
							</div>

							<div className="col-12 pt-2">
								<button onClick={buscarUsuario} className="btn btn-primary ">
									Autenticar
								</button>
							</div>
						</form>
						<br />
						<br />
						<br />
					</Card>
				</div>
			</section>
		</section>
	);
};
export default Login;
