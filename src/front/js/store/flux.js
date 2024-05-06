import { Login } from "../pages/login";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			jwt: "",
			
		},
		actions: {
			queryHandler: async (url, method, body) => {
				const config = {
					method: method,
					headers: {
						"Content-Type": "application/json",
					},
				};

				if (getStore().store.jwt !== "" || getStore().store.jwt !== undefined) {
					config = {
						method: method,
						body: JSON.stringify(body),
						headers: {
							"Content-Type": "application/json",
							Authorization: getStore().store.jwt,
						},
					};
				}
				else if (body) {
					config.body = JSON.stringify(body);
				}
				
				const response = await fetch(url, config);
				const data = await response.json();
				if (data.msg) {
					setStore({ message: data.msg });
				}
				return data;
			},

			signup: async (name, last_name, age, email, password) => {
				const url = "https://refactored-space-disco-p4w6px6jjq6h6vp9-3001.app.github.dev/api/signup";
				const method = "POST";
				const body = {
					name: name,
					last_name: last_name,
					age: age,
					email: email,
					password: password,
				};
				const data = await getActions().queryHandler(url, method, body);
				if (data.msg) {
					setStore({ message: data.msg });
				}
			},

			login: async (email, password) => {
				const url = "https://refactored-space-disco-p4w6px6jjq6h6vp9-3001.app.github.dev/api/login";
				const method = "POST";
				const body = {
					email: email,
					password: password,
				};
				const data = await getActions().queryHandler(url, method, body);
				if (data.access_token) {
					setStore({ jwt: data.access_token });
				}
			},
		}
	};
};

export default getState;
