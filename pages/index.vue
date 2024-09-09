<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col class="pt-0 pb-2" xl="4" md="6" lg="6" sm="10" xs="12">
        <v-card class="elevation-2 pa-4" rounded="lg">
          <v-row align="center" justify="center">
            <v-col cols="10">
              <v-card-subtitle class="v-card-subtitle">
                <h3
                  class="text-center minecraft-font"
                  style="color: rgba(184, 116, 72, 1); font-size: 32px;"
                >
                  HOYL
                </h3>
                </br>
                <h5
                  class="text-center minecraft-font"
                  style="color: rgba(198, 125, 77, 1); font-size: 24px;"
                >
                  Iniciar Sesión  
                </h5>
              </v-card-subtitle>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    class="minecraft-font small-text" 
                    outlined
                    label="Correo eléctronico"
                    prepend-inner-icon="mdi-email"
                  ></v-text-field>
                  <v-text-field
                    class="minecraft-font small-text" 
                    label="Contraseña"
                    filled
                    outlined
                  ></v-text-field>
                  <v-row no-gutters justify="center" align="center">
                    <v-col cols="12">
                      <v-btn
                        class="mx-auto col-md-11 minecraft-font"
                        color="primary"
                        dense
                        block
                        to="/PagPrin/Principal"
                      >
                        Iniciar Sesión
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default class Login extends Vue {

}
</script>

<style scoped lang="scss">
.minecraft-font {
  font-family: 'Minecraft', sans-serif;
}

.small-text {
  font-size: 12px;
}

.v-card {
  background: rgba(255, 255, 255, 0.468) !important;
}

.v-card-title {
  display: block !important;
}

.img {
  height: 22px;
  max-width: 15px;
}

.img-f {
  height: 18px;
  max-width: 15px;
}
</style>
