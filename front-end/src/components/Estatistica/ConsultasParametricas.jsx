import React from "react";
import Card from "../UI/Card";
import {useState, useEffect} from "react";
import axios from "axios";
import "./ConsultasParametricas.css";

const ConsultasParametricas = () => {
	const [fechas, setFechas] = useState({
		oldestDate: "",
		newestDate: "",
	});
	const [text, setText] = useState("");
	const [urlPopular, setUrlPopular] = useState({url: "", cantidad: ""});
	const [cantTweets, setCantTweets] = useState("");
	const [mensiones, setMensiones] = useState([]);
	const [usuarios, setUsuario] = useState([]);
	const [liked, setLiked] = useState("");
	const [paises, setPaises] = useState([]);
	const [idiomas, setIdiomas] = useState([]);

	const fecha = () => {
		axios
			.get("http://localhost:9876/api/v1/tweets/dates/tweets", {
				headers: {Authorization: `Bearer ${localStorage.getItem("auth")}`},
			})
			.then((response) => {
				setFechas({
					...fechas,
					oldestDate: response.data.oldestDate,
					newestDate: response.data.newestDate,
				});
			});
	};

	const buscarSchema = () => {
		axios
			.get("http://localhost:9876/api/v1/tweets/schema", {
				headers: {Authorization: `Bearer ${localStorage.getItem("auth")}`},
			})
			.then((response) => {
				//console.log(response.data)
			});
	};
	const buscarUsuarios = () => {
		axios
			.get("http://localhost:9876/api/v1/tweets/user-names/tweets", {
				headers: {Authorization: `Bearer ${localStorage.getItem("auth")}`},
			})
			.then((response) => {
				response.data.map((usuario) => {
					setUsuario((usuarios) => [...usuarios, usuario]);
				});
			});
	};
console.log(usuarios)
	const buscarIdiomas = () => {
		axios
			.get("http://localhost:9876/api/v1/tweets/lang/tweets", {
				headers: {Authorization: `Bearer ${localStorage.getItem("auth")}`},
			})
			.then((response) => {
				response.data.map((idioma) => {
					setIdiomas((idiomas) => [...idiomas, idioma]);
				});
			});
	};
	const mensionTweets = () => {
		axios
			.get("http://localhost:9876/api/v1/tweets/top-mentions/tweets", {
				headers: {Authorization: `Bearer ${localStorage.getItem("auth")}`},
			})
			.then((response) => {
				response.data.map((mension) => {
					setMensiones((mensiones) => [...mensiones, mension]);
				});
			});
	};

	const masPopular = () => {
		axios
			.get("http://localhost:9876/api/v1/tweets/retweet/tweets", {
				headers: {Authorization: `Bearer ${localStorage.getItem("auth")}`},
			})
			.then((response) => {
				setText(response.data.text);
			});
	};

	useEffect(() => {
		buscarSchema();
		buscarUsuarios();
		buscarIdiomas();
		mensionTweets();
		masPopular();
		fecha();
	}, []);

	return (
		<React.Fragment>
			<br />
			<br />
			<div className="col-lg-12">Colección</div>
			<Card>
				<br />
				<div className="row">
					<form className="col-lg-4 ml-4">
						<div className="form-row align-items-center">
							<div className="col-auto my-1">
								<label className="mr-sm-2 sr-only" for="inlineFormCustomSelect">
									Preference
								</label>
								<select
									className="custom-select mr-sm-2"
									id="inlineFormCustomSelect"
								>
									<option selected>Choose...</option>
									{usuarios.map(usuario=><option value={usuario.nombre}>{usuario.nombre}</option>)}
								</select>
							</div>
							<div className="col-auto my-1">
								<div className="custom-control custom-checkbox mr-sm-2">
									<input
										type="checkbox"
										className="custom-control-input"
										id="customControlAutosizing"
									/>
									<label
										className="custom-control-label"
										for="customControlAutosizing"
									>
										Buscar por usuario
									</label>
								</div>
							</div>
						</div>

						<div className="form-row align-items-center">
							<div className="col-auto my-1">
								<label className="mr-sm-2 sr-only" for="inlineFormCustomSelect">
									Preference
								</label>
								<select
									className="custom-select mr-sm-2"
									id="inlineFormCustomSelect"
								>
									<option selected>Choose...</option>
									<option value="1">One</option>
									<option value="2">Two</option>
									<option value="3">Three</option>
								</select>
							</div>

							<div className="col-auto my-1">
								<div className="custom-control custom-checkbox mr-sm-2">
									<input
										type="checkbox"
										className="custom-control-input"
										id="customControlAutosizing"
									/>
									<label
										className="custom-control-label"
										for="customControlAutosizing"
									>
										Buscar por hashtag
									</label>
								</div>
							</div>
						</div>

						<div className="form-row align-items-center">
							<div className="col-auto my-1">
								<label className="mr-sm-2 sr-only" for="inlineFormCustomSelect">
									Preference
								</label>
								<select
									className="custom-select mr-sm-2"
									id="inlineFormCustomSelect"
								>
									<option selected>Choose...</option>
									<option value="1">One</option>
									<option value="2">Two</option>
									<option value="3">Three</option>
								</select>
							</div>
							<div className="col-auto my-1">
								<div className="custom-control custom-checkbox mr-sm-2">
									<input
										type="checkbox"
										className="custom-control-input"
										id="customControlAutosizing"
									/>
									<label
										className="custom-control-label"
										for="customControlAutosizing"
									>
										Tweets con más de x comentarios
									</label>
								</div>
							</div>
						</div>
						<div className="form-row align-items-center">
							<div className="col-auto my-1">
								<label className="mr-sm-2 sr-only" for="inlineFormCustomSelect">
									Preference
								</label>
								<select
									className="custom-select mr-sm-2"
									id="inlineFormCustomSelect"
								>
									<option selected>Choose...</option>
									<option value="1">One</option>
									<option value="2">Two</option>
									<option value="3">Three</option>
								</select>
							</div>
							<div className="col-auto my-1">
								<div className="custom-control custom-checkbox mr-sm-2">
									<input
										type="checkbox"
										className="custom-control-input"
										id="customControlAutosizing"
									/>
									<label
										className="custom-control-label"
										for="customControlAutosizing"
									>
										Palabras en el tweet
									</label>
								</div>
							</div>
						</div>
						<div className="form-row align-items-center">
							<div className="col-auto my-1">
								<label className="mr-sm-2 sr-only" for="inlineFormCustomSelect">
									Preference
								</label>
								<select
									className="custom-select mr-sm-2"
									id="inlineFormCustomSelect"
								>
									<option selected>Choose...</option>
									{idiomas.map(idioma=><option value={idioma.lang}>{idioma.lang}</option>)}
									
								</select>
							</div>
							<div className="col-auto my-1">
								<div className="custom-control custom-checkbox mr-sm-2">
									<input
										type="checkbox"
										className="custom-control-input"
										id="customControlAutosizing"
									/>
									<label
										className="custom-control-label"
										for="customControlAutosizing"
									>
										Idiomas
									</label>
								</div>
							</div>
						</div>
						<div>
							<button type="submit" className="btn btn-primary ">
								Nueva colección
							</button>
						</div>
						<br />
					</form>
					{/**-----------------------------------------------RESULTADO DE LA CONSULTA HECHA --------------------------------------------------------- */}
					<div className="col-lg-7">
						<h5> Nueva Consulta Generada</h5>
						<table class="table">
							<thead>
								<tr>
									<th scope="col">Nº</th>
									<th scope="col">Usuario</th>
									<th scope="col">Hashtag</th>
									<th scope="col">Nº de comentarios</th>
									<th scope="col">Palabra</th>
									<th scope="col">Expresión</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope="row">1</th>
									<td>Mark</td>
									<td>Otto</td>
									<td>@mdo</td>
									<td>@mdo</td>
									<td>Mark</td>
								</tr>
								<tr>
									<th scope="row">2</th>
									<td>Jacob</td>
									<td>Thornton</td>
									<td>@fat</td>
									<td>@fat</td>
									<td>Mark</td>
								</tr>
								<tr>
									<th scope="row">3</th>
									<td>Larry</td>
									<td>the Bird</td>
									<td>@twitter</td>
									<td>@twitter</td>
									<td>Mark</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</Card>
		</React.Fragment>
	);
};
export default ConsultasParametricas;
