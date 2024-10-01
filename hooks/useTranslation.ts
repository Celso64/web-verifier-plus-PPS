import { useState, useEffect } from "react";

type Translations = Record<string, string>;

const useTranslation = (initialLanguage: string = "es") => {
  const idiomaElegido: string | null = null;
  const [language, setLanguage] = useState<string>(
    idiomaElegido === null ? initialLanguage : idiomaElegido
  );
  const [translations, setTranslations] = useState<Translations>({});

  const loadTranslations = async (lang: string) => {
    try {
      // Carga dinámica del archivo JSON según el idioma seleccionado `../locale/${lang}.json`
      const translationsModule = await import(`../locale/${lang}.json`);
      setTranslations(translationsModule.default); // Asegúrate de usar `.default`
      if (typeof window !== "undefined") {
        localStorage.setItem("lang", lang);
      }
      console.log("HOOK: idioma cambio a " + lang);
    } catch (error) {
      console.error(`Error loading translations for language: ${lang}`, error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const idiomaElegido = localStorage.getItem("lang");
      setLanguage(idiomaElegido || initialLanguage);
    }
  }, [initialLanguage]);

  // Cambia el idioma y carga las traducciones cuando el idioma cambia
  useEffect(() => {
    loadTranslations(language);
  }, [language]);

  return { language, translations, setLanguage };
};

export default useTranslation;
