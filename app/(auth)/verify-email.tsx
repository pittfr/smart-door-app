import ErrorBanner from "@/components/ErrorBanner";
import VerificationCodeInput from "@/components/VerificationCodeInput";
import { COLORS } from "@/constants/theme";
import { useAppColorScheme } from "@/hooks/use-theme";
import { validateEmailCode } from "@/utils/validation";
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

export default function VerifyEmail() {
    const { isLoaded, signUp, setActive } = useSignUp();

    const { email } = useLocalSearchParams<{ email: string }>();
    const [verificationCode, setVerificationCode] = useState<string>("");

    const { toggleColorScheme } = useColorScheme();

    const [formError, setFormError] = useState<string>("");

    const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
    const { isLight } = useAppColorScheme();

    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            setIsRedirecting(false);
        }, [])
    );

    const onVerifyPress = async () => {
        if (!isLoaded) return;

        setIsRedirecting(true);

        const validationError = await validateEmailCode({
            code: verificationCode,
        });

        if (validationError) {
            setFormError(validationError);
            setIsRedirecting(false);
            return;
        }

        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code: verificationCode,
            });

            if (signUpAttempt.status === "complete") {
                await setActive({ session: signUpAttempt.createdSessionId });
            } else {
                console.error(JSON.stringify(signUpAttempt, null, 2));
            }
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
                    case "form_code_incorrect":
                        setFormError(
                            "The verification code you entered is incorrect. Please try again."
                        );
                        break;
                    case "verification_failed":
                        setFormError(
                            "Too many failed attempts. Please try again later."
                        );
                        break;
                    case "verification_expired":
                        setFormError(
                            "The verification code has expired. Please request a new code."
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
                            contentContainerStyle={{ paddingBottom: 50 }}
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
                            <View className="items-center">
                                <Text className="text-3xl font-semibold text-light-foreground dark:text-dark-foreground">
                                    Email Verification
                                </Text>
                                <Text className="text-light-muted-foreground dark:text-dark-muted-foreground whitespace-nowrap mt-1">
                                    Enter the 6-digit code that was sent to
                                </Text>
                                <Text className="text-sm font-bold text-light-muted-foreground dark:text-dark-foreground whitespace-nowrap mt-1">
                                    {email}
                                </Text>
                            </View>
                            <View className={formError ? "my-4 gap-4" : "my-8"}>
                                <ErrorBanner message={formError} />
                                <VerificationCodeInput
                                    length={6}
                                    onChangeCode={setVerificationCode}
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
                                    onPress={onVerifyPress}
                                >
                                    <Text className="text-white font-semibold text-lg">
                                        Verify
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
