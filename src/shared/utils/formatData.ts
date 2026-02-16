export const formatDateToISO = (date: string) => {
  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
};

export const cleanPhone = (phone: string) => phone.replace(/\D/g, "");
