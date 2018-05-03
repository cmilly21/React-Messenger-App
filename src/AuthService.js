import axios from 'axios';

export default {
	userLogin: async (username, password, successCB, failureCB) => {
		try {
			username.toLowerCase();
			const res = await axios.post('/users/login', { name: username, password: password })

			console.log(res);
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

			const res = await axios.post(`/jwt/${ token }`);

			return res.data;
		} catch (err) {
			return err.response.data;
		}
	},
	userLogout: () => {
		removeToken();
	},
	userChangeUsername: async (userId, currentPassword, newUsername, successCB) => {
		try {

			const res = await axios.put(`/users/updateUsername/${ userId }`, { currentPassword: currentPassword, newUsername: newUsername });

			console.log(res.data);

			successCB(res.data.user);

		} catch (err) {
			console.log(err.response);
			return err;
		}
	},
	userChangePassword: async (userId, currentPassword, newPassword, successCB) => {
		try {

			const res = await axios.put(`/users/updatePassword/${ userId }`, { currentPassword: currentPassword, newPassword: newPassword });

			console.log(res.data);

			successCB(res.data.user);

		} catch (err) {
			console.log(err.response);
			return err;
		}
	}
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