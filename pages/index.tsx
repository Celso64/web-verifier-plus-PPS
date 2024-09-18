import type { NextPage } from "next";
import styles from "./index.module.css";
import { Button } from "components/Button/Button";
import { useEffect, useState } from "react";
import { ScanModal } from "components/ScanModal/ScanModal";
import { CredentialCard } from "components/CredentialCard/CredentialCard";
import { Container } from "components/Container/Container";
import { VerificationCard } from "components/VerificationCard/VerificationCard";
import { VerificationContext } from "lib/verificationContext";
import { VerifiableCredential } from "types/credential";
import { useVerification } from "lib/useVerification";
import { credentialsFromQrText } from "lib/decode";
import { TopBar } from "components/TopBar/TopBar";
import { BottomBar } from "components/BottomBar/BottomBar";
import { extractCredentialsFrom, VerifiableObject } from "lib/verifiableObject";
import Link from "next/link";
import useTranslation from "hooks/useTranslation";

// NOTE: We currently only support one credential at a time. If a presentation with more than one credential
// is dropped, pasted, or scanned we only look at the first one

const Home: NextPage = () => {
  const [textArea, setTextArea] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [textAreaError, setTextAreaError] = useState(false);
  const [fileError, setFileError] = useState(false);
  const [scanError, setScanError] = useState(false);
  const [credential, setCredential] = useState<
    VerifiableCredential | undefined
  >(undefined);
  const credentialContext = useVerification(credential);
  const [wasMulti, setWasMulti] = useState(false);
  const { translations } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = "es";
    document.title = translations.titulo
      ? translations.titulo
      : "VerifierPlus Home page";
    const handlePopstate = () => {
      if (window.location.hash === "/") {
        setCredential(undefined);
        setWasMulti(false);
      } else {
        window.location.replace("/");
      }
    };

    window.addEventListener("popstate", handlePopstate);
  }, []);

  useEffect(() => {
    if (credential === undefined) {
      setTextAreaError(false);
      setFileError(false);
      setScanError(false);
    }
  }, [credential]);

  useEffect(() => {
    if (file !== null) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = (e.target?.result as string) ?? "";
        const result = verifyCredential(text);
        if (!result) {
          console.log("file parse error");
          setFileError(true);
        } else {
          setFileError(false);
        }
      };
      reader.readAsText(file, "UTF-8");
    }
  }, [file]);

  function checkJson(json: string) {
    try {
      JSON.parse(json);
    } catch {
      return false;
    }
    return true;
  }

  function verifyCredential(json: string) {
    const result = checkJson(json);

    if (!result) {
      return result;
    }
    const parsedJson = JSON.parse(json);
    let newCredential: VerifiableObject = parsedJson;

    const vc = extractCredentialsFrom(newCredential);
    if (vc === null) {
      return;
    }
    history.pushState(null, "", "#verify/results");
    // get first cred. this will eventually need to be changed
    if (vc.length > 1) {
      setWasMulti(true);
    }
    setCredential(vc[0]);
    return result;
  }

  function ScanButtonOnClick() {
    setIsOpen(!isOpen);
  }

  async function getJSONFromURL(url: string) {
    try {
      let response = await fetch(url);
      let responseJson = await response.json(); //.json()
      return JSON.stringify(responseJson);
    } catch (error) {
      console.error(error);
      return "";
    }
  }

  async function verifyTextArea() {
    // check if textarea is json
    let input = "";
    if (!checkJson(textArea)) {
      const fromUrl = await getJSONFromURL(textArea);
      if (fromUrl !== "") {
        // console.log(fromUrl);
        input = fromUrl;
      }
    } else {
      input = textArea;
    }
    // if its not json check if its a url

    const result = verifyCredential(input);
    if (!result) {
      setTextAreaError(true);
    } else {
      setTextAreaError(false);
    }
  }

  async function onScan(json: string): Promise<Boolean> {
    const fromqr = await credentialsFromQrText(json);
    // console.log('here');
    // console.log(fromqr);
    if (fromqr === null) {
      return false;
    }
    // get first cred. this will eventually need to be changed
    const cred = fromqr[0];

    history.pushState(null, "", "#verify/results");
    if (fromqr.length > 1) {
      setWasMulti(true);
    }
    setCredential(cred);
    return true;
  }

  function handleFileDrop(e: React.DragEvent<HTMLInputElement>) {
    console.log("file was dropped");
    e.stopPropagation();
    e.preventDefault();
    setFile(e.dataTransfer.items[0].getAsFile());
  }

  function handleBrowse(e: React.ChangeEvent<HTMLInputElement>) {
    // console.log(e);
    setFile(e.target.files !== null ? e.target.files[0] : null);
  }

  if (credential !== undefined) {
    return (
      <main className={styles.container}>
        <TopBar
          hasLogo={true}
          isDark={isDark}
          setIsDark={setIsDark}
          setCredential={setCredential}
        />
        <div className={styles.verifyContainer}>
          <VerificationContext.Provider value={credentialContext}>
            <Container>
              <CredentialCard credential={credential} wasMulti={wasMulti} />
              <VerificationCard />
            </Container>
          </VerificationContext.Provider>
        </div>

        <BottomBar isDark={isDark} />
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <TopBar
        isDark={isDark}
        setIsDark={setIsDark}
        setCredential={setCredential}
      />
      <div className={styles.contentContainer}>
        <div>
          <h1 className={styles.title}>{translations.index_titulo}</h1>
        </div>
        <div>
          <p className={styles.descriptionBlock}>
            {translations.index_introduccion_1}
            <Link href="faq#supported">
              {translations.index_introduccion_2 ||
                "No hay translations.introduccion_2"}
            </Link>
            {translations.index_introduccion_3}
            <a href="https://www.unrn.edu.ar/home">
              {translations.index_introduccion_4}
            </a>
            {translations.introduccion_5}
            <Link href="faq#trust">
              {translations.index_introduccion_6 ||
                "No hay translations.introduccion_6"}
            </Link>
          </p>
        </div>
        <Button
          icon={<span className="material-icons">qr_code_scanner</span>}
          className={styles.scan}
          text={translations.index_boton_scan}
          onClick={ScanButtonOnClick}
        />

        {scanError && (
          <div className={styles.errorContainer}>
            <span className="material-icons-outlined">warning</span>
            <p className={styles.error}>{translations.index_qr_invalido}</p>
          </div>
        )}

        <div className={styles.textAreaContainer}>
          <div className={styles.floatingTextarea}>
            <textarea
              aria-labelledby="textarea-label"
              placeholder=" "
              value={textArea}
              onChange={(e) => setTextArea(e.target.value)}
              id="textarea"
            />
            <label id="textarea-label" htmlFor="textarea">
              {translations.index_input_label}
            </label>
          </div>
          <Button
            className={styles.verifyTextArea}
            text={translations.index_boton_verificar}
            onClick={verifyTextArea}
          />
        </div>

        {textAreaError && (
          <div className={styles.errorContainer}>
            <span className="material-icons-outlined">warning</span>
            <p className={styles.error}>{translations.index_JSON_no_parsed}</p>
          </div>
        )}

        <div
          className={styles.dndUpload}
          onDrop={handleFileDrop}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          <div className={styles.dndUploadText}>
            {translations.index_drag_drop_1}
            <label className={styles.fileUpload}>
              <input type="file" onChange={handleBrowse} />
              <span className={styles.browseLink}>
                {translations.index_drag_drop_2}
              </span>
            </label>
          </div>
          <span className={styles.supportText}>
            {translations.index_drag_drop_3}
          </span>
        </div>

        {fileError && (
          <div className={styles.errorContainer}>
            <span className="material-icons-outlined">warning</span>
            <p className={styles.error}>Json cannot be parsed</p>
          </div>
        )}
        <ScanModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onScan={onScan}
          setErrorMessage={setScanError}
        />
      </div>
      <BottomBar isDark={isDark} />
    </main>
  );
};

export default Home;
