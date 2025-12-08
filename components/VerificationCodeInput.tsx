import { COLORS } from "@/constants/theme";
import { useAppColorScheme } from "@/hooks/use-theme";
import { useRef, useState } from "react";
import type {
    NativeSyntheticEvent,
    TextInputKeyPressEventData,
} from "react-native";
import { TextInput, View } from "react-native";

interface VerificationCodeInputProps {
    length?: number;
    onChangeCode?: (code: string) => void;
}

export default function VerificationCodeInput({
    length = 6,
    onChangeCode,
}: VerificationCodeInputProps) {
    const [code, setCode] = useState<string[]>(Array(length).fill(""));
    const inputs = useRef<(TextInput | null)[]>([]);
    const { isLight } = useAppColorScheme();

    const handleChangeText = (text: string, index: number) => {
        if (text.length > 1) {
            text = text[text.length - 1];
        }

        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        onChangeCode?.(newCode.join(""));

        if (text && index < length - 1) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (
        e: NativeSyntheticEvent<TextInputKeyPressEventData>,
        index: number
    ) => {
        if (e.nativeEvent.key === "Backspace") {
            if (!code[index] && index > 0) {
                // if current box is empty, move to previous box
                const newCode = [...code];
                newCode[index - 1] = "";
                setCode(newCode);
                inputs.current[index - 1]?.focus();
                onChangeCode?.(newCode.join(""));
            } else if (code[index]) {
                // clear current box
                const newCode = [...code];
                newCode[index] = "";
                setCode(newCode);
                onChangeCode?.(newCode.join(""));
            }
        }
    };

    return (
        <View className="flex-row justify-center items-center gap-2">
            {code.map((digit, index) => (
                <View
                    key={index}
                    style={{
                        boxShadow: `0px 0px 8px ${isLight ? COLORS.dark.primary.base : COLORS.dark.border}40`,
                    }}
                    className="w-12 h-14 rounded-xl border border-dark-primary dark:border-dark-border bg-light-card dark:bg-dark-card justify-center items-center"
                >
                    <TextInput
                        ref={(ref) => {
                            inputs.current[index] = ref;
                        }}
                        value={digit}
                        onChangeText={(text) => handleChangeText(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        keyboardType="number-pad"
                        maxLength={1}
                        selectTextOnFocus
                        cursorColor={COLORS.dark.primary.base}
                        className="w-full h-full text-center text-2xl font-semibold text-light-foreground dark:text-dark-foreground"
                        style={{
                            textAlign: "center",
                        }}
                    />
                </View>
            ))}
        </View>
    );
}
