import { View, Dimensions } from 'react-native';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

//Navbar component (Nader said he'll work on this I think)
const NavBar = () => {
    return (
        <View
            alignSelf='center'
            width={screenWidth * 0.95}
            height={screenHeight * 0.07}
            top={screenHeight - 170}
            alignItems='center'
            borderColor='#E8CCBF'
            borderWidth={1}
            borderRadius={50}
            position='absolute'
            backgroundColor='black'
        >
        </View>
    )
}

export default NavBar;