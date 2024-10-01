import { NextPage } from "next";
import styles from './infopages.module.css'
import { BottomBar } from "components/BottomBar/BottomBar";
import { TopBar } from "components/TopBar/TopBar";
import { useEffect, useState } from "react";
import { useTraduccion } from "hooks/useTranslationContext";

const Privacy: NextPage = () => {
  const [isDark, setIsDark] = useState(false);

  
  const { translations } = useTraduccion();


  useEffect(() => {
    document.documentElement.lang = "en";
    document.title = "VerifierPlus Home page";
  }, []);

  return (
    <main className={styles.main}>
  <TopBar hasLogo={true} isDark={isDark} setIsDark={setIsDark} />
  <div className={styles.textContent}>
    <div>
      <h1 className={styles.title}>{translations.privacy_titulo}</h1>
      <h2>{translations.privacy_subtitulo_1}</h2>
      <p>{translations.privacy_texto_1}</p>
      <p>{translations.privacy_texto_2}</p>
      <h2>{translations.privacy_subtitulo_2}</h2>
      <p>{translations.privacy_texto_3}</p>
      <p>{translations.privacy_texto_4}</p>
      <p>{translations.privacy_texto_5}</p>
      <h2>{translations.privacy_subtitulo_3}</h2>
      <p>{translations.privacy_texto_6}</p>
      <p>{translations.privacy_texto_7}</p>
      <p>{translations.privacy_texto_8}</p>
      <h2>{translations.privacy_subtitulo_4}</h2>
      <p>{translations.privacy_texto_9}</p>
      <h2>{translations.privacy_subtitulo_5}</h2>
      <p>{translations.privacy_texto_10}</p>
      <h2>{translations.privacy_subtitulo_6}</h2>
      <p>{translations.privacy_texto_11}</p>
      <h2>{translations.privacy_subtitulo_7}</h2>
      <p>{translations.privacy_texto_12}</p>
      <h2>{translations.privacy_subtitulo_8}</h2>
      <p>{translations.privacy_texto_13}</p>
      <p>{translations.privacy_texto_14}</p>
    </div>
  </div>
  <BottomBar isDark={isDark} />
</main>

  );
}

export default Privacy;
