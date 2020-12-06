import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// custom imports
import { color } from '../constants/global_colors';
import { scale } from '../utils/helper_functions';

/**
 * ChatHeader - The header component to the chat
 */
export default function ChatHeader(props: { headerText: string; }) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{props.headerText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(56),
    backgroundColor: color.LIGHT_GRAY,
    borderWidth: 0,
    borderBottomWidth: 1
  },
  headerText: {
    fontSize: scale(20),
  },
});

