import ErrorBanner from "@/components/ErrorBanner";
import FormInput from "@/components/FormInput";
import { COLORS } from "@/constants/theme";
import { useAppColorScheme } from "@/hooks/use-theme";
import { validatePassword } from "@/utils/validation";
import { useSignIn } from "@clerk/clerk-expo";
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

export default function Login() {
    const { isLoaded, signIn, setActive } = useSignIn();
    const router = useRouter();

    const { email } = useLocalSearchParams<{ email: string }>();

    const { toggleColorScheme } = useColorScheme();

    const [password, setPassword] = useState<string>("");

    const [formError, setFormError] = useState<string>("");

    const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
    const { isLight } = useAppColorScheme();

    useFocusEffect(
        useCallback(() => {
            setIsRedirecting(false);
        }, [])
    );

    const onSignInPress = async () => {
        if (!isLoaded) return;

        setIsRedirecting(true);

        const validationError = await validatePassword({
            password,
        });

        if (validationError) {
            setFormError(validationError);
            setIsRedirecting(false);
            return;
        }

        try {
            setFormError("");

            await signIn.create({
                strategy: "password",
                identifier: email,
                password,
            });

            await setActive({ session: signIn.createdSessionId });

            router.replace("/(tabs)");
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
                    case "form_password_incorrect":
                        setFormError(
                            "Your password is incorrect. Please check and try again."
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
                            <View
                                className={`items-center ${formError ? "mb-4" : "mb-10"}`}
                            >
                                <Text className="text-3xl font-semibold text-light-foreground dark:text-dark-foreground">
                                    Welcome back
                                </Text>
                                <Text className="text-light-muted-foreground dark:text-dark-muted-foreground mt-1">
                                    Sign in to pick up where you left off
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
                                    placeholder="Password"
                                    value={password}
                                    onChangeText={setPassword}
                                    inputType="secure-toggleable"
                                />
                            </View>
                            {/* <View style={{ paddingLeft: 8 }} className="mt-2">
                            <TouchableOpacity>
                                <Text className="font-semibold text-sm text-dark-primary">
                                    Forgot your password?
                                </Text>
                            </TouchableOpacity>
                        </View> */}
                            <View
                                style={{
                                    boxShadow: `0px 2px 10px ${COLORS.dark.primary.base}`,
                                }}
                                className="w-full h-16 bg-dark-primary rounded-xl mt-4"
                            >
                                <TouchableOpacity
                                    className="h-full justify-center items-center"
                                    onPress={() => onSignInPress()}
                                >
                                    <Text className="text-white font-semibold text-lg">
                                        Sign In
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
