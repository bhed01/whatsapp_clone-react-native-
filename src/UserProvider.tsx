import React, { createContext, FC, useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import Colors from './constants/Colors';
import useTheme from './hooks/useTheme';

export type UserContextType = {
	user?: FirebaseAuthTypes.User | null;
	setUser: React.Dispatch<React.SetStateAction<FirebaseAuthTypes.User | null | undefined>>;
};

export const UserContext = createContext<UserContextType>({ setUser: () => {} });

const UserProvider: FC = ({ children }) => {
	const [ user, setUser ] = useState<FirebaseAuthTypes.User | null | undefined>(undefined);
	const [ pending, setPending ] = useState<boolean>(true);
	const theme = useTheme();

	useEffect(() => {
		const unsubscribe = auth().onAuthStateChanged((u) => {
			setUser(u);
			setPending(false);
		});
		return () => unsubscribe();
	}, []);

	if (pending)
		return (
			<View style={[ styles.container, { backgroundColor: Colors[theme].background } ]}>
				<StatusBar barStyle="light-content" backgroundColor={Colors[theme].statusBarBg} />
				<Text style={{ color: Colors[theme].font }}>Loading...</Text>
			</View>
		);
	else if (user) return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
	else
		return (
			<View style={[ styles.container, { backgroundColor: Colors[theme].background } ]}>
				<StatusBar barStyle="light-content" backgroundColor={Colors[theme].statusBarBg} />
				<LoginScreen />
			</View>
		);
};

const styles = StyleSheet.create({
	container: {
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default UserProvider;
