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
        <el-table-column prop="Title" label="标题">
        </el-table-column>
        <el-table-column label="内容">
          <template slot-scope="scope">
            <span class="nowrap">
              {{scope.row.Content}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="Author" label="作者">
        </el-table-column>
        <el-table-column prop="PublishDate" label="创建时间">
        </el-table-column>
        <el-table-column prop="Category" label="分类">
        </el-table-column>
        <el-table-column prop="ReadTime" label="阅读次数" sortable :sort-method="sortFun">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="small">
              详情
            </el-button> -->
            <el-button type="text" size="small" class="color-danger" @click="deletes(scope.row.Id)">
              删除
            </el-button>
          </template>
        </el-table-column>
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
    this.$store.dispatch("CategoryAction");
  },
  data() {
    return {
      tableData: []
    };
  },
  methods: {
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
    deletes(id) {
      this.$confirm("此操作将永久删除该新闻, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post(
              urls.urls + "Graduation/DeleteData",
              qs.stringify({
                object: "news",
                priKey: "id",
                value: id
              })
            )
            .then(result => {
              console.log(result);
              this.refresh();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            })
            .catch(error => {
              console.log(error);
              this.$message({
                showClose: true,
                message: "请检查网络连接",
                type: "error"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    refresh() {
      this.$axios
        .post(
          this.$url + "Graduation/ReadData",
          this.$qs.stringify({
            batch: true,
            object: "news",
            ascOrDesc: "DESC",
            orderBy: "Id"
          })
        )
        .then(result => {
          console.log(result.data);
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

