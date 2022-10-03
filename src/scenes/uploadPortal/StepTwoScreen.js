import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Dimensions, Modal, ScrollView } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dropdown } from 'react-native-element-dropdown';

import { Colors, Typography } from '../../styles';

import { DisplayItem } from '../../components';

const imageWidth = Dimensions.get('window').width * 0.6;
const modalWidth = Dimensions.get('window').width * 0.7;
const modalHeight = Dimensions.get('window').height * 0.7;

const StepTwoScreen = ({imageEntitiesArray, setImageEntitiesArray}) => {
    const [selectedImages, setSelectedImages] = useState(Array);
    const [allChecked, setAllChecked] = useState(false);

    // Single Edit
    const [singleModalVisible, setSingleModalVisible] = useState(false);
    const [singleEdit, setSingleEdit] = useState(Object);

    const [singleName, onSingleName] = useState("");
    const [singleLocation, onSingleLocation] = useState("");
    const [singleCopyright, onSingleCopyright] = useState("");
    const [singleCaption, onSingleCaption] = useState("");
    const [singleTag, onSingleTag] = useState("");

    // Mass Edit
    const [batchModalVisible, setBatchModalVisible] = useState(false);

    const [openName, setOpenName] = useState(false);
    const [valueName, setValueName] = useState("nil");
    const [batchName, onBatchName] = useState("");

    const [openProject, setOpenProject] = useState(false);
    const [valueProject, setValueProject] = useState("nil");
    const [batchProject, onBatchProject] = useState("");

    const [openCopyright, setOpenCopyright] = useState(false);
    const [valueCopyright, setValueCopyright] = useState("nil");
    const [batchCopyright, onBatchCopyright] = useState("");

    const [openCaption, setOpenCaption] = useState(false);
    const [valueCaption, setValueCaption] = useState("nil");
    const [batchCaption, onBatchCaption] = useState("");

    const [openTag, setOpenTag] = useState(false);
    const [valueTag, setValueTag] = useState("nil");
    const [batchTag, onBatchTag] = useState("");

    const updateOptions = [
        { value: "nil", label: "No change" }, 
        { value: "begin", label: "Insert at beginning" }, 
        { value: "end", label: "Insert at end" }, 
        { value: "all", label: "Replace all" }
    ];

    const updateTagsOptions = [
        { value: "nil", label: "No change" }, 
        { value: "end", label: "Add" }, 
        { value: "all", label: "Replace all" }
    ];

    const num = imageEntitiesArray.length;
    
    const singleReset = () => {
        onSingleName(singleEdit.Project);
        onSingleLocation(singleEdit.LocationName);
        onSingleCopyright(singleEdit.Copyright);
        onSingleCaption(singleEdit.Caption);
        onSingleTag(singleEdit.Tag);
    }

    const singleSave = () => {
        let temArray = new Array;

        for (let index in imageEntitiesArray) {
            if (imageEntitiesArray[index].Id == singleEdit.Id) {
                imageEntitiesArray[index].Project = singleName;
                imageEntitiesArray[index].LocationName = singleLocation;
                imageEntitiesArray[index].Copyright = singleCopyright;
                imageEntitiesArray[index].Caption = singleCaption;
                imageEntitiesArray[index].Tag = singleTag;
            }

            temArray.push(imageEntitiesArray[index]);
        }

        setImageEntitiesArray(temArray);

        onSingleName(singleEdit.Project);
        onSingleLocation(singleEdit.LocationName);
        onSingleCopyright(singleEdit.Copyright);
        onSingleCaption(singleEdit.Caption);
        onSingleTag(singleEdit.Tag);
        setSingleModalVisible(!singleModalVisible)
    }

    const batchReset = () => {
        onBatchName("");
        onBatchProject("");
        onBatchCopyright("");
        onBatchCaption("");
        onBatchTag("");
    }

    const batchSave = () => {
        let temArray = new Array;

        for (let index in imageEntitiesArray) {
            if (valueName == "begin") {
                imageEntitiesArray[index].Project = batchName + imageEntitiesArray[index].Project;
            }
            else if (valueName == "end") {
                imageEntitiesArray[index].Project = imageEntitiesArray[index].Project + batchName;
            }
            else if (valueName == "all") {
                imageEntitiesArray[index].Project = batchName;
            }

            if (valueProject == "begin") {
                imageEntitiesArray[index].LocationName = batchProject + imageEntitiesArray[index].LocationName;
            }
            else if (valueProject == "end") {
                imageEntitiesArray[index].LocationName = imageEntitiesArray[index].LocationName + batchProject;
            }
            else if (valueProject == "all") {
                imageEntitiesArray[index].LocationName = batchProject;
            }
            
            if (valueCopyright == "begin") {
                imageEntitiesArray[index].Copyright = batchCopyright + imageEntitiesArray[index].Copyright;
            }
            else if (valueCopyright == "end") {
                imageEntitiesArray[index].Copyright = imageEntitiesArray[index].Copyright + batchCopyright;
            }
            else if (valueCopyright == "all") {
                imageEntitiesArray[index].Copyright = batchCopyright;
            }

            if (valueCaption == "begin") {
                imageEntitiesArray[index].Caption = batchCaption + imageEntitiesArray[index].Caption;
            }
            else if (valueCaption == "end") {
                imageEntitiesArray[index].Caption = imageEntitiesArray[index].Caption + batchCaption;
            }
            else if (valueCaption == "all") {
                imageEntitiesArray[index].Caption = batchCaption;
            }

            if (valueTag == "all") {
                imageEntitiesArray[index].Tag = batchTag;
            }
            else if (valueTag == "end") {
                if (imageEntitiesArray[index].Tag == "") {
                    imageEntitiesArray[index].Tag = batchTag;
                }
                else {
                    imageEntitiesArray[index].Tag = imageEntitiesArray[index].Tag + "," + batchTag;
                }
            }

            temArray.push(imageEntitiesArray[index]);
        }

        setImageEntitiesArray(temArray);

        onBatchName("");
        onBatchProject("");
        onBatchCopyright("");
        onBatchCaption("");
        onBatchTag("");
        setValueName("nil");
        setValueProject("nil");
        setValueCopyright("nil");
        setValueCaption("nil");
        setValueTag("nil");
        setBatchModalVisible(!batchModalVisible);
    }

    const deleteImages = () => {
        let temArray = [...imageEntitiesArray];

        for (let i in temArray) {
            for (let o in selectedImages) {
                if (temArray[i].Id == selectedImages[o]) {
                    const index = temArray.indexOf(temArray[i]);
                    if (index > -1) {
                        temArray.splice(index, 1);
                    }
                }
            }
        }

        setImageEntitiesArray(temArray);
    }

    useEffect(() => {
        if (selectedImages.length == 1) {
            for (let index in imageEntitiesArray) {
                if (imageEntitiesArray[index].Id == selectedImages[0]) {
                    setSingleEdit(imageEntitiesArray[index]);
                    onSingleName(imageEntitiesArray[index].Project);
                    onSingleLocation(imageEntitiesArray[index].LocationName);
                    onSingleCopyright(imageEntitiesArray[index].Copyright);
                    onSingleCaption(imageEntitiesArray[index].Caption);
                    onSingleTag(imageEntitiesArray[index].Tag);
                }
            }
        }
        
        if (selectedImages.length == num) {
            setAllChecked(true);
        }
        else {
            setAllChecked(false);
        }
    }, [selectedImages])

    return (
        <View style={styles.container}>
            <Text style={Typography.FontFamilyNormal}>Confirm uploads and update information as needed</Text>

            <View style={[styles.optionBar, {margin: 15}]}>
                <BouncyCheckbox
                    fillColor={Colors.BLUE}
                    unfillColor={Colors.WHITE}
                    textStyle={Typography.FontFamilyNormal}
                    isChecked={allChecked}
                    disableBuiltInState
                    onPress={() => {
                        setAllChecked(!allChecked);

                        if (!allChecked) {
                            let temArray = new Array;
                            for (var i in imageEntitiesArray) {
                                temArray.push(imageEntitiesArray[i].Id);
                            }
                            setSelectedImages(temArray);
                        }
                        else {
                            setSelectedImages(new Array);
                        }
                    }}
                />

                <Icon name="grip-lines-vertical" size={20} style={styles.icon}/>

                {
                    selectedImages.length == 0?
                    <Icon name="redo" size={20} style={styles.icon}/>
                    :
                    <View style={styles.optionBar}>
                        {
                            selectedImages.length == 1?
                            <TouchableOpacity
                                onPress={() => setSingleModalVisible(true)}>
                                <Icon name="edit" size={20} style={styles.icon}/>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                onPress={() => setBatchModalVisible(true)}>
                                <Icon name="edit" size={20} style={styles.icon}/>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity
                            onPress={() => deleteImages()}>
                            <Icon name="trash" size={20} style={styles.icon}/>
                        </TouchableOpacity>
                    </View>
                }
            </View>

            <View
                style={{
                    borderBottomColor: Colors.BLACK,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }}
            />

            <View style={styles.imageList}>
                {
                    imageEntitiesArray.map((image) =>
                        <DisplayItem key={image.Id} image={image} update={true} selectedImages={selectedImages} setSelectedImages={setSelectedImages}/>
                    )
                }
            </View>

            <Text style={[Typography.FontFamilyNormal, styles.numImages]}>Uploading {num} image&#40;s&#41;</Text>

            { selectedImages.length > 0 &&
            <View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={singleModalVisible}
                    onRequestClose={() => setSingleModalVisible(!singleModalVisible)}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <Text style={[Typography.FontFamilyNormal, Typography.h2, {marginBottom: 15}]}>{singleEdit.Name}</Text>
                                    <TouchableOpacity
                                        onPress={() => setSingleModalVisible(!singleModalVisible)}>
                                        <Text style={Typography.FontFamilyBold}>X</Text>
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={{
                                        borderBottomColor: Colors.BLACK,
                                        borderBottomWidth: StyleSheet.hairlineWidth,
                                    }}
                                />

                                <Image source={{uri: singleEdit.FileURL}} style={styles.image}/>

                                <View style={styles.imageEdit}>
                                    <View style={styles.imageDetails}>
                                        <Text style={[Typography.FontFamilyBold, styles.inputLabel]}>Name:</Text>

                                        <View style={{flex:2}}>
                                            <TextInput 
                                                style={[Typography.FontFamilyNormal, styles.input]}
                                                onChangeText={onSingleName}
                                                value={singleName}
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.imageDetails}>
                                        <Text style={[Typography.FontFamilyBold, styles.inputLabel]}>Location:</Text>

                                        <View style={{flex:2}}>
                                            <TextInput 
                                                style={[Typography.FontFamilyNormal, styles.input]}
                                                onChangeText={onSingleLocation}
                                                value={singleLocation}
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.imageDetails}>
                                        <Text style={[Typography.FontFamilyBold, styles.inputLabel]}>Copyright Owner:</Text>

                                        <View style={{flex:2}}>
                                            <TextInput 
                                                style={[Typography.FontFamilyNormal, styles.input]}
                                                onChangeText={onSingleCopyright}
                                                value={singleCopyright}
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.imageDetails}>
                                        <Text style={[Typography.FontFamilyBold, styles.inputLabel]}>Caption:</Text>

                                        <View style={{flex:2}}>
                                            <TextInput 
                                                style={[Typography.FontFamilyNormal, styles.input]}
                                                onChangeText={onSingleCaption}
                                                value={singleCaption}
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.imageDetails}>
                                        <Text style={[Typography.FontFamilyBold, styles.inputLabel]}>Tags:</Text>

                                        <View style={{flex:2}}>
                                            <TextInput 
                                                style={[Typography.FontFamilyNormal, styles.input]}
                                                onChangeText={onSingleTag}
                                                value={singleTag}
                                            />
                                            <Text style={Typography.FontFamilyLight}>Tags are separated with a comma</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.buttonRow}>
                                    <TouchableOpacity
                                        style={[styles.button, {backgroundColor: Colors.SECONDARY}]}
                                        onPress={() => singleReset()}>
                                            <Text style={[Typography.FontFamilyBold, styles.buttonText]}>Reset</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.button, {backgroundColor: Colors.PRIMARY}]}
                                        onPress={() => singleSave()}>
                                            <Text style={[Typography.FontFamilyBold, styles.buttonText]}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={batchModalVisible}
                    onRequestClose={() => setBatchModalVisible(!batchModalVisible)}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom : 100}}>
                                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                                    <Text style={[Typography.FontFamilyNormal, Typography.h2,{marginBottom: 15}]}>Edit Details</Text>
                                    <TouchableOpacity
                                        onPress={() => setBatchModalVisible(!batchModalVisible)}>
                                        <Text style={Typography.FontFamilyBold}>X</Text>
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={{
                                        borderBottomColor: Colors.BLACK,
                                        borderBottomWidth: StyleSheet.hairlineWidth,
                                    }}
                                />

                                <Text style={Typography.FontFamilyLight}>Note:</Text>
                                <Text style={[Typography.FontFamilyLight, {marginLeft: "5%"}]}>&#8901; Edits will be made only to selected uploads</Text>
                                <Text style={[Typography.FontFamilyLight, {marginLeft: "5%"}]}>&#8901; Additional fields will be appended and not overwritten</Text>

                                <View style={styles.imageEdit}>
                                    <View style={styles.imageDetails}>
                                        <Text style={[Typography.FontFamilyBold, styles.inputLabel]}>Name:</Text>

                                        <View style={styles.dropdownView}>
                                            <Dropdown
                                                style={[styles.dropdown, openName && { borderColor: 'blue' }]}
                                                data={updateOptions}
                                                search={false}
                                                maxHeight={300}
                                                labelField="label"
                                                valueField="value"
                                                placeholder={!openName ? 'No change' : '...'}
                                                value={valueName}
                                                onFocus={() => setOpenName(true)}
                                                onBlur={() => setOpenName(false)}
                                                onChange={item => {
                                                    setValueName(item.value);
                                                    setOpenName(false);
                                                }}
                                            />

                                            {
                                                valueName != "nil" &&
                                                <TextInput
                                                    style={[Typography.FontFamilyNormal, styles.input]}
                                                    onChangeText={onBatchName}
                                                    value={batchName}
                                                />
                                            }
                                        </View>
                                    </View>

                                    <View style={styles.imageDetails}>
                                        <Text style={[Typography.FontFamilyBold, styles.inputLabel]}>Location:</Text>

                                        <View style={styles.dropdownView}>
                                            <Dropdown
                                                style={[styles.dropdown, openProject && { borderColor: 'blue' }]}
                                                data={updateOptions}
                                                search={false}
                                                maxHeight={300}
                                                labelField="label"
                                                valueField="value"
                                                placeholder={!openProject ? 'No change' : '...'}
                                                value={valueProject}
                                                onFocus={() => setOpenProject(true)}
                                                onBlur={() => setOpenProject(false)}
                                                onChange={item => {
                                                    setValueProject(item.value);
                                                    setOpenProject(false);
                                                }}
                                            />

                                            {
                                                valueProject != "nil" &&
                                                <TextInput
                                                    style={[Typography.FontFamilyNormal, styles.input]}
                                                    onChangeText={onBatchProject}
                                                    value={batchProject}
                                                />
                                            }
                                        </View>
                                    </View>

                                    <View style={styles.imageDetails}>
                                        <Text style={[Typography.FontFamilyBold, styles.inputLabel]}>Copyright Owner:</Text>

                                        <View style={styles.dropdownView}>
                                            <Dropdown
                                                style={[styles.dropdown, openCopyright && { borderColor: 'blue' }]}
                                                data={updateOptions}
                                                search={false}
                                                maxHeight={300}
                                                labelField="label"
                                                valueField="value"
                                                placeholder={!openCopyright ? 'No change' : '...'}
                                                value={valueCopyright}
                                                onFocus={() => setOpenCopyright(true)}
                                                onBlur={() => setOpenCopyright(false)}
                                                onChange={item => {
                                                    setValueCopyright(item.value);
                                                    setOpenCopyright(false);
                                                }}
                                            />

                                            {
                                                valueCopyright != "nil" &&
                                                <TextInput
                                                    style={[Typography.FontFamilyNormal, styles.input]}
                                                    onChangeText={onBatchCopyright}
                                                    value={batchCopyright}
                                                />
                                            }
                                        </View>
                                    </View>

                                    <View style={styles.imageDetails}>
                                        <Text style={[Typography.FontFamilyBold, styles.inputLabel]}>Caption:</Text>

                                        <View style={styles.dropdownView}>
                                            <Dropdown
                                                style={[styles.dropdown, openCaption && { borderColor: 'blue' }]}
                                                data={updateOptions}
                                                search={false}
                                                maxHeight={300}
                                                labelField="label"
                                                valueField="value"
                                                placeholder={!openCaption ? 'No change' : '...'}
                                                value={valueCaption}
                                                onFocus={() => setOpenCaption(true)}
                                                onBlur={() => setOpenCaption(false)}
                                                onChange={item => {
                                                    setValueCaption(item.value);
                                                    setOpenCaption(false);
                                                }}
                                            />

                                            {
                                                valueCaption != "nil" &&
                                                <TextInput
                                                    style={[Typography.FontFamilyNormal, styles.input]}
                                                    onChangeText={onBatchCaption}
                                                    value={batchCaption}
                                                />
                                            }
                                        </View>
                                    </View>

                                    <View style={styles.imageDetails}>
                                        <Text style={[Typography.FontFamilyBold, styles.inputLabel]}>Tags:</Text>

                                        <View style={styles.dropdownView}>
                                            <Dropdown
                                                style={[styles.dropdown, openTag && { borderColor: 'blue' }]}
                                                data={updateTagsOptions}
                                                search={false}
                                                maxHeight={300}
                                                labelField="label"
                                                valueField="value"
                                                placeholder={!openTag ? 'No change' : '...'}
                                                value={valueTag}
                                                onFocus={() => setOpenTag(true)}
                                                onBlur={() => setOpenTag(false)}
                                                onChange={item => {
                                                    setValueTag(item.value);
                                                    setOpenTag(false);
                                                }}
                                            />

                                            {
                                                valueTag != "nil" &&
                                                <TextInput
                                                    style={[Typography.FontFamilyNormal, styles.input]}
                                                    onChangeText={onBatchTag}
                                                    value={batchTag}
                                                />
                                            }
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.buttonRow}>
                                    <TouchableOpacity
                                        style={[styles.button, {backgroundColor: Colors.SECONDARY}]}
                                        onPress={() => batchReset()}>
                                            <Text style={[Typography.FontFamilyBold, styles.buttonText]}>Reset</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.button, {backgroundColor: Colors.PRIMARY}]}
                                        onPress={() => batchSave()}>
                                            <Text style={[Typography.FontFamilyBold, styles.buttonText]}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    optionBar: {
        flexDirection: "row"
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
    imageEdit: {
        flex: 1,
        margin: 5,
        width: modalWidth,
        height: modalHeight,
        marginTop: "2%"
    },
    imageDetails: {
        flexDirection: "row"
    },
    inputLabel: {
        flex: 1,
        justifyContent: "center",
        alignSelf: "center"
    },
    input: {
        margin: "5%",
        padding: "1%",
        backgroundColor: Colors.WHITE,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: "center"
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 150
    },
    button: {
        borderRadius: 5,
        padding: 12,
        margin: 4
    },
    buttonText: {
        color: Colors.WHITE
    },
    dropdownView: {
        flex: 2,
        marginTop: 10,
        marginBottom: 10
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    image: {
        width: imageWidth,
        height: imageWidth,
        resizeMode: "contain",
        alignSelf: "center",
        margin: 10
    },
});

export default StepTwoScreen;