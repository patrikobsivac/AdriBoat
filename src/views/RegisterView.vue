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


</script>

<style>
.card-border {
	padding: 2%;
}

.card-text-border {
	padding: 2.5%;
}

.card-actions {
	display: flex;
	align-items: center;
	justify-content: flex-end;
}

.btn-right-margin {
	margin-right: 2%;
}
</style>
