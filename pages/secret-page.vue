<template>
  <h1>Secret Page</h1>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});
</script>
