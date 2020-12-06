import React from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';

import { Icon } from 'react-native-elements';

// custom imports
import { string } from '../constants/global_strings';
import { color } from '../constants/global_colors';
import { scale } from '../utils/helper_functions';

type MyProps = {
  questionId: number,
  userInput: string,
  onChangeText: (value: string) => any,
  onSubmitText: () => any,
}

/**
 * ChatInput - A component representing the TextInput
 */
export default class ChatInput extends React.PureComponent<MyProps>{

  /**
   * render
   * @return {View}
   */
  render() {
    return (
      <View>
        <TextInput
          onChangeText={this.props.onChangeText}
          placeholder={string.TYPE_HERE}
          secureTextEntry={this.props.questionId === 5}
          style={styles.textInput}
          value={this.props.userInput}
        />
        <View style={styles.iconOuterContainer}>
          <View style={styles.iconInnerContainer}>
            <Icon
              disabled={this.props.userInput.length === 0}
              disabledStyle={{ backgroundColor: color.TRANSPARENT }}
              name={'send'}
              size={scale(26)}
              // change the color of the shoutout send icon based on the user's input
              iconStyle={{
                color: this.props.userInput.length > 0 ? color.BLUE : color.BLACK,
              }}
              onPress={this.props.onSubmitText}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: scale(56),
    paddingLeft: 10,
    paddingRight: scale(56),
    borderWidth: 0,
    borderTopWidth: 1,
  },
  iconOuterContainer: {
    width: scale(56),
    height: scale(56),
    position: 'absolute',
    right: 0,
  },
  iconInnerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: color.BLACK,
    opacity: 0.5,
  },
});

