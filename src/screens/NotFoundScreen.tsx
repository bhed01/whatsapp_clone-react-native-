import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '../types';
import useTheme from '../hooks/useTheme';
import Colors from '../constants/Colors';

export default function NotFoundScreen({ navigation }: StackScreenProps<RootStackParamList, 'NotFound'>) {
	const theme = useTheme();

	return (
		<View style={styles.container}>
			<Text style={[ styles.title, { color: Colors[theme].font } ]}>This screen doesn't exist.</Text>
			<TouchableOpacity onPress={() => navigation.replace('Root')} style={styles.link}>
				<Text style={[ styles.linkText, { color: Colors[theme].tint } ]}>Go to home screen!</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	link: {
		marginTop: 15,
		paddingVertical: 15
	},
	linkText: {
		fontSize: 14,
		color: '#2e78b7'
	}
});
