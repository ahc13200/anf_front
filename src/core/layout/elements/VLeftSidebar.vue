<template>
  <div class="app-menu navbar-menu">
    <!-- LOGO -->
    <div class="navbar-brand-box">
      <!-- Dark Logo-->
      <router-link :to="{name:'index'}" class="logo logo-dark"> 
                    <span class="logo-sm">
                        <img src="/static/assets/images/logo_asistur.png" alt="" height="22">
                    </span>
        <span class="logo-lg">
                        <img src="/static/assets/images/logo_asistur.png" alt="" height="17">
                    </span>
      </router-link>
      <!-- Light Logo-->
      <router-link :to="{name:'index'}" class="logo logo-light"> 

                    <span class="logo-sm">
                        <img src="/static/assets/images/logo_asistur.png" alt="" height="50">
                    </span>
        <span class="logo-lg">
                        <img src="/static/assets/images/logo_asistur.png" alt="" class="mt-4" height="90">
                    </span>
      </router-link>

      <button type="button" class="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
              id="vertical-hover">
        <i class="ri-record-circle-line"></i>
      </button>
    </div>

    <div id="scrollbar">
      <div class="container-fluid">

        <div id="two-column-menu">
        </div>
        <ul class="navbar-nav" id="navbar-nav">
          <li class="menu-title"><span data-key="t-menu">Menu</span></li>
          <li class="nav-item" v-for="(item,index) in menu" :key="index">
            <a class="nav-link menu-link" :href="'#sidebar'+index" data-bs-toggle="collapse"
               role="button" aria-expanded="false" aria-controls="sidebarDashboards">
              <i :class="item.icon"></i> <span data-key="t-dashboards">{{ item.caption }}</span>
            </a>
            <div class="collapse menu-dropdown" :id="'sidebar'+index">
              <ul class="nav nav-sm flex-column">
                <li class="nav-item" v-for="(child,childIndex) in item.routes" :key="'r-'+childIndex">
                  <router-link :to="{name:child.name}" class="nav-link"> {{ child.caption }}</router-link>
                </li>
              </ul>
            </div>
          </li>
          <!-- end Dashboard Menu -->
        </ul>
      </div>
    </div>
    <!-- Sidebar -->
    <div class="sidebar-background"></div>
  </div>
</template>

<script>
import menu from './menu.json'

export default {
  name: "VLeftSidebar",
  data() {
    return {
      menu
    }
  }
}
</script>

<style scoped>

</style>