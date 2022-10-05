import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import { Header } from '../../components';
import { Typography, Colors } from '../../styles';
import { ImageEntity, CoordinateObj } from '../../utils/models';

import StepOneScreen from './StepOneScreen';
import StepTwoScreen from './StepTwoScreen';
import StepThreeScreen from './StepThreeScreen';
import DraftController from '../../utils/controllers/DraftController';

const nextBtnTextStyle = {
    color: Colors.WHITE
}

const nextBtnStyle = {
    backgroundColor: Colors.PRIMARY,
    padding: 12,
    borderRadius: 5
}

const previousBtnTextStyle = {
    color: Colors.WHITE
}

const previousBtnStyle = {
    backgroundColor: Colors.SECONDARY,
    padding: 12,
    borderRadius: 5
}

const IndexScreen = () => {
    const [rowKey, setRowKey] = useState("");

    // Step 1
    const [imageList, setImageList] = useState(Array);
    const [name, onChangeName] = useState("");
    const [location, onChangeLocation] = useState("");
    const [copyright, onChangeCopyright] = useState("URA");
    const [stepOneError, setStepOneError] = useState(true);
    const [imageEntitiesArray, setImageEntitiesArray] = useState(Array);

    // Placeholder
    const author = "nian.ci@hotmail.com";

    const stepOne = () => {
        if (name == "" || location == "") {
            setStepOneError(true);
            return;
        }

        if (imageList.length == 0) {
            setStepOneError(true);
            return;
        }

        const key = DraftController.CreateDraft();
        setRowKey(key);
        
        let newImageEntitiesArray = new Array;

        for (let i in imageList) {
            let imageObj = new ImageEntity();
            imageObj.Id = imageList[i].key;
            imageObj.Name = imageList[i].key;
            
            if (imageList[i].exif.DateTime != null) {
                imageObj.DateTaken = imageList[i].exif.DateTime;
            }

            if ((imageList[i].exif.GPSLatitude != null) && (imageList[i].exif.GPSLongitude != null)) {
                const coordinate = new Array;
                coordinate.push(imageList[i].exif.GPSLatitude);
                coordinate.push(imageList[i].exif.GPSLongitude);

                let geoPoint = new CoordinateObj();
                geoPoint.type = "Point";
                geoPoint.coordinates = coordinate;

                imageObj.Location = geoPoint;
            }
            else {
                imageObj.Location = "null";
            }
            
            imageObj.Author = author;
            imageObj.Project = name;
            imageObj.Copyright = copyright;
            imageObj.FileURL = imageList[i].uri;
            imageObj.ThumbnailURL = imageList[i].uri;
            imageObj.LocationName = location;

            DraftController.AddImage(imageObj, key);
        
            newImageEntitiesArray.push(imageObj);
        }

        setImageEntitiesArray(newImageEntitiesArray);
        setStepOneError(false);
    }
    
    const backStepOne = () => {
        setImageEntitiesArray(new Array);
    }

    // Submit
    const [currentStep, setCurrentStep] = useState(0);

    const submit = () => {
        onChangeName("");
        onChangeLocation("");
        onChangeCopyright("URA");
        setImageList(new Array);
        setImageEntitiesArray(new Array);

        setCurrentStep(0);
    }

    return (
        <View style={styles.container}>
            <Header />

            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={styles.innerContainer}>
                    <Text style={[Typography.h1, Typography.FontFamilyBold]}>Upload Media</Text>
                    <Text style={[Typography.h2, Typography.FontFamilyBold]}>Image&#40;s&#41; to upload</Text>
                
                    <ProgressSteps 
                        activeStepIconColor={Colors.BLUE} 
                        activeStepIconBorderColor={Colors.BLUE} 
                        activeStepNumColor={Colors.WHITE} 
                        activeLabelColor={Colors.BLACK} 
                        completedProgressBarColor={Colors.GRAY} 
                        completedStepIconColor={Colors.BLUE} 
                        completedLabelColor={Colors.BLACK}
                        activeStep={currentStep}>

                        <ProgressStep 
                            label="Image Upload" 
                            nextBtnStyle={nextBtnStyle} 
                            nextBtnTextStyle={nextBtnTextStyle}
                            onNext={() => stepOne()}
                            errors={stepOneError}
                            >
                            <StepOneScreen 
                                imageList={imageList} 
                                setImageList={setImageList}
                                name={name}
                                onChangeName={onChangeName}
                                location={location}
                                onChangeLocation={onChangeLocation}
                                copyright={copyright}
                                onChangeCopyright={onChangeCopyright}
                                />
                        </ProgressStep>

                        <ProgressStep 
                            label="Preview &amp; Update" 
                            nextBtnStyle={nextBtnStyle} 
                            nextBtnTextStyle={nextBtnTextStyle} 
                            previousBtnStyle={previousBtnStyle} 
                            previousBtnTextStyle={previousBtnTextStyle}
                            onPrevious={() => backStepOne()}
                            onNext={() => setCurrentStep(2)}
                            >
                            <StepTwoScreen
                                imageEntitiesArray={imageEntitiesArray}
                                setImageEntitiesArray={setImageEntitiesArray}
                                rowKey={rowKey}
                            />
                        </ProgressStep>

                        <ProgressStep 
                            label="Confirm Upload" 
                            nextBtnStyle={nextBtnStyle} 
                            nextBtnTextStyle={nextBtnTextStyle} 
                            previousBtnStyle={previousBtnStyle} 
                            previousBtnTextStyle={previousBtnTextStyle}
                            onSubmit={() => submit()}>
                            <StepThreeScreen 
                                imageEntitiesArray={imageEntitiesArray}
                                rowKey={rowKey}
                            />
                        </ProgressStep>
                    </ProgressSteps>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        margin: "5%"
    }
});

export default IndexScreen;