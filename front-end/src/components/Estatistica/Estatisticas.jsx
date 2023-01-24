import {useState, useEffect} from "react";
import Card from "../UI/Card";
import axios from "axios";
import "./Estatistica.css";
const Estatistica = () => {
	const [fechas, setFechas] = useState({
		oldestDate: "",
		newestDate: "",
	});
	const [text, setText] = useState("");
	const [urlPopular, setUrlPopular] = useState({url: "", cantidad: ""});
	const [cantTweets, setCantTweets] = useState("");
	const [mensiones, setMensiones] = useState([]);
	const [liked, setLiked] = useState('');
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
	const masPopular = () => {
		axios
			.get("http://localhost:9876/api/v1/tweets/retweet/tweets", {
				headers: {Authorization: `Bearer ${localStorage.getItem("auth")}`},
			})
			.then((response) => {
				setText(response.data.text);
			});
	};

	const masPopularUrl = () => {
		axios
			.get("http://localhost:9876/api/v1/tweets/top-urls/tweets", {
				headers: {Authorization: `Bearer ${localStorage.getItem("auth")}`},
			})
			.then((response) => {
				setUrlPopular({
					...urlPopular,
					url: response.data[0].url,
					cantidad: response.data[0].cantidad,
				});
			});
	};

	const cantidadTweets = () => {
		axios
			.get("http://localhost:9876/api/v1/tweets/count/tweets", {
				headers: {Authorization: `Bearer ${localStorage.getItem("auth")}`},
			})
			.then((response) => {
				setCantTweets(response.data);
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
				setLiked(response.data.text)
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

	const buscarIdiomas= () => {
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

	const buscarSchema= () => {
		axios
			.get("http://localhost:9876/api/v1/tweets/schema", {
				headers: {Authorization: `Bearer ${localStorage.getItem("auth")}`},
			})
			.then((response) => {
			console.log(response.data)
			});
	};


	var date1 = new Date(fechas.oldestDate);
	var date2 = new Date(fechas.newestDate);

	useEffect(() => {
		fecha();
		masPopular();
		masPopularUrl();
		cantidadTweets();
		mensionTweets();
		cantLikes()
		buscarPaises()
		buscarIdiomas()
		buscarSchema()
	}, []);
	return (
		<div className="container">
			<br />
			<br />

			<Card>
				<table className="table">
					<tbody>
						<h5 className="p-4">Datos general</h5>
						<tr>
							<td>Fecha de descarga</td>
							<td>
								Desde {date1.getDate()}/{date1.getMonth() + 1}/
								{date1.getFullYear()}/{date1.getHours()}h:{date1.getMinutes()}s.
								Hasta {date2.getDate()}/{date2.getMonth() + 1}/
								{date2.getFullYear()}/{date2.getHours()}h:{date2.getMinutes()}s.
							</td>
						</tr>
						<tr>
							<td>Tweet más retuiteado.</td>
							<td>{text}</td>
						</tr>
						<tr>
							<td>Url más popular</td>
							<td>
								{urlPopular.url} -{" "}
								<span>Numero de veces {urlPopular.cantidad}</span>
							</td>
						</tr>
						<tr>
							<td>Cantidad de tweets</td>
							<td>Hay {cantTweets} tweets guardados en el sistema</td>
						</tr>
						<tr>
							<td>Texto con másl likes</td>
							<td>
								{liked}
							</td>
						</tr>
					</tbody>
				</table>
			</Card>

			{/*-------------------------------------------------------------------------usuarios con mas tweets publicados --------------------------------------- */}
			<Card>
				<table className="table">
					<thead>
					<h5 className="p-4">Usuarios y mensiones</h5>
						<tr>
							<th scope="col">Usuario </th>
							<th scope="col">Mensiones</th>
						</tr>
					</thead>
					<tbody>
						{mensiones.map((mension) => (
							<tr>
								<th scope="col">{mension.username} </th>
								<th scope="col">{mension.mentions}</th>
							</tr>
						))}
					</tbody>
				</table>
			</Card>

			{/*-------------------------------------------------------------------------Paises mas frecuentes --------------------------------------- */}
			<Card>
				<table className="table">
					<thead>
					<h5 className="p-4">Paises más frecuentes</h5>
						<tr>
							<th scope="col">País </th>
							<th scope="col">Cantidad de veces</th>
						</tr>
					</thead>
					<tbody>
						{paises.map((pais) => (
							<tr>
								<th scope="col">{pais._id} </th>
								<th scope="col">{pais.count}</th>
							</tr>
						))}
					</tbody>
				</table>
			</Card>
			{/*-------------------------------------------------------------------------Idiomas mas frecuentes frecuentes --------------------------------------- */}
			<Card>
				<table className="table">
					<thead>
					<h5 className="p-4">Idiomas en los tweets</h5>
						<tr>
							<th scope="col">Idioma </th>
							<th scope="col">Número de tweets</th>
						</tr>
					</thead>
					<tbody>
						{idiomas.map((idioma) => (
							<tr>
								<th scope="col">{idioma.lang} </th>
								<th scope="col">{idioma.tweets}</th>
							</tr>
						))}
					</tbody>
				</table>
			</Card>
		</div>
	);
};

export default Estatistica;
