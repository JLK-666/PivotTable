<!-- 行列转换表格 -->
<template>
  <el-table
    :data="props.tableData"
    border
    class="w-full"
    v-if="!props.tableType"
    height="240px"
    @sort-change="onSortChange"
    v-bind="props.tableAttrs"
    v-on="props.tableEvent"
  >
    <el-table-column
      align="center"
      show-overflow-tooltip
      fixed
      min-width="170px"
      v-bind="props.firstColumnAttrs"
      v-on="props.firstColumnEvent"
    >
      <template #default="scope">
        <el-link
          @click="cellClick(props.firstColumnAttrs.prop, scope.row)"
          v-if="props.isLink"
          type="primary"
          v-bind="props.linkAttrs"
          v-on="props.linkEvent"
        >
          {{ scope.row[props.firstColumnAttrs.prop] }}
        </el-link>
        <div @click="cellClick(props.firstColumnAttrs.prop, scope.row)" v-else>
          {{ scope.row[props.firstColumnAttrs.prop] }}
        </div>
      </template>
    </el-table-column>

    <el-table-column
      v-for="column in props.columns"
      :prop="column.key"
      :label="column.label"
      :key="column.id"
      align="center"
      header-align="center"
      min-width="170px"
      v-bind="column.attrs"
      v-on="column.event"
    >
      <template #default="scope">
        <el-link
          @click="cellClick(column.key, scope.row)"
          v-if="column.isLink"
          type="primary"
          v-bind="props.linkAttrs"
          v-on="props.linkEvent"
        >
          {{ scope.row[column.key] }}
        </el-link>
        <div @click="cellClick(column.key, scope.row)" v-else>
          {{ scope.row[column.key] }}
        </div>
      </template>
    </el-table-column>
  </el-table>
  <el-table
    :data="rcTableData"
    border
    class="w-full"
    height="240px"
    v-bind="props.tableAttrs"
    v-on="props.tableEvent"
    v-else
  >
    <el-table-column
      align="center"
      show-overflow-tooltip
      min-width="170px"
      v-bind="props.firstColumnAttrs"
      v-on="props.firstColumnEvent"
    >
      <template #default="scope">
        <div>
          {{ scope.row[props.firstColumnAttrs.prop] }}
        </div>
      </template>
    </el-table-column>

    <el-table-column
      v-for="(column, index) in rcColumns"
      :prop="column.id"
      :key="column.key"
      :label="column[props.firstColumnAttrs.prop]"
      align="center"
      header-align="center"
      min-width="170px"
      v-bind="column.attrs"
      v-on="column.event"
    >
      <template #header>
        <el-link
          v-if="props.isLink"
          type="primary"
          @click="cellClick(props.firstColumnAttrs.prop, column)"
          v-bind="props.linkAttrs"
          v-on="props.linkEvent"
        >
          {{ column[props.firstColumnAttrs.prop] }}
        </el-link>
        <div v-else>
          {{ column[props.firstColumnAttrs.prop] }}
        </div>
      </template>
      <template #default="scope">
        <el-link
          @click="cellClick(props.columns[scope.$index].key, column)"
          v-if="props.columns[scope.$index].isLink"
          type="primary"
          v-bind="props.linkAttrs"
          v-on="props.linkEvent"
        >
          {{ scope.row[props.columns[scope.$index].key + index] }}
        </el-link>
        <div @click="cellClick(props.columns[scope.$index].key, column)" v-else>
          {{ scope.row[props.columns[scope.$index].key + index] }}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref, watch } from "vue";
defineOptions({
  name: "PivotTable"
});
const props = defineProps({
  tableType: {
    type: Boolean, // true：竖向，false：横向
    default: false
  },
  tableData: { type: Array, default: () => [] },
  columns: { type: Array, default: () => [] },
  firstColumnAttrs: {
    type: Object,
    default: () => ({})
  },
  firstColumnEvent: {
    type: Object,
    default: () => ({})
  },
  tableAttrs: {
    type: Object,
    default: () => ({})
  },
  tableEvent: {
    type: Object,
    default: () => ({})
  },
  isLink: {
    type: Boolean, //是否开启link模式
    default: false
  },
  linkAttrs: {
    type: Object,
    default: () => ({})
  },
  linkEvent: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(["cellClick", "onSortChange"]);
// 行列转换
const rcColumns = ref([]);
const rcTableData = ref([]);

function cellClick(key, row) {
  emit("cellClick", key, row);
}

watch(
  () => props.tableType,
  () => {
    if (props.tableType) {
      disposeData();
    }
  }
);

function disposeData() {
  if (props.tableType) {
    const newColumns = JSON.parse(JSON.stringify(props.columns));
    const newArr = [];
    newColumns.forEach((item) => {
      props.tableData.forEach((obj, i) => {
        item[props.firstColumnAttrs.prop] = item.label;

        Object.keys(obj).forEach((key) => {
          item[key + i] = obj[key];
        });
      });
    });
    props.tableData.forEach((item) => {
      newArr.push(item);
    });
    rcTableData.value = newColumns;
    rcColumns.value = newArr;
  }
}

function onSortChange(row) {
  emit("onSortChange", row);
}
</script>

<style lang="scss" scoped></style>
