import { COLORS } from "@/constants/theme";
import { useAppColorScheme } from "@/hooks/use-theme";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
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
    onChangeText: (text: string) => void;
    inputType?: InputType;
}

export default function FormInput({
    placeholder,
    value,
    onChangeText,
    inputType = "default",
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
        <View className="mb-4">
            <View
                style={{
                    boxShadow:
                        "0px 0px 4px " +
                        COLORS[isLight ? "light" : "dark"].border,
                }}
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
                    keyboardType={actualKeyboardType}
                    secureTextEntry={secureTextEntry}
                    multiline={false}
                    numberOfLines={1}
                    className={`h-12  text-light-card-foreground dark:text-dark-card-foreground ml-4 ${hasToggle ? "mr-10" : "mr-1"}`}
                />
            </View>
        </View>
    );
}
