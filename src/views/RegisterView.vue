<template>
	<v-container fill-height fluid class="bg-light">
		<v-row align="center" justify="center">
			<v-col align="center" justify="center" cols="12">
				<v-card class="custom-card" width="500px" outlined>
					<v-card-title align="left" class="primary--text">Registracija</v-card-title>
					<v-card-subtitle align="left">
						Unesite podatke za registraciju
					</v-card-subtitle>
					<v-card-text class="custom-card-text">
						<v-form v-model="valid">
							<v-text-field
								v-model="fullName"
								dense
								label="Ime i prezime"
								clearable
								:rules="[rules.required]"
								outlined></v-text-field>
							<v-text-field
								v-model="userOIB"
								dense
								label="OIB"
								clearable
								type="text"
								:rules="[rules.required, rules.oib]"
								outlined></v-text-field>
							<v-text-field
								v-model="email"
								dense
								label="E-mail"
								clearable
								type="email"
								:rules="[rules.required, rules.email]"
								outlined></v-text-field>
							<v-text-field
								v-model="phoneNumber"
								dense
								label="Broj telefona"
								clearable
								type="tel"
								:rules="[rules.required, rules.phoneNumber]"
								outlined></v-text-field>
							<v-text-field
								v-model="street"
								dense
								label="Ulica"
								clearable
								:rules="[rules.required]"
								outlined></v-text-field>
							<v-text-field
								v-model="city"
								dense
								label="Mjesto"
								clearable
								:rules="[rules.required]"
								outlined></v-text-field>
							<v-text-field
								v-model="postalCode"
								dense
								label="Poštanski broj"
								clearable
								type="text"
								:rules="[rules.required, rules.postalCode]"
								outlined></v-text-field>
							<v-text-field
								v-model="password"
								dense
								label="Zaporka"
								clearable
								:append-icon="showIcon ? 'mdi-eye' : 'mdi-eye-off'"
								:rules="[rules.required, rules.min]"
								:type="showIcon ? 'text' : 'password'"
								@click:append="togglePasswordVisibility"
								outlined></v-text-field>
						</v-form>
					</v-card-text>
					<v-card-actions class="custom-card-actions">
						<v-btn
							color="red darken-3"
							outlined
							@click="clearFormData">
							Očisti
						</v-btn>
						<v-btn
							:disabled="isButtonDisabled"
							outlined
							color="primary"
							@click="registerUser">
							Potvrdi
						</v-btn>
					</v-card-actions>
				</v-card>
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
</style>
