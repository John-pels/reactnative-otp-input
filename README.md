# RN-otp-input &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/John-pels/RN-otp-input/blob/main/LICENSE)<img src="https://img.shields.io/github/stars/John-pels/RN-otp-input" alt="stars">[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://legacy.reactjs.org/docs/how-to-contribute.html#your-first-pull-request)[![GitHub issues](https://img.shields.io/github/issues/John-pels/RN-otp-input.svg)](https://github.com/John-pels/RN-otp-input)[![GitHub last commit](https://img.shields.io/github/last-commit/John-pels/RN-otp-input.svg)](https://github.com/John-pels/RN-otp-input/commits/main)

A customizable and easy-to-use OTP (One-Time Password) input component for React Native applications.

### Installation

```bash
npm install RN-otp-input
```

or

```bash
yarn add RN-otp-input
```

For Expo App,

```bash
npx expo install RN-otp-input
```

### Props

<style>
table colgroup col {
    width: auto !important;
}
</style>

| Props          | Type                 | Default                                                      | Required | Description                                             |
| -------------- | -------------------- | ------------------------------------------------------------ | -------- | ------------------------------------------------------- |
| Length         | Number               | 4                                                            | No       | The number of OTP input fields, default is 4            |
| onCompleteFn   | Function             | \_                                                           | Yes      | Callback function called when all OTP fields are filled |
| inputStyle     | StyleProp<TextStyle> | width, height, borderWidth, borderColor, textAlign, fontSize | No       | Custom styles for individual input fields               |
| containerStyle | StyleProp            | flexDirection, justifyContent                                | No       | Custom styles for the container of input fields         |
| focusStyle     | StyleProp            | \_                                                           | No       | The onFocus styles for the otp inputs                   |

## Features

- **Customizable Length: Set the number of OTP input fields as needed.**
- **Auto Focus: Automatically focuses on the next input field after entering a digit**
- **Backspace Support: Moves focus to the previous field when pressing backspace on an empty field.**
- **Customizable Styling: Apply custom styles to both individual input fields and the container.**
- **Completion Callback: Easily handle the completed OTP input with the onComplete callback.**

### Basic Usage

```typescript
const handhandleOTPComplete = (otp: string) => {
  console.log(otp);
};

<OTPInput length={5} onComplete={handleOTPComplete} />;
```

### Customization Examples

#### Custom styles

```typescript
<OTPInput
  length={6}
  onComplete={handleOTPComplete}
  inputStyle={{
    borderColor: "blue",
    borderRadius: 10,
    fontSize: 24,
  }}
  containerStyle={{
    marginTop: 20,
    width: "80%",
  }}
  focusStyle={{
    borderColor: "red",
  }}
/>
```

### Best Practices

1. **Error Handling**: Implement proper error handling and validation for the OTP input.
2. **Accessibility**: Ensure the component is accessible by testing with screen readers and adding appropriate labels.
3. **Security**: Never store or log the full OTP on the client-side for security reasons.
4. **Timeout**: Consider implementing a timeout feature for OTP validity.
5. **Resend Option**: Provide an option to resend the OTP if the user doesn't receive it.

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### License

This project is licensed under the MIT License.
