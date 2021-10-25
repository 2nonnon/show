<template>
  <Layout>
      <template #header>
        <NavBar></NavBar>
      </template>
      <template #main>
        <router-view></router-view>
      </template>
      <template #footer>
        <Contact></Contact>
      </template>
  </Layout>
</template>

<script setup>
import Layout from './layouts/Layout.vue';
import NavBar from './components/NavBar.vue';
import Contact from './components/Contact.vue';
</script>
