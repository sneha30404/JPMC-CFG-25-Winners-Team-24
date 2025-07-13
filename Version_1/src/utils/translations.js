// Basic translations for common phrases
export const translations = {
  english: {
    // Common
    welcome: "Welcome",
    dashboard: "Dashboard",
    community: "Community",
    profile: "Profile",
    logout: "Logout",
    
    // Dashboard
    courseProgress: "Course Progress",
    mentorGroups: "Mentor Groups",
    learningPath: "My Learning Path",
    
    // Community
    askCommunity: "Ask the Community",
    createPost: "Create Post",
    postQuery: "Post Query",
    
    // Success Stories
    successStory: "Success Story",
    shareSuccess: "Share Success Story",
    
    // Admin
    generateReports: "Generate Reports",
    managementPanel: "Management Panel",
    
    // Login/Signup
    login: "Login",
    phoneNumber: "Phone Number",
    enterOTP: "Enter OTP",
    
    // Other common terms
    save: "Save",
    cancel: "Cancel",
    submit: "Submit",
    back: "Back",
  },
  hindi: {
    // Common
    welcome: "स्वागत है",
    dashboard: "डैशबोर्ड",
    community: "समुदाय",
    profile: "प्रोफ़ाइल",
    logout: "लॉग आउट",
    
    // Dashboard
    courseProgress: "पाठ्यक्रम प्रगति",
    mentorGroups: "मेंटर समूह",
    learningPath: "मेरा सीखने का मार्ग",
    
    // Community
    askCommunity: "समुदाय से पूछें",
    createPost: "पोस्ट बनाएं",
    postQuery: "प्रश्न पोस्ट करें",
    
    // Success Stories
    successStory: "सफलता की कहानी",
    shareSuccess: "सफलता की कहानी साझा करें",
    
    // Admin
    generateReports: "रिपोर्ट जनरेट करें",
    managementPanel: "प्रबंधन पैनल",
    
    // Login/Signup
    login: "लॉगिन",
    phoneNumber: "फोन नंबर",
    enterOTP: "ओटीपी दर्ज करें",
    
    // Other common terms
    save: "सहेजें",
    cancel: "रद्द करें",
    submit: "जमा करें",
    back: "वापस",
  },
  kannada: {
    // Common
    welcome: "ಸ್ವಾಗತ",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    community: "ಸಮುದಾಯ",
    profile: "ಪ್ರೊಫೈಲ್",
    logout: "ಲಾಗ್ ಔಟ್",
    
    // Dashboard
    courseProgress: "ಕೋರ್ಸ್ ಪ್ರಗತಿ",
    mentorGroups: "ಮಾರ್ಗದರ್ಶಿ ಗುಂಪುಗಳು",
    learningPath: "ನನ್ನ ಕಲಿಕೆಯ ಮಾರ್ಗ",
    
    // Community
    askCommunity: "ಸಮುದಾಯವನ್ನು ಕೇಳಿ",
    createPost: "ಪೋಸ್ಟ್ ರಚಿಸಿ",
    postQuery: "ಪ್ರಶ್ನೆ ಪೋಸ್ಟ್ ಮಾಡಿ",
    
    // Success Stories
    successStory: "ಯಶಸ್ಸಿನ ಕಥೆ",
    shareSuccess: "ಯಶಸ್ಸಿನ ಕಥೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ",
    
    // Admin
    generateReports: "ವರದಿಗಳನ್ನು ರಚಿಸಿ",
    managementPanel: "ನಿರ್ವಹಣಾ ಪ್ಯಾನೆಲ್",
    
    // Login/Signup
    login: "ಲಾಗಿನ್",
    phoneNumber: "ಫೋನ್ ನಂಬರ್",
    enterOTP: "ಒಟಿಪಿ ನಮೂದಿಸಿ",
    
    // Other common terms
    save: "ಉಳಿಸಿ",
    cancel: "ರದ್ದುಮಾಡಿ",
    submit: "ಸಲ್ಲಿಸಿ",
    back: "ಹಿಂದೆ",
  }
};

// Translation function
export const translate = (key, language = 'english') => {
  if (!translations[language]) {
    return key; // Return the key if language not found
  }
  
  return translations[language][key] || key; // Return the translation or the key if not found
};