export const formatDateToISO = (date: string) => {
  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`;
};

export const cleanCharacter = (data: string) => data.replace(/\D/g, "");

export function formatDateFromISO(dateISO: string | undefined | null): string {
  if (!dateISO) return "";

  const [year, month, day] = dateISO.split("-");

  if (!year || !month || !day) return "";

  return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
}

export const getSingleParam = (
  param: string | string[] | undefined
): string => {
  if (!param) throw new Error("ID da rota não encontrado.");
  return Array.isArray(param) ? param[0] : param;
};
