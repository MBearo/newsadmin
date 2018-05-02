<template>
    <div>
        <div class="flex">
            <h3 class="flex-1">新闻列表</h3>
            <div class="flex-0">
                <el-button type="primary" icon="el-icon-plus" @click="addNews">添加新闻</el-button>
            </div>
        </div>
        <div class="">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="Username" label="账号">
                </el-table-column>
                <el-table-column prop="Password" label="密码">
                </el-table-column>
                <el-table-column prop="Permission" label="角色">
                </el-table-column>
                <el-table-column prop="Gender" label="性别">
                </el-table-column>
                <el-table-column prop="Email" label="邮箱">
                </el-table-column>
                <el-table-column prop="PhoneNumber" label="手机号" >
                </el-table-column>
                <!-- <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">
                            详情
                        </el-button>
                        <el-button type="text" size="small" class="color-danger">
                            删除
                        </el-button>
                    </template>
                </el-table-column> -->
            </el-table>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import urls from "../vuex/urls";
export default {
  created() {
    this.refresh();
   // this.$store.dispatch("CategoryAction");
  },
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.dialogTableVisible = false;
        })
        .catch(_ => {});
    },
    onSubmit() {
      this.$axios
        .post(
          urls.urls + "Graduation/ReadData",
          qs.stringify({
            batch: true,
            object: "news",
            priKey: "id"
          })
        )
        .then(result => {
          console.log(result);
          if (result.data.errorcode == 0) {
            result.data.data.list.forEach(value => {
              this.tableData.push(value);
            });
          } else {
            this.$message({
              showClose: true,
              message: result.data.msg,
              type: "error"
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.$message({
            showClose: true,
            message: "请检查网络连接",
            type: "error"
          });
        });
    },
    refresh() {
      this.$axios
        .get(
          this.$url2 + "Auserlist.php"
        )
        .then(result => {
          console.log(result.data);
          result.data.data.list.forEach(value => {
              this.tableData.push(value);
            });
        //   if (result.data.errorcode == 0) {
            
        //   } else {
        //     this.$message({
        //       showClose: true,
        //       message: result.data.msg,
        //       type: "error"
        //     });
        //   }
        })
        .catch(error => {
          console.log(error);
          this.$message({
            showClose: true,
            message: "请检查网络连接",
            type: "error"
          });
        });
    },
    sortFun(a, b) {
      return a.ReadTime - b.ReadTime;
    },
    addNews() {
      this.$router.push("AddNews");
    }
  }
};
</script>

<style scoped>
.nowrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
<style>
.el-button--text.color-danger:active {
  color: #d9534f;
}
.el-button--text.color-danger {
  color: #f5524e;
}
</style>
