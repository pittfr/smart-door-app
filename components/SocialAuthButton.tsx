import { COLORS } from "@/constants/theme";
import { useAppColorScheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { TouchableOpacity, View } from "react-native";

interface SocialAuthButtonProps {
    provider: string;
    onPress: () => void;
}

export default function SocialAuthButton({
    provider,
    onPress,
}: SocialAuthButtonProps) {
    const { isLight } = useAppColorScheme();
    return (
        <View className="w-16 dark:bg-dark-input/30 rounded-lg border-light-border dark:border-dark-input border-2">
            <TouchableOpacity
                onPress={onPress}
                className="items-center justify-center p-3"
            >
                <Ionicons
                    name={
                        `logo-${provider.toLowerCase()}` as ComponentProps<
                            typeof Ionicons
                        >["name"]
                    }
                    size={18}
                    color={COLORS[isLight ? "light" : "dark"].muted.foreground}
                />
            </TouchableOpacity>
        </View>
    );
}
