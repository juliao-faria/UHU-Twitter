import React from "react";
import Card from "../UI/Card";

import "./ConsultasParametricas.css";
const ConsultasParametricas = () => {
	return (
		<React.Fragment>
			<br />
			<br />
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
									<option value="1">Carlos</option>
									<option value="2">Juliao</option>
									<option value="3">Enrique</option>
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
										Expresiones
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
