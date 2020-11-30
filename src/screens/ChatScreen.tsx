import React, { FC, Fragment, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Modal, TextInput, Text, Button as NativeBtn, Alert } from 'react-native';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import useTheme from '../hooks/useTheme';
import Colors from '../constants/Colors';
import Button from '../components/Button';
import ListItem from '../components/ListItem';

const ChatScreen: FC = () => {
	const theme = useTheme();
	const [ rooms, setRooms ] = useState<FirebaseFirestoreTypes.DocumentData[]>([]);
	const [ modalVisibilty, setModalVisibility ] = useState<boolean>(false);
	const [ newRoom, setNewRoom ] = useState<string>('');

	useEffect(() => {
		const unsubscribe = firestore().collection('rooms').onSnapshot(
			(snapshot) =>
				setRooms(
					snapshot.docs.map((doc) => ({
						key: doc.id,
						...doc.data()
					}))
				),
			(err) => Alert.alert(err.name, err.message)
		);
		return () => unsubscribe();
	}, []);

	const createRoom = () => {
		if (newRoom) {
			firestore().collection('rooms').add({
				name: newRoom
			});
		}
		setModalVisibility(false);
		setNewRoom('');
	};

	return (
		<Fragment>
			<FlatList
				data={rooms.slice(0, rooms.length - 1)}
				renderItem={({ item }) => <ListItem data={item} type="chatRoom" />}
				ListFooterComponent={
					rooms.length > 0 ? <ListItem data={rooms[rooms.length - 1]} type="chatRoom" last /> : null
				}
			/>
			<View style={styles.btn}>
				<Button
					onPress={() => setModalVisibility(true)}
					size={55}
					style={{ backgroundColor: Colors[theme].tint, elevation: 5 }}
				>
					<MaterialCommunityIcons name="message-reply-text" size={24} color="#fff" />
				</Button>
			</View>
			<Modal animationType="fade" transparent visible={modalVisibilty}>
				<View style={[ styles.modalContainer ]}>
					<View style={[ styles.popup, { backgroundColor: Colors[theme].popupBg } ]}>
						<Text style={[ styles.title, { color: Colors[theme].fontBold } ]}>Create New Chat Room</Text>
						<TextInput
							value={newRoom}
							onChangeText={(text) => setNewRoom(text)}
							style={[
								styles.input,
								{
									backgroundColor: Colors[theme].searchBar,
									color: Colors[theme].fontBold,
									borderColor: Colors[theme].border
								}
							]}
							placeholder="Chat Room Name"
						/>
						<View style={styles.btnContianer}>
							<View style={null}>
								<NativeBtn onPress={createRoom} title="CREACT" color={Colors[theme].tint} />
							</View>
							<View style={null}>
								<NativeBtn onPress={() => setModalVisibility(false)} title="CANCEL" />
							</View>
						</View>
					</View>
				</View>
			</Modal>
		</Fragment>
	);
};

const styles = StyleSheet.create({
	btn: {
		position: 'absolute',
		bottom: 20,
		right: 20
	},
	btnContianer: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	input: {
		textAlign: 'center',
		borderRadius: 24,
		marginTop: 20,
		marginBottom: 20,
		borderWidth: 1
	},
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#0009'
	},
	popup: {
		padding: 20,
		width: '70%'
	},
	title: {
		fontWeight: 'bold',
		fontSize: 22,
		textAlign: 'center'
	}
});

export default ChatScreen;
