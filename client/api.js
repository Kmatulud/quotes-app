document.addEventListener("alpine:init", () => {

	Alpine.data("users", () => ({
		init() {
			fetch("/api/user/users")
				.then((r) => r.json())
				.then((data) => (this.user = data.data));
		},
		user: [],
		password: "",
		username: "",
		password2: "",
		username2: "",
		isOpen: false,
		isAuthenticated: false,
		// user: null,
		authError: null,
		authErrorShow: false,
		token: null,
 
		// async login() {
		// 	try {
		// 		const loginReq = await fetch("http://localhost:4000/api/user/login", {
		// 			method: "POST",
		// 			body: JSON.stringify({
		// 				username: this.username,
		// 				password: this.password,
		// 			}),
		// 			headers: {
		// 				"Content-Type": "application/json",
		// 			},
		// 		});
		// 		const loginRes = await loginReq.json();

		// 		if (loginRes?.success) {
		// 			this.authErrorShow = false;
		// 			this.isAuthenticated = true;
		// 			this.user = loginRes.user;
		// 			localStorage.setItem("access_token", loginRes.access_token);
		// 			this.user;
		// 			console.log(loginRes);
		// 			return;
		// 		}

		// 		this.showErrors("Failed to login");
		// 	} catch (error) {
		// 		this.showErrors(error.message);
		// 	}
		// },

			register() {
				fetch("http://localhost:4000/api/user/register", {
					password2: this.password2,
					username2: this.username2,
				})
				.then((response) => {
					console.log(response);
				})
				.catch(error =>{
					console.log(error);
				})
				// this.showErrors(error.message);
		},
		showErrors(message) {
			this.authError = message;
			this.authErrorShow = true;
		},
		logout() {
			this.isAuthenticated = !this.isAuthenticated;
		},
	}));
});
