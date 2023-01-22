import { useEffect } from "react";
import Card from "../UI/Card";
import axios from "axios";
const Reportes = () => {

	const datosGeneral = () => {
		axios.get("http://localhost:9876/api/v1/tweets/schema",{
				headers: {"Authorization": `Bearer ${localStorage.getItem("auth")}`}
			  })
			.then((response) => {
				console.log(response.data)
			})
	};
	
	
	
	return (
		<div>
            <br />
            <br />
			<Card>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">Usuario</th>
							<th scope="col">Texto</th>
							<th scope="col">Url</th>
							<th scope="col">Nº de amigos</th>
							<th scope="col">Nº de seguidores</th>
							<th scope="col">Nº de retweet</th>
						</tr>
					</thead>
					<tbody>
						<tr>
                            <td>Carlos</td>
							<td>Argentina ganó la copa</td>
							<td>http://localhost:3000/twitts</td>
							<td>567</td>
							<td>87</td>
							<td>12</td>
						</tr>
                        <tr>
							<td>Miguel David</td>
							<td>Soy de Francia sin pena decirlo</td>
							<td>http://localhost:3000/twitts</td>
							<td>789</td>
							<td>65</td>
							<td>73</td>
						</tr>
					</tbody>
				</table>
				<button onClick={datosGeneral}>Probar</button>
			</Card>
		</div>
	);
};
export default Reportes;
