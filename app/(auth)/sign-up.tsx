import ErrorBanner from "@/components/ErrorBanner";
import FormInput from "@/components/FormInput";
import { COLORS } from "@/constants/theme";
import { useAppColorScheme } from "@/hooks/use-theme";
import { validateSignUp } from "@/utils/validation";
import { useSignUp } from "@clerk/clerk-expo";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { useCallback, useState } from "react";

import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const router = useRouter();

    const { email } = useLocalSearchParams<{ email: string }>();

    const { toggleColorScheme } = useColorScheme();

    const [fullName, setFullName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [formError, setFormError] = useState<string>("");

    const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
    const { isLight } = useAppColorScheme();

    useFocusEffect(
        useCallback(() => {
            setIsRedirecting(false);
        }, [])
    );

    const onSignUpPress = async () => {
        if (!isLoaded) return;

        setIsRedirecting(true);

        const validationError = await validateSignUp({
            fullName,
            password,
            confirmPassword,
        });

        if (validationError) {
            setFormError(validationError);
            setIsRedirecting(false);
            return;
        }

        try {
            setFormError("");

            await signUp.create({
                firstName: fullName.split(" ")[0],
                lastName: fullName.split(" ").slice(1).join(" "),
                emailAddress: email,
                password: password,
            });

            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });

            router.push({
                pathname: "/(auth)/verify-email",
                params: { email },
            });
        } catch (err) {
            const clerkErr = err as any;

            if (
                clerkErr.errors &&
                Array.isArray(clerkErr.errors) &&
                clerkErr.errors.length > 0
            ) {
                const errorCode = clerkErr.errors[0].code;
                const errorMessage =
                    clerkErr.errors[0].longMessage ||
                    clerkErr.errors[0].message;

                switch (errorCode) {
                    case "form_password_pwned":
                        setFormError(
                            "This password is too weak. Please choose a stronger password."
                        );
                        break;
                    case "form_password_length_too_short":
                        setFormError(
                            "Password is too short. Please use at least 8 characters."
                        );
                        break;
                    case "form_password_validation_failed":
                        setFormError(
                            "Password doesn't meet the requirements. Please choose a stronger password."
                        );
                        break;
                    case "form_identifier_exists":
                        setFormError(
                            "An account with this email already exists. Please sign in instead."
                        );
                        break;
                    default:
                        setFormError(
                            errorMessage ||
                                "An error occurred during sign up. Please try again later."
                        );
                }
            } else {
                setFormError(
                    "An error occurred during sign up. Please try again later."
                );
                console.error("Sign up error:", JSON.stringify(err, null, 2));
            }

            setIsRedirecting(false);
        }
    };

    return (
        <View className="relative h-full">
            {isRedirecting ? (
                <View className="w-full h-full justify-center items-center">
                    <ActivityIndicator size={"large"} />
                </View>
            ) : (
                <>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        keyboardVerticalOffset={Platform.OS === "ios" ? -40 : 0}
                        style={{ flex: 1 }}
                    >
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 80 }}
                            className="px-5 pt-16"
                            keyboardShouldPersistTaps="handled"
                        >
                            <View className="w-full h-28 items-center mb-8">
                                <View className="rounded-full overflow-hidden">
                                    <View className="w-28 h-full items-center justify-center bg-slate-200/80 dark:bg-slate-800/50">
                                        <MaterialCommunityIcons
                                            name="shield-lock-outline"
                                            size={54}
                                            color={COLORS.dark.primary.base}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View className="items-center mb-10">
                                <Text className="text-3xl font-semibold text-light-foreground dark:text-dark-foreground">
                                    Register
                                </Text>
                                <Text className="text-light-muted-foreground dark:text-dark-muted-foreground mt-1">
                                    Just a few quick steps to get started
                                </Text>
                            </View>
                            <View className="gap-4">
                                <ErrorBanner message={formError} />
                                <FormInput
                                    value={email}
                                    inputType="email-address"
                                    isDisabled
                                    showDisabledEditText
                                    onDisabledEditPress={() =>
                                        router.replace({
                                            pathname: "/(auth)",
                                            params: { email: email },
                                        })
                                    }
                                />
                                <FormInput
                                    placeholder="Full name"
                                    value={fullName}
                                    onChangeText={setFullName}
                                />
                                <FormInput
                                    placeholder="Password"
                                    value={password}
                                    onChangeText={setPassword}
                                    inputType="secure-toggleable"
                                />
                                <FormInput
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    inputType="secure-toggleable"
                                />
                            </View>
                            <View
                                style={{
                                    boxShadow: `0px 2px 10px ${COLORS.dark.primary.base}`,
                                }}
                                className="w-full h-16 bg-dark-primary rounded-xl mt-4"
                            >
                                <TouchableOpacity
                                    className="h-full justify-center items-center"
                                    onPress={() => onSignUpPress()}
                                >
                                    <Text className="text-white font-semibold text-lg">
                                        Continue
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                    <View
                        style={{
                            position: "absolute",
                            bottom: 20,
                            left: "50%",
                            transform: [{ translateX: "-50%" }],
                        }}
                        className="flex-row justify-center items-center gap-1"
                    >
                        <Ionicons
                            name={
                                isLight
                                    ? "shield-checkmark-outline"
                                    : "shield-checkmark"
                            }
                            size={14}
                            color={
                                COLORS[isLight ? "light" : "dark"].muted
                                    .foreground
                            }
                        />
                        <Text className="text-xs text-light-muted-foreground dark:text-dark-muted-foreground">
                            Protected by end-to-end encryption
                        </Text>
                    </View>
                </>
            )}
        </View>
    );
}
