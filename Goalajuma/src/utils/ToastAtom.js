import { atom } from "recoil";

export const isToastState = atom({
  key: "isToastState",
  default: false,
});

export const isModalState = atom({
  key: "isModalState",
  default: false,
});
