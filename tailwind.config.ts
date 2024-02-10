import type { Config } from "tailwindcss";
export default <Partial<Config>>{
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        "ibm-plex-sans-arabic": ["IBM Plex Sans Arabic", "sans-serif"],
        "noto-naskh-arabic": ["Noto Naskh Arabic", "serif"],
      },
    },
  },
};
