import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// custom imports
import { string } from '../constants/global_strings';
import { color } from '../constants/global_colors';
import { scale } from '../utils/helper_functions';

interface MyProps {
  item: {
    id: number,
    question: string,
    validation: any,
    paths: any,
    response: string,
    responseTo: number,
    secureResponse: string,
  },
  index: number,
}

/**
 * Message - A component representing an object to display in the chat list
 */
export default class Message extends React.PureComponent<MyProps>{
  question: any;
  response: any;
  validation: any;
  paths: any;

  /**
   * render
   * @return {View}
   */
  render() {
    const item = this.props.item;

    let messageHeader;
    let messageHeaderStyle;
    let message;

    // message from bot
    if (item.question) {
      messageHeader = string.SUPPORT;
      messageHeaderStyle = styles.messageHeaderBot;
      message = item.question;
    }
    // message from human
    else if (item.response) {
      messageHeader = string.YOU;
      messageHeaderStyle = styles.messageHeaderHuman;
      message = item.response;
    }

    // add marginTop to only first element
    const marginTop = this.props.index === 0 ? scale(12) : 0;

    return (
      <View style={[styles.messageContainer, { marginTop: marginTop }]}>
        <Text style={messageHeaderStyle}>{messageHeader}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messageContainer: {
    marginLeft: scale(24),
    marginRight: scale(24),
    marginBottom: scale(12)
  },
  messageHeaderBot: {
    fontSize: scale(18),
  },
  messageHeaderHuman: {
    fontSize: scale(18),
    color: color.BLUE,
  },
  message: {
    fontSize: scale(14),
    opacity: 0.7,
  },
});
