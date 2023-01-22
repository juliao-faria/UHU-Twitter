import { useState,useEffect } from "react";
import Card from "../UI/Card";
import axios from "axios";
import "./Estatistica.css";
const Estatistica = () => {
   const [estadistica,setEstadistica]=useState({oldestDate:"",newestDate:""})
   const [text,setText]=useState('')
   const [url,setUrl]=useState('')

	const fecha = () => {
		axios.get("http://localhost:9876/api/v1/tweets/dates/tweets",{
				headers: {"Authorization": `Bearer ${localStorage.getItem("auth")}`}
			  })
			.then((response) => {
				setEstadistica({...estadistica,oldestDate:response.data.oldestDate,newestDate:response.data.newestDate});
			})
	};
	const masPopular=()=>{
		axios.get("http://localhost:9876/api/v1/tweets/retweet/tweets",{
				headers: {"Authorization": `Bearer ${localStorage.getItem("auth")}`}
			  })
			.then((response) => {
				setText(response.data.text);
	  })
	}

	const masPopularUrl=()=>{
		axios.get("http://localhost:9876/api/v1/tweets/top-urls/tweets",{
				headers: {"Authorization": `Bearer ${localStorage.getItem("auth")}`}
			  })
			.then((response) => {
				console.log(response.data)
	  })
	}
	
	

var date1 = new Date(estadistica.oldestDate);
var date2 = new Date(estadistica.newestDate);

useEffect(() => {
	fecha()
	masPopular()
	masPopularUrl()
}, []);
	return (
		<div className="container">
			<br />
			<br />

				<Card>
					<table className="table">
						
						<tbody >
							<tr>
								
								<td>Fecha de descarga</td>
								<td>Desde {date1.getDate()}/{date1.getMonth()+1}/{date1.getFullYear()}/{date1.getHours()}h:{date1.getMinutes()}s.  Hasta {date2.getDate()}/{date2.getMonth()+1}/{date2.getFullYear()}/{date2.getHours()}h:{date2.getMinutes()}s.</td>
							</tr>
							<tr>
							
								<td>Tweet más retuiteado.</td>
								<td>{text}</td>
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
