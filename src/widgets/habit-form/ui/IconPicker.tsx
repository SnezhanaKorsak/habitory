import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { Feather } from '@expo/vector-icons';

import { theme } from '../../../app/theme';

import { FeatherIconName } from '../../../shared/types';

type Props = {
  visible: boolean;
  onSelect: (iconName: FeatherIconName) => void;
  setModalVisible: (visible: boolean) => void;
};

const featherIcons = Object.keys(Feather.glyphMap) as FeatherIconName[];

export const IconPicker = ({ visible, onSelect, setModalVisible }: Props) => {
  const [search, setSearch] = useState('');

  const filteredIcons = featherIcons.filter((iconName) =>
    iconName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <TextInput
                placeholder="Search icons..."
                value={search}
                onChangeText={setSearch}
                style={styles.input}
                autoCapitalize="none"
              />

              <FlatList
                data={filteredIcons}
                keyExtractor={(item) => item}
                numColumns={4}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => onSelect(item)}
                  >
                    <Feather name={item} size={24} color="black" />
                    <Text style={styles.iconName}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 40,
    paddingHorizontal: 12,
    borderColor: theme.border,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 8,
    maxWidth: '25%',
  },
  iconName: {
    fontSize: 10,
    marginTop: 4,
    textAlign: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    height: '60%',
    backgroundColor: theme.bgSecondary,
    borderRadius: 16,
    padding: 20,
    overflow: 'hidden',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 16,
  },
});
