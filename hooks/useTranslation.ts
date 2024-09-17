import { useState, useEffect } from "react";

type Translations = Record<string, string>;

const useTranslation = (initialLanguage: string = "es") => {
  const [language, setLanguage] = useState<string>(initialLanguage);
  const [translations, setTranslations] = useState<Translations>({});

  // Función para cargar el archivo de traducciones dinámicamente
  const loadTranslations = async (lang: string) => {
    try {
      // Carga dinámica del archivo JSON según el idioma seleccionado
      const translationsModule = await import(`../locale/${lang}.json`);
      setTranslations(translationsModule.default); // Asegúrate de usar `.default`
    } catch (error) {
      console.error(`Error loading translations for language: ${lang}`, error);
    }
  };

  // Cambia el idioma y carga las traducciones cuando el idioma cambia
  useEffect(() => {
    loadTranslations(language);
  }, [language]);

  return { language, translations, setLanguage };
};

export default useTranslation;
