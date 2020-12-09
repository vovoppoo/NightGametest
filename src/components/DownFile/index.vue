<template>
    <el-button :loading="disabledDown" type="text" size="small" class="a"
               @click="downFileFn(fileData)">下载
    </el-button>
</template>

<script>
  import apiConfig from '../../apiconfig'
  import Axios from "axios";

  export default {
    name: "index",
    props: {
      fileData: Object,
    },
    data() {
      return {
        disabledDown: false
      }
    },
    methods: {
      downFileFn() {
        let domin = apiConfig.resourcesDomain
        let {fileData} = this
        let url = `${domin}/download/${fileData.resourceId}`
        this.disabledDown = true
        Axios.get(url, {
          responseType: 'blob'
        }).then((res) => {
          const blob = res.data;
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = (e) => {
            this.disabledDown = false
            const a = document.createElement('a');
            a.download = `${fileData.title}.${fileData.type}`;
            a.href = e.target.result;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          };
        }).catch((err) => {
          this.disabledDown = false
          this.$message({
            message: '下载失败',
            type: 'warning',
          });
          console.log(err);
        });
      }

    }
  }
</script>

<style scoped>

</style>