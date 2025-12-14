export type ValidateEmailInput = {
    email: string;
};

export async function validateEmail({
    email,
}: ValidateEmailInput): Promise<string | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const trimmedEmail = (email || "").trim();

    if (!trimmedEmail) return "Please enter your email address.";

    // basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
        return "Please enter a valid email address.";
    }

    return null;
}

export type ValidatePasswordInput = {
    password: string;
};

export async function validatePassword({
    password,
}: ValidatePasswordInput): Promise<string | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const pass = (password || "").trim();

    if (!pass) return "Please enter a password.";

    if (pass.length < 8) {
        return "Password must be at least 8 characters long.";
    }

    return null;
}

export type SignUpValidationInput = {
    fullName: string;
    password: string;
    confirmPassword: string;
};

export async function validateSignUp({
    fullName,
    password,
    confirmPassword,
}: SignUpValidationInput): Promise<string | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const name = (fullName || "").trim();
    const pass = (password || "").trim();
    const confirm = (confirmPassword || "").trim();

    if (!name) return "Please enter your first and last name.";

    // only letters and spaces
    if (!/^[\p{L}\s]+$/u.test(name)) {
        return "Full name can only contain letters and spaces.";
    }

    // require at least two names
    if (name.split(/\s+/).length < 2) {
        return "Please add a last name.";
    }

    if (!pass) return "Please enter a password.";

    if (pass.length < 8) {
        return "Password must be at least 8 characters long.";
    }

    if (!confirm) return "Please confirm your password.";

    if (pass !== confirm) return "Passwords do not match.";

    return null;
}

export type ValidateEmailCodeInput = {
    code: string;
};

export async function validateEmailCode({
    code,
}: ValidateEmailCodeInput): Promise<string | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const trimmedCode = (code || "").trim();

    if (!trimmedCode) return "Please enter the verification code.";

    if (!/^\d{6}$/.test(trimmedCode)) {
        return "Verification code must be 6 digits.";
    }

    return null;
}
