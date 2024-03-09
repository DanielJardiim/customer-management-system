export const handleError = (error: any) => {
  if (error.response && error.response.data && error.response.data.error) {
    console.error(error.response.data.error);
  } else {
    console.error("Ocorreu um erro:", error);
  }
};
