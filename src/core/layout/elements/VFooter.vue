<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6">
          © Asistur
        </div>
        <div class="col-sm-6">
          <div class="text-sm-end d-none d-sm-block">
           {{date}} Design & Develop by Asistur
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "VFooter",
  data(){
    return{
       date:new Date().getFullYear()
    }
  }
}
</script>

<style scoped>

</style>