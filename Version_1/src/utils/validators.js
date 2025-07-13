// Validation utility functions

// Validate phone number (Indian format)
export const isValidIndianPhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
};

// Validate email
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate OTP (4-6 digits)
export const isValidOTP = (otp) => {
    const otpRegex = /^\d{4,6}$/;
    return otpRegex.test(otp);
};

// Check if string is empty or only whitespace
export const isEmptyString = (str) => {
    return !str || str.trim() === '';
};

// Check if URL is valid
export const isValidURL = (url) => {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
};

// Validate password strength
export const isStrongPassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
};