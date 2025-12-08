import VerificationCodeInput from "@/components/VerificationCodeInput";
import { COLORS } from "@/constants/theme";
import { useAppColorScheme } from "@/hooks/use-theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function VerifyEmail() {
    const { email } = useLocalSearchParams<{ email: string }>();
    const [verificationCode, setVerificationCode] = useState<string>("");

    const { toggleColorScheme } = useColorScheme();
    const { isLight } = useAppColorScheme();

    const router = useRouter();

    const handleVerifyCode = () => {
        console.log("Verification code:", verificationCode);
        toggleColorScheme();
    };

    return (
        <View className="relative h-full">
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

                    <View className="my-8">
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
                            onPress={handleVerifyCode}
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
                    color={COLORS[isLight ? "light" : "dark"].muted.foreground}
                />
                <Text className="text-xs text-light-muted-foreground dark:text-dark-muted-foreground">
                    Protected by end-to-end encryption
                </Text>
            </View>
        </View>
    );
}
