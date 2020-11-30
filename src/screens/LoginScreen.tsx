import React, { FC, Fragment } from 'react';
import { Text, Button, Image, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';

import useTheme from '../hooks/useTheme';
import Colors from '../constants/Colors';

async function onGoogleButtonPress() {
	const { idToken } = await GoogleSignin.signIn();
	const googleCredential = auth.GoogleAuthProvider.credential(idToken);
	return auth().signInWithCredential(googleCredential);
}

const LoginScreen: FC = () => {
	const theme = useTheme();

	return (
		<Fragment>
			<Image style={styles.image} source={require('../assets/logo.png')} resizeMode={'contain'} />
			<Text style={[ styles.text, { color: Colors[theme].fontBold } ]}>Sign in to WhatsChat</Text>
			<Button
				color={Colors[theme].tint}
				title="Sign in with Google"
				onPress={() => onGoogleButtonPress().catch((e) => Alert.alert(e.toString()))}
			/>
		</Fragment>
	);
};

const styles = StyleSheet.create({
	image: {
		width: 128,
		height: 128
	},
	text: {
		fontSize: 32,
		fontWeight: 'bold',
		margin: 20
	}
});

export default LoginScreen;
