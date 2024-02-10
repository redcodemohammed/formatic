import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", () => {
  const isLoading = useState("is-loading", () => false);

  function startLoading() {
    isLoading.value = true;
  }

  function stopLoading() {
    isLoading.value = false;
  }

  return {
    isLoading,
    startLoading,
    stopLoading,
  };
});
