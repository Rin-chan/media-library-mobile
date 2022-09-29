import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Typography } from '../styles';

const Header = () => {
    return (
        <View style={styles.container}>
            <Text style={[Typography.FontFamilyBold, Typography.h2, styles.textAlign]}>Media Library Upload Portal</Text>
            <Text style={[Typography.FontFamilyLight, Typography.h3, styles.textAlign]}>Help</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: "5%",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    alignTexts: {
        textAlign: "center",
        justifyContent: "center"
    }
});

export default Header;