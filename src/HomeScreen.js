import { StatusBar } from 'expo-status-bar';
import { Text, View, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import NavBar from './NavBar';


//Variables to get the width and height of the screen (That way it works for any screensize(?))
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;





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
            backgroundColor='#96BDC6'
            alignItems='center'
            justifyContent='center'
            paddingTop={20}
            paddingBottom={80}
            width={screenWidth}
            height={screenHeight}
        >
            <AppHeader />
            <WelcomeText daily='100' max='2000' />
            <CheesyQuote />
            <Graph />
            <StatusBar style="auto" showHideTransition={'fade'} />
            <NavBar />
        </View>
    );
}

function AppHeader() {
    return (
        <View
            flex={1}
            backgroundColor='#96BDC6'
            alignItems='center'
            justifyContent='center'
            marginBottom={25}
            marginTop={0}
        >
            <Text style={{ fontSize: 40, fontWeight: 'bold' }}>MyFitnessFriend</Text>
        </View>
    )
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
            borderColor='black'
            borderWidth={1.5}
            width={screenWidth * 0.8}
            justifyContent='center'
            height={screenHeight * 0.25}
            backgroundColor='#E8CCBF'
        >
            <Text style={{ fontSize: 18, fontWeight: '500' }}>Calorie Goal for the Day</Text>
            <Text style={{ fontSize: 18, fontWeight: '500' }}>{props.daily}/{props.max}</Text>
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
            borderColor='black'
            borderWidth={1.5}
            width={screenWidth * 0.8}
            height={screenHeight * 0.25}
            justifyContent='center'
            backgroundColor='#E8CCBF'
        >

            <Text style={{ fontSize: 15, fontWeight: '300' }} >{quote ? inspo : "Loading"}</Text>
        </View>
    )
}


//Styling for the graphs
const chartConfig = {
    backgroundGradientFrom: "#E8CCBF",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#E8CCBF",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, 0.8)`,
    labelColor: (opacity = 1) => 'rgba(0,0,0, 1)',
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
}

//Component that holds the graph, rn I just put random numbers in there
const Graph = () => {
    return (
        <View
            flex={3}
            flexDirection='column'
            marginTop={50}
            padding={0}
            alignItems='center'
            justifyContent='center'
        >
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                Your Weight This Week
            </Text>
            <LineChart data={{
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [
                    {
                        data: [
                            Math.random() * 20 + 180,
                            Math.random() * 20 + 180,
                            Math.random() * 20 + 180,
                            Math.random() * 20 + 180,
                            Math.random() * 20 + 180,
                            Math.random() * 20 + 180,
                            Math.random() * 20 + 180
                        ]
                    }
                ]
            }}

                height={screenHeight * 0.3}
                width={screenWidth * 0.8}
                chartConfig={chartConfig}
                withInnerLines={false}
                withOuterLines={false}
                style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    borderRadius: 15,
                    marginTop: 5
                }}
            />
        </View>
    );
}



export default HomeScreen;