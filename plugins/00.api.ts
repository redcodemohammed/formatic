import { EventsModule } from "~/modules/events/event.repository";

interface IApiInstance {
  events: EventsModule;
}

export default defineNuxtPlugin((nuxtApp) => {
  const { session } = useUserSession();
  const $loading = useLoadingStore();

  const api = $fetch.create({
    onRequest({ request, options }) {
      $loading.startLoading();

      if (session.value?.token) {
        // Add Authorization header
        options.headers = options.headers || {};
        Object.assign(options.headers, {
          Authorization: `Bearer ${session.value.token}`,
        });
      }
    },
    onResponse() {
      $loading.stopLoading();
    },
    onResponseError({ response }) {
      $loading.stopLoading();
      if (response.status === 401) {
        navigateTo({ name: "login" });
      }
    },
    onRequestError() {
      $loading.stopLoading();
    },
  });

  // An object containing all repositories we need to expose
  const modules: IApiInstance = {
    events: new EventsModule(api),
  };

  return { provide: { api, modules } };
});
