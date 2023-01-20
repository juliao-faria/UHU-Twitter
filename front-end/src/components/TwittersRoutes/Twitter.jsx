import React from "react";
import {BrowserRouter, Routes, Navigate, Route} from "react-router-dom";
import ConsultasParametricas from "../Estatistica/ConsultasParametricas";
import Estatistica from "../Estatistica/Estatisticas";
import Reportes from "../Estatistica/Reportes";
import NavBar from "../UI/NavBar";

const Twitter = () => {
	const criterioBusqueda = {
		title1: "Buscar por usuario",
		title2: "Buscar hashtag",
		title3: "Buscar tweets con más de x comentarios",
		title4: "Buscar tweets con geolocalización",
		title4: "Descartar los retweets",
	};
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<NavBar />}>
					<Route index element={<Estatistica />} />
					<Route path="twitts" element={<Reportes />} />
					<Route path="consultas" element={<ConsultasParametricas/>} />
					<Route path="*" element={<Navigate replace to="/" />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
export default Twitter;
