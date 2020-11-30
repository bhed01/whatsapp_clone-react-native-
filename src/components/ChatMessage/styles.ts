import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const styles = {
    base: StyleSheet.create({
        container: {
            borderRadius: 8,
            maxWidth: "80%",
            padding: 5,
            borderTopLeftRadius: 0,
            marginLeft: -1,
            marginRight: -1
        },
        author: {
            fontWeight: 'bold'
        },
        timestamp: {
            fontSize: 11,
            alignSelf: 'flex-end'
        },
        mainContainer: {
            flexDirection: 'row',
            marginTop: 5,
            marginBottom: 5,
            justifyContent: 'flex-start'
        },
        arrow:{
            borderTopWidth: 10,
            borderLeftWidth: 10,
            borderColor: '#0000'
        },
        sendMainContainer: {
            flexDirection: 'row-reverse'
        },
        sendArrow: {
            borderLeftWidth: 0,
            borderRightWidth: 10
        }
    }),
    light: StyleSheet.create({
        container: {
            backgroundColor: Colors.light.message
        },
        timestamp: {
            color: Colors.light.font
        },
        message: {
            color: Colors.light.fontBold
        },
        arrow:{
            borderTopColor: Colors.light.message
        },
        send: {
            borderTopLeftRadius: 8,
            borderTopRightRadius: 0,
            backgroundColor: Colors.light.messageSent
        },
        sendArrow: {
            borderTopColor: Colors.light.messageSent
        }
    }),
    dark: StyleSheet.create({
        container: {
            backgroundColor: Colors.dark.message
        },
        timestamp: {
            color: Colors.dark.font
        },
        message: {
            color: Colors.dark.fontBold
        },
        arrow:{
            borderTopColor: Colors.dark.message
        },
        send: {
            borderTopLeftRadius: 8,
            borderTopRightRadius: 0,
            backgroundColor: Colors.dark.messageSent
        },
        sendArrow: {
            borderTopColor: Colors.dark.messageSent
        }
    })
}

export default styles;