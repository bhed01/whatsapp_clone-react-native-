import React, { FC } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import FontistoIcon from 'react-native-vector-icons/Fontisto';

import Colors from '../constants/Colors';
import { MainTabParamList } from '../types';
import useTheme from '../hooks/useTheme';
import ChatScreen from '../screens/ChatScreen';
import StatusScreen from '../screens/StatusScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

const MainTab = createMaterialTopTabNavigator<MainTabParamList>();

const MainTabNavigator: FC = () => {
	const theme = useTheme();

	return (
		<MainTab.Navigator
			initialRouteName="Chats"
			tabBarOptions={{
				indicatorStyle: {
					height: 3
				},
				labelStyle: {
					fontWeight: 'bold',
					fontSize: 14
				},
				showIcon: true,
				activeTintColor: Colors[theme].headerTint,
				inactiveTintColor: '#fff8'
			}}
		>
			<MainTab.Screen
				name="Camera"
				component={NotFoundScreen}
				options={{
					tabBarLabel: () => null,
					tabBarIcon: ({ color }) => <FontistoIcon name="camera" size={18} color={color} />,
					tabBarAccessibilityLabel: 'Camera'
				}}
			/>
			<MainTab.Screen name="Chats" component={ChatScreen} />
			<MainTab.Screen name="Status" component={StatusScreen} />
			<MainTab.Screen name="Calls" component={NotFoundScreen} />
		</MainTab.Navigator>
	);
};

export default MainTabNavigator;
