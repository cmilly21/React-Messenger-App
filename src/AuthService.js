import axios from 'axios';

export default {
	userLogin: async (name, password, successCB, failureCB) => {
		try {
			name.toLowerCase();
			const res = await axios.post('/users/login', { name: name, password: password })

			setToken(res.data.token);

			successCB();

		} catch (err) {
			failureCB(err.response.data.message);
		}
	},
	userSignUp: async (name, password, successCB, failureCB) => {
		try {
			name.toLowerCase();
			const res = await axios.post('/users/signup', { name: name, password: password });

			setToken(res.data.token);

			successCB(res.data.token);

		} catch (err) {
			failureCB(err.response.data.message);
		};
	},
	authUser: async () => {
		try {
			const token = getToken();
			if (!token) return { auth: false, message: 'No token in localStorage' };

			const res = await axios.post('/auth/authenticate', { token: token });

			return res.data;
		} catch (err) {
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
	if (!token) return;

	localStorage.setItem('userToken', token);
}

function removeToken() {
	localStorage.removeItem('userToken');
}