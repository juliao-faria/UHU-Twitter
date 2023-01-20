import React from "react";
import {BrowserRouter, Routes, Navigate, Route} from "react-router-dom";
import ConsultasParametricas from "../Estatistica/ConsultasParametricas";
import Estatistica from "../Estatistica/Estatisticas";
import Reportes from "../Estatistica/Reportes";
import NavBar from "../UI/NavBar";

const Twitter = () => {
	
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
