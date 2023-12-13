<template>
  <div class="container">
    <img src="../static/logo with name 2.svg" alt="superdevlogo" class="logo" />
    <div>
      <login-component />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});
</script>
