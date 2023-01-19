import Card from "../UI/Card";
import "./Estatistica.css";
const Estatistica = () => {
	return (
		<div className="container">
			<br />
			<br />

				<Card>
					<table className="table">
						
						<tbody >
							<tr>
								
								<td>Fecha de descarga</td>
								<td>Desde 2022-12-01 has 2022-12-02</td>
							</tr>
							<tr>
							
								<td>Tweet más retuiteado.</td>
								<td>La vida de Leonel Messi en el football</td>
							</tr>
							<tr>
								
								<td>Url más popular</td>
								<td>https://moodle.uhu.es - <span>Numero de veces 6</span></td>
							</tr>
							<tr>
								
								<td>Hashtags más frecuentes</td>
								<td>#ahhahaahahhahah - <span>Numero de veces 17</span></td>
							</tr><tr>
								
								<td>Usuarios más mencionados</td>
								<td>Carlos Argentino - <span>Numero de veces 12</span></td>
							</tr>
						</tbody>
						
					</table>
				</Card>


{/*-------------------------------------------------------------------------usuarios con mas tweets publicados --------------------------------------- */}
				<Card>
					<table className="table">
						<thead>
							<tr>
								
								<th scope="col">Usuario con más tweets</th>
								<th scope="col">Cantidad de tweets</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								
								<td>Carlos</td>
								<td>8 tweets</td>
							</tr>
							<tr>
							
								<td>Enrique</td>
								<td>21 tweets</td>
							</tr>
							<tr>
								
								<td>Juliao</td>
								<td>12 tweets</td>
							</tr>
							<tr>
								
								<td>Daniel</td>
								<td>14 tweets</td>
							</tr><tr>
								
								<td>Pablo</td>
								<td>19 tweets</td>
							</tr>
						</tbody>
						
					</table>
				</Card>
			</div>
		
	);
};

export default Estatistica;
