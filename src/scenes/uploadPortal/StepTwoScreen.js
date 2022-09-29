import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions, Modal } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { Colors, Typography } from '../../styles';

const imageWidth = Dimensions.get('window').width * 0.6;

const StepTwoScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={Typography.FontFamilyNormal}>Confirm uploads and update information as needed</Text>
            <BouncyCheckbox
                fillColor={Colors.BLUE}
                unfillColor={Colors.WHITE}
                textStyle={Typography.FontFamilyNormal}
                onPress={() => {}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default StepTwoScreen;