import { auth } from "./script.js";
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence, onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const signIn = {
	data() {
		return {
			login: null,
			pass: null,
		};
	},

	methods: {
		onSubmit() {
			setPersistence(auth, browserSessionPersistence)
				.then(() => {
					return signInWithEmailAndPassword(auth, this.login, this.pass);
				})
				.then((userCredential) => {
					const user = userCredential.user;
					this.enabledAccess = true;
				})
				.catch((error) => {
					const errorCode = error.code;
					const errorMessage = error.message;
				});
		},
	},

	template: `
        <form class="auth__form auth-from" v-on:submit.prevent="onSubmit" >
            <div class="auth-from__title">Sign in</div>

            <div class="auth-from__list">
                <div class="auth-from__item wrap-input">
                    <div class="wrap-input__name">login</div>
                    <input type="text" class="wrap-input__input" v-model="login">
                </div>

                <div class="auth-from__item wrap-input">
                    <div class="wrap-input__name">password</div>
                    <input type="password" class="wrap-input__input" v-model="pass">
                </div>
            </div>

            <button type="submit" class="auth-from__btn">Отправить</button>
        </form>
    `,
};

const signUp = {
	data() {
		return {
			login: null,
			pass: null,
			passConfirm: null,
		};
	},

	methods: {
		onSubmit() {
			if (this.login != null && this.pass != null && this.passConfirm != null && this.pass === this.passConfirm) {
				setPersistence(auth, browserSessionPersistence).then(() => {
					return createUserWithEmailAndPassword(auth, this.login, this.pass)
						.then((userCredential) => {
							const user = userCredential.user;
						})
						.catch((error) => {
							const errorCode = error.code;
							const errorMessage = error.message;
						});
				});
			}
		},
	},

	template: `
        <form class="auth__form auth-from" v-on:submit.prevent="onSubmit">
            <div class="auth-from__title">Sign up</div>

            <div class="auth-from__list">
                <div class="auth-from__item wrap-input">
                    <div class="wrap-input__name">login</div>
                    <input type="text" class="wrap-input__input" v-model="login">
                </div>

                <div class="auth-from__item wrap-input">
                    <div class="wrap-input__name">password</div>
                    <input type="password" class="wrap-input__input" v-model="pass">
                </div>

                <div class="auth-from__item wrap-input">
                    <div class="wrap-input__name">password confirm</div>
                    <input type="password" class="wrap-input__input" v-model="passConfirm">
                </div>
            </div>

            <button type="submit" class="auth-from__btn">Отправить</button>
        </form>

    `,
};

const signEnabled = {
	template: `
    <div class="auth__enabled">
        <div class="auth__enabled-title">Вы вошли</div>
    </div>
    `,
};

const switchButton = {
	template: `
        <div class="auth__buttons">
            <button class="auth__btn" v-on:click="$emit('switchComp', 'sign-in')">Sign in</button>
            <button class="auth__btn" v-on:click="$emit('switchComp', 'sign-up')">Sign up</button>
        </div>
    `,
};

const formAuth = Vue.createApp({
	data() {
		return {
			enabledAccess: false,
			currentForm: null,
		};
	},

	methods: {
		switchCompClick(name) {
			this.currentForm = name;
		},
	},

	created() {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log(user);
				this.enabledAccess = true;
				this.currentForm = this.enabledAccess ? "sign-enabled" : "sign-in";
			} else {
				this.enabledAccess = false;
				this.currentForm = this.enabledAccess ? "sign-enabled" : "sign-in";
			}
		});
	},

	components: {
		"sign-in": signIn,
		"sign-up": signUp,
		"sign-enabled": signEnabled,
		"switch-button": switchButton,
	},
});

formAuth.mount(".auth");
