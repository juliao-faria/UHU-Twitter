import React from "react";
import Card from "../UI/Card";
import {useState, useEffect} from "react";
import axios from "axios";
import "./ConsultasParametricas.css";

const ConsultasParametricas = () => {
	const [text, setText] = useState("");
	const [urlPopular, setUrlPopular] = useState({url: "", cantidad: ""});
	const [top10Tweets, setTop10Tweets] = useState([]);
	const [mensiones, setMensiones] = useState([]);
	const [usuarios, setUsuario] = useState([]);
	const [liked, setLiked] = useState("");
	const [paises, setPaises] = useState([]);
	const [idiomas, setIdiomas] = useState([]);
	const [newCollection, setNuevaColecion] = useState({
		userName: "",
		startDate: "",
		endDate: "",
		mentions: "",
		retweet: "",
		lang: "",
		text: "",
		newCollectionName: "",
	});

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

	const cantLikes = () => {
		axios
			.get("http://localhost:9876/api/v1/tweets/likes/tweets", {
				headers: {Authorization: `Bearer ${localStorage.getItem("auth")}`},
			})
			.then((response) => {
				setLiked(response.data.text);
			});
	};

	const topTweets = () => {
		axios
			.get("http://localhost:9876/api/v1/tweets/top-tweets/tweets", {
				headers: {Authorization: `Bearer ${localStorage.getItem("auth")}`},
			})
			.then((response) => {
				response.data.map((tweet) => {
					setTop10Tweets((top10Tweets) => [...top10Tweets, tweet]);
				});
			});
	};

	const buscarPaises = () => {
		axios
			.get("http://localhost:9876/api/v1/tweets/countries/tweets", {
				headers: {Authorization: `Bearer ${localStorage.getItem("auth")}`},
			})
			.then((response) => {
				response.data.map((pais) => {
					setPaises((paises) => [...paises, pais]);
				});
			});
	};

	const nuevaColecion = (e) => {
		setNuevaColecion({
			...newCollection,
			[e.target.name]: e.target.value,
		});
	};

	const postNewCollection = (e) => {
		e.preventDefault();
		if (
			newCollection.newCollectionName == "" ||
			newCollection.newCollectionName == "Choose..."
		) {
			alert("Dale nombre a la coleción");
		} else {
			axios
				.post(
					"http://localhost:9876/api/v1/tweets/parametric/tweets",
					newCollection,
					{
						headers: {Authorization: `Bearer ${localStorage.getItem("auth")}`},
					}
				)
				.then((response) => {
					console.log(response.data);
				})
				.catch((err) => {
					alert("Usuario Incorrecto");
				});
		}
	};

	useEffect(() => {
		buscarSchema();
		buscarUsuarios();
		buscarIdiomas();
		mensionTweets();
		cantLikes();
		topTweets();
		buscarPaises();
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
									name="userName"
									onChange={nuevaColecion}
								>
									<option selected>Choose...</option>
									{usuarios.map(usuario=><option value={usuario.nombre}>{usuario.nombre}</option>)}
								</select>
							</div>
							<div className="col-auto my-1">
								<div className="custom-control custom-checkbox mr-sm-2">
									<label>Buscar por usuario</label>
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
									name="startDate"
									onChange={nuevaColecion}
								>
									<option selected>Choose...</option>
									<option value="2023-01-05T14:42:19.000Z">02/01/2023</option>
								</select>
							</div>

							<div className="col-auto my-1">
								<div className="custom-control custom-checkbox mr-sm-2">
									<label>Fecha inicio</label>
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
									name="endDate"
									onChange={nuevaColecion}
								>
									<option selected>Choose...</option>
									<option value="T2023-01-05T20:42:19.000Z">05/01/2023</option>
								</select>
							</div>

							<div className="col-auto my-1">
								<div className="custom-control custom-checkbox mr-sm-2">
									<label>Fecha final</label>
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
									name="mentions"
									onChange={nuevaColecion}
								>
									<option selected>Choose...</option>
									{mensiones.map((mension) => (
										<option value={mension.mentions}>{mension.mentions}</option>
									))}
								</select>
							</div>
							<div className="col-auto my-1">
								<div className="custom-control custom-checkbox mr-sm-2">
									<label>Mensiones</label>
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
									name="retweet"
									onChange={nuevaColecion}
								>
									<option selected>Choose...</option>
									{top10Tweets.map((retweet) => (
										<option value={retweet.count}>{retweet.count}</option>
									))}
								</select>
							</div>
							<div className="col-auto my-1">
								<div className="custom-control custom-checkbox mr-sm-2">
									<label>Buscar por catidad de retwets</label>
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
									name="lang"
									onChange={nuevaColecion}
								>
									<option selected>Choose...</option>
									<option value="es">Español</option>
									<option value="en">Inglés</option>
								</select>
							</div>
							<div className="col-auto my-1">
								<div className="custom-control custom-checkbox mr-sm-2">
									<label>Idiomas</label>
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
									name="text"
									onChange={nuevaColecion}
								>
									<option selected>Choose...</option>
									{paises.map((pais) => (
										<option value={pais._is}>{pais._id}</option>
									))}
								</select>
							</div>
							<div className="col-auto my-1">
								<div className="custom-control custom-checkbox mr-sm-2">
									<label>Países</label>
								</div>
							</div>
						</div>
						<br />
						<div className="form-row align-items-center">
							<label htmlfor="editor" class="form-label">
								Nombre de la nuevaColecion colección
							</label>
							<input
								required
								type="text"
								className="form-control"
								name="newCollectionName"
								value={newCollection.newCollectionName}
								onChange={nuevaColecion}
							/>
						</div>
						<div>
							<br />
							<button onClick={postNewCollection} className="btn btn-primary ">
								nuevaColecion colección
							</button>
						</div>
						<br />
					</form>
				</div>
			</Card>			
		</React.Fragment>
	);
};
export default ConsultasParametricas;
