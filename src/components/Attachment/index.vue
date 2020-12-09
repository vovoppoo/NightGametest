<template>
  <div class="sf-attachment-wrap">
    <a class="attachment-item" v-for="(item, index) in files" :key="index" href="javascript:void(0)"
       @click="openNew(domin,item.resourceId,item.type)">{{item.title}}.{{item.type}}</a>
  </div>
</template>

<script>
  import apiConfig from '../../apiconfig'

  export default {
    props: {
      files: Array,
    },
    data() {
      return {
        domin: apiConfig.resourcesDomain,
      }
    },
    methods: {
      openNew(domin, resourceId, type) {
        // var tempwindow=window.open('_blank')
        // tempwindow.location=`${domin}/${resourceId}`
        if (type === 'pdf' || type === 'png' || type === 'jpg' || type === 'gif') {
          setTimeout(() => {
            window.open(`${domin}/${resourceId}`, '_blank', 'width=1080px,height=720px,top=100px,left=0px')
          }, 100);
        } else {
            this.$message({
                message: '暂不支持此格式在线查看,请尝试下载！',
                type: 'warning',
            });
        }
      }
    }
  }
</script>

<style lang="less">
  .sf-attachment-wrap {
    width: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;

    .attachment-item {
      width: 100%;
    }
  }
</style>
