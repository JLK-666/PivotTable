import type { App } from "vue";
import PivotTable from "./pivotTable.vue";
export default {
  install(app: App<Element>) {
    app.component(PivotTable.name!, PivotTable);
  }
};
