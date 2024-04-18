export const getInitials = (text: string) => {
  const words = text.split(" ");

  const first = words[0];
  const last = words?.[words.length - 1];

  const firstLetter = String(first?.[0]).toUpperCase();
  const lastLetter = String(last?.[0] || first?.[1]).toUpperCase();

  return `${firstLetter}${lastLetter}`;
};

export const onlyNumbers = (str: string): string =>
  str.replace(/[^\d]/g, "");

  export const limitString = (str: string, limit = 80) => {
    if(str.length > limit) return `${str.substring(0, limit)}...`
    return str
  }