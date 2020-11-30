import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { deleteCollection, logout } from '../utils';
import { RootStackParamList } from '../types';
import Header from '../components/Header';
import MainTabNavigator from './MainTabNavigator';
import NotFoundScreen from '../screens/NotFoundScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import StatusRoomScreen from '../screens/StatusRoomScreen';
import StatusUpdateScreen from '../screens/StatusUpdateScreen';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: FC = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Root"
				component={MainTabNavigator}
				options={{
					title: 'WhatsChat',
					header: (props) => (
						<Header
							title={props.scene.descriptor.options.title}
							options={[ { title: 'Logout', onPress: logout } ]}
						/>
					)
				}}
			/>
			<Stack.Screen
				name="ChatRoom"
				component={ChatRoomScreen}
				options={({ route: { params } }) => ({
					header: (props) => (
						<Header
							backHandler={props.navigation.goBack}
							options={[
								{
									title: 'Delete',
									onPress: () => deleteCollection(params.key, props.navigation.goBack, 'rooms')
								}
							]}
							type="chatRoom"
							params={params}
						/>
					)
				})}
			/>
			<Stack.Screen name="StatusUpdate" component={StatusUpdateScreen} options={{ header: () => null }} />
			<Stack.Screen
				name="StatusRoom"
				component={StatusRoomScreen}
				options={({ route: { params } }) => ({
					header: (props) => (
						<Header
							backHandler={props.navigation.goBack}
							type="status"
							options={
								params.deletable && [
									{
										title: 'Delete',
										onPress: () => deleteCollection(params.key, props.navigation.goBack, 'status')
									}
								]
							}
							params={params}
						/>
					)
				})}
			/>
			<Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'oops!' }} />
		</Stack.Navigator>
	);
};

const styles = StyleSheet.create({
	avatar: {
		width: 38,
		height: 38,
		borderRadius: 14
	},
	back: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 5
	},
	backBtn: {
		borderRadius: 25,
		overflow: 'hidden',
		margin: 5
	},
	titleContainer: {
		padding: 10
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	text: {
		color: '#fff'
	}
});

export default RootNavigator;
