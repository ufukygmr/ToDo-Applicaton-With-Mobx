import React, {Component} from 'react';
import {
  StyleSheet, 
  Text, 
  View,
  TextInput,
  Button
} from 'react-native';
import {observer} from 'mobx-react';

import MainStore from './mobx/store'

@observer
// import console = require('console');
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputText: ''
    }}

  takeInput = () => {
    const data = {id: null, task: null, edit: null, done: false, style: styles.task1}
    if(this.state.inputText === ''){
      return null
    }
    else{
      data.task = this.state.inputText
      data.edit = false
      MainStore.takeInput(data)
    }
  }

  makeEditable = (id) => {
    MainStore.makeEditable(id)
  }

  editText = (id, text) => {
    const node = MainStore.taskList.find((node) => {return (node.id == id)})
    node.task = text 
    MainStore.taskList[id] = node
  }

  saveText = (id) => {
    const node = MainStore.taskList.find((node) => {return (node.id == id)})
    node.edit = false
    MainStore.taskList[node.id] = node
  }

  completedTask = (id) => {
    const node = MainStore.taskList.find((node) => {return (node.id == id)})
    if(node.done){
      node.done = true
      MainStore.taskList[node.id] = node
      MainStore.doneStyle(id)
    }
    else {
      node.done = false
      MainStore.taskList[node.id] = node
      MainStore.doneStyle(id)
    }
  }



 render() {
    const arr = MainStore.taskList.map(data => {
      let output = null 
      if (data.edit === false){
        output = (
          (<View key = {data.id}>
          <TextInput
            value = {data.task}
            onChangeText = {(text) => {this.editText(data.id, text)}}
            editable = {data.edit}
            onPress ={() => {this.completedTask(data.id)}}
            style = {data.style}
          />
          <Button 
            title = "Edit"
            onPress = {() => {this.makeEditable(data.id)}}
            style = {styles.button}
          >Edit</Button> 
          <Button 
            title = "Done or Undone"
            onPress = {() => {MainStore.doneStyle(data.id)}}
            style = {styles.button}
          >Done or Undone</Button> 
      </View>))
      }
      else {
        output = (<View key = {data.id}>
          <TextInput
            value = {data.task}
            onChangeText = {(text) => {this.editText(data.id, text)}}
            editable = {data.edit}
          />
          <Button
            title = "Save"
            onPress = {() => {this.saveText(data.id)}}
          ></Button> 
      </View>)
      }
         
      return (output)
    })
    return(
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Jotform ToDo Application</Text>
        <Text style={styles.instructions}>Please Add Your Task And Press Submit Button</Text> 
        <TextInput style = {styles.input}
          placeholder = "Write Your Task"
          onChangeText = {(Text) => this.state.inputText = Text}
        />
        <Button
          title = "Submit"
          color="#841584"
          onPress= {this.takeInput}
        />
        {arr}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    marginBottom: 30,
    padding : 10,
    width: 367,
    fontSize: 16,
    color: '#444',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#F5F5F5'
  },
  task1: {
    textAlign: 'left',
    padding: 5,
    backgroundColor: '#f2f6f5',
    borderRadius: 10,
    width: 200
  },
  button: {
    width: 100,
    textAlign: 'left',
    backgroundColor: "#fff"
  }
});