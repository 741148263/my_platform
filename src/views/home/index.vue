<template>
  <el-container class="index-con">
    <el-aside :class="showClass">
      <left_menu></left_menu>
    </el-aside>
    <el-container class="main-con">
      <el-header class="index-header">
<!--        <navcon :breadList="breadList" ></navcon>-->
      </el-header>
      <el-main class="index-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import left_menu from "@/components/left_menu";
export default {
  name: "index",
  data () {
    return {
      showClass: 'aside',
      breadList: []
    }
  },
  components: {
    left_menu
  },
  methods: {},
  created() {
    this.$root.Bus.$on('toggle', value => {
      if (value) {
        this.showClass = 'asideshow'
      } else {
        setTimeout(() => {
          this.showClass = 'aside'
        }, 300)
      }

    })
  }
}
</script>

<style scoped>
.index-con {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
.aside {
  width: 48px !important;
  height: 100%;
  background-color: #334157;
  margin: 0;
}
.asideshow {
  width: 150px !important;
  height: 100%;
  background-color: #334157;
  margin: 0;
}
.index-header{
  max-height: 40px;
}
.main-card{
  min-height: 100%;
  border: none;
}
</style>
