import React, { createContext, useState } from "react";
import Toast from 'react-native-toast-message';
import * as Clipboard from 'expo-clipboard';
import { maskPassword } from "@/utils";

// Define the shape of the context
interface ContextProps {
    masked: string;
    unMasked: string;
    description: string,
    copyToClipboard: (text: string) => void;
    setPassword: (masked: string, unMasked: string) => void;
    setDescription: (description: string) => void;
}

interface PasswordProviderProps {
    children: React.ReactNode;
}

// Create the context with an initial default value
export const PasswordContext = createContext<ContextProps>({
    masked: '',
    unMasked: '',
    description: '',
    copyToClipboard: () => { },
    setPassword: () => { },
    setDescription: () => { }
});


const PasswordProvider = ({ children }: PasswordProviderProps) => {
    const [password, setPasswordState] = useState<{ masked: string; unMasked: string }>({
        masked: "",
        unMasked: "",
    });

    const [description, setDescriptionState] = useState("");
    const [_copiedText, setCopiedText] = useState('');

    // Function to update the password
    const setPassword = (masked: string, unMasked: string) => {
        setPasswordState({ masked, unMasked });
    };

    const setDescription = (description: string) => {
        setDescriptionState(description);
    };

    const copyToClipboard = async (text: string) => {
        await Clipboard.setStringAsync(text);
        await fetchCopiedText();
        // Show a toast
        Toast.show({
            type: 'success',
            text1: 'Copied!',
        });

    };

    const fetchCopiedText = async () => {
        const text = await Clipboard.getStringAsync();
        setCopiedText(text);
        setPassword(maskPassword(text), text);
    };

    return (
        <PasswordContext.Provider value={{ ...password, description, copyToClipboard, setPassword, setDescription }}>
            {children}
        </PasswordContext.Provider>
    );
};

export default PasswordProvider;