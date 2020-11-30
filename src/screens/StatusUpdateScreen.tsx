import React, { FC, useEffect, useState, useRef, useContext } from 'react';
import { StyleSheet, View, TextInput, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Button from '../components/Button';
import Colors from '../constants/Colors';
import useTheme from '../hooks/useTheme';
import { getRandomHex } from '../utils';
import { UserContext, UserContextType } from '../UserProvider';

const StatusUpdateScreen: FC = () => {
	const [ status, setStatus ] = useState<string>('');
	const [ backgroundColor, setBackgroundColor ] = useState<string>('');
	const theme = useTheme();
	const inputRef = useRef<TextInput>(null);
	const { user } = useContext<UserContextType>(UserContext);
	const navigation = useNavigation();

	useEffect(() => {
		setBackgroundColor('#' + getRandomHex());
		if (inputRef.current) inputRef.current.focus();
	}, []);

	const updateStatus = () => {
		if (user)
			firestore()
				.collection('status')
				.add({
					status: status,
					author: {
						id: user.uid,
						name: user.displayName,
						photoURL: user.photoURL
					},
					bg: backgroundColor,
					timestamp: firestore.Timestamp.now()
				})
				.catch((err) => Alert.alert(err.toString()));
		navigation.goBack();
	};

	return (
		<View
			onLayout={() => (inputRef.current ? inputRef.current.focus() : null)}
			style={[ styles.container, { backgroundColor: backgroundColor } ]}
		>
			<TextInput
				onChangeText={(text) => setStatus(text)}
				style={styles.input}
				maxLength={510}
				autoFocus={true}
				multiline
				ref={inputRef}
			/>
			{status ? (
				<View style={styles.btn}>
					<Button
						onPress={updateStatus}
						size={55}
						style={{ backgroundColor: Colors[theme].tint, elevation: 5 }}
					>
						<Ionicons name="send" size={24} color="#fff" />
					</Button>
				</View>
			) : null}
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		textAlign: 'center',
		fontSize: 20,
		color: '#fff'
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center'
	},
	btn: {
		position: 'absolute',
		bottom: 20,
		right: 20
	}
});

export default StatusUpdateScreen;
