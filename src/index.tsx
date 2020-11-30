import React, { FC, Fragment, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GoogleSignin } from '@react-native-community/google-signin';
import { NavigationContainer } from '@react-navigation/native';

import Colors from './constants/Colors';
import useTheme from './hooks/useTheme';
import UserProvider from './UserProvider';
import RootNavigator from './navigators/RootNavigator';

const App: FC = () => {
	const theme = useTheme();

	useEffect(() => {
		GoogleSignin.configure({
			webClientId: ''
		});
	}, []);

	return (
		<UserProvider>
			<Fragment>
				<StatusBar barStyle="light-content" backgroundColor={Colors[theme].statusBarBg} />
				<NavigationContainer
					theme={{
						colors: {
							background: Colors[theme].background,
							border: Colors[theme].border,
							card: Colors[theme].headerBg,
							notification: 'rgb(255, 69, 58)',
							primary: Colors[theme].headerTint,
							text: '#fff'
						},
						dark: theme === 'dark'
					}}
				>
					<RootNavigator />
				</NavigationContainer>
			</Fragment>
		</UserProvider>
	);
};
export default App;
