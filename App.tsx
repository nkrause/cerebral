/**
 * Cerebral Chat App
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { color } from './src/constants/global_colors';
import { string } from './src/constants/global_strings';
import ChatHeader from './src/components/chat_header';
import ChatMessage from './src/components/chat_message'
import ChatInput from './src/components/chat_input';

type MyState = {
  chatHistory: ChatMessage[],
  questions: ChatMessage[],
  questionNum: number,
  userInput: string,
};

class App extends React.Component {
  state: MyState = {
    chatHistory: [], // history of chat between bot and user
    questions: [], // fetched from API
    questionNum: 1, // current question number
    userInput: '', // current user input
  };
  flatList!: FlatList<ChatMessage> | null;

  /**
   * componentDidMount
   */
  componentDidMount() {
    this.fetchQuestions();
  }

  /**
   * Fetch the list of questions from the url
   */
  fetchQuestions = async () => {
    const result = await fetch(string.API_URL);
    const response = await result.json();
    this.setState({ questions: response, chatHistory: [response[this.state.questionNum]] });
  }

  /**
   * onChangeText
   * @param {string} key The type of TextInput
   * @param {string} val The value of the user input
   */
  onChangeText = (val: string) => {
    this.setState({ userInput: val });
  };

  /**
   * Handle user input
   */
  onSubmitText = () => {
    const userInput = this.state.userInput.toLowerCase();

    // create a user response object 
    let response = { response: userInput, secureResponse: '', responseTo: this.state.questionNum };
    if (this.state.questionNum === 5) {
      response = { response: "*".repeat(userInput.length), secureResponse: userInput, responseTo: this.state.questionNum };
    }
    // add the user response to the chat history and clear the input before continuing 
    this.setState({ chatHistory: [...this.state.chatHistory, response], userInput: '' }, () => {
      const question = this.getCurrentQuestion();

      // user response is valid
      if (this.isValidResponse(question.validation, userInput)) {
        // find the next path, sometimes based on the user input
        const nextPath = this.getNextPath(question.paths, userInput);

        // next question number is just the index into the array, except id = -1 translates to 0
        let nextQuestionNum = nextPath === -1 ? 0 : nextPath;
        const nextQuestion = this.state.questions[nextQuestionNum];

        // update the current question number and add the next question to the chat history
        this.setState({ questionNum: nextQuestionNum, chatHistory: [...this.state.chatHistory, nextQuestion] })

      }
      // user response is invalid
      else {
        // we've reached the end of possible paths - allows user to continue typing responses but the bot won't answer
        if (this.state.questionNum === 0) {
          return;
        }
        const nextQuestion = { question: string.INVALID_RESPONSE };
        this.setState({ chatHistory: [...this.state.chatHistory, nextQuestion] })
      }

    });
  }

  /**
   * Returns the current question as a Message object
   * @return {Message}
   */
  getCurrentQuestion = (): ChatMessage => {
    return this.state.questions[this.state.questionNum];
  }

  /**
  * Checks if the last user input was a valid response
  * @param {any} validation
  * @param {string} userInput
  * @return {boolean}
  */
  isValidResponse = (validation: any, userInput: string): boolean => {
    switch (typeof validation) {
      case "boolean":
        return validation;
      case "object":
        return validation.includes(userInput)
      case "string":
        return userInput.match(validation) != null;
      default:
        return false;
    }
  }

  /**
   * Returns the next path based on a valid response
   * @param {any} paths
   * @param {string} userInput
   * @return {number}
   */
  getNextPath = (paths: any, userInput: string): number => {
    switch (typeof paths) {
      case "object":
        return paths[userInput];
      case "number":
        return paths;
      default:
        return -1;
    }
  }

  /**
   * keyExtractor
   * @param {Message} item
   * @param {number} index
   * @return {string}
   */
  keyExtractor = (item: ChatMessage, index: number): string => {
    return index.toString();
  };

  /**
   * renderItem
   * @param {Message} item
   * @param {number} index
   * @return {View}
   */
  renderItem = ({ item, index }: { item: any, index: number }) => {
    return <ChatMessage item={item} index={index} />
  };

  /**
   * Scroll to the end of the chat list as items are added
   */
  scrollToEnd = () => {
    if (this.flatList) {
      this.flatList.scrollToEnd({ animated: true })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={color.LIGHT_GRAY} barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <ChatHeader headerText={string.TECH_SUPPORT} />
          <FlatList<ChatMessage>
            data={this.state.chatHistory}
            extraData={this.state.chatHistory}
            keyExtractor={this.keyExtractor}
            onContentSizeChange={this.scrollToEnd}
            ref={ref => this.flatList = ref}
            renderItem={this.renderItem}
            showsVerticalScrollIndicator={false}
          />
          <ChatInput questionId={this.state.questionNum} userInput={this.state.userInput} onChangeText={this.onChangeText} onSubmitText={this.onSubmitText} />
        </SafeAreaView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

