import React, { useContext } from 'react';
import { Image, StyleSheet, Button, Platform, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useState, useEffect } from 'react';
import * as Clipboard from 'expo-clipboard';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import UsePassword from '@/components/UsePasswordModal';
import UseForm from '@/components/UseForm';
import { maskPassword } from '../../utils/index';
import { PasswordContext } from '@/Context';

export default function HomeScreen() {
  const { setPassword, copyToClipboard} = useContext(PasswordContext);
  const [generatedPassword, setGeneratedPassword] = useState('');
  // const [_copiedText, setCopiedText] = useState('');
  const [progress, setProgress] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const ALLOWED_CHAR = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$!%*&=".split('');
  let passwordLen = 8;

  const generatePassword = () => {
    let finalPassword = "";

    while (finalPassword.length < passwordLen) {
      let randIndex = Math.floor(Math.random() * (ALLOWED_CHAR.length - 1));
      finalPassword += ALLOWED_CHAR[randIndex];
    };

    setGeneratedPassword(finalPassword);
  }

  useEffect(() => {
    generatePassword();
    const passwordTimer = setInterval(() => { generatePassword(); setProgress(0); }, 30000);

    const progressTimer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 3.33)); // Reset at 100%
    }, 1000); // Increase every second

    return () => { clearInterval(passwordTimer); clearInterval(progressTimer); }
  }, []);

  // const copyToClipboard = async () => {
  //   await Clipboard.setStringAsync(generatedPassword);
  //   await fetchCopiedText();
  //   // Show a toast
  //   Toast.show({
  //     type: 'success',
  //     text1: 'Copied!',
  //   });

  // };

  // const fetchCopiedText = async () => {
  //   const text = await Clipboard.getStringAsync();
  //   setCopiedText(text);
  //   setPassword(maskPassword(text), text);
  // };

  const onUsePassword = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/afriex_logo.png')}
          style={styles.reactLogo}
        />
      }>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Password Generator</ThemedText>
      </ThemedView>

      <ThemedView style={styles.displayContainer}>
        <TouchableOpacity style={styles.stepContainer} onPress={() => {copyToClipboard(generatedPassword); onUsePassword();}}>
          <ThemedView >
            <ThemedText type="defaultSemiBold"> {generatedPassword} </ThemedText>
          </ThemedView>
        </TouchableOpacity>
        <ThemedView style={styles.animCircularCtn}>
          <AnimatedCircularProgress
            size={20}
            width={10}
            fill={progress} // Progress value
            tintColor="#3498db" // Progress color
            backgroundColor="#e0e0e0"
          >
            {/* {() => <ThemedText type='default' >{`${progress.toFixed(2)}%`}</ThemedText>} */}
          </AnimatedCircularProgress>
        </ThemedView>
      </ThemedView>
      <UsePassword isVisible={isModalVisible} onClose={onModalClose}>
        {/* use password form will go here*/}
        <UseForm/>
      </UsePassword>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '50%',
    borderRightWidth: 1,
    marginBottom: 8,
    height: '100%',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  displayContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden'
  },
  animCircularCtn: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
