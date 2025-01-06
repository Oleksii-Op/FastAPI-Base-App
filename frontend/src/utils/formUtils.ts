export const getFormDataWithOnlyFilledFields = (formElement: HTMLFormElement) => {
  const formData = new FormData(formElement);
  const data: Record<string, string | number> = {};
  
  formData.forEach((value, key) => {
    // Only include fields that have a value and aren't empty strings
    if (value && value.toString().trim() !== '') {
      if (key === 'price' || key === 'cpu_cores' || key === 'cpu_threads' || key === 'weight') {
        const numValue = Number(value);
        if (!isNaN(numValue)) {
          data[key] = numValue;
        }
      } else {
        data[key] = value.toString();
      }
    }
  });
  
  return data;
};