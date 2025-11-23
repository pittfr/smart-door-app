import IconTextInput from "@/components/IconTextInput";
import { COLORS } from "@/constants/theme";
import { useAppColorScheme } from "@/hooks/use-theme";
import { useSignUp } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";

import {
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

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formError, setFormError] = useState<string>("");

    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState("");

    const { isLight } = useAppColorScheme();

    const onSignUpPress = async () => {
        if (!isLoaded) return;

        if (password !== confirmPassword) return;

        try {
            setFormError("");
            await signUp.create({
                firstName,
                lastName,
                emailAddress,
                password,
            });

            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });

            setPendingVerification(true);
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    const onVerifyPress = async () => {
        if (!isLoaded) return;

        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code,
            });
            if (signUpAttempt.status === "complete") {
                await setActive({ session: signUpAttempt.createdSessionId });
                router.replace("/(tabs)");
            } else {
                console.error(JSON.stringify(signUpAttempt, null, 2));
            }
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <View className="flex-1 flex-col h-full">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? -40 : 0}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 80 }}
                    className="px-5 pt-16"
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
                        {!pendingVerification ? (
                            <>
                                {/* USER DETAILS */}
                                <IconTextInput
                                    icon="person-outline"
                                    label="First name"
                                    placeholder="Enter your first name"
                                    value={firstName}
                                    onChangeText={setFirstName}
                                />
                                <IconTextInput
                                    icon="person-outline"
                                    label="Last name"
                                    placeholder="Enter your last name"
                                    value={lastName}
                                    onChangeText={setLastName}
                                />
                                <IconTextInput
                                    icon="mail-outline"
                                    label="Email"
                                    placeholder="Enter your email"
                                    value={emailAddress}
                                    onChangeText={setEmailAddress}
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
                                <IconTextInput
                                    icon="lock-closed-outline"
                                    label="Confirm password"
                                    placeholder="Re-enter your password"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry
                                    toggleSecure
                                />
                                {confirmPassword.length > 0 &&
                                    password !== confirmPassword && (
                                        <Text className="-mt-3 mb-2 text-xs text-red-500">
                                            Passwords do not match
                                        </Text>
                                    )}
                                {!!formError && (
                                    <Text className="mb-2 text-xs text-red-500">
                                        {formError}
                                    </Text>
                                )}
                                {/*TERMS AND PRIVACY POLICY*/}
                                <View className="mt-2 mb-2">
                                    <Text className="text-xs text-light-muted-foreground dark:text-dark-muted-foreground">
                                        By continuing, you agree to our{" "}
                                        <Text
                                            className="text-light-primary dark:text-dark-primary text-xs"
                                            onPress={() =>
                                                console.log("Terms pressed!")
                                            }
                                        >
                                            Terms
                                        </Text>{" "}
                                        and{" "}
                                        <Text
                                            className="text-light-primary dark:text-dark-primary text-xs"
                                            onPress={() =>
                                                console.log(
                                                    "Privacy policy pressed!"
                                                )
                                            }
                                        >
                                            Privacy Policy
                                        </Text>
                                    </Text>
                                </View>
                                {/* SIGN UP BUTTON */}
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
                                            onPress={onSignUpPress}
                                        >
                                            <Text className="font-medium text-light-primary-foreground">
                                                Sign Up
                                            </Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </View>
                                {/* DON'T HAVE AN ACCOUNT? */}
                                <View className="pt-4 flex-row justify-center items-center">
                                    <Text className="text-light-muted-foreground dark:text-dark-muted-foreground mr-2">
                                        Already have an account?
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            router.navigate("/(auth)/login")
                                        }
                                    >
                                        <Text className="text-light-primary dark:text-dark-primary font-medium">
                                            Sign In
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        ) : (
                            <>
                                {/* VERIFICATION CODE */}
                                <Text className="text-sm text-light-muted-foreground dark:text-dark-muted-foreground mb-2">
                                    Enter the verification code sent to your
                                    email
                                </Text>
                                <IconTextInput
                                    icon="key-outline"
                                    label="Verification Code"
                                    placeholder="123456"
                                    value={code}
                                    onChangeText={setCode}
                                    keyboardType="number-pad"
                                />
                                <View className="rounded-lg overflow-hidden mt-2">
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
                                            onPress={onVerifyPress}
                                        >
                                            <Text className="font-medium text-light-primary-foreground">
                                                Verify
                                            </Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </View>
                            </>
                        )}
                    </View>
                    <Text className="text-xs text-light-muted-foreground dark:text-dark-muted-foreground text-center mt-6">
                        Protected by end-to-end encryption
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
