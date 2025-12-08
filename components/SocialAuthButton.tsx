import { COLORS } from "@/constants/theme";
import { useAppColorScheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface SocialAuthButtonProps {
    provider: string;
    onPress: () => void;
}

function getSocialAuthColors(provider: string, isLight: boolean) {
    const normalizedProvider = provider.toLowerCase();

    const colors: Record<
        string,
        {
            light: {
                foregroundColor: string;
                backgroundColor: string;
                borderColor: string;
            };
            dark: {
                foregroundColor: string;
                backgroundColor: string;
                borderColor: string;
            };
        }
    > = {
        apple: {
            light: {
                foregroundColor: "#FFFFFF",
                backgroundColor: "#000000",
                borderColor: "#000000",
            },
            dark: {
                foregroundColor: "#000000",
                backgroundColor: "#FFFFFF",
                borderColor: "#FFFFFF",
            },
        },
        facebook: {
            light: {
                foregroundColor: "#FFFFFF",
                backgroundColor: "#2563EB",
                borderColor: "#2563EB",
            },
            dark: {
                foregroundColor: "#FFFFFF",
                backgroundColor: "#2563EB",
                borderColor: "#2563EB",
            },
        },
        default: {
            light: {
                foregroundColor: COLORS.light.card.foreground,
                backgroundColor: COLORS.light.card.base,
                borderColor: COLORS.light.border,
            },
            dark: {
                foregroundColor: COLORS.dark.card.foreground,
                backgroundColor: COLORS.dark.card.base,
                borderColor: COLORS.dark.border,
            },
        },
    };

    const providerColors = colors[normalizedProvider] || colors["default"];
    return isLight ? providerColors.light : providerColors.dark;
}

export default function SocialAuthButton({
    provider,
    onPress,
}: SocialAuthButtonProps) {
    const { isLight } = useAppColorScheme();
    const { foregroundColor, backgroundColor, borderColor } =
        getSocialAuthColors(provider, isLight);

    return (
        <View
            style={{
                backgroundColor,
                borderColor,
                boxShadow: "0px 1px 4px " + borderColor,
            }}
            className="w-full rounded-xl border"
        >
            <TouchableOpacity onPress={onPress} className="h-14 items-center">
                <View className="h-full flex-row items-center gap-4">
                    <Ionicons
                        name={
                            `logo-${provider.toLowerCase()}` as ComponentProps<
                                typeof Ionicons
                            >["name"]
                        }
                        size={provider.toLowerCase() === "google" ? 20 : 24}
                        color={foregroundColor}
                    />
                    <Text
                        style={{ color: foregroundColor }}
                        className="font-semibold"
                    >
                        Continue with {provider}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
