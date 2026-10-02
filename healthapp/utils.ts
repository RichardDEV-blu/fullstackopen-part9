export const isNotNumber = (argument: string): boolean => {
  return !Number.isFinite(Number(argument)) || argument.trim() === "";
};
