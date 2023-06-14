import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../redux/appSlice";
import { useEffect, useState } from "react";
import { translateAllNotes } from "../redux/noteSlice";
import { Link } from "react-router-dom";
import { logout } from "../redux/authSlice";

function Navbar({ setModalOpen }) {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const languages = [
    { name: "Afrikaans", code: "af" },
    { name: "Albanian", code: "sq" },
    { name: "Amharic", code: "am" },
    { name: "Arabic", code: "ar" },
    { name: "Armenian", code: "hy" },
    { name: "Azerbaijani", code: "az" },
    { name: "Basque", code: "eu" },
    { name: "Belarusian", code: "be" },
    { name: "Bengali", code: "bn" },
    { name: "Bosnian", code: "bs" },
    { name: "Bulgarian", code: "bg" },
    { name: "Catalan", code: "ca" },
    { name: "Cebuano", code: "ceb" },
    { name: "Chichewa", code: "ny" },
    { name: "Chinese (Simplified)", code: "zh-CN" },
    { name: "Chinese (Traditional)", code: "zh-TW" },
    { name: "Corsican", code: "co" },
    { name: "Croatian", code: "hr" },
    { name: "Czech", code: "cs" },
    { name: "Danish", code: "da" },
    { name: "Dutch", code: "nl" },
    { name: "English", code: "en" },
    { name: "Esperanto", code: "eo" },
    { name: "Estonian", code: "et" },
    { name: "Filipino", code: "fil" },
    { name: "Finnish", code: "fi" },
    { name: "French", code: "fr" },
    { name: "Frisian", code: "fy" },
    { name: "Galician", code: "gl" },
    { name: "Georgian", code: "ka" },
    { name: "German", code: "de" },
    { name: "Greek", code: "el" },
    { name: "Gujarati", code: "gu" },
    { name: "Haitian Creole", code: "ht" },
    { name: "Hausa", code: "ha" },
    { name: "Hawaiian", code: "haw" },
    { name: "Hebrew", code: "he" },
    { name: "Hindi", code: "hi" },
    { name: "Hmong", code: "hmn" },
    { name: "Hungarian", code: "hu" },
    { name: "Icelandic", code: "is" },
    { name: "Igbo", code: "ig" },
    { name: "Indonesian", code: "id" },
    { name: "Irish", code: "ga" },
    { name: "Italian", code: "it" },
    { name: "Japanese", code: "ja" },
    { name: "Javanese", code: "jv" },
    { name: "Kannada", code: "kn" },
    { name: "Kazakh", code: "kk" },
    { name: "Khmer", code: "km" },
    { name: "Kinyarwanda", code: "rw" },
    { name: "Korean", code: "ko" },
    { name: "Kurdish (Kurmanji)", code: "ku" },
    { name: "Kyrgyz", code: "ky" },
    { name: "Lao", code: "lo" },
    { name: "Latin", code: "la" },
    { name: "Latvian", code: "lv" },
    { name: "Lithuanian", code: "lt" },
    { name: "Luxembourgish", code: "lb" },
    { name: "Macedonian", code: "mk" },
    { name: "Malagasy", code: "mg" },
    { name: "Malay", code: "ms" },
    { name: "Malayalam", code: "ml" },
    { name: "Maltese", code: "mt" },
    { name: "Maori", code: "mi" },
    { name: "Marathi", code: "mr" },
    { name: "Mongolian", code: "mn" },
    { name: "Myanmar (Burmese)", code: "my" },
    { name: "Nepali", code: "ne" },
    { name: "Norwegian", code: "no" },
    { name: "Odia (Oriya)", code: "or" },
    { name: "Pashto", code: "ps" },
    { name: "Persian", code: "fa" },
    { name: "Polish", code: "pl" },
    { name: "Portuguese", code: "pt" },
    { name: "Punjabi", code: "pa" },
    { name: "Romanian", code: "ro" },
    { name: "Russian", code: "ru" },
    { name: "Samoan", code: "sm" },
    { name: "Scots Gaelic", code: "gd" },
    { name: "Serbian", code: "sr" },
    { name: "Sesotho", code: "st" },
    { name: "Shona", code: "sn" },
    { name: "Sindhi", code: "sd" },
    { name: "Sinhala", code: "si" },
    { name: "Slovak", code: "sk" },
    { name: "Slovenian", code: "sl" },
    { name: "Somali", code: "so" },
    { name: "Spanish", code: "es" },
    { name: "Sundanese", code: "su" },
    { name: "Swahili", code: "sw" },
    { name: "Swedish", code: "sv" },
    { name: "Tajik", code: "tg" },
    { name: "Tamil", code: "ta" },
    { name: "Tatar", code: "tt" },
    { name: "Telugu", code: "te" },
    { name: "Thai", code: "th" },
    { name: "Turkish", code: "tr" },
    { name: "Turkmen", code: "tk" },
    { name: "Ukrainian", code: "uk" },
    { name: "Urdu", code: "ur" },
    { name: "Uyghur", code: "ug" },
    { name: "Uzbek", code: "uz" },
    { name: "Vietnamese", code: "vi" },
    { name: "Welsh", code: "cy" },
    { name: "Xhosa", code: "xh" },
    { name: "Yiddish", code: "yi" },
    { name: "Yoruba", code: "yo" },
    { name: "Zulu", code: "zu" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState("en");

  function languageHandler(e) {
    setSelectedLanguage(e.target.value);
    dispatch(setLanguage(e.target.value));
    console.log(e.target.value);

    // actually translating the notes
    dispatch(translateAllNotes(e.target.value));
  }

  function logoutHandler() {
    dispatch(logout());
  }

  useEffect(() => {
    console.log("isAuthenticated: ", isAuthenticated);

    if (isAuthenticated) {
      window.alert("Logged in!");
    }
  }, [isAuthenticated]);

  return (
    <Container>
      <h1>
        <Link to="/">notewave.</Link>
      </h1>
      <div>
        <button onClick={() => setModalOpen(true)}>Create Note</button>
        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/signup">
              <button>SignUp</button>
            </Link>
          </>
        ) : (
          <>
            <button onClick={logoutHandler}>Logout</button>
            <Link to="/shared/me">
              <button>Shared(ME)</button>
            </Link>
            <Link to="/shared/others">
              <button>Shared(Others)</button>
            </Link>
          </>
        )}
        <select onChange={(e) => languageHandler(e)}>
          {languages.map((lang, index) => {
            return (
              <option
                key={index}
                value={lang.code}
                selected={lang.code == selectedLanguage ? true : false}
              >
                {lang.name}
              </option>
            );
          })}
        </select>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  h1 {
    font-size: 1.5rem;
    font-weight: 400;
    letter-spacing: 2px;

    a {
      text-decoration: none;
      color: black;
    }
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 10px;

    button,
    select {
      padding: 5px 10px;
      border-radius: 5px;
      border: none;
      background-color: white;

      &:focus {
        outline: none;
      }
    }

    button {
      font-weight: 500;
    }
  }
`;

export default Navbar;
