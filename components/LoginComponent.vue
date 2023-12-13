<template>
  <div class="login-container">
    <h1>Login to website</h1>
    <input
      type="password"
      placeholder="Password"
      v-model="inputPassword"
      @keydown.enter="login"
    />
    <button @click="login">Login</button>
  </div>
</template>

<script setup>
const project = ref("project_01");
const inputPassword = ref("");

async function login() {
  const response = await $fetch("/api/lock", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: { inputPassword, project },
  });
  if (response.loggedIn === true) {
    setCookie("authToken", response.token);
    return navigateTo("/");
    // console.log(response);
  } else {
    alert(response.message);
  }
}
/* definePageMeta({
  middleware: ["check-lock-token"],
});
const project = ref("project_01");
const inputPassword = ref("");

async function login() {
  const response = await $fetch("/api/lock", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: { inputPassword, project },
  });

  const { projectId, token, expiryDate } = response;
  if (token) {
    setCookie("authToken", token);
    $fetch(`http://localhost:1337/api/lock-tokens/${projectId}`, {
      method: "put",
      body: {
        data: {
          token: token,
          expiration: expiryDate,
        },
      },
    });
    navigateTo("/");
  } else {
    alert(response.message);
  }
} */
</script>
