<template>
	<v-container fill-height fluid class="bg-light">
		<v-row align="center" justify="center">
			<v-col align="center" justify="center" cols="12">
				<v-card class="custom-card" width="500px" outlined>
					<v-card-title align="left" class="primary--text">Prijava</v-card-title>
					<v-card-subtitle align="left">
						Unesite podatke za prijavu
					</v-card-subtitle>
					<v-card-text class="custom-card-text">
						<v-form v-model="isValid">
							<v-text-field
								v-model="userEmail"
								dense
								label="E-mail"
								clearable
								type="email"
								:rules="[fieldRules.required, fieldRules.email]"
								outlined></v-text-field>
							<v-text-field
								v-model="userPassword"
								dense
								label="Lozinka"
								clearable
								:append-icon="togglePassword ? 'mdi-eye' : 'mdi-eye-off'"
								:rules="[fieldRules.required, fieldRules.minLength]"
								:type="togglePassword ? 'text' : 'password'"
								@click:append="togglePasswordVisibility"
								outlined></v-text-field>
						</v-form>
						<v-btn
							@click="showPasswordDialog"
							class="text-left"
							text
							small
							color="blue lighten-2">
							Zaboravljena lozinka?
						</v-btn>
						<v-btn
							outlined
							small
							color="teal darken-1"
							to="/registracija_firme">
							Niste registrirani? Kliknite ovdje
						</v-btn>
					</v-card-text>
					<v-card-actions class="custom-card-actions">
						<v-btn
							@click="submitLogin"
							:disabled="disableLoginButton"
							outlined
							color="primary">
							Potvrdi
						</v-btn>
					</v-card-actions>
				</v-card>
				<v-dialog
					width="350px"
					persistent
					v-model="passwordResetDialog">
					<v-card>
						<v-card-title>Resetiraj Lozinku</v-card-title>
						<v-card-subtitle>
							Unesite svoj e-mail za resetiranje lozinke
						</v-card-subtitle>
						<v-card-text>
							<v-text-field
								v-model="emailForPasswordReset"
								dense
								label="E-mail"
								clearable
								type="text"
								:rules="[fieldRules.required, fieldRules.email]"
								outlined></v-text-field>
						</v-card-text>
						<v-card-actions>
							<v-btn
								color="red"
								outlined
								text
								small
								@click="closePasswordDialog">
								Zatvori
							</v-btn>
							<v-btn
								outlined
								small
								color="green darken-2"
								@click="sendResetLink(emailForPasswordReset)">
								Pošalji
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { doc, auth, db, setDoc, createUserWithEmailAndPassword } from "../../firebase.js";
export default {
	name: "RegisterView",
	data() {
		return {
			isButtonDisabled: false,
			valid: true,
			fullName: null,
			userOIB: null,
			email: null,
			password: null,
			phoneNumber: null,
			street: null,
			city: null,
			postalCode: null,
			showIcon: false,
			rules: {
				required: (value) => !!value || "Ovo polje je obavezno",
				min: (v) => v?.length >= 6 || "Zaporka mora imati najmanje 6 znakova!",
				email: (v) =>
					!v ||
					/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
					"E-mail mora biti valjan",
				oib: (v) => /^\d{11}$/.test(v) || "OIB mora sadržavati 11 znamenki!",
				phoneNumber: (v) =>
					/^\+?(\d.*){3,}$/.test(v) || "Broj telefona mora biti valjan!",
				postalCode: (v) =>
					/^\d{5}$/.test(v) || "Poštanski broj mora sadržavati 5 znamenki!",
			},
		};
	},
	watch: {
		valid(newVal) {
			this.isButtonDisabled = !newVal;
		},
	},
	methods: {
		clearFormData() {
			this.fullName = null;
			this.userOIB = null;
			this.email = null;
			this.password = null;
			this.phoneNumber = null;
			this.street = null;
			this.city = null;
			this.postalCode = null;
		},
		postActionMoveToView() {
			this.$router.push({ path: "/" });
		},
		async saveAdditionalData(user, email, fullName, userOIB, phoneNumber, street, city, postalCode) {
			await setDoc(doc(db, "users", email), {
				Email: email,
				FullName: fullName,
				OIB: userOIB,
				PhoneNumber: phoneNumber,
				Street: street,
				City: city,
				PostalCode: postalCode,
				AuthorisationType: "USER",
			});
		},
		registerUser() {
			const email = this.email;
			const password = this.password;
			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					const user = userCredential.user;
					const fullName = this.fullName;
					const userOIB = this.userOIB;
					const phoneNumber = this.phoneNumber;
					const street = this.street;
					const city = this.city;
					const postalCode = this.postalCode;
					this.saveAdditionalData(user, email, fullName, userOIB, phoneNumber, street, city, postalCode);
					this.postActionMoveToView();
				})
				.catch((error) => {
					alert("Error: " + error.message);
				});
		},
		togglePasswordVisibility() {
			this.showIcon = !this.showIcon;
		},
	},
};
</script>


<style scoped>
.bg-light {
	background-color: #f4f4f4;
}

.custom-card {
	border-radius: 10px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.primary--text {
	color: #1e88e5 !important;
}

.custom-card-text {
	padding-top: 20px;
}

.custom-card-actions {
	justify-content: flex-end;
}

.text-left {
	margin-left: 0;
}

.text-right {
	margin-right: 0;
}
</style>