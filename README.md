# Element-plus 表格行列转换

基于 Element-plus 表格的 行列转换的实现

### 安装

```bash
npm i jlk-pivottable
```

```js
/* main.js */
import { createApp } from "vue";
import App from "./App.vue";
import PivotTable from "jlk-pivottable";
const app = createApp(App);
app.use(PivotTable);
```

## API

### 表格的属性

| 属性名             | 类型      | 默认    | 说明                                            |
| ------------------ | --------- | ------- | ----------------------------------------------- |
| `tableType`        | `Boolean` | `false` | true：竖向，false：横向                         |
| `tableData`        | `Array`   | `[]`    | 绑定 table 的 data                              |
| `columns`          | `Array`   | `[]`    | 表格的列（动态列）                              |
| `tableAttrs`       | `Object`  | `{}`    |  el-table 的属性 跟 element el-table 的属性同步 |
| `tableEvent`       | `Object`  | `{}`    | el-table 的方法 跟 element el-table 的事件同步  |
| `firstColumnAttrs` | `Object`  | `{}`    |   第一列的属性 （转换列的表头）                 |
| `firstColumnEvent` | `Object`  | `{}`    | 第一列的方法（转换列的表头）                    |
| `isLink`           | `Boolean` | `false` |   第一列是否开启 link 模式                      |
| `linkAttrs`        | `Object`  | `{}`    |  el-link 的属性                                 |
| `linkEvent`        | `Object`  | `{}`    |  el-link 的方法                                 |

### 事件

| Prop           | Description              | 形参                      |
| -------------- | ------------------------ | ------------------------- |
| `onSortChange` |   表格的排序             | row                       |
| `cellClick`    |   每一个单元格的点击事件 | key,row                   |
| `setTableData` |   更新表格数据方法       | idName, idValue, key, val |

### 单列的属性

| 属性名   | 类型      | 默认    | 说明                                      |
| -------- | --------- | ------- | ----------------------------------------- |
| `attrs`  | `Boolean` | `false` | 某一列 el-table-column 的属性             |
| `event`  | `Array`   | `[]`    | 某一列 el-table-column 的方法             |
| `isLink` | `Array`   | `[]`    | 某一列 el-table-column 是否开启 link 模式 |

### 使用案例

````html
...
<PivotTable
  ref="pivotTable"
  :tableAttrs="{
        cellStyle
      }"
  :columns=" columns"
  :tableData="tableData"
  :firstColumnAttrs="firstColumnAttrs"
  :tableType="tableType"
  :isLink=" false "
  :linkAttrs="{
        style: 'color: #409eff'
      }"
  @cellClick="cellClick"
  @onSortChange="onSortChange"
></PivotTable>
... ```
````

```js
let firstColumnAttrs = {
  prop: "organization",
  label: "组织区域",
  firstMinWidth: "130px"
};

const tableData = ref([
  {
    houseName: "9200",
    temperatureDifference: "2°C",
    extremeHumidity: "50%",
    CO2: "29ppm",
    farm: "test-1",
    organization: "组织区域1",
    houseCode: 4564554
  },
  {
    houseName: "9100",
    temperatureDifference: "3°C",
    extremeHumidity: "50%",
    CO2: "29ppm",
    farm: "test-1",
    organization: "组织区域1"
  },
  {
    houseName: "9010",
    temperatureDifference: "3°C",
    extremeHumidity: "50%",
    CO2: "30ppm",
    farm: "test-1",
    organization: "组织区域1"
  },
  {
    temperatureDifference: "4°C",
    houseName: "9100plus",
    extremeHumidity: "50%",
    CO2: "34ppm",
    farm: "test-1",
    organization: "组织区域1"
  }
]);

const columns = ref([
  {
    key: "farm",
    label: "鸡场",
    name: "鸡场",
    isLink: true,
    attrs: {
      fixed: true,

      minWidth: "100px"
    }
  },
  {
    key: "houseName",
    label: "鸡舍",
    name: "鸡舍",
    isLink: true,
    attrs: {
      fixed: true,

      minWidth: "100px"
    }
  },
  {
    key: "temperatureDifference",
    name: "温度极差",
    label: "温度极差",
    attrs: {
      sortable: "custom",
      minWidth: "500px"
    }
  },
  {
    key: "extremeHumidity",
    name: "湿度极差",
    label: "湿度极差",

    attrs: {
      sortable: "custom",
      minWidth: "500px"
    }
  },
  {
    key: "CO2",
    name: "CO₂极差",
    label: "CO₂极差",
    minWidth: "500px",
    attrs: {
      sortable: "custom",
      minWidth: "500px"
    }
  }
]);
const tableType = ref(false);
// 行列转换

function tableRowsToColumns() {
  tableType.value = !tableType.value;
}

function onSortChange(row) {
  console.log(1111, row);
}

let pivotTable = ref(null);

setTimeout(() => {
  pivotTable.value.setTableData("id", "3", "temperatureDifference", "8°C");
}, 2000);

function cellClick(key, row) {
  console.log(1111, key, row);
  if (key == "houseName") {
  } else if (key == "farm") {
  }
}
```
