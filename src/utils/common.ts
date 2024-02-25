export const getParamsFromFormData = (formData: FormData) => {
  let currentParams: { [key: string]: any } = {};

  formData.forEach((value, index) => {
    currentParams[index] = value;
  });

  return currentParams;
};
