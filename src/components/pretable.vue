
<template>
  <div>
    <!--  excel表格上传  -->
    <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      multiple
      accept="application/vnd.openxmlformats-    
        officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
      :on-exceed="exceed"
      :limit="1"
      :on-remove="remove"
      :http-request="uploadFile"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">
        1次只能上传1个xls文件，且不超过500kb
      </div>
    </el-upload>
    <!--  上传的excel表格预览  -->
    <div class="preview-excel">
      <!-- <el-table
        class="listTable_ele"
        v-show="listTable.length != 0"
        :data="listTable"
        stripe
        height="250"
        style="width: 100%"
      >
        <el-table-column
          prop="stu"
          width="200"
          align="center"
        ></el-table-column>
      </el-table> -->
      <div v-show="listTable.length != 0">
        <div v-for="item in listTable" :key="item.id" class="stu">
          {{ item.stu }}
        </div>
      </div>
    </div>
    <div v-text="text" ></div>
  </div>
</template>
 
<script>
import XLSX from "xlsx"; //引入xlsx
export default {
  name: "pretable",
  data() {
    return {
      listTable: [],
    };
  },
  methods: {
    //解析excel
    async uploadFile(params) {
      const _file = params.file;
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary",
          });
          for (let sheet in workbook.Sheets) {
            //循环读取每个文件
            const sheetArray = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
            //若当前sheet没有数据，则continue
            if (sheetArray.length == 0) {
              continue;
            }
            for (let item in sheetArray) {
              let rowTable = {};
              //这里的rowTable的属性名注意要与上面表格的prop一致
              //sheetArray的属性名与上传的表格的列名一致
              rowTable.stu = sheetArray[item].stu;
              rowTable.classNum = sheetArray[item].classNum;
              this.listTable.push(rowTable);
            }
            let ary = cherryJSON.stulist;
            console.log('shuzushuzu')
            console.log(ary);
          }
        } catch (e) {
          this.$message.warning("文件类型不正确！");
        }
      };
      fileReader.readAsBinaryString(_file);
    },
    //上传1个以上文件时弹窗提示错误
    exceed: function () {
      this.$message.error("最多只能上传1个xls文件");
    },
    //删除文件
    remove() {
      this.listTable = [];
    },
  },
};
</script>