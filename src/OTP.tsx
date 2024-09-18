import React from "react"
import { TextStyle } from "react-native";
import {
    StyleProp,
    StyleSheet,
    TextInput,
    TextInputKeyPressEventData,
    View, ViewStyle,
    NativeSyntheticEvent
} from "react-native"

interface RNOTPInputProps {
    length?: number;
    onCompleteFn: (otp: string) => void
    inputStyle: StyleProp<TextStyle>
    containerStyle: StyleProp<ViewStyle>
    focusStyle: StyleProp<TextStyle>
}

/**
 * A one-time-password component 
 * @param {Object} props - The component props.
 * @param {length} props.length - The length of the inputs.
 * @param {onCompleteFn} props.onCompleteFn - function that returns the otp value
 * @param {inputStyle} props.inputStyle - native input style
 * @param {containerStyle} props.containerStyle - native style for the otp container
 * @param {focusStyle} props.focusStyle - on focus style for the otp input
 */

const RNOTPInput: React.FC<RNOTPInputProps> = (props) => {
    const { length = 4, onCompleteFn, inputStyle, containerStyle, focusStyle } = props
    const [otp, setOtp] = React.useState<string[]>(Array(length).fill(''))
    const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
    const inputRefs = React.useRef<(TextInput | null)[]>([]);

    const focusNextInput = React.useCallback(
        (index: number) => {
            if (index < length - 1 && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1]?.focus();
            } else if (index === length - 1) {
                inputRefs.current[index]?.blur();
            }
        },
        [length],
    );

    const focusPreviousInput = React.useCallback((index: number) => {
        if (index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1]?.focus();
        }
    }, []);

    const handleChange = (text: string, index: number) => {
        if (/^[0-9]$/.test(text)) {
            const newOTP = [...otp];
            newOTP[index] = text;
            setOtp(newOTP);
            focusNextInput(index);

            if (newOTP.every(digit => digit !== '')) {
                onCompleteFn(newOTP.join(''));
            }
        }
    };
    const handleKeyPress = (event: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        if (event.nativeEvent.key === 'Backspace' && otp[index] === '') {
            focusPreviousInput(index);
        } else if (
            event.nativeEvent.key === 'Backspace' ||
            event.nativeEvent.key === 'Delete'
        ) {
            const newOTP = [...otp];
            newOTP[index] = '';
            setOtp(newOTP);
        }
    };
    const handleFocus = (index: number) => {
        setFocusedIndex(index);
    };
    const handleBlur = () => {
        setFocusedIndex(null);
    };

    React.useEffect(() => {
        inputRefs?.current[0]?.focus();
    }, []);

    return (
        <View style={[styles.container, containerStyle]}>
            {otp.map((digit, index) => {
                const isFocused = focusedIndex === index || digit !== '';
                return (
                    <TextInput
                        key={index}
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        style={[
                            styles.input,
                            isFocused ? focusStyle : null,
                            inputStyle
                        ]
                        }
                        onFocus={() => handleFocus(index)}
                        onBlur={handleBlur}
                        maxLength={1}
                        keyboardType="numeric"
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={(event) => handleKeyPress(event, index)}
                        value={digit}
                    />
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'space-between',
    },
    input: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#000',
        textAlign: 'center',
        fontSize: 20,
    },
});

export default RNOTPInput
