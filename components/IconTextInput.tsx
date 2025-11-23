import { COLORS } from "@/constants/theme";
import { useAppColorScheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { useState, type ComponentProps } from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    type TextInputProps,
} from "react-native";

interface IconTextInputProps {
    icon: ComponentProps<typeof Ionicons>["name"];
    label?: string;
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    keyboardType?: TextInputProps["keyboardType"];
    secureTextEntry?: boolean;
    toggleSecure?: boolean;
}

export default function IconTextInput({
    icon,
    label,
    placeholder,
    value,
    onChangeText,
    keyboardType,
    secureTextEntry,
    toggleSecure,
}: IconTextInputProps) {
    const { isLight } = useAppColorScheme();
    const [isSecure, setIsSecure] = useState<boolean>(!!secureTextEntry);

    const actualSecure = toggleSecure ? isSecure : !!secureTextEntry;

    return (
        <View className="mb-4">
            {label && (
                <Text className="font-semibold text-light-card-foreground dark:text-dark-card-foreground mb-2">
                    {label}
                </Text>
            )}
            <View
                className={`relative w-full h-12 bg-light-background dark:bg-dark-input/30 rounded-lg border-transparent dark:border-dark-input border-2  justify-center`}
            >
                <View className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Ionicons
                        name={icon}
                        size={18}
                        color={
                            COLORS[isLight ? "light" : "dark"].muted.foreground
                        }
                    />
                </View>
                {toggleSecure && (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityLabel={
                            actualSecure ? "Show password" : "Hide password"
                        }
                        onPress={() => setIsSecure((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                        <Ionicons
                            name={actualSecure ? "eye-off" : "eye"}
                            size={18}
                            color={
                                COLORS[isLight ? "light" : "dark"].muted
                                    .foreground
                            }
                        />
                    </TouchableOpacity>
                )}
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder ?? ""}
                    placeholderTextColor={
                        COLORS[isLight ? "light" : "dark"].muted.foreground
                    }
                    selectionColor={
                        COLORS[isLight ? "light" : "dark"].primary.base
                    }
                    keyboardType={keyboardType ?? "default"}
                    secureTextEntry={actualSecure}
                    className={`text-light-card-foreground dark:text-dark-card-foreground ml-10 ${toggleSecure ? "mr-10" : "mr-1"}`}
                />
            </View>
        </View>
    );
}
