import type { TopBarProps } from "./TopBar.d";
import { ToggleSwitch } from "components/ToggleSwitch/ToggleSwitch";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import styles from "./TopBar.module.css";
import { useTraduccion } from "hooks/useTranslationContext";

export const TopBar = ({
  hasLogo = false,
  isDark,
  setIsDark,
  setCredential,
}: TopBarProps) => {
  const enableDarkMode = useCallback(() => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkMode", "true");
    setIsDark(true);
  }, [setIsDark]);

  const { language, setLanguage, translations } = useTraduccion();

  // get local storage value for darkmode on mount
  useEffect(() => {
    let darkMode = localStorage.getItem("darkMode");
    if (darkMode === "true") {
      setIsDark(true);
      enableDarkMode();
    } else {
      setIsDark(false);
    }
  }, [setIsDark, enableDarkMode]);

  const disableDarkMode = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkMode", "false");
    setIsDark(false);
  };

  const handleToggle = () => {
    if (isDark) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  };

  const handleLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const clearCredential = () => {
    if (setCredential) {
      setCredential(undefined);
    }
  };

  return (
    <header className={styles.container}>
      <div className={styles.logo} onClick={() => clearCredential()}>
        <div>
          <Link href="/">
            <img
              src={isDark ? "/logo-unrn-dark.jpg" : "/logo-unrn-light.jpg"}
              alt="Universidad Nacional de Rio Negro"
              className={styles.logo}
            />
          </Link>
        </div>
      </div>

      <select
        name="lang"
        id="lang"
        onChange={handleLanguage}
        defaultValue={language}
      >
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>

      <ToggleSwitch
        isOn={isDark}
        handleToggle={handleToggle}
        icon={
          <span aria-hidden className={`material-icons ${styles.darkmodeIcon}`}>
            {" "}
            dark_mode{" "}
          </span>
        }
      />
    </header>
  );
};
