export const useModalsStore = defineStore("modals", () => {
  return {};
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useModalsStore, import.meta.hot));
}
