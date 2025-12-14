import { COLORS } from "@/constants/theme";
import { useAppColorScheme } from "@/hooks/use-theme";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    type TextInputProps,
} from "react-native";

type InputType =
    | TextInputProps["keyboardType"]
    | "secure"
    | "secure-toggleable";

interface FormInputProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChangeText?: (text: string) => void;
    inputType?: InputType;
    isDisabled?: boolean;
    showDisabledEditText?: boolean;
    onDisabledEditPress?: () => void;
}

export default function FormInput({
    placeholder,
    value,
    onChangeText,
    inputType = "default",
    isDisabled = false,
    showDisabledEditText = false,
    onDisabledEditPress,
}: FormInputProps) {
    const { isLight } = useAppColorScheme();
    const [isSecureVisible, setIsSecureVisible] = useState<boolean>(false);

    const isSecureInput =
        inputType === "secure" || inputType === "secure-toggleable";
    const hasToggle = inputType === "secure-toggleable";
    const secureTextEntry =
        isSecureInput && (hasToggle ? !isSecureVisible : true);
    const actualKeyboardType: TextInputProps["keyboardType"] = isSecureInput
        ? "default"
        : (inputType as TextInputProps["keyboardType"]);

    return (
        <View
            className={
                "relative w-full h-14 bg-light-card dark:bg-dark-card rounded-lg border border-light-border dark:border-dark-border justify-center overflow-hidden"
            }
        >
            {hasToggle && (
                <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel={
                        isSecureVisible ? "Hide password" : "Show password"
                    }
                    onPress={() => setIsSecureVisible((v) => !v)}
                    className="absolute right-5 top-1/2 -translate-y-1/2"
                >
                    <Feather
                        name={isSecureVisible ? "eye" : "eye-off"}
                        size={18}
                        color={
                            COLORS[isLight ? "light" : "dark"].muted.foreground
                        }
                    />
                </TouchableOpacity>
            )}
            {showDisabledEditText && (
                <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel="Edit input"
                    onPress={onDisabledEditPress}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                    <Text className="font-semibold text-dark-primary">
                        Edit
                    </Text>
                </TouchableOpacity>
            )}
            <TextInput
                value={value}
                onChangeText={!isDisabled ? onChangeText : undefined}
                editable={!isDisabled}
                placeholder={placeholder ?? ""}
                placeholderTextColor={
                    COLORS[isLight ? "light" : "dark"].muted.foreground
                }
                selectionColor={COLORS[isLight ? "light" : "dark"].primary.base}
                keyboardType={actualKeyboardType}
                secureTextEntry={secureTextEntry}
                multiline={false}
                numberOfLines={1}
                style={{ lineHeight: 16 }}
                className={`h-14 ${isDisabled ? "text-light-card-foreground/50 dark:text-dark-card-foreground/50" : "text-light-card-foreground dark:text-dark-card-foreground"} ml-4 ${hasToggle || showDisabledEditText ? "mr-14" : "mr-1"}`}
            />
        </View>
    );
}
