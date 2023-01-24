import React from "react";
import Card from "../UI/Card";
import {useState, useEffect} from "react";
import axios from "axios";
import "./ConsultasParametricas.css";
import DateTimePicker from 'react-datetime-picker';
import {useNavigate} from 'react-router-dom'; 


const ConsultasParametricas = () => {
	const [text, setText] = useState("");
	const [schemas, setSchemas] = useState([]);
	const [urlPopular, setUrlPopular] = useState({url: "", cantidad: ""});
	const [top10Tweets, setTop10Tweets] = useState([]);
	const [mensiones, setMensiones] = useState([]);
	const [usuarios, setUsuario] = useState([]);
	const [liked, setLiked] = useState("");
	const [paises, setPaises] = useState([]);
	const [idiomas, setIdiomas] = useState([]);

	const [selectedSchema, setSelectedSchema] = useState("");
	const [nombreNuevaColeccion, setNombreNuevaColeccion] = useState("");
	const [nombreUsuario, setNombreUsuario] = useState("");
	const [minDate, setMinDate] = useState(null);
	const [maxDate, setMaxDate] = useState(null);
	const [language, setLanguage] = useState("");
	const [retweetsCount, setRetweetsCount] = useState(0);
	const [menciones, setMenciones] = useState(0);
	const [texto, setTexto] = useState("");
	const navigate = useNavigate(); 


	const buscarSchema = () => {
		axios
			.get("http://localhost:9876/api/v1/tweets/schema", {
				headers: {Authorization: `Bearer ${localStorage.getItem("auth")}`},
			})
			.then((response) => {
				response.data.map((schema) => {
					setSchemas((schemas) => [...schemas, schema]);
				});
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

	const elegirSchema = (e) => {
		if (e.target.value === "Choose...") {
			setSelectedSchema("")
		} else {
			setSelectedSchema(e.target.value)
		}
	}

	const elegirUsuario = (e) => {
		if (e.target.value === "Choose...") {
			setNombreUsuario("");
		} else {
			setNombreUsuario(e.target.value)
		}
	}

	const elegirMinDate = (newValue) => {
		setMinDate(newValue)
	  };

	const elegirMaxDate = (newValue) => {
		setMaxDate(newValue)
	}

	const elegirLang = (e) => {
		if (e.target.value === "Choose...") {
			setLanguage("");
		} else {
			setLanguage(e.target.value)
		}
	}

	const elegirMenciones = (e) => {
		setMenciones(e.target.value)
	}
	
	const elegirRetweets = (e) => {
		setRetweetsCount(e.target.value)
	}

	const elegirTexto = (e) => {
		setTexto(e.target.value)
	}

	const elegirNombreNueva = (e) => {
		setNombreNuevaColeccion(e.target.value)
	}

	function chequeo() {
		if (selectedSchema == "") {
			return "Seleccione una colección a la que realizar la consulta"
		}
		if (texto === ""
			&&
			(minDate == null && maxDate == null)
			&&
			retweetsCount === 0
			&&
			menciones == 0
			&&
			language == 0
			&&
			nombreUsuario == "") {
				return "Seleccione al menos un filtro"
		}
		if ((minDate != null && maxDate == null) || (minDate == null && maxDate != null)) {
			return "Si desea filtrar por fecha, ingrese ambos parametros"
		}
		if (nombreNuevaColeccion == "") {
			return "Ingrese el nombre de la nueva colección"
		}
		return ""
	}

	const postNewCollection = (e) => {
		e.preventDefault();
		let mensaje = chequeo();
		if (mensaje != "") {
			alert(mensaje);
		}
		else {
			console.log(`http://localhost:9876/api/v1/tweets/parametric/${selectedSchema}`);
			let newCollection = {
				userName: nombreUsuario != "" ? nombreUsuario : null,
				startDate: minDate != null ? minDate : null,
				endDate: maxDate != null ? maxDate : null,
				mentions: menciones != 0 ? menciones : null,
				retweet: retweetsCount != 0 ? retweetsCount : null,
				lang: language != "" ? language : null,
				text: texto != "" ? texto : null,
				newCollectionName: nombreNuevaColeccion,
			};
			axios
				.post(
					`http://localhost:9876/api/v1/tweets/parametric/${selectedSchema}`,
					newCollection,
					{
						headers: {Authorization: `Bearer ${localStorage.getItem("auth")}`},
					}
				)
				.then((response) => {
					alert("Éxito");
					navigate('/')
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
			<div className="col-auto my-0">
				<label className="mr-sm-2 sr-only" for="inlineFormCustomSelect">
					Preference
				</label>
				<select
					className="custom-select mr-sm-2"
					id="inlineFormCustomSelect"
					name="schemaName"
					onChange={elegirSchema}
				>
					<option selected>Choose...</option>
					{schemas.map(schema=><option value={schema}>{schema}</option>)}
				</select>
			</div>
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
									onChange={elegirUsuario}
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
								<DateTimePicker onChange={elegirMinDate} value={minDate} />
							</div>
							<div className="col-auto my-1">
								<div className="custom-control custom-checkbox mr-sm-2">
									<label>Fecha inicio</label>
								</div>
							</div>
						</div>
						<div className="form-row align-items-center">
							<div className="col-auto my-1">
								<DateTimePicker onChange={elegirMaxDate} value={maxDate} />
							</div>

							<div className="col-auto my-1">
								<div className="custom-control custom-checkbox mr-sm-2">
									<label>Fecha final</label>
								</div>
							</div>
						</div>

						<div className="form-row align-items-center">
							<div className="col-auto my-1">
							<input
								onChange={elegirMenciones}
								value={menciones}
							/>
							</div>
							<div className="col-auto my-1">
								<div className="custom-control custom-checkbox mr-sm-2">
									<label>Menciones</label>
								</div>
							</div>
						</div>
						<div className="form-row align-items-center">
							<div className="col-auto my-1">
								<input
									onChange={elegirRetweets}
									value={retweetsCount}
								/>
							</div>
							<div className="col-auto my-1">
								<div className="custom-control custom-checkbox mr-sm-2">
									<label>Catidad de retweets</label>
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
									onChange={elegirLang}
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
								<input
									required
									type="text"
									className="form-control"
									name="texto"
									value={texto}
									onChange={elegirTexto}
								/>
							</div>
							<div className="col-auto my-1">
								<div className="custom-control custom-checkbox mr-sm-2">
									<label>Texto en el Tweet</label>
								</div>
							</div>
						</div>
						<br />
						<div className="form-row align-items-center">
							<label htmlfor="editor" class="form-label">
								Nombre de la nueva colección
							</label>
							<input
								required
								type="text"
								className="form-control"
								name="newCollectionName"
								value={nombreNuevaColeccion}
								onChange={elegirNombreNueva}
							/>
						</div>
						<div>
							<br />
							<button onClick={postNewCollection} className="btn btn-primary ">
								Generar
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
