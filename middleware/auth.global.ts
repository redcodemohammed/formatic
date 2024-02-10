export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useUserSession();

  if (to.path.includes("/api/")) {
    return;
  }

  if (!to.meta.public) {
    // the route is not public
    if (!loggedIn.value) {
      //  the user not signed in
      return navigateTo({ name: "login", query: { redirect: to.fullPath } });
    }
  }

  if (to.meta.public) {
    // the route is public
    if (loggedIn.value) {
      //  the user signed in
      return navigateTo({ name: "index" });
    }
  }
});
