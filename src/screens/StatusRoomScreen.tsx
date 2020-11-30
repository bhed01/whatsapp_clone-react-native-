import { useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getBg, getRandomHex } from '../utils';

const StatusRoomScreen: FC = () => {
	const route = useRoute();

	return (
		<View style={[ styles.container, getBg(route.params) ]}>
			<Text style={styles.text}>{route.params.status}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		fontSize: 24,
		textAlign: 'center',
		color: '#fff'
	}
});

export default StatusRoomScreen;
