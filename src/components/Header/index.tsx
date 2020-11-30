import React, { FC, Fragment, useRef } from 'react';
import { View, Image, Text } from 'react-native';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import Menu, { MenuItem } from 'react-native-material-menu';

import EntypoIcon from 'react-native-vector-icons/Entypo';
import Ionicon from 'react-native-vector-icons/Ionicons';

import styles from './styles';
import Button from '../Button';
import useTheme from '../../hooks/useTheme';
import { getBg, getSubTitle, getTitle, getURI } from '../../utils';

interface Props {
	title?: string;
	type?: 'chatRoom' | 'status';
	params?: FirebaseFirestoreTypes.DocumentData;
	options?: { title: string; onPress: () => void }[];
	backHandler?: () => void;
}

const Header: FC<Props> = ({ backHandler, title, type, params, options }) => {
	const theme = useTheme();
	const menuRef = useRef<Menu>(null);

	return (
		<View style={[ styles.base.header, styles[theme].header, getBg(params) ]}>
			{title ? (
				<Text numberOfLines={1} style={[ styles.base.mainTitle, styles.base.text ]}>
					{title}
				</Text>
			) : (
				<Fragment>
					<Button onPress={backHandler} style={{ alignSelf: 'center' }}>
						<View style={styles.base.flexRow}>
							<Ionicon name="arrow-back" size={24} color="#fff" />
							<Image
								style={styles.base.avatar}
								source={{
									uri: getURI(type, params)
								}}
								resizeMode={'contain'}
							/>
						</View>
					</Button>
					<View style={styles.base.titleContainer}>
						<Text numberOfLines={1} style={[ styles.base.title, styles.base.text ]}>
							{getTitle(params)}
						</Text>
						<Text numberOfLines={1} style={styles.base.text}>
							{getSubTitle(type, params)}
						</Text>
					</View>
				</Fragment>
			)}
			<View style={[ styles.base.flexRow ]}>
				{options ? (
					<View>
						<Menu
							style={styles[theme].menu}
							ref={menuRef}
							button={
								<Button onPress={() => (menuRef.current ? menuRef.current.show() : null)}>
									<EntypoIcon name="dots-three-vertical" size={22} color="#fff" />
								</Button>
							}
						>
							{options.map((option, ind) => (
								<MenuItem
									key={ind}
									textStyle={styles[theme].menuText}
									onPress={() => {
										if (menuRef.current) menuRef.current.hide();
										option.onPress();
									}}
								>
									{option.title}
								</MenuItem>
							))}
						</Menu>
					</View>
				) : null}
			</View>
		</View>
	);
};

export default Header;
