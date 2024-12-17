import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";

const ChatScreen = (props) => {
  const [messages, setMessages] = useState([
    { id: "1", text: "Hey", time: "12:48 PM", sender: "other" },
    { id: "2", text: "Hey", time: "12:48 PM", sender: "me" },
    {
      id: "3",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",
      time: "12:50 PM",
      sender: "me",
    },
  ]);

  const [inputText, setInputText] = useState("");

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageWrapper,
        item.sender === "me" ? styles.myMessageWrapper : styles.otherMessageWrapper,
      ]}
    >
      <View
        style={[
          styles.messageContainer,
          item.sender === "me" ? styles.myMessage : styles.otherMessage,
        ]}
      >
        <Text style={[styles.messageText,{color: item.sender === "me" ? '#fff' : '#808080',}]}>{item.text}</Text>
      </View>
      {/* Time Outside the Message */}
      <Text
        style={[
          styles.messageTime,
          item.sender === "me" ? styles.myTime : styles.otherTime,
        ]}
      >
        {item.time}
      </Text>
    </View>
  );

  const sendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: inputText,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sender: "me",
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputText("");
    }
  };

  return (
    <View style={styles.container}>
      {/* Chat Header */}
       <View style={styles.container1}>
                <TouchableOpacity
                  style={styles.container1Touchable}
                  onPress={() => {
                    props.navigation.goBack();
                  }}>
                  <Image
                    source={require('../../Img/icon/back.png')}
                    style={styles.touchImg}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text style={styles.container1Text1}>
                  Chat
                </Text>
              </View>

      {/* Chat Date */}
      <Text style={styles.date}>November 15, 2024</Text>

      {/* Messages List */}
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
      />

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container1: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '5%',
    alignItems: 'center',
  },
  container1Touchable: {
    width: 25,
    height: 25,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  touchImg: { width: 12, height: 12 },
  container1Text1: { marginLeft: 10, color: '#000', fontSize: 15 },
 
  date: {
    textAlign: "center",
    marginVertical: 10,
    color: "#777",
    fontSize: 12,
  },
  messageList: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  messageWrapper: {
    marginVertical: 5,
  },
  myMessageWrapper: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  otherMessageWrapper: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
  messageContainer: {
    padding: 10,
    borderRadius: 8,
    maxWidth: "80%",
  },
  myMessage: {
    backgroundColor: "#4285F4",
  },
  otherMessage: {
    backgroundColor: "#E5E5EA",
  },
  messageText: {
    color: "#fff",
    fontSize: 14,
  },
  messageTime: {
    fontSize: 10,
    color: "#777",
    marginTop: 5,
  },
  myTime: {
    textAlign: "right",
  },
  otherTime: {
    textAlign: "left",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    // borderTopWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    backgroundColor: "#fff",
    borderWidth:1,
    width:'90%',
    alignSelf:'center',
    borderRadius:10
  },
  input: {
    flex: 1,
    borderWidth: 0,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingVertical: 8,
    fontSize: 14,
    backgroundColor: "#fff",
  },
  sendButton: {
    backgroundColor: "#555",
    padding: 12,
    borderRadius: 5,
    marginLeft: 10,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default ChatScreen;
