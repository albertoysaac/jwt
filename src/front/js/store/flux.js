import { Login } from "../pages/login";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			jwt: "",
			users: [],
			
		},
		actions: {
			queryHandler: async (url, method, body, authReq) => {
				console.log("queryHandler: ", url, method, body, authReq);
				let config = {
					method: method,
					mode: "no-cors",
					headers: {
						"Content-type": "application/json",
						'Access-Control-Allow-Origin': '*',
					}
				};

				if (body !== null) {
					if(!authReq){
						config = {
							method: method,
							body: JSON.stringify(body),
							headers: {
								"Content-type": "application/json",
								'Access-Control-Allow-Origin': '*',
							}
						};
					}
					else{
						config = {
							method: method,
							body: JSON.stringify(body),
							headers: {
								"Content-type": "application/json",
								'Access-Control-Allow-Origin': '*',
								'Authorization': 'Bearer ' + getStore().jwt
							}
						};
					}
				}
				else if (!body && getStore().jwt !== "" && authReq) {
					config = {
						method: method,
						headers: {
							"Content-type": "application/json",
							'Access-Control-Allow-Origin': '*',
							'Authorization': 'Bearer ' + getStore().jwt
						}
					};
				}
				console.log("endpoint: ", url);
				console.log("config: ", config);
				const response = await fetch(url, config);
				const data = {"status":response.status,"data" : await response.json()}
				console.log("queryResponse: ", data);
				return data;
			},

			signup: async (body) => {
				console.log(body);
				const url = "https://turbo-fishstick-jj5g4j4q5w72q94j-3001.app.github.dev/api/signup";
				const method = "POST";
				const data = await getActions().queryHandler(url, method, body, false);
				if (data.status === 200) {
					console.log(data);
					setStore({ jwt: data.data.access_token });
					return true;
				}
				if (data.status === 400) {
					return data.data;
				}
			},

			login: async (body) => {
				const url = "https://turbo-fishstick-jj5g4j4q5w72q94j-3001.app.github.dev/api/login";
				const method = "POST";
				const data = await getActions().queryHandler(url, method, body, false);
				if (data.status === 200) {
					setStore({ jwt: data.data.access_token });
					return true;
				}
				else {
					return false;
				}
			},

			getUsers: async () =>{
				const url = "https://turbo-fishstick-jj5g4j4q5w72q94j-3001.app.github.dev/api/users";
				const method = "GET"
				const data = await getActions().queryHandler(url,method,null,true);
				if(data.status === 200){
					setStore({users: data.data});
					return true;
				}
			},
		}
	};
};

export default getState;
