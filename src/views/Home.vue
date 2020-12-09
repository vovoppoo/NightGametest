<template>
    <div class="home" :class="{'shows':show}">
        <div class="nav-row">
            <div class="title-item">
                <div class="image-icon">
                    <img src="./../assets/image/signin-logo.png" alt=""/>
                </div>
                深圳市气象局(台)项目一体化管理平台
            </div>
            <div class="menu-item">
                <el-menu
                        :default-active="activeIndex2"
                        class="el-menu-demo"
                        mode="horizontal"
                        @select="handleSelect"
                        text-color="#fff"
                        :router="true"
                        active-text-color="#fff">
                    <el-menu-item index="1" :route="{path: '/home/project/1/20'}">项目管理</el-menu-item>
                    <el-menu-item index="2" v-if="role===1 || role===2" :route="{path: '/home/developManage/1/10'}">数据统计
                    </el-menu-item>
                    <el-menu-item index="3" v-if="role===1 || role===2" :route="{path: '/home/financeManage/1/5'}">规划管理
                    </el-menu-item>
                    <el-menu-item index="4" v-if="role===1 || role===2" :route="{path: '/home/fileManage/1/10'}">文档管理
                    </el-menu-item>
                    <el-menu-item index="6" v-if="role===1" :route="{path: '/home/journal/1/10'}">日志管理
                    </el-menu-item>
                    <el-menu-item index="5" v-if="role===1" :route="{path: '/home/userList/1/10'}">用户管理</el-menu-item>
                </el-menu>
            </div>
            <div class="login-info-item">
                <el-dropdown trigger="click" @command="handleClick">
          <span class="el-dropdown-link">
            <span v-if="showName">
                  您好！{{name}}({{roleArr[role]}})
            </span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
                    <el-dropdown-menu slot="dropdown">
                        <!--            <el-dropdown-item command="a" icon="el-icon-s-custom">用户管理</el-dropdown-item>-->
                        <el-dropdown-item command="b" icon="el-icon-right">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>

        </div>
        <router-view/>
        <!--    <HelloWorld msg="Welcome to Your Vue.js App" />-->
    </div>
</template>


<style lang="less" scoped>


    .table-el {
        position: fixed;
        top: 60px;
        z-index: 5;
        height: 60px;
        overflow-y: hidden;
        width: 100%;


        .table-view {
            padding: 0 117px 0 100px;
        }
    }

    .nav-row {
        background-image: linear-gradient(to right, #FDAF3E, #FD7E3F);
        display: flex;
        position: fixed;
        justify-content: space-between;
        width: 100%;
        z-index: 10;


        .menu-item {
            .el-menu-demo {
                background: transparent;

                .el-menu--horizontal > .el-menu-item.is-active {
                    border-bottom: 2px solid white !important;
                    font-size: 18px !important;
                }

                .el-menu-item {
                    height: 58px;
                    font-size: 18px;
                }
            }

            .el-menu-demo.el-menu--horizontal {
                border: none;
            }
        }

        .title-item {
            color: white;
            font-size: 30px;
            height: 60px;
            display: flex;
            align-items: center;
            padding-left: 60px;
        }

        .image-icon {
            display: flex;
            align-items: center;
            margin-right: 10px;
            border: 1px solid white;
            overflow: hidden;
            border-radius: 20px;
        }

        .image-icon img {
            width: 40px;
            height: 40px;
        }

        .menu-item {
            position: absolute;
            left: 690px;
            min-width: 600px;
        }

        .login-info-item {
            display: flex;
            align-items: center;
            padding-right: 20px;
            cursor: pointer;

            .el-dropdown {
                color: white;
            }
        }
    }

</style>
<script>
  import exitSystem from '../assets/js/com.exit.module';

  export default {
    name: 'Home',
    data() {
      return {
        activeIndex2: '1',
        name: '未命名',
        role: 0,
        show: true,
        showName: true,
        dataList: [],
        roleArr: ww_FilterList_show.UserRights,

      };
    },
    created() {
      this.name = JSON.parse(localStorage.getItem('ww_userData')).name;
      this.role = JSON.parse(localStorage.getItem('ww_userData')).role;
      this.activeIndex2 = JSON.parse(localStorage.getItem('home_key')).toString();
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      $route() {
        if (this.$route.name === 'projectManage') {
          this.activeIndex2 = '1'
          this.show = true
        } else {
          this.show = false
        }
      },
    },
    methods: {
      handleSelect(key, keyPath) {
        localStorage.setItem('tab_name', JSON.stringify(''));
        this.activeIndex2 = key
        window.localStorage.setItem('home_key', key);
      },
      handleClick(command) {
        if (command === 'a') {
          this.$router.push({path: '/home/userList/1/10'});
        } else if (command === 'b') {
          exitSystem()
        }
      },
    },
    mounted() {
      // 注册事件 -- 防抖
      window.onresize = () => {
        if (document.body.clientWidth < 1440) {
          this.showName = false
        } else {
          this.showName = true
        }
      }
    },
    beforeDestroy() {
      // 事件注销
      window.onresize = null
    },
    components: {
      // HelloWorld
    },

  };
</script>
