import axios from 'axios';

export default {
	userLogin: async (name, password, successCB, failureCB) => {
		try {
			const res = await axios.post('/users/login', { name: name, password: password })

			setToken(res.data.token);

			successCB();

		} catch (err) {
			console.log(err.response);
			failureCB(err.response.data.message);
		}
	},
	userSignUp: async (name, password, successCB, failureCB) => {
		try {
			const res = await axios.post('/users/signup', { name: name, password: password });

			setToken(res.data.token);
			console.log('setToken =>', res.data.token);

			successCB(res.data.token);

		} catch (err) {
			console.log(err.response);
			failureCB(err.response.data.message);
		};
	},
	authUser: async () => {
		try {
			const token = getToken();
			console.log('getToken =>', getToken());
			if (!token) return { auth: false, message: 'No token in localStorage' };

			const res = await axios.post('/auth/authenticate', { token: token });

			console.log('authUser response =>', res);
			return res.data;
		} catch (err) {
			console.log(err.response);
			return err.response.data;
		}
	},
	userLogout: () => {
		removeToken();
	},
}

function getToken() {
	return localStorage.getItem('userToken');
}

function setToken(token) {
	if (!token) return console.log('setToken - no token to set');

	console.log('setToken =>', token);
	localStorage.setItem('userToken', token);
}

function removeToken() {
	localStorage.removeItem('userToken');
}