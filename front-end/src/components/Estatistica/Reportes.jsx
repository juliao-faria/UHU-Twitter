import {useEffect, useState} from "react";
import Card from "../UI/Card";
import axios from "axios";
const Reportes = () => {
	const [coleciones, setColeciones] = useState([]);
	const buscarSchema = () => {
		axios
			.get("http://localhost:9876/api/v1/tweets/schema", {
				headers: {Authorization: `Bearer ${localStorage.getItem("auth")}`},
			})
			.then((response) => {
				response.data.map((schema) => {
					setColeciones((coleciones) => [...coleciones, schema]);
				});
			});
	};
	const buscarColecion = (e) => {
		const url="http://localhost:9876/api/v1/tweets/all/"+e.target.value;
		axios
			.get(url, {
				headers: {Authorization: `Bearer ${localStorage.getItem("auth")}`},
			})
			.then((response) => {
				console.log(response.data)
			});
	};
	useEffect(() => {
		buscarSchema();
	}, []);

	return (
		<div>
			<br />
			<br />
			<Card>
				<div className="form-row align-items-center p-4">
					<div className="col-auto my-1">
						<label className="mr-sm-2 sr-only" for="inlineFormCustomSelect">
							Preference
						</label>
						<select
							className="custom-select mr-sm-2"
							id="inlineFormCustomSelect"
							name="colecion"
							onChange={buscarColecion}
						>
							<option selected>Choose...</option>
							{coleciones.map((colecion) => (
								<option value={colecion}>{colecion}</option>
							))}
						</select>
					</div>
					<div className="col-auto my-1">
						<div className="custom-control custom-checkbox mr-sm-2">
							<label>Selecionar Colección</label>
						</div>
					</div>
				</div>
				<br />
				{/**-----------------------------------------------RESULTADO DE LA CONSULTA HECHA --------------------------------------------------------- */}
				<div className="col-lg-7">
					<br />
					<h5> Consulta Generada</h5>
					<br />
					<table class="table">
						<thead>
							<tr>
								<th scope="col">Nº</th>
								<th scope="col">Usuario</th>
								<th scope="col">Fecha Inicio</th>
								<th scope="col">Fecha FInal</th>
								<th scope="col">Idioma</th>
								<th scope="col">Nº retweets</th>
								<th scope="col">Nº mensiones</th>
								<th scope="col">País</th>
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
								<td>@mdo</td>
								<td>Mark</td>
							</tr>
							<tr>
								<th scope="row">3</th>
								<td>Larry</td>
								<td>the Bird</td>
								<td>@twitter</td>
								<td>@twitter</td>
								<td>Mark</td>
								<td>@mdo</td>
								<td>Mark</td>
							</tr>
						</tbody>
					</table>
				</div>
			</Card>
		</div>
	);
};
export default Reportes;
