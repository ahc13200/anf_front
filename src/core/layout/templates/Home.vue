<template>
  <div>
    <div id="layout-wrapper">

      <div class="vertical-overlay"></div>

      <div class="main-content">

        <div class="page-content">
          <div class="container-fluid">

            <!-- start page title -->
            <router-view/>
            <!-- end page title -->

          </div>
          <!-- container-fluid -->
        </div>
        <!-- End Page-content -->
      </div>
      <!-- end main content-->

    </div>
    <!-- END layout-wrapper -->


    <!--start back-to-top-->
    <button onclick="topFunction()" class="btn btn-danger btn-icon" id="back-to-top">
      <i class="ri-arrow-up-line"></i>
    </button>
    <!--end back-to-top-->

    <!--preloader-->
    <div id="preloader">
      <div id="status">
        <div class="spinner-border text-primary avatar-sm" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </div>  
</template>
<script>
import Vue from 'vue'
import VHeader from "../elements/VHeader";
import VLeftSidebar from "../elements/VLeftSidebar";
import VFooter from "../elements/VFooter";

export default {
  name: 'home',
  props: {
    logout: Function
  },
  data() {
    return {}
  },
  components: {VFooter, VLeftSidebar, VHeader},
  beforeCreate() {
  },
  mounted() {
    document.body.style['overflow-y'] = 'scroll'
    sessionStorage.setItem("data-topbar", 'dark')
    sessionStorage.setItem("data-preloader", 'enabled')
  },
  created() {
  },
  beforeDestroy() {
    const recaptchaScripts = document.querySelectorAll('script')
    for (let i = 0; i < recaptchaScripts.length; i += 1) {
      recaptchaScripts[i].parentElement.removeChild(recaptchaScripts[i])
    }
  },
  async beforeMount() {
    //Ponga todos los javascripts del template 
    await Vue.loadScript('/static/assets/libs/bootstrap/js/bootstrap.bundle.min.js')
    await Vue.loadScript('/static/assets/libs/simplebar/simplebar.min.js')
    await Vue.loadScript('/static/assets/libs/node-waves/waves.min.js')
    await Vue.loadScript('/static/assets/libs/feather-icons/feather.min.js')
    await Vue.loadScript('/static/assets/js/pages/plugins/lord-icon-2.1.0.js')
    await Vue.loadScript('/static/assets/js/plugins.js')
    await Vue.loadScript('/static/assets/js/app.js')
  }
}
</script>
<style scoped>
.body {
  overflow-y: hidden !important;
  background-image: none !important;
}

.main-content {
  padding-top: 2.5% !important;
  padding-right: 0% !important;
}

.container {
  margin-left: 1% !important;
}
</style>
