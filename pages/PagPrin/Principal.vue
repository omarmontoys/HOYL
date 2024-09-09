<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col class="pt-0 pb-2 minecraft-font" xl="8" md="10" lg="10" sm="10" xs="12">
        <v-card class="elevation-2 pa-4" rounded="lg minecraft-font">
          <v-card-subtitle class="v-card-subtitle">
            <h3
              class="text-center minecraft-font"
              style="color: rgba(184, 116, 72, 1); font-size: 32px;"
            >
              Listado de Partidas
            </h3>
          </v-card-subtitle>
          <v-card-text>
            <v-row justify="space-between" class="mb-4">
              <v-col cols="12" md="6" sm="6" class="d-flex">
                <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="startDate"
                      label="Fecha de inicio"
                      prepend-icon="mdi-calendar"
                      clearable
                      @click:clear="startDate = null"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      dense
                      class="minecraft-font small-text"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="startDate" no-title scrollable @input="menu1 = false"></v-date-picker>
                </v-menu>

                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="endDate"
                      label="Fecha de fin"
                      prepend-icon="mdi-calendar"
                      clearable
                      @click:clear="endDate = null"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      dense
                      class="minecraft-font small-text"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="endDate" no-title scrollable @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="4" sm="6" class="d-flex justify-end">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Buscar por nombre"
                  single-line
                  hide-details
                  dense
                  class="minecraft-font search-field small-text"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-data-table
              :headers="headers"
              :items="filteredDesserts"
              class="minecraft-font"
              item-value="name"
              v-model="selectedItems"
              item-key="name"
            >
              <template v-slot:header.checkbox>
                <v-checkbox
                  :input-value="allSelected"
                  @click="toggleSelectAll"
                  class="minecraft-font"
                ></v-checkbox>
              </template>
              <template v-slot:item.checkbox="{ item }">
                <v-checkbox v-model="selectedItems" :value="item" class="minecraft-font"></v-checkbox>
              </template>
              <template v-slot:item.glutenfree="{ item }">
                <span v-if="item.glutenfree">Sí</span>
                <span v-else>No</span>
              </template>
            </v-data-table>
          </v-card-text>

          <v-row no-gutters justify="center" align="center" class="mt-4 minecraft-font">
            <v-col cols="4" class="pa-2">
              <v-btn class="mx-auto minecraft-font" color="primary" block @click="exportPDF">
                <v-icon left>mdi-file-pdf-box</v-icon> Exportar PDF
              </v-btn>
            </v-col>
            <v-col cols="4" class="pa-2">
              <v-btn class="mx-auto minecraft-font" color="primary" block @click="exportCSV">
                <v-icon left>mdi-file-excel</v-icon> Exportar CSV
              </v-btn>
            </v-col>
            <v-col cols="4" class="pa-2">
              <v-btn class="mx-auto minecraft-font" color="red" dark block @click="deleteSelected">
                <v-icon left>mdi-delete</v-icon> Eliminar
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  layout(context) {
    return "dashboard";
  },
})
export default class Principal extends Vue {
  public desserts = [
    { name: 'Jesus', calories: 1, fat: "12:42 PM 05/14/2024", glutenfree: false },
    { name: 'Francisco', calories: 2, fat: "12:42 PM 05/14/2024", glutenfree: true },
    { name: 'Hector', calories: 1, fat: "12:42 PM 05/14/2024", glutenfree: false }
  ];

  public headers = [
    { text: 'Nombre', value: 'name' },
    { text: 'Partida', value: 'calories' },
    { text: 'Fecha de Creacion', value: 'fat' },
    { text: 'Select', value: 'checkbox' }
  ];

  public selectedItems: any[] = [];
  public search: string = '';
  public startDate: string | null = null;
  public endDate: string | null = null;
  public menu1 = false;
  public menu2 = false;

  get allSelected() {
    return this.selectedItems.length === this.desserts.length;
  }

  get filteredDesserts() {
    const searchLower = this.search.toLowerCase();

    return this.desserts.filter((dessert) => {
      const nameMatch = dessert.name.toLowerCase().includes(searchLower);
      const dateMatch = this.dateInRange(dessert.fat);
      return nameMatch && dateMatch;
    });
  }
  dateInRange(dateString: string) {
    const dessertDate = new Date(dateString);
    const start = this.startDate ? new Date(this.startDate) : null;
    const end = this.endDate ? new Date(this.endDate) : null;

    if (start && end) {
      return dessertDate >= start && dessertDate <= end;
    } else if (start) {
      return dessertDate >= start;
    } else if (end) {
      return dessertDate <= end;
    }
    return true;
  }
  toggleSelectAll() {
    if (this.allSelected) {
      this.selectedItems = [];
    } else {
      this.selectedItems = [...this.desserts];
    }
  }

  exportPDF() {

    console.log("Exportar PDF");
  }

  exportCSV() {

    console.log("Exportar CSV");
  }

  deleteSelected() {
    this.desserts = this.desserts.filter(item => !this.selectedItems.includes(item));
    this.selectedItems = [];
  }
}
</script>

<style scoped lang="scss">
.minecraft-font {
  font-family: 'Minecraft', sans-serif;
}

.v-card {
  background: rgba(255, 255, 255, 0.468) !important;
}

.search-field {
  width: 100%;
}

.small-text {
  font-size: 12.5px;
}
</style>
