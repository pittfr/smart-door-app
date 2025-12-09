import FormInput from "@/components/FormInput";
import SocialAuthButton from "@/components/SocialAuthButton";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { useAppColorScheme } from "@/hooks/use-theme";
import { useSSO } from "@clerk/clerk-expo";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useConvex } from "convex/react";
import * as AuthSession from "expo-auth-session";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
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
type providerType = "google" | "facebook" | "apple";

export default function Index() {
    const convex = useConvex();

    const { email } = useLocalSearchParams<{ email: string }>();
    const [emailAddress, setEmailAddress] = useState<string>(email || "");

    const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
    const { isLight } = useAppColorScheme();

    const router = useRouter();

    const { startSSOFlow } = useSSO();

    useFocusEffect(
        useCallback(() => {
            setIsRedirecting(false);
        }, [])
    );

    const handleOAuthSignIn = useCallback(async (provider: providerType) => {
        try {
            const strategy = `oauth_${provider}` as any;

            const { createdSessionId, setActive } = await startSSOFlow({
                strategy,
                redirectUrl: AuthSession.makeRedirectUri({
                    scheme: "exp",
                    path: "/",
                }),
            });

            if (createdSessionId) {
                setActive!({
                    session: createdSessionId,
                    navigate: async ({ session }) => {
                        if (session?.currentTask) {
                            console.log(session?.currentTask);
                            router.push("/(auth)/verify-email");
                            return;
                        }

                        setIsRedirecting(true);
                    },
                });
            } else {
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    }, []);

    const handleContinue = async () => {
        try {
            setIsRedirecting(true);

            const existingUser = await convex.query(api.users.getUserByEmail, {
                email: emailAddress.toLowerCase(),
            });

            if (existingUser) {
                router.push({
                    pathname: "/(auth)/login",
                    params: { email: emailAddress },
                });
            } else {
                router.push({
                    pathname: "/(auth)/sign-up",
                    params: { email: emailAddress },
                });
            }
        } catch (error) {
            setIsRedirecting(false);
            console.error("Error checking email: ", error);
        }
    };

    return (
        <View className="w-full h-full items-center">
            {isRedirecting ? (
                <View className="w-full h-full justify-center items-center">
                    <ActivityIndicator size={"large"} />
                </View>
            ) : (
                <View className="relative w-full h-full">
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        keyboardVerticalOffset={Platform.OS === "ios" ? -40 : 0}
                        style={{ flex: 1 }}
                    >
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 60 }}
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
                                    Welcome
                                </Text>
                                <Text className="text-light-muted-foreground dark:text-dark-muted-foreground mt-1">
                                    Sign in or create an account to continue
                                </Text>
                            </View>
                            <View className="w-full items-center gap-3">
                                <SocialAuthButton
                                    provider="Google"
                                    onPress={() => handleOAuthSignIn("google")}
                                />
                                <SocialAuthButton
                                    provider="Apple"
                                    onPress={() => handleOAuthSignIn("apple")}
                                />
                                <SocialAuthButton
                                    provider="Facebook"
                                    onPress={() =>
                                        handleOAuthSignIn("facebook")
                                    }
                                />
                            </View>
                            <View className="relative my-12">
                                <View className="w-full border-t border-t-slate-300 dark:border-t-dark-border" />
                                <View className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                                    <Text className="bg-light-background dark:bg-dark-background text-sm text-light-muted-foreground dark:text-dark-muted-foreground px-2 mb-1">
                                        or continue with
                                    </Text>
                                </View>
                            </View>
                            <FormInput
                                placeholder="Email Address"
                                value={emailAddress}
                                onChangeText={setEmailAddress}
                                inputType="email-address"
                            />
                            <View
                                style={{
                                    boxShadow: `0px 2px 10px ${COLORS.dark.primary.base}`,
                                }}
                                className="w-full h-16 bg-dark-primary rounded-xl my-4"
                            >
                                <TouchableOpacity
                                    className="h-full justify-center items-center"
                                    onPress={() => handleContinue()}
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
                </View>
            )}
        </View>
    );
}
