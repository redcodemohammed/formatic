export const useEvents = () => {
  const { $modules } = useNuxtApp();

  return $modules.events;
};
