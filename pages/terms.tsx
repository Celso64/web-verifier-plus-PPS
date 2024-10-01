import { NextPage } from "next";
import styles from "./infopages.module.css";
import { BottomBar } from "components/BottomBar/BottomBar";
import { TopBar } from "components/TopBar/TopBar";
import { useEffect, useState } from "react";

const Terms: NextPage = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.lang = "en";
    document.title = "VerifierPlus Home page";
  }, []);

  return (
    <main className={styles.main}>
      <TopBar hasLogo={true} isDark={isDark} setIsDark={setIsDark} />
      <div className={styles.textContent}>
        <h1 className={styles.title}>{translations.terms_titulo}</h1>
        <p style={{ color: "#1f2937" }}>
          {translations.terms_texto_1}{" "}
          <a href="https://digitalcredentials.mit.edu">
            Digital Credentials Consortium
          </a>
          {translations.terms_texto_1_part2}
        </p>
        <ol style={{ color: "#1f2937" }}>
          <li>
            <p>
              {translations.terms_texto_2}{" "}
              <a href="privacy">Privacy Policy</a> {translations.terms_texto_2_part2}
            </p>
          </li>
          <li>
            <p>
              {translations.terms_texto_3}{" "}
              <a href="https://lcw.app/">Learner Credential Wallet</a>, {translations.terms_texto_3_part2}
            </p>
          </li>
          <li>
            <p>{translations.terms_texto_4}</p>
          </li>
          <li>
            <p>{translations.terms_texto_5}</p>
          </li>
          <li>
            <p>{translations.terms_texto_6}</p>
          </li>
          <li>
            <p>{translations.terms_texto_7}</p>
          </li>
          <li>
            <p>{translations.terms_texto_8}</p>
          </li>
          <li>
            <p>{translations.terms_texto_9}</p>
          </li>
          <li>
            <p>{translations.terms_texto_10}</p>
          </li>
        </ol>
        <p style={{ color: "#1f2937" }}>{translations.terms_texto_11}</p>
      </div>
      <BottomBar isDark={isDark} />
    </main>

  );
};

export default Terms;
