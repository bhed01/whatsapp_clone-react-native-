import { StyleSheet } from 'react-native';

const styles = {
    base: StyleSheet.create({
        container: {
            borderRadius: 50,
            overflow: 'hidden',
            alignSelf: 'flex-end'
        },
        childContainer: {
            padding: 5,
            minWidth:38,
            minHeight:38,
            alignItems: "center",
            justifyContent: "center"
        }
    })
}

export default styles;