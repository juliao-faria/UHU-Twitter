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
				<form className="col-lg-8 mx-auto">
					<div className="form-row align-items-center">
						<div className="col-auto my-1">
							<label className="mr-sm-2 sr-only" for="inlineFormCustomSelect">
								Preference
							</label>
							<select className="custom-select mr-sm-2" id="inlineFormCustomSelect">
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
							<select className="custom-select mr-sm-2" id="inlineFormCustomSelect">
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
							<select className="custom-select mr-sm-2" id="inlineFormCustomSelect">
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
							<select className="custom-select mr-sm-2" id="inlineFormCustomSelect">
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
									Buscar tweets con geolocalización
								</label>
							</div>
						</div>
					</div>
					<div className="form-row align-items-center">
						<div className="col-auto my-1">
							<label className="mr-sm-2 sr-only" for="inlineFormCustomSelect">
								Preference
							</label>
							<select className="custom-select mr-sm-2" id="inlineFormCustomSelect">
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
									Descartar los retweets
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
			</Card>
		</React.Fragment>
	);
};
export default ConsultasParametricas;
