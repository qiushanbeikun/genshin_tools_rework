import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./en";
import zh from "./zh";
import {initReactI18next} from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en: en,
      zh: zh
    },
    fallbackLng: "en",
    debug: true,

    // have a common namespace used around the full app
    ns: ["navbar", "generator_ui", "artifact_props"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    // interpolation: {
    //   formatSeparator: ","
    // },

    react: {
      wait: true
    }
  }).then(r => console.log("i18n", r));

export default i18n;
