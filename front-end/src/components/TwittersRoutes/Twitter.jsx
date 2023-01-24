import React, {useState, useEffect} from "react";
import {BrowserRouter, Routes, Navigate, Route} from "react-router-dom";
import ConsultasParametricas from "../Estatistica/ConsultasParametricas";
import Estatistica from "../Estatistica/Estatisticas";
import Reportes from "../Estatistica/Reportes";
import NavBar from "../UI/NavBar";
import Longin from "../Login/Login";

const Twitter = (props) => {
	const [logueado, setloguedo] = useState("");

	const estaLogueado = (token) => {
		localStorage.setItem("auth", token);
		setloguedo(localStorage.getItem("auth"));
	};
    const salir=()=>{
		localStorage.removeItem("auth");
		setloguedo("");
	}
	useEffect(() => {
		if (localStorage.getItem("auth")) {
			setloguedo(localStorage.getItem("auth"));
		}
	}, []);
	
	if (logueado == "") {
		return (
			<BrowserRouter>
				<Routes>
					<Route index element={<Longin estaLogueado={estaLogueado}/>} />
					<Route path="*" element={<Navigate replace to="/" />} />
				</Routes>
			</BrowserRouter>
		);
	} else {
		return (
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<NavBar salir={salir}/>}>
						<Route index element={<Estatistica />} />
						<Route path="cerrar" element={<Longin />} />
						<Route path="consultas" element={<ConsultasParametricas />} />
						<Route path="*" element={<Navigate replace to="/" />} />
					</Route>
				</Routes>
			</BrowserRouter>
		);
	}
};
export default Twitter;
