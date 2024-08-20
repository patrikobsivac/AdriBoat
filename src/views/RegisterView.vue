<template>
	<v-container fill-height fluid class="background">
		<v-row align="center" justify="center">
			<v-col align="center" justify="center" cols="12">
				<v-card class="card-border" width="600px" outlined>
					<v-card-title align="left">Registracija firme</v-card-title>
					<v-card-text>
						<v-form v-model="valid">
							<v-text-field
								v-model="companyName"
								dense
								label="Ime firme"
								clearble
								type="text"
								outlined></v-text-field>
							<v-text-field
								v-model="ownerFullName"
								dense
								label="Ime i prezime vlasnika"
								clearble
								type="text"
								outlined></v-text-field>
                                <v-text-field
								v-model="userOIB"
								dense
								label="OIB"
								clearble
								type="integer"
								outlined></v-text-field>
							<v-text-field
								v-model="email"
								dense
								label="E-mail firme"
								clearble
								type="email"
								:rules="[rules.required, rules.email]"
								outlined></v-text-field>
							<v-text-field
								v-model="password"
								dense
								label="Zaporka"
								clearble
								:append-icon="
									showIcon ? 'mdi-eye' : 'mdi-eye-off'
								"
								:rules="[rules.required, rules.min]"
								:type="showIcon ? 'text' : 'password'"
								outlined></v-text-field>
						</v-form>
					</v-card-text>
					<v-card-actions class="card-actions">
						<v-btn
							class="btn-right-margin"
							@click="clearFormData"
							color="red darken-3"
							outlined>
							CLEAR
						</v-btn>
						<v-btn
							:disabled="isButtonDisabled"
							outlined
							@click="registerUser">
							OK
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
