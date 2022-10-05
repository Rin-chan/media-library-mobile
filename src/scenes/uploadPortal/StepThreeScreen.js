import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors, Typography } from '../../styles';

import { DisplayItem } from '../../components';

const StepThreeScreen = ({imageEntitiesArray, partitionKey}) => {
    const [selectedImages, setSelectedImages] = useState(Array);

    const num = imageEntitiesArray.length;

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
                {
                    imageEntitiesArray.map((image) =>
                        <DisplayItem key={image.Id} image={image} update={false} selectedImages={selectedImages} setSelectedImages={setSelectedImages}/>
                    )
                }
            </View>
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