import zxcvbn from "zxcvbn";
import CryptoJS from "crypto-js";
import { shuffle } from "./array";

export const getHash = password => {
  return CryptoJS.SHA1(password)
    .toString()
    .toUpperCase();
};

export const getStrength = password => {
  return zxcvbn(password);
};

export const generate = config => {
  const { length, lowercase, uppercase, numbers, special } = config;

  let password = "";

  if (lowercase) {
    password += "abcdedfghijklmnopqrst";
  }

  if (uppercase) {
    password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  if (numbers) {
    password += "0123456789";
  }

  if (special) {
    password += "!@#$%&*<[>]/{)|(_-}+,;";
  }

  return shuffle(password.split(""))
    .slice(0, length)
    .join("");
};
