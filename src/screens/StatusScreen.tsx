import React, { Fragment, useContext, useEffect, useState } from 'react';
import { SectionList, Text, View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../constants/Colors';
import ListItem from '../components/ListItem';
import useTheme from '../hooks/useTheme';
import Button from '../components/Button';
import { UserContext, UserContextType } from '../UserProvider';

const StatusScreen: React.FC = () => {
	const theme = useTheme();
	const navigation = useNavigation();
	const { user } = useContext<UserContextType>(UserContext);
	const [ statuses, setStatuses ] = useState<FirebaseFirestoreTypes.DocumentData[]>([]);
	const [ userStatus, setUserStatus ] = useState<FirebaseFirestoreTypes.DocumentData>();

	useEffect(() => {
		const unsubscribe = firestore().collection('status').onSnapshot(
			(snapshot) => {
				const retriedData: FirebaseFirestoreTypes.DocumentData[] = snapshot.docs.map((doc) => ({
					key: doc.id,
					...doc.data()
				}));
				if (user) {
					setStatuses(retriedData.filter((status) => status.author.id !== user.uid));
					setUserStatus(retriedData.filter((status) => status.author.id === user.uid)[0]);
				}
			},
			(err) => Alert.alert(err.name, err.message)
		);
		return () => unsubscribe();
	}, []);

	const statusUpdate = () => {
		navigation.navigate('StatusUpdate');
	};

	return (
		<Fragment>
			<SectionList
				ListHeaderComponent={userStatus ? <ListItem type="status" data={userStatus} last /> : null}
				sections={[ { title: 'Recent updates', data: statuses.slice(0, statuses.length - 1) } ]}
				renderItem={({ item }) => <ListItem type="status" data={item} />}
				renderSectionHeader={({ section }) => (
					<Text style={{ fontWeight: 'bold', color: Colors[theme].font, padding: 10 }}>{section.title}</Text>
				)}
				ListFooterComponent={
					statuses.length > 0 ? <ListItem type="status" data={statuses[statuses.length - 1]} last /> : null
				}
			/>
			<View style={styles.btn}>
				<Button size={55} onPress={statusUpdate} style={{ backgroundColor: Colors[theme].tint, elevation: 5 }}>
					<MaterialCommunityIcons name="pencil" size={24} color="#fff" />
				</Button>
			</View>
		</Fragment>
	);
};

const styles = StyleSheet.create({
	btn: {
		position: 'absolute',
		bottom: 20,
		right: 20
	}
});

export default StatusScreen;
