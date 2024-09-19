# Element-plus 表格行列转换

基于 Element-plus 表格的 行列转换的实现

## API

### Props

| 属性名             | 类型      | 默认    | 说明                                            |
| ------------------ | --------- | ------- | ----------------------------------------------- |
| `tableType`        | `Boolean` | `false` | true：竖向，false：横向                         |
| `tableData`        | `Array`   | `[]`    | 绑定 table 的 data                              |
| `columns`          | `Array`   | `[]`    | 表格的列（动态列）                              |
| `tableAttrs`       | `Object`  | `{}`    |  el-table 的属性 跟 element el-table 的属性同步 |
| `tableFun`         | `Object`  | `{}`    | el-table 的方法 跟 element el-table 的事件同步  |
| `firstColumnAttrs` | `Object`  | `{}`    |   第一列的属性 （转换列的表头）                 |
| `firstColumnFun`   | `Object`  | `{}`    | 第一列的方法（转换列的表头）                    |
| `isLink`           | `Boolean` | `false` |   第一列是否开启 link 模式                      |
| `linkAttrs`        | `Object`  | `'{}'`  |  el-link 的属性                                 |
| `linkFun`          | `Object`  | `'{}'`  |  el-link 的方法                                 |

### 事件

| Prop           | Description              | 形参    |
| -------------- | ------------------------ | ------- |
| `onSortChange` |   表格的排序             | row     |
| `setTable`     |   每一个单元格的点击事件 | key,row |

### columns

| 属性名   | 类型      | 默认    | 说明                                      |
| -------- | --------- | ------- | ----------------------------------------- |
| `attrs`  | `Boolean` | `false` | 某一列 el-table-column 的属性             |
| `fun`    | `Array`   | `[]`    | 某一列 el-table-column 的方法             |
| `isLink` | `Array`   | `[]`    | 某一列 el-table-column 是否开启 link 模式 |
