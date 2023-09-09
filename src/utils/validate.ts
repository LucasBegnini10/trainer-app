export const isEmpty = (str: string) => str.trim().length === 0;

export const emailIsValid = (email: string) => {
  if (isEmpty(email)) return false;
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  return regex.test(email);
};
