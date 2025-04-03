import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, TextInputProps } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { maskPassword } from '../utils/index';
import { Redirect,  } from 'expo-router';
import { PasswordContext } from '@/Context';

interface FormProps {
    description: string;
    activeDays: string;
}

interface FormInputProps extends TextInputProps {
    label: string;
    error?: string;  // Make optional since it might not always exist
}

const UseForm = () => {
    const {masked, setDescription} = useContext(PasswordContext);

    const [formData, setFormData] = useState<FormProps>({
        description: '',
        activeDays: '',
    });

    const [errors, setErrors] = useState<{ description: string }>({
        description: '',
    });

    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (name: string, value: string) => {
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear error when user types
        if (errors.description) {
            setErrors({
                ...errors,
                [name]: '',
            });
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { description: '' };

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            setIsSaving(true);

            // Simulate API call
            setTimeout(() => {
                console.log('Form submitted:', formData);
                setDescription(formData.description)
                setIsSaving(false);
            }, 1500);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ThemedView style={styles.formGroup}>
                <ThemedText>Password: {masked}</ThemedText>
            </ThemedView>
            <ThemedView >
                <FormInput
                    label="Description"
                    placeholder="description..."
                    value={formData.description}
                    onChangeText={(text: any) => handleChange('description', text)}
                    error={errors.description}
                    autoCapitalize="words"
                />

                <Button
                    title={isSaving ? 'Saving...' : 'Save'}
                    onPress={handleSubmit}
                    disabled={isSaving}
                />
            </ThemedView>
        </KeyboardAvoidingView>
    );
};

const FormInput = ({ label, error, ...props }: FormInputProps) => (
    <ThemedView style={styles.formGroup}>
        <ThemedText style={styles.label}>{label}</ThemedText>
        <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            {...props}
        />
        {error && <ThemedText style={styles.error}>{error}</ThemedText>}
    </ThemedView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        padding: 20,
    },
    form: {
        width: '100%',
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 15,
        borderRadius: 8,
        fontSize: 16,
    },
    inputError: {
        borderColor: 'red',
    },
    error: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    },
});

export default UseForm;