export default (e: any) => {
  const toast = useToast();

  const errors = e.data.data.map((er: any) => er.message) as string[];
  errors.forEach((error) => {
    toast.add({
      title: error,
      color: "red",
      timeout: 3000,
    });
  });
};
