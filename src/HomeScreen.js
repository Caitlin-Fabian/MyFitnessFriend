import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { LineChart } from 'react-native-chart-kit';


//Variables to get the width and height of the screen (That way it works for any screensize(?))
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;


//Styling for the graphs
const chartConfig = {
    backgroundGradientFrom: "#008080",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#008080",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, 0.8)`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
}


//Queries an API to get a daily inspirational quote and returns the quote string
function getQuote() {
    console.log("Querying data");
    return new Promise((res, rej) => {
        fetch('https://quotes.rest/qod.json')
            .then(result => {
                return result.json();
            })
            .then(data => {
                res(data.contents.quotes[0].quote);
            })
    })
}


//Main homepage
function HomeScreen() {
    return (
        <View
            flex={1}
            backgroundColor='#fff'
            alignItems='center'
            justifyContent='center'
            paddingTop={80}
            paddingBottom={80}
        >
            <WelcomeText daily='100' max='2000' />
            <CheesyQuote />
            <Graph />
            <StatusBar style="auto" showHideTransition={'fade'} />
            <NavBar />
        </View>
    );
}

//Component that holds the daily calorie intake for the user
const WelcomeText = (props) => {
    return (
        <View
            flex={1}
            flexDirection='column'
            margin={5}
            padding={20}
            alignItems='center'
            borderColor='gray'
            borderWidth={5}
            width={screenWidth * 0.8}
            justifyContent='center'
        >
            <Text>Calorie Goal for the Day</Text>
            <Text>{props.daily}/{props.max}</Text>
        </View>
    );
}

//Component that holds the inspirational quote
const CheesyQuote = () => {
    const [quote, setQuote] = useState(false);
    const [inspo, setInspo] = useState("");
    //If the quote has already been retrieved from API don't query for another
    if (!quote) {
        getQuote()
            .then(result => {
                setQuote(true);
                setInspo(result);
            })
    }
    return (
        <View
            flex={1}
            flexDirection='column'
            margin={5}
            padding={20}
            alignItems='center'
            borderColor='gray'
            borderWidth={5}
            width={screenWidth * 0.8}
            justifyContent='center'
        >
            <Text>{quote ? inspo : "Loading"}</Text>
        </View>
    )
}

//Component that holds the graph, rn I just put random numbers in there
const Graph = () => {
    return (
        <View
            flex={1}
            flexDirection='column'
            margin={5}
            padding={20}
            alignItems='center'
            borderColor='gray'
            borderWidth={5}
            width={screenWidth * 0.8}
            justifyContent='center'
        >
            <LineChart data={{
                labels: ["M", "T", "W", "Th", "F", "S", "Sun"],
                datasets: [
                    {
                        data: [
                            Math.random() * 10 + 180,
                            Math.random() * 10 + 180,
                            Math.random() * 10 + 180,
                            Math.random() * 10 + 180,
                            Math.random() * 10 + 180,
                            Math.random() * 10 + 180,
                            Math.random() * 10 + 180
                        ]
                    }
                ]
            }}
                width={screenWidth * 0.78}
                height={screenHeight * 0.2}
                chartConfig={chartConfig}
                withInnerLines={false}
                withOuterLines={false}
                bezier
            />
        </View>
    );
}


const NavBar = () => {
    return (
        <View
            alignSelf='center'
            width={screenWidth * 0.95}
            height={screenHeight * 0.05}
            top={screenHeight - 150}
            alignItems='center'
            borderColor='gray'
            borderWidth={2}
            borderRadius={50}
            position='absolute'
            backgroundColor='gray'
        >

        </View>
    )
}

export default HomeScreen;