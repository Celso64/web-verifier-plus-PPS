import Link from "next/link";
import type { BottomBarProps } from "./BottomBar.d";
import styles from "./BottomBar.module.css";
import useTranslation from "hooks/useTranslation";

export const BottomBar = ({ isDark }: BottomBarProps) => {
  const { translations } = useTranslation();

  return (
    <footer className={styles.container}>
      <div className={styles.linkContainer}>
        <Link href="/terms" className={styles.link}>
          {translations.bottom_terminos || "Terms and Conditions of Use"}
        </Link>
        <Link href="/privacy" className={styles.link}>
          {translations.bottom_politica || "Privacy Policy"}
        </Link>
        <Link className={styles.link} href="https://accessibility.mit.edu/">
          {translations.bottom_access || "Accessibility"}
        </Link>
        <Link
          className={styles.link}
          href="https://github.com/Celso64/web-verifier-plus-PPS.git"
        >
          {translations.bottom_github || "View on Github"}
        </Link>
      </div>
    </footer>
  );
};
