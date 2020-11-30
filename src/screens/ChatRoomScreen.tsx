import React, { FC, Fragment, useState, useEffect, useContext, useRef } from 'react';
import { View, StyleSheet, ImageBackground, FlatList, TextInput, Alert } from 'react-native';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useRoute, Route } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';
import useTheme from '../hooks/useTheme';
import Button from '../components/Button';
import ChatMessage from '../components/ChatMessage';
import { UserContext, UserContextType } from '../UserProvider';

const ChatRoomScreen: FC = () => {
	const route = useRoute<Route<string, FirebaseFirestoreTypes.DocumentData>>();
	const theme = useTheme();
	const [ messages, setMessages ] = useState<FirebaseFirestoreTypes.DocumentData[]>([]);
	const [ newMsg, setNewMsg ] = useState<string>('');
	const { user } = useContext<UserContextType>(UserContext);
	const flatListRef = useRef<FlatList<FirebaseFirestoreTypes.DocumentData | null>>(null);

	useEffect(
		() => {
			if (route.params && route.params.key) {
				const unsubscribeMessage = firestore()
					.collection('rooms')
					.doc(route.params.key)
					.collection('messages')
					.orderBy('timestamp', 'asc')
					.onSnapshot(
						(snapshot) => {
							setMessages(
								snapshot.docs.map((doc) => ({
									key: doc.id,
									...doc.data()
								}))
							);
						},
						(err) => Alert.alert(err.name, err.message)
					);

				return () => {
					unsubscribeMessage();
				};
			}
		},
		[ route.params ? route.params.key : null ]
	);

	const sendMessage = () => {
		if (user && newMsg && route.params && route.params.key)
			firestore().collection('rooms').doc(route.params.key).collection('messages').add({
				message: newMsg,
				author: {
					id: user.uid,
					name: user.displayName
				},
				timestamp: firestore.Timestamp.now()
			});
		setNewMsg('');
	};

	const autoScroll = () => {
		if (flatListRef.current) flatListRef.current.scrollToEnd({ animated: true });
	};

	return (
		<Fragment>
			<ImageBackground
				source={require('../assets/chat-bg.png')}
				style={[ styles.image, { backgroundColor: Colors[theme].chatRoomBg } ]}
			>
				<FlatList
					style={styles.msgContainer}
					data={messages}
					renderItem={({ item }) => <ChatMessage message={item} />}
					ref={flatListRef}
					onContentSizeChange={autoScroll}
					onLayout={autoScroll}
				/>
				<View style={styles.footer}>
					<TextInput
						style={[
							styles.input,
							{ backgroundColor: Colors[theme].searchBar, color: Colors[theme].fontBold }
						]}
						placeholder="Type a message"
						value={newMsg}
						onChangeText={(text) => setNewMsg(text)}
						multiline
					/>
					<Button
						onPress={sendMessage}
						size={44}
						style={{ backgroundColor: Colors[theme].tint, elevation: 5 }}
					>
						<Ionicons name="send" size={24} color="#fff" />
					</Button>
				</View>
			</ImageBackground>
		</Fragment>
	);
};

const styles = StyleSheet.create({
	msgContainer: {
		paddingLeft: 10,
		paddingRight: 10
	},
	footer: {
		padding: 5,
		flexDirection: 'row'
	},
	input: {
		flex: 1,
		borderRadius: 24,
		marginRight: 5,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 8,
		paddingBottom: 8,
		fontSize: 16,
		maxHeight: 100,
		elevation: 5
	},
	image: {
		flex: 1,
		resizeMode: 'repeat',
		justifyContent: 'center'
	}
});

export default ChatRoomScreen;
