<template>
  <h1>Home PAGE</h1>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
  // or middleware: 'auth'
});
</script>
