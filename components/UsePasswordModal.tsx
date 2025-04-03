import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ThemedView } from './ThemedView';
import React from 'react';
import { ThemedText } from './ThemedText';

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export default function UsePassword({ isVisible, children, onClose }: Props) {
  return (
    <ThemedView>
        <Modal animationType="slide" transparent={true} visible={isVisible}>
        <ThemedView style={styles.modalContent}>
            <ThemedView style={styles.titleContainer}>
            <ThemedText type='defaultSemiBold' style={{color: 'white'}}>Use password</ThemedText>
            <Pressable onPress={onClose}>
                <MaterialIcons name="close" color="#fff" size={22} />
            </Pressable>
            </ThemedView>
            {children}
        </ThemedView>
        </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: '40%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '16%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
