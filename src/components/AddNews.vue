<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="图片">
                <el-upload class="flex-0" style="margin:10px 0;" action="none" :show-file-list="false" :before-upload="beforeUpload" list-type="picture">
                    <el-button type="primary" :loading="uploadLoad">{{uploadText}}</el-button>
                </el-upload>
                <img :src="imgUrl" alt="">
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="内容">
                <el-input v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item label="分类">
                <el-select v-model="categoryActive" placeholder="请选择">
                    <el-option v-for="item in $store.state.category" :key="item.Id" :label="item.Name" :value="item.Id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSumbit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      uploadLoad: false,
      uploadText: "选择图片",
      form: {
        title: "",
        content: ""
      },
      imgUrl: "",
      imgUrl2:'',
      categoryActive: ""
    };
  },
  methods: {
    beforeUpload(file) {
      //判断图片大小及类型
      console.log(file.type);
      if (file.size / 1024 / 1024 > 2) {
        this.$message({
          showClose: true,
          message: "文件超过2M，请压缩或裁剪后上传",
          type: "error"
        });
        return false;
      }
      if (
        file.type != "image/jpeg" &&
        file.type != "image/jpg" &&
        file.type != "image/png" &&
        file.type != "image/gif" &&
        file.type != "image/webp"
      ) {
        this.$message({
          showClose: true,
          message: "请选择jpg，jpeg，png，gif格式的图片",
          type: "error"
        });
        return false;
      }

      this.uploadText = "上传中";
      this.uploadLoad = true;

      let fd = new FormData();
      fd.append("file", file);
      this.$axios
        .post(this.$url + "Graduation/UploadImage", fd, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(result => {
          console.log(result);
          if (result.data.errorcode == 0) {
            this.$message({
              showClose: true,
              message: "上传成功",
              type: "success"
            });
            //let str=result.data.data.list[0].UploadFilename;
            this.imgUrl =
              "" + this.$url + result.data.data.list[0].UploadFilename;
             this.imgUrl2=result.data.data.list[0].UploadFilename
          } else {
            this.$message({
              showClose: true,
              message: result.data.msg,
              type: "error"
            });
          }
          this.uploadText = "选择图片";
          this.uploadLoad = false;
        })
        .catch(_ => {
          this.$message({
            showClose: true,
            message: "请检查网络连接",
            type: "error"
          });
        });
      return false;
    },
    onSumbit() {
      this.$axios
        .post(
          this.$url + "Graduation/InsertData",
          this.$qs.stringify({
            object: "news",
            title: this.form.title,
            content: this.form.content,
            imgUrl: this.imgUrl2,
            category: this.categoryActive,
            author: this.$store.state.user.name
          })
        )
        .then(result => {
          console.log(result.data);
          if (result.data.errorcode == 0) {
            this.$message({
              showClose: true,
              message: "上传成功",
              type: "success"
            });
            this.form.title=''
            this.form.content=''
            this.imgUrl=''
            this.categoryActive=''
          } else {
            this.$message({
              showClose: true,
              message: result.data.msg,
              type: "error"
            });
          }
        })
        .catch(_ => {
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

<style>

</style>
