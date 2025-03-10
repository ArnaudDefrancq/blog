export const REGEX_MAIL: RegExp = /^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
export const REGEX_PSEUDO: RegExp = /^[a-zA-Z\s].{3,20}$/; 
export const REGEX_PASSWORD: RegExp =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,}$/;