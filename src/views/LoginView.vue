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
export default {
    
}
</script>

<style scoped>

</style>