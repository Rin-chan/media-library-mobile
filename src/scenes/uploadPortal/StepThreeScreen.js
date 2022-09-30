import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions, Modal } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Colors, Typography } from '../../styles';

import { DisplayItem } from '../../components';

const imageWidth = Dimensions.get('window').width * 0.6;

const StepThreeScreen = () => {
    const num = 0;

    return (
        <View style={styles.container}>
            <Text style={Typography.FontFamilyNormal}>Please confirm image&#40;s&#41; shown below for upload</Text>

            <Text style={[Typography.FontFamilyLight, styles.topBar]}>Uploading {num} image&#40;s&#41;</Text>
            <View
                style={{
                    borderBottomColor: Colors.BLACK,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />

            <View style={styles.imageList}>
                <DisplayItem update={false}/>
            </View>

            <Text style={[Typography.FontFamilyNormal, styles.numImages]}>Uploading {num} image&#40;s&#41;</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topBar: {
        marginTop: 15,
        marginBottom: 15
    },
    imageList: {
        margin: 15
    },
    icon: {
        padding: 5,
        justifyContent: "center"
    },
    numImages: {
        textAlign: "right",
        marginBottom: 20
    }
});

export default StepThreeScreen;