import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors';

const styles = {
    base: StyleSheet.create({
        avatar: {
            width: 56,
            height: 56,
            borderRadius: 28,
            marginTop: 8,
            marginBottom: 8,
            marginLeft:15, 
            marginRight: 15
        },
        container:{
            flexDirection:'row'
        },
        rightContainer: {
            marginRight: 10,
            flex: 1,
            borderBottomWidth: 1,
            justifyContent:"center"
        },
        heading: {
            fontSize: 18,
        },
        text: {
            fontSize: 15
        }
    }),
    light: StyleSheet.create({
        rightContainer: {
            borderBottomColor: Colors.light.border
        },
        heading:{
            color: Colors.light.fontBold
        },
        text:{
            color: Colors.light.font
        }
    }),
    dark: StyleSheet.create({
        rightContainer: {
            borderBottomColor: Colors.dark.border
        },
        heading:{
            color: Colors.dark.fontBold
        },
        text:{
            color: Colors.dark.font
        }
    })
}
export default styles;