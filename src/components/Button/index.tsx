import React, { FC } from 'react';
import { TouchableNativeFeedback, View, StyleProp, ViewStyle, GestureResponderEvent } from 'react-native';
import styles from './styles';
import Colors from '../../constants/Colors';

interface Props {
	style?: StyleProp<ViewStyle>;
	theme?: 'light' | 'dark';
	size?: number;
	onPress?: ((event: GestureResponderEvent) => void);
}

const Button: FC<Props> = ({ children, style, theme = 'dark', size, onPress }) => {
	return (
		<View style={[ styles.base.container, style ]}>
			<TouchableNativeFeedback
				onPress={onPress}
				background={TouchableNativeFeedback.Ripple(Colors[theme].touch, false)}
			>
				<View style={[ styles.base.childContainer, size ? { height: size, width: size } : null ]}>
					{children}
				</View>
			</TouchableNativeFeedback>
		</View>
	);
};

export default Button;
