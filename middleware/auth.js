export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const cookieToken = getCookie("authToken");
    console.log(to.path);

    if (!cookieToken && to.path !== "/login") {
      console.log("No cookieToken");
      console.log("You are not allowed to access, go to login page!!!");
      window.location.href = "/login";
      //navigateTo("/login");
    } else if (!cookieToken && to.path === "/login") {
      return;
    } else {
      const project = "project_01";
      const currentDate = new Date().toISOString();
      const { data } = await $fetch(
        `http://localhost:1337/api/lock-tokens?fields[0]&filters[title][$eq]=${project}&filters[token][$eq]=${cookieToken}&filters[expiration][$gt]=${currentDate}`,
        { method: "get" }
      );
      console.log(data);
      console.log(currentDate);

      if (data.length > 0) {
        if (to.path === "/login") {
          window.location.href = "/";
          //return navigateTo("/");
        } else {
          console.log("ABORT NAVI!");
          return;
        }
      } else {
        clearCookie("authToken");
        if (to.path !== "/login") {
          window.location.href = "/login";
        } else {
          return;
        }
      }
    }
  }
});

/* export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const cookieToken = getCookie("authToken");

    if (!cookieToken && to.path !== "/lock") {
      console.log("No cookieToken");
      console.log("You are not allowed to access, go to login page!!!");

      console.log(to.path);

      //window.location.href = "/lock";
      return navigateTo("/lock");
    } else {
      const project = "project_01";
      const { data } = await $fetch(
        `http://localhost:1337/api/lock-tokens?filter[title][$eq]=${project}`
      );
      const { token, expiration } = data[0].attributes;
      const currentDate = new Date();
      const tokenExpire = new Date(expiration);

      if (cookieToken === token && currentDate < tokenExpire) {
        console.log(currentDate, tokenExpire);
        console.log("Token is still valid");
        if (to.path === "/lock") {
          console.log("You are already logged in, redirect to index");
          //window.location.href = "/";
          return navigateTo("/");
        } else {
          console.log("You have permission to browse this page");
          //return;
          return abortNavigation();
        }
      } else if (cookieToken === token && currentDate > tokenExpire) {
        console.log(currentDate, tokenExpire);
        console.log("Token is already expired!!!");

        //return navigateTo("/lock");
      } else {
        console.log("Something went wrong");

        console.log(currentDate, tokenExpire);

        //return navigateTo("/lock");
      }
    }
  }
});
 */
