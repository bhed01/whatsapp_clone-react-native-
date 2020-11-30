import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors';

const styles = {
    base: StyleSheet.create({
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 10,
            paddingRight: 10,
            minHeight: 54
        },
        flexRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        avatar: {
            width: 38,
            height: 38,
            borderRadius: 38
        },
        titleContainer: {
            flex: 1,
            paddingLeft: 5,
            paddingRight: 5
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        text: {
            color: '#fff'
        },
        mainTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            flex: 1
        }
    }),
    light: StyleSheet.create({
        header: {
            backgroundColor: Colors.light.headerBg
        },
        menuText: {
            color: Colors.light.fontBold,
            fontSize: 16
        },
        menu: {
            backgroundColor: Colors.light.popupBg
        }
    }),
    dark: StyleSheet.create({
        header: {
            backgroundColor: Colors.dark.headerBg
        },
        menuText: {
            color: Colors.dark.fontBold,
            fontSize: 16
        },
        menu: {
            backgroundColor: Colors.dark.popupBg
        }
    })
}

export default styles;