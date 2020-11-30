import React, { FC, useContext, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

import styles from './styles';
import useTheme from '../../hooks/useTheme';
import { formatDate, getColor } from '../../utils';
import { UserContext, UserContextType } from '../../UserProvider';

interface Props {
	message: FirebaseFirestoreTypes.DocumentData | null;
}

const ChatMessage: FC<Props> = ({ message }) => {
	const theme = useTheme();
	const { user } = useContext<UserContextType>(UserContext);
	const [ sent, setSent ] = useState<boolean>(false);

	useEffect(
		() => {
			if (user && message) setSent(user && message && user.uid === message.author.id);
		},
		[ user ? user.uid : null, message ? message.author.id : null ]
	);

	return (
		<View style={[ styles.base.mainContainer, sent && styles.base.sendMainContainer ]}>
			<View
				style={[
					styles.base.arrow,
					styles[theme].arrow,
					sent && [ styles.base.sendArrow, styles[theme].sendArrow ]
				]}
			/>
			<View style={[ styles.base.container, styles[theme].container, sent && styles[theme].send ]}>
				<Text style={[ styles.base.author, { color: getColor(message ? message.author.id : '') } ]}>
					{message ? message.author.name : null}
				</Text>
				<Text style={[ styles[theme].message ]}>{message ? message.message : ''}</Text>
				<Text style={[ styles.base.timestamp, styles[theme].timestamp ]}>
					{message ? formatDate(message.timestamp.toDate()) : null}
				</Text>
			</View>
		</View>
	);
};

export default ChatMessage;
