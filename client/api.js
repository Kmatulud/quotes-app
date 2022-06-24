document.addEventListener("alpine:init", () => {
	Alpine.data("users", () => ({
		init() {
				this.login(),
				localStorage.getItem("token")
		},
		user: [],
		authError: "",
		password: "",
		username: "",
		password2: "",
		username2: "",
		isOpen: false,
		isAuthenticated: false,
		// user: null,
		0.: null,
		authErrorShow: false,
		token: null,

		login() {
			try {
				const getToken = fetch("http://localhost:4000/api/user/login", {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					password: this.password,
					username: this.username,
				}),
			})
				if (getToken) {
				localStorage.setItem("token", getToken.token);
				return;
			}
			} catch (error) {
				console.log(error);
				this.authError = error;
			}
		},

		register() {
			fetch("http://localhost:4000/api/user/register", {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					password: this.password2,
					username: this.username2,
				}),
			})
				.then((response) => response.json())
				.then((response) => {
					console.log(response);
					this.authError = "Success, Please Login";
				})
				.catch((error) => {
					this.authError = error.status;
				});
		},
		showErrors(message) {
			this.authError = message;
			this.authErrorShow = true;
		},
		showHide(){
			const token = localStorage.getItem("token");

            if (token === undefined || token === null){
                return true
            }else{
                return false
            }
		},
		logout() {
			this.isAuthenticated = !this.isAuthenticated;
		},
	}));
});
