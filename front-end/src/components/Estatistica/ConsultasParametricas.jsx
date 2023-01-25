import React from "react";
import Card from "../UI/Card";
import {useState, useEffect} from "react";
import axios from "axios";
import "./ConsultasParametricas.css";
import DateTimePicker from "react-datetime-picker";
import {useNavigate} from "react-router-dom";
import {format} from "date-fns";

const ConsultasParametricas = () => {
	const [schemas, setSchemas] = useState([]);
	const [usuarios, setUsuario] = useState([]);
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

	const elegirSchema = (e) => {
		if (e.target.value === "Choose...") {
			setSelectedSchema("");
		} else {
			setSelectedSchema(e.target.value);
		}
	};

	const elegirUsuario = (e) => {
		if (e.target.value === "Choose...") {
			setNombreUsuario("");
		} else {
			setNombreUsuario(e.target.value);
		}
	};

	const elegirMinDate = (newValue) => {
		setMinDate(newValue);
	};

	const elegirMaxDate = (newValue) => {
		setMaxDate(newValue);
	};

	const elegirLang = (e) => {
		if (e.target.value === "Choose...") {
			setLanguage("");
		} else {
			setLanguage(e.target.value);
		}
	};

	const elegirMenciones = (e) => {
		setMenciones(e.target.value);
	};

	const elegirRetweets = (e) => {
		setRetweetsCount(e.target.value);
	};

	const elegirTexto = (e) => {
		setTexto(e.target.value);
	};

	const elegirNombreNueva = (e) => {
		setNombreNuevaColeccion(e.target.value);
	};

	function chequeo() {
		if (selectedSchema == "") {
			return "Seleccione una colección a la que realizar la consulta";
		}
		if (
			texto === "" &&
			minDate == null &&
			maxDate == null &&
			retweetsCount === 0 &&
			menciones == 0 &&
			language == 0 &&
			nombreUsuario == ""
		) {
			return "Seleccione al menos un filtro";
		}
		if (
			(minDate != null && maxDate == null) ||
			(minDate == null && maxDate != null)
		) {
			return "Si desea filtrar por fecha, ingrese ambos parametros";
		}
		if (nombreNuevaColeccion == "") {
			return "Ingrese el nombre de la nueva colección";
		}
		return "";
	}

	const postNewCollection = (e) => {
		e.preventDefault();
		let mensaje = chequeo();
		if (mensaje != "") {
			alert(mensaje);
		} else {
			console.log(
				`http://localhost:9876/api/v1/tweets/parametric/${selectedSchema}`
			);
			let newCollection = {
				userName: nombreUsuario != "" ? nombreUsuario : null,
				startDate:
					minDate != null
						? format(minDate, "yyyy-MM-dd'T'kk:mm:ss.SSS'Z'")
						: null,
				endDate:
					maxDate != null
						? format(maxDate, "yyyy-MM-dd'T'kk:mm:ss.SSS'Z'")
						: null,
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
					navigate("/");
				})
				.catch((err) => {
					alert("Usuario Incorrecto");
				});
		}
	};

	useEffect(() => {
		buscarSchema();
		buscarUsuarios();
	}, []);

	return (
		<React.Fragment>
			<br />
			<br />
			<Card>
				<br />
				<div className="collection col-auto my-0">
					<label className="mr-sm-2 sr-only" for="inlineFormCustomSelect">
						Preference
					</label>
					<select
						className=" mr-sm-2 darAlto border_color"
						id="inlineFormCustomSelect"
						name="schemaName"
						onChange={elegirSchema}
					>
						<option selected>Choose...</option>
						{schemas.map((schema) => (
							<option value={schema}>{schema}</option>
						))}
					</select>
							<label>Elegir colección</label>
					
				</div>
				<br />
			</Card>
			<br />

			<Card>
				<br />
				<div className="row">
					<form className="col-lg-4 ml-5">
						<div className="form-row align-items-center">
							<div className="col-auto my-1">
								<label className="mr-sm-2 sr-only" for="inlineFormCustomSelect">
									Preference
								</label>
								<select
									className="mr-sm-2 darAlto"
									id="inlineFormCustomSelect"
									name="userName"
									onChange={elegirUsuario}
								>
									<option selected>Choose...</option>
									{usuarios.map((usuario) => (
										<option value={usuario.nombre}>{usuario.nombre}</option>
									))}
								</select>
							</div>
							<div className="col-auto my-1">
								<div className=" mr-sm-2">
									<label>Buscar por usuario</label>
								</div>
							</div>
						</div>

						<div className="form-row align-items-center">
							<div className="col-auto my-1">
								<DateTimePicker
									className="fecha"
									onChange={elegirMinDate}
									value={minDate}
								/>
							</div>
							<div className="col-auto my-1">
								<div className="  mr-sm-2">
									<label>Fecha inicio</label>
								</div>
							</div>
						</div>
						<div className="form-row align-items-center">
							<div className="col-auto my-1">
								<DateTimePicker
									className="fecha"
									onChange={elegirMaxDate}
									value={maxDate}
								/>
							</div>

							<div className="col-auto my-1">
								<div className="  mr-sm-2">
									<label>Fecha final</label>
								</div>
							</div>
						</div>

						<div className="form-row align-items-center">
							<div className="col-auto my-1">
								<input
									className="darAlto"
									onChange={elegirMenciones}
									value={menciones}
								/>
							</div>
							<div className="col-auto my-1">
								<div className="  mr-sm-2">
									<label>Menciones</label>
								</div>
							</div>
						</div>
						<div className="form-row align-items-center">
							<div className="col-auto my-1">
								<input
									className="darAlto"
									onChange={elegirRetweets}
									value={retweetsCount}
								/>
							</div>
							<div className="col-auto my-1">
								<div className="  mr-sm-2">
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
									className=" mr-sm-2 darAlto"
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
								<div className="  mr-sm-2">
									<label>Idiomas</label>
								</div>
							</div>
						</div>
						<div className="form-row align-items-center">
							<div className="col-auto my-1">
								<input
									className="darAlto"
									required
									type="text"
									name="texto"
									value={texto}
									onChange={elegirTexto}
								/>
							</div>
							<div className="col-auto my-1">
								<div className=" mr-sm-2">
									<label>Texto en el Tweet</label>
								</div>
							</div>
						</div>
						
						<div className="form-row align-items-center pl-1">
							<input
								className="darAlto"
								required
								type="text"
								name="newCollectionName"
								value={nombreNuevaColeccion}
								onChange={elegirNombreNueva}
							/>
							<div className="col-auto my-1">
								<div className="cmr-sm-2">
									<label>Nombre de la nueva colección</label>
								</div>
							</div>
						</div>
						<div>
							<button onClick={postNewCollection} className="form-control col-lg-3 btn btn-primary mt-1 pt-2">
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
