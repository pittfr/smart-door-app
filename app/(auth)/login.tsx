import IconTextInput from "@/components/IconTextInput";
import SocialAuthButton from "@/components/SocialAuthButton";
import { COLORS } from "@/constants/theme";
import { useAppColorScheme } from "@/hooks/use-theme";
import { useSSO } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ImageBackground,
    Platform,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isLight } = useAppColorScheme();
    const bgImage = isLight
        ? require("../../assets/images/login-bg-light.png")
        : require("../../assets/images/login-bg-dark.png");

    const { startSSOFlow } = useSSO();
    const router = useRouter();

    const handleOAuthSignIn = async (
        provider: "google" | "facebook" | "apple"
    ) => {
        try {
            const strategy = `oauth_${provider}` as any;

            const { createdSessionId, setActive } = await startSSOFlow({
                strategy,
            });

            if (setActive && createdSessionId) {
                setActive({ session: createdSessionId });
                router.replace("/(tabs)");
            }
        } catch (error) {
            console.error("OAuth error:", error);
        }
    };

    const handleGoogleSignIn = () => handleOAuthSignIn("google");
    const handleFacebookSignIn = () => handleOAuthSignIn("facebook");
    const handleAppleSignIn = () => handleOAuthSignIn("apple");

    return (
        <ImageBackground
            source={bgImage}
            resizeMode="cover"
            className="flex-1 flex-col h-full bg-light-background dark:bg-dark-background px-5 pt-16"
        >
            {/* HEADER */}
            <View className="flex flex-col items-center">
                <View className="overflow-hidden rounded-3xl mb-4">
                    <View className="w-28 h-28">
                        <LinearGradient
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            colors={[
                                COLORS.light.primary.base,
                                COLORS.light.primary.light,
                                COLORS.light.secondary.base,
                            ]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Ionicons
                                name="lock-closed-outline"
                                size={50}
                                color={COLORS.light.background}
                            />
                        </LinearGradient>
                    </View>
                </View>
                <Text className="text-4xl font-semibold mb-2 text-light-foreground dark:text-dark-foreground">
                    SecureLock
                </Text>
                <Text className="text-light-muted-foreground dark:text-dark-muted-foreground">
                    Welcome back to your smart lock
                </Text>
            </View>
            {/* CARD */}
            <View className="bg-light-card dark:bg-dark-card flex flex-col rounded-2xl border-2 border-light-border dark:border-dark-border/50 shadow-2xl mt-8 p-6">
                {/* EMAIL & PASSWORD */}
                <IconTextInput
                    icon="mail-outline"
                    label="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <IconTextInput
                    icon="lock-closed-outline"
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    toggleSecure
                />
                {/* FORGOT PASSWORD? */}
                <TouchableOpacity
                    className="ml-auto mr-0 mb-4"
                    onPress={() => console.log("forgot password pressed!")}
                >
                    <Text className="text-light-primary dark:text-dark-primary">
                        Forgot password?
                    </Text>
                </TouchableOpacity>
                {/* SIGN IN BUTTON */}
                <View className="rounded-lg overflow-hidden">
                    <LinearGradient
                        colors={[
                            COLORS.light.primary.base,
                            "#2563EB",
                            COLORS.light.secondary.base,
                        ]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <TouchableOpacity
                            className="w-full h-12 flex justify-center items-center"
                            onPress={() => {
                                console.log("sign in button pressed!");
                            }}
                        >
                            <Text className="font-medium text-light-primary-foreground">
                                Sign In
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
                {/* OR CONTINUE WITH */}
                <View className="relative my-8">
                    <View className="w-full border-t border-light-border dark:border-dark-border" />
                    <View className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
                        <Text className="bg-light-card dark:bg-dark-card text-sm text-light-muted-foreground dark:text-dark-muted-foreground px-2">
                            Or continue with
                        </Text>
                    </View>
                </View>
                {/* SIGN IN WITH SOCIAL ACCOUNTS */}

                <View className="flex-row items-center justify-center gap-4">
                    <SocialAuthButton
                        provider="Google"
                        onPress={handleGoogleSignIn}
                    />
                    <SocialAuthButton
                        provider="Facebook"
                        onPress={handleFacebookSignIn}
                    />
                    {Platform.OS === "ios" && (
                        <SocialAuthButton
                            provider="Apple"
                            onPress={handleAppleSignIn}
                        />
                    )}
                </View>

                {/* DON'T HAVE AN ACCOUNT? */}
                <View className="pt-4 flex-row justify-center items-center">
                    <Text className="text-light-muted-foreground dark:text-dark-muted-foreground mr-2">
                        Don't have an account?
                    </Text>
                    <TouchableOpacity
                        onPress={() => router.navigate("/(auth)/sign-up")}
                    >
                        <Text className="text-light-primary dark:text-dark-primary font-medium">
                            Sign Up
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text className="text-xs text-light-muted-foreground dark:text-dark-muted-foreground text-center mt-6">
                Protected by end-to-end encryption
            </Text>
        </ImageBackground>
    );
}
