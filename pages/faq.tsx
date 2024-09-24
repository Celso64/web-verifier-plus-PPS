import { NextPage } from "next";
import styles from "./infopages.module.css";
import { BottomBar } from "components/BottomBar/BottomBar";
import { TopBar } from "components/TopBar/TopBar";
import { useEffect, useState } from "react";

const Faq: NextPage = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.lang = "en";
    document.title = "VerifierPlus Home page";
  }, []);

  return (
    <main className={styles.main}>
  <TopBar hasLogo={true} isDark={isDark} setIsDark={setIsDark} />
  <div className={styles.textContent}>
    <h1 className={styles.title}>
      {translations.faq_title}
    </h1>
    <h2 id="trust" style={{ color: "#1f2937" }}>
      {translations.faq_subtitle_1}
    </h2>
    <p style={{ color: "#1f2937" }}>
      {translations.faq_1}{" "}
      <a href="https://digitalcredentials.mit.edu/#dcc-members">
        leading universities
      </a>{" "}
      {translations.faq_2}
    </p>
    <p style={{ color: "#1f2937" }}>
      {translations.faq_3}{" "}
      <a href="https://github.com/digitalcredentials">
        open source libraries
      </a>{" "}
      {translations.faq_4}
    </p>
    <p style={{ color: "#1f2937" }}>
      {translations.faq_5}{" "}
      <a href="https://openlearning.mit.edu">MIT Open Learning</a> {translations.faq_6}
    </p>

    <h2 id="supported" style={{ color: "#1f2937" }}>
      {translations.faq_subtitle_2}
    </h2>
    <p style={{ color: "#1f2937" }}>
      {translations.faq_7}
    </p>
    <ul>
      <li>{translations.faq_8}</li>
      <li>{translations.faq_9}</li>
    </ul>

    <p style={{ color: "#1f2937" }}>
      {translations.faq_10}
    </p>
    <ul style={{ color: "#1f2937" }}>
      <li>{translations.faq_11}</li>
      <li>{translations.faq_12}</li>
      <li>{translations.faq_13}</li>
    </ul>

    <h2 style={{ color: "#1f2937" }}>
      {translations.faq_subtitle_3}
    </h2>
    <p style={{ color: "#1f2937" }}>
      {translations.faq_14}{" "}
      <a href="https://lcw.app/faq.html#public-link">Create Public Links</a>{" "}
      {translations.faq_15}
    </p>

    <h2 style={{ color: "#1f2937" }}>
      {translations.faq_subtitle_4}
    </h2>
    <p style={{ color: "#1f2937" }}>
      {translations.faq_16}
    </p>
    <p style={{ color: "#1f2937" }}>
      {translations.faq_17}{" "}
      <a href="https://digitalcredentials.mit.edu">
        digitalcredentials.mit.edu
      </a>
      .
    </p>
  </div>
  <BottomBar isDark={isDark} />
</main>

  );
};

export default Faq;
