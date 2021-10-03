import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from "i18next";
import enUsTrans from "../public/locales/en-us.json";
import zhCnTrans from "../public/locales/zh-cn.json";
import {
    initReactI18next
} from 'react-i18next';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: enUsTrans,
            },
            zh: {
                translation: zhCnTrans,
            },
        },
        //选择默认语言，选择内容为上述配置中的key，即en/zh
        fallbackLng: "en",
        debug: false,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    })

export default i18n;
