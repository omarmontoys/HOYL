<template>
  <v-app>
    <template>
      <v-app-bar color="primary" dark app>
        <v-spacer></v-spacer>

          <v-toolbar-title class="minecraft-font ">
            HOYL
          </v-toolbar-title>

        <v-spacer></v-spacer>
     
        <v-btn icon  to="/">
          <v-icon>mdi-exit-to-app</v-icon>
        </v-btn>
      </v-app-bar>
    </template>



    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>


<style scoped lang="scss">
.minecraft-font {
  font-family: 'Minecraft', sans-serif;
}
a {
  color: white !important;
  text-decoration: none !important;
}

</style>