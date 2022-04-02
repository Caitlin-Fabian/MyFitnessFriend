import { View, Dimensions, Button } from 'react-native';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

//Navbar component (Nader said he'll work on this I think)
const NavBar = ({ navigation }) => {
    return (
        <View
            alignSelf='center'
            width={screenWidth * 0.95}
            height={screenHeight * 0.07}
            top={screenHeight * 0.9}
            alignItems='center'
            borderColor='#E8CCBF'
            borderWidth={1}
            borderRadius={50}
            position='absolute'
            backgroundColor='black'
            flexDirection="row"
            justifyContent='center'
        >
            <Button
                title="Profile"
                onPress={() => navigation.navigate('Profile')}></Button>
            <Button
                title="Calories"
                onPress={() => navigation.navigate('CalorieTracker')}></Button>
            <Button
                title="Routines"
                onPress={() => navigation.navigate('ExerciseRoutines')}></Button>
            <Button
                title="Intervals"
                onPress={() => navigation.navigate('ExerciseIntervals')}></Button>
        </View>
    )
}

export default NavBar;