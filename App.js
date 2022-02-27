import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  return (
    <View style={styles.container}>
      <WelcomeText daily='100' max='2000' />
      <CheesyQuote />
      <StatusBar style="auto" />
    </View>
  );
}

const WelcomeText = (props) => {
  return (
    <View style={styles.box}>
      <Text>Calorie Goal for the Day</Text>
      <Text>{props.daily}/{props.max}</Text>
    </View>
  );
}

let newQuote;
const CheesyQuote = () => {
  const [quote, setQuote] = useState(false);
  getQuote()
    .then(result => {
      newQuote = result.contents.quotes[0].quote;
      setQuote(true);
    })
  return (
    <View style={styles.box}>
      <Text>{quote ? newQuote : "Loading"}</Text>
    </View>
  )
}

function getQuote() {
  return new Promise((res, rej) => {
    fetch('https://quotes.rest/qod.json')
      .then(result => {
        return result.json();
      })
      .then(data => {
        res(data);
      })
  })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingBottom: 80,
  },
  text: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 20
  },
  box: {
    flex: 0,
    flexDirection: 'column',
    margin: 5,
    padding: 10,
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 5,
    width: '80%'
  }
});
