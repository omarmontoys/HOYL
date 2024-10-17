<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col class="pt-0 pb-2" xl="8" md="10" lg="10" sm="10" xs="12">
        <v-card class="elevation-2 pa-4" rounded="lg minecraft-font">
          <v-card-subtitle class="v-card-subtitle">
            <h3
              class="text-center minecraft-font"
              style="color: rgba(184, 116, 72, 1); font-size: 32px;"
            >
              Listado de Jugadores
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
                  class="search-field"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-data-table
              :headers="headers"
              :items="filteredPlayers"
              item-value="username"
              v-model="selectedItems"
              item-key="id"
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
import { namespace } from "vuex-class/lib/bindings";
import { Player } from "~/gql/graphql";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";

const UserModule = namespace("UserModule");

@Component({
  layout(context) {
    return "dashboard";
  },
})
export default class Principal extends Vue {
  public selectedItems: any[] = [];
  public search: string = "";
  public startDate: string | null = null;
  public endDate: string | null = null;
  public menu1 = false;
  public menu2 = false;

  @UserModule.State("players")
  private players!: Player[];

  @UserModule.Action
  fetchPlayers!: () => Promise<void>;

  public headers = [
    { text: "Nombre", value: "username" },
    { text: "Partida", value: "calories" },
    { text: "Fecha de Creacion", value: "fat" },
    { text: "Select", value: "checkbox" },
  ];

  get allSelected() {
    return this.selectedItems.length === this.filteredPlayers.length;
  }

  get filteredPlayers() {
    const searchLower = this.search.toLowerCase();
    return (this.players || [])
      .filter((player) => player.username.toLowerCase().includes(searchLower))
      .sort((a, b) => parseInt(a.id) - parseInt(b.id));
  }

  toggleSelectAll() {
    if (this.allSelected) {
      this.selectedItems = [];
    } else {
      this.selectedItems = [...this.filteredPlayers];
    }
  }

  exportPDF() {
    const doc = new jsPDF({
      orientation: "landscape", // Orientación horizontal
      unit: "mm",
      format: "a4",
    });

    const img = new Image();
    img.src = "/Logo.png";

    img.onload = () => {
      // Agregar imagen al PDF
      doc.addImage(img, "PNG", 10, 10, 40, 30);
      
      // Información adicional del reporte
      doc.setFontSize(12);
      doc.text('Fecha: día/mes/año', 120, 35);
      doc.text('HOYL', 180, 35);
      doc.text('Usuario(s) seleccionados: Todos', 16, 50);
      doc.text(`Fecha: ${this.startDate || "N/A"} ---- ${this.endDate || "N/A"}`, 14, 40);
      
      // Añadir tabla con datos
      const headers = [
        ["Usuario", "Edad", ...Array.from({ length: 27 }, (_, i) => `P ${i + 1}`), "Total"],
      ];

      const rows = this.players.map((player) => {
        const answers = player.answers.map((a) => a.answer);
        const total = answers.reduce((acc, val) => acc + val, 0);
        return [player.username, `${player.age} años`, ...answers, total];
      });

      autoTable(doc, {
        head: headers,
        body: rows,
        startY: 60, // Posición de inicio de la tabla
        theme: "grid",
      });

      // Guardar el PDF
      doc.save("jugadores.pdf");
    };

    img.onerror = (err) => {
      console.error("Error al cargar la imagen:", err);
    };
  }

  exportCSV() {
    let csvContent = "ID,Nombre\n";
    this.selectedItems.forEach((player) => {
      csvContent += `"${player.id}","${player.username}"\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "jugadores_seleccionados.csv");
  }

  deleteSelected() {
    this.players = this.players.filter((player) => !this.selectedItems.includes(player));
    this.selectedItems = [];
  }

  async mounted() {
    await this.fetchPlayers();
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
</style>
