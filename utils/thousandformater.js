//Number Formatter
export const thousandFormater = (number) => {
  number = parseInt(number);
  return number?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};
