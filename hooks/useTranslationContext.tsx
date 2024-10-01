import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import useTranslation from "./useTranslation";
import { Idiomas } from "locale/idiomas";

type Translations = Record<string, string>;

type TranslationContextProps = {
  language: string;
  translations: Record<string, string> | null;
  setLanguage: (lang: string) => void;
};

type TranslationProviderProps = {
  children: ReactNode;
};

const translationDefaultValues: TranslationContextProps = {
  language: Idiomas.ESPANOL,
  translations: null,
  setLanguage: () => {},
};

export const TraduccionContexto = createContext<
  TranslationContextProps | undefined
>(translationDefaultValues);

export function useTraduccion() {
  const context = useContext(TraduccionContexto);
  if (!context) {
    throw new Error(
      "useTraduccion debe ser usado dentro de TraduccionProvider"
    );
  }
  return context;
}

export function TraduccionProvider({ children }: TranslationProviderProps) {
  const DEFAULT_LANGUAGE = Idiomas.ESPANOL;
  const [language, setLanguage] = useState<string>(DEFAULT_LANGUAGE);
  const [translations, setTranslations] = useState<Translations | null>(null);

  const loadTranslations = async (lang: string) => {
    try {
      const translationsModule = await import(`../locale/${lang}.json`);
      setTranslations(translationsModule.default);
      if (typeof window !== "undefined") {
        localStorage.setItem("lang", lang);
      }
    } catch (error) {
      console.error(`Error loading translations for language: ${lang}`, error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLanguage = localStorage.getItem("lang");
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    }
  }, []);

  useEffect(() => {
    loadTranslations(language);
  }, [language]);

  const value = { language, setLanguage, translations };

  return (
    <TraduccionContexto.Provider value={value}>
      {children}
    </TraduccionContexto.Provider>
  );
}
