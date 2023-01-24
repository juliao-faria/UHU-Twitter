import { useEffect } from "react";
import Card from "../UI/Card";
import axios from "axios";
const Reportes = () => {

	const mensionTweets = () => {
		axios
			.get("http://localhost:9876/api/v1/tweets/all/tweets", {
				headers: {Authorization: `Bearer ${localStorage.getItem("auth")}`},
			})
			.then((response) => {
				
			});
	};
	useEffect(() => {
		mensionTweets()
	}, []);
	
	return (
		<div>
            <br />
            <br />
			<Card>
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
