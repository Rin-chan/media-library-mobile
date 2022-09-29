import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';

import { Colors, Typography } from '../../styles';

const imageWidth = Dimensions.get('window').width * 0.6;

const StepOneScreen = ({imageList, setImageList, name, onChangeName, location, onChangeLocation, copyright, onChangeCopyright}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        result.key = uuid.v4();
        
        if (!result.cancelled) {
            const newImageList = [...imageList, result];
            setImageList(newImageList);
        };
    };

    const removeImage = async (imageID) => {
        const newImageList = [...imageList];

        for (var i in newImageList) {
            if (newImageList[i].key == imageID) {
                newImageList.splice(i, 1);
            }
        }

        setImageList(newImageList);
    };

    return (
        <View style={styles.container}>
            <Text style={Typography.FontFamilyNormal}>Up to 40 MB of images is accepted</Text>
        
            <TouchableOpacity
                style={styles.addImageButton}
                onPress={() => pickImage()}>
                    <View>
                        <Text style={[Typography.FontFamilyNormal, styles.addImageText]}>Add images</Text>
                        {
                            imageList.map((image) =>
                            <TouchableOpacity
                                style={styles.imageBtn}
                                key={image.key}
                                onPress={() => {
                                    setSelectedImage(image.key);
                                    setModalVisible(true);
                                }}>
                                <Image key={image.key} source={{ uri: image.uri }} style={styles.image} />
                            </TouchableOpacity>
                            )
                        }
                    </View>
            </TouchableOpacity>

            <Text style={Typography.FontFamilyNormal}>Provide more information to make your images easier to find</Text>
        
            <View style={styles.typeInputContainer}>
                <View style={styles.individualInput}>
                    <View style={styles.label}>
                        <Text style={Typography.FontFamilyNormal}>Name</Text><Text style={[Typography.FontFamilyNormal, styles.asterisk]}>&#42;</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeName}
                        value={name}
                    />
                    <Text style={Typography.FontFamilyLight}>Give a brief title for the images, e.g., project or event name</Text>
                </View>

                <View style={styles.individualInput}>
                    <View style={styles.label}>
                        <Text style={Typography.FontFamilyNormal}>Location</Text><Text style={[Typography.FontFamilyNormal, styles.asterisk]}>&#42;</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeLocation}
                        value={location}
                    />
                    <Text style={Typography.FontFamilyLight}>Describe the landmark or road where the images were taken, e.g., Gardens By The Bay, Kampong Glam, Stamford Road</Text>
                </View>

                <View style={styles.individualInput}>
                    <View style={styles.label}>
                        <Text style={Typography.FontFamilyNormal}>Copyright Owner</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeCopyright}
                        value={copyright}
                    />
                    <Text style={Typography.FontFamilyLight}>Enter the copyright owner's name &#40;Works you create in the course of employment are automatically owned by your employer&#41;</Text>
                </View>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={Typography.FontFamilyNormal}>Are you sure you want to remove this image?</Text>

                        <View style={styles.modalBtnView}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(!modalVisible)}
                                >
                                <Text style={[Typography.FontFamilyNormal, styles.modalText]}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    removeImage(selectedImage);
                                    setModalVisible(!modalVisible);
                                }}
                                >
                                <Text style={[Typography.FontFamilyNormal, styles.modalText, {color: Colors.RED}]}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    addImageButton: {
        margin: 10,
        paddingTop: "10%",
        paddingBottom: "10%",
        backgroundColor: Colors.LIGHT_GRAY,
        borderRadius: 5,
        justifyContent: "center"
    },
    addImageText: {
        color: Colors.DARK_GRAY,
        textAlign: "center"
    },
    imageBtn: {
        alignSelf: "center",
        marginTop: 20
    },
    image: {
        width: imageWidth,
        height: imageWidth,
        resizeMode: "contain"
    },
    label: {
        flexDirection: "row"
    },
    asterisk: {
        color: Colors.RED
    },
    typeInputContainer:{
        margin: "3%"
    },
    individualInput: {
        marginTop: "3%",
        marginBottom: "3%",
    },
    input: {
        marginTop: "1%",
        marginBottom: "1%",
        padding: "1%",
        backgroundColor: Colors.WHITE
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalBtnView: {
        paddingTop: 10
    },
    modalText: {
        paddingTop: 10,
        paddingBottom: 10,
        textDecorationLine: "underline",
        textAlign: "center"
    }
});

export default StepOneScreen;