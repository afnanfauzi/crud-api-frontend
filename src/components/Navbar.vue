<template>
  <div id="navbar">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Customerku</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/customer" class="nav-link">Customer</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/tambah" class="nav-link">Tambah Customer</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name : "Navbar"
}
</script>

<style scope>

</style>
