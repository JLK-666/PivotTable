<template>
  <div class="h-full w-full p-[20px]">
    <div class="flex justify-end mb-[20px]">
      <el-button @click="tableRowsToColumns">行列转换</el-button>
    </div>
    <div>
      <PivotTable
        :tableAttrs="{
          cellStyle
        }"
        :columns="columns"
        :tableData="tableData"
        :firstColumnAttrs="firstColumnAttrs"
        :tableType="tableType"
        :isLink="false"
        @cellClick="cellClick"
        @onSortChange="onSortChange"
      ></PivotTable>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
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

function cellClick(key, row) {
  console.log(1111, key, row);
  if (key == "houseName") {
  } else if (key == "farm") {
  }
}

const average = ref(3);

setTimeout(() => {
  average.value = 2;
}, 5000);

function cellStyle({ row, column, rowIndex, columnIndex }) {
  //根据业务定制
  let classStr = {};

  if (!tableType.value) {
    if (columnIndex > 0) {
      if (columns.value[columnIndex - 1].name.includes("温度")) {
        if (Number(row[columns.value[columnIndex - 1].key]?.split("°C")[0]) > average.value) {
          classStr = { backgroundColor: "#f89898", color: "white" };
        } else if (Number(row[columns.value[columnIndex - 1].key]?.split("°C")[0]) < average.value) {
          classStr = { backgroundColor: "#79bbff", color: "white" };
        }
      }
    }
  } else {
    if (columns.value[rowIndex].name.includes("温度")) {
      if (Number(row[`${columns.value[rowIndex].key}${columnIndex - 1}`]?.split("°C")[0]) > average.value) {
        classStr = { backgroundColor: "#f89898", color: "white" };
      } else if (Number(row[`${columns.value[rowIndex].key}${columnIndex - 1}`]?.split("°C")[0]) < average.value) {
        classStr = { backgroundColor: "#79bbff", color: "white" };
      }
    }
  }

  return classStr;
}
</script>
<style></style>
