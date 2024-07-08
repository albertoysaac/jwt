import React,{ useContext , useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		if(store.jwt === "" || store.jwt === undefined){
			navigate("/");
		}
		
	}, []);

	return (
		<div className="text-center mt-5">
			<h1>Sistema de administracion de usuarios</h1>
			<table className="table table-dark table-striped-columns">
				<thead>
					<tr>
						<th scope="col">ID #</th>
						<th scope="col">Names</th>
						<th scope="col">Last Names</th>
						<th scope="col">Age</th>
						<th scope="col">Email</th>
					</tr>
				</thead>
				<tbody>
					{store.users && store.users.length > 0 ?
					store.users.map((user, index) => {
						return (
							<tr key={index}>
								<td scope="row">{user.id}</td>
								<td>{user.names}</td>
								<td>{user.last_name}</td>
								<td>{user.age}</td>
								<td>{user.email}</td>
							</tr>
						)
					}): null}
				</tbody>
			</table>
		</div>
	);
};
