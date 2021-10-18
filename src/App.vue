<template>
  <HomeLayout>
      <template #header>
        <NavBar></NavBar>
      </template>
      <template #main>
        <router-view></router-view>
      </template>
      <template #footer>
        <Contact></Contact>
      </template>
  </HomeLayout>
</template>

<script setup>
import HomeLayout from './layouts/HomeLayout.vue';
import NavBar from './components/NavBar.vue';
import Contact from './components/Contact.vue';
</script>

<style>

</style>
