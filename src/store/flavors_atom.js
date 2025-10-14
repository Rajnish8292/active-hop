import { atom } from "recoil";

export const flavor_atom = atom({
  key: "flavorAtom",
  default: { name: "trail", url: "texture/ActiveHop_etichetta__01_trail.webp" },
});
