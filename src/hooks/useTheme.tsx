import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

const useTheme = () => {
	const scheme = useColorScheme();
	const [ theme, setTheme ] = useState<'light' | 'dark'>('light');

	useEffect(
		() => {
			if (scheme) setTheme(scheme);
		},
		[ scheme ]
	);

	return theme;
};

export default useTheme;
