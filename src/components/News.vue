<template>
    <div>
        <div class="flex">
            <h3 class="flex-1">新闻列表</h3>
            <div class="flex-0">
                <el-button type="primary" icon="el-icon-plus" @click="dialogTableVisible=true">添加新闻</el-button>
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
                <el-table-column prop="ReadTime" label="阅读次数">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" size="small">
                            详情
                        </el-button>
                        <el-button type="text" size="small" class="color-danger">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="新建新闻" :visible.sync="dialogTableVisible" :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="新闻标题">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="新闻内容">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button @click="handleClose">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
export default {
  created() {
    this.refresh();
  },
  data() {
    return {
      tableData: [],
      dialogTableVisible: false,
      form: {
        name: "",
        desc: ""
      }
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
          this.$url + "Graduation/ReadData",
          this.$qs.stringify({
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
        .post(
          this.$url + "Graduation/ReadData",
          this.$qs.stringify({
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

