import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions, Modal } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { Colors, Typography } from '../styles';

const imageWidth = Dimensions.get('window').width * 0.6;

const DisplayItem = ({image, update}) => {
    let coordinate = image.Location

    if (coordinate != "null") {
        let coords = "";
        for (var i in image.Location.coordinates) {
            if (coords == "") {
                coords += image.Location.coordinates[i]
            }
            else {
                coords += ","
                coords += image.Location.coordinates[i] 
            }
        }
        coordinate = coords
    }

    return (
        <View style={styles.container}>
            {
                update?
                <BouncyCheckbox
                    fillColor={Colors.BLUE}
                    unfillColor={Colors.WHITE}
                    textStyle={Typography.FontFamilyNormal}
                    onPress={() => {}}
                />
                :null
            }

            <View style={styles.innerContainer}>
                <Image source={{uri: image.FileURL}} style={styles.image}/>

                <View style={styles.imageContainer}>
                    <View style={styles.imageDetails}>
                        <Text style={[Typography.FontFamilyBold, styles.imageLabel]}>Name:</Text>
                        <Text style={[Typography.FontFamilyNormal, styles.imageDetail]}>{image.LocationName}</Text>
                    </View>

                    <View style={styles.imageDetails}>
                        <Text style={[Typography.FontFamilyBold, styles.imageLabel]}>Location:</Text>
                        <Text style={[Typography.FontFamilyNormal, styles.imageDetail]}>{coordinate}</Text>
                    </View>

                    <View style={styles.imageDetails}>
                        <Text style={[Typography.FontFamilyBold, styles.imageLabel]}>Copyright Owner:</Text>
                        <Text style={[Typography.FontFamilyNormal, styles.imageDetail]}>{image.Copyright}</Text>
                    </View>

                    <View style={styles.imageDetails}>
                        <Text style={[Typography.FontFamilyBold, styles.imageLabel]}>Planning Area:</Text>
                        <Text style={[Typography.FontFamilyNormal, styles.imageDetail]}>{image.Project}</Text>
                    </View>

                    <View style={styles.imageDetails}>
                        <Text style={[Typography.FontFamilyBold, styles.imageLabel]}>Caption:</Text>
                        <Text style={[Typography.FontFamilyNormal, styles.imageDetail]}>{image.Caption}</Text>
                    </View>

                    <View style={styles.imageDetails}>
                        <Text style={[Typography.FontFamilyBold, styles.imageLabel]}>Tags:</Text>
                        <Text style={[Typography.FontFamilyNormal, styles.imageDetail]}>{image.Tag}</Text>
                    </View>

                    <View style={styles.imageDetails}>
                        <Text style={[Typography.FontFamilyBold, styles.imageLabel]}>Taken on:</Text>
                        <Text style={[Typography.FontFamilyNormal, styles.imageDetail]}>{image.DateTaken}</Text>
                    </View>

                    <View style={styles.imageDetails}>
                        <Text style={[Typography.FontFamilyBold, styles.imageLabel]}>Uploaded on:</Text>
                        <Text style={[Typography.FontFamilyNormal, styles.imageDetail]}>{image.UploadDate}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        margin: 5
    },
    innerContainer: {
        flex: 1,
        borderColor: Colors.BLACK,
        borderWidth: 1,
        padding: 10
    },
    imageContainer: {
        margin: 5
    },
    imageDetails: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    image: {
        width: imageWidth,
        height: imageWidth,
        resizeMode: "contain"
    },
    imageLabel: {
        flex: 1
    },
    imageDetail: {
        flex: 2,
        alignSelf: "center"
    }
});

export default DisplayItem;