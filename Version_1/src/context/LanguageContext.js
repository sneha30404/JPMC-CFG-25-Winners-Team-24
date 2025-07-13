import React, { createContext, useState, useContext } from 'react';
import { translate } from '../utils/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('english');
  
  const t = (key) => translate(key, language);
  
  const changeLanguage = (newLanguage) => {
    if (['english', 'hindi', 'kannada'].includes(newLanguage)) {
      setLanguage(newLanguage);
      localStorage.setItem('icecd_language', newLanguage);
    }
  };
  
  // Load saved language preference
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('icecd_language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);