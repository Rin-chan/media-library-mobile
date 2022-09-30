import * as React from 'react';
import { useState } from 'react';
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
    const [singleModalVisible, setSingleModalVisible] = useState(false);
    const [batchModalVisible, setBatchModalVisible] = useState(false);

    const [openName, setOpenName] = useState(false);
    const [valueName, setValueName] = useState(null);
    const [openProject, setOpenProject] = useState(false);
    const [valueProject, setValueProject] = useState(null);
    const [openCopyright, setOpenCopyright] = useState(false);
    const [valueCopyright, setValueCopyright] = useState(null);
    const [openCaption, setOpenCaption] = useState(false);
    const [valueCaption, setValueCaption] = useState(null);
    const [openTag, setOpenTag] = useState(false);
    const [valueTag, setValueTag] = useState(null);

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

    return (
        <View style={styles.container}>
            <Text style={Typography.FontFamilyNormal}>Confirm uploads and update information as needed</Text>

            <View style={styles.optionBar}>
                <BouncyCheckbox
                    fillColor={Colors.BLUE}
                    unfillColor={Colors.WHITE}
                    textStyle={Typography.FontFamilyNormal}
                    onPress={() => {}}
                />

                <Icon name="grip-lines-vertical" size={20} style={styles.icon}/>
                <Icon name="redo" size={20} style={styles.icon}/>

                <TouchableOpacity
                    onPress={() => setSingleModalVisible(true)}>
                    <Icon name="edit" size={20} style={styles.icon}/>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setBatchModalVisible(true)}>
                    <Icon name="edit" size={20} style={styles.icon}/>
                </TouchableOpacity>

                <Icon name="trash" size={20} style={styles.icon}/>
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
                        <DisplayItem key={image.Id} image={image} update={true}/>
                    )
                }
            </View>

            <Text style={[Typography.FontFamilyNormal, styles.numImages]}>Uploading {num} image&#40;s&#41;</Text>

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
                                <Text style={[Typography.FontFamilyNormal, Typography.h2, {marginBottom: 15}]}>Image name</Text>
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

                            <Text style={{margin: 15}}>Image</Text>

                            <View style={styles.imageEdit}>
                                <View style={styles.imageDetails}>
                                    <Text style={[Typography.FontFamilyBold, styles.inputLabel]}>Name:</Text>

                                    <View style={{flex:2}}>
                                        <TextInput style={[Typography.FontFamilyNormal, styles.input]}>Image Name</TextInput>
                                    </View>
                                </View>

                                <View style={styles.imageDetails}>
                                    <Text style={[Typography.FontFamilyBold, styles.inputLabel]}>Location:</Text>

                                    <View style={{flex:2}}>
                                        <TextInput style={[Typography.FontFamilyNormal, styles.input]}>Image Project</TextInput>
                                    </View>
                                </View>

                                <View style={styles.imageDetails}>
                                    <Text style={[Typography.FontFamilyBold, styles.inputLabel]}>Copyright Owner:</Text>

                                    <View style={{flex:2}}>
                                        <TextInput style={[Typography.FontFamilyNormal, styles.input]}>Image Copyright</TextInput>
                                    </View>
                                </View>

                                <View style={styles.imageDetails}>
                                    <Text style={[Typography.FontFamilyBold, styles.inputLabel]}>Caption:</Text>

                                    <View style={{flex:2}}>
                                        <TextInput style={[Typography.FontFamilyNormal, styles.input]}>Image Caption</TextInput>
                                    </View>
                                </View>

                                <View style={styles.imageDetails}>
                                    <Text style={[Typography.FontFamilyBold, styles.inputLabel]}>Tags:</Text>

                                    <View style={{flex:2}}>
                                        <TextInput style={[Typography.FontFamilyNormal, styles.input]}>Image Tag</TextInput>
                                        <Text style={Typography.FontFamilyLight}>Tags are separated with a comma</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    style={[styles.button, {backgroundColor: Colors.SECONDARY}]}
                                    onPress={() => {}}>
                                        <Text style={[Typography.FontFamilyBold, styles.buttonText]}>Reset</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.button, {backgroundColor: Colors.PRIMARY}]}
                                    onPress={() => {}}>
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
                        <ScrollView showsVerticalScrollIndicator={false}>
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
                                    </View>
                                </View>
                            </View>

                            <View style={styles.buttonRow}>
                                <TouchableOpacity
                                    style={[styles.button, {backgroundColor: Colors.SECONDARY}]}
                                    onPress={() => {}}>
                                        <Text style={[Typography.FontFamilyBold, styles.buttonText]}>Reset</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.button, {backgroundColor: Colors.PRIMARY}]}
                                    onPress={() => {}}>
                                        <Text style={[Typography.FontFamilyBold, styles.buttonText]}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
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
    optionBar: {
        flexDirection: "row",
        margin: 15
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
        marginTop: "auto"
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
});

export default StepTwoScreen;