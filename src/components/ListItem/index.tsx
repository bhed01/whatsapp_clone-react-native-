import { useNavigation } from '@react-navigation/native';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Text, View, Image, TouchableNativeFeedback, Alert } from 'react-native';
import Colors from '../../constants/Colors';
import useTheme from '../../hooks/useTheme';
import { formatDate, getTitle, getURI } from '../../utils';
import styles from './styles';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { UserContext, UserContextType } from '../../UserProvider';

interface Props {
	last?: boolean;
	type: 'chatRoom' | 'status';
	data?: FirebaseFirestoreTypes.DocumentData;
}

const ListItem: FC<Props> = ({ last, type, data }) => {
	const navigation = useNavigation();
	const theme = useTheme();
	const [ lastData, setLastData ] = useState<FirebaseFirestoreTypes.DocumentData>();
	const { user } = useContext<UserContextType>(UserContext);

	useEffect(
		() => {
			if (type === 'chatRoom' && data && data.key) {
				const unsubscribe = firestore()
					.collection('rooms')
					.doc(data.key)
					.collection('messages')
					.orderBy('timestamp', 'desc')
					.onSnapshot(
						(snapshot) => {
							setLastData(snapshot.docs.map((doc) => doc.data())[0]);
						},
						(err) => Alert.alert(err.name, err.message)
					);
				return () => unsubscribe();
			}
		},
		[ type, data ? data.key : null ]
	);

	const onClick = () => {
		if (type === 'chatRoom') navigation.navigate('ChatRoom', { ...data, lastData });
		else navigation.navigate('StatusRoom', { ...data, deletable: user && data && user.uid === data.author.id });
	};

	return (
		<TouchableNativeFeedback onPress={onClick} background={TouchableNativeFeedback.Ripple(Colors[theme].touch)}>
			<View style={[ styles.base.container ]}>
				<Image
					style={[ styles.base.avatar ]}
					source={{
						uri: getURI(type, data)
					}}
					resizeMode={'contain'}
				/>
				<View
					style={[
						styles.base.rightContainer,
						styles[theme].rightContainer,
						last && { borderBottomWidth: 0 }
					]}
				>
					<Text numberOfLines={1} style={[ styles.base.heading, styles[theme].heading ]}>
						{getTitle(data)}
					</Text>
					<Text numberOfLines={1} style={[ styles.base.text, styles[theme].text ]}>
						{lastData ? (
							lastData.message
						) : type === 'status' && data && data.timestamp ? (
							formatDate(data.timestamp.toDate())
						) : (
							'nothing to show'
						)}
					</Text>
				</View>
			</View>
		</TouchableNativeFeedback>
	);
};

export default ListItem;
