import jwtDecode from "jwt-decode";

export const decode = (text: string) => jwtDecode(text);
