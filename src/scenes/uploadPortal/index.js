import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import { Header } from '../../components';
import { Typography, Colors } from '../../styles';
import { ImageEntity, CoordinateObj } from '../../utils/models';

import StepOneScreen from './StepOneScreen';
import StepTwoScreen from './StepTwoScreen';
import StepThreeScreen from './StepThreeScreen';
import DraftController from '../../utils/controllers/DraftController';
import BlobController from '../../utils/controllers/BlobController';

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
    const [currentStep, setCurrentStep] = useState(0);

    // Step 1
    const [imageList, setImageList] = useState(Array);
    const [name, onChangeName] = useState("");
    const [location, onChangeLocation] = useState("");
    const [copyright, onChangeCopyright] = useState("URA");
    const [stepOneError, setStepOneError] = useState(true);
    const [imageEntitiesArray, setImageEntitiesArray] = useState(Array);

    // Placeholder
    const author = "nian.ci@hotmail.com";

    const stepOne = async() => {
        if (name == "" || location == "") {
            setStepOneError(true);
            return;
        }

        if (imageList.length == 0) {
            setStepOneError(true);
            return;
        }

        const key = await DraftController.CreateDraft();
        setRowKey(key);
        
        let newImageEntitiesArray = new Array;

        for await (let i of imageList) {
            await BlobController.CreateBlob(i);

            let imageObj = new ImageEntity();
            imageObj.Id = i.key;
            imageObj.Name = i.key;
            
            if (i.exif.DateTime != null) {
                imageObj.DateTaken = i.exif.DateTime;
            }

            if ((i.exif.GPSLatitude != null) && (i.exif.GPSLongitude != null)) {
                const coordinate = new Array;
                coordinate.push(i.exif.GPSLatitude);
                coordinate.push(i.exif.GPSLongitude);

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
            imageObj.FileURL = i.uri;
            imageObj.ThumbnailURL = i.uri;
            imageObj.LocationName = location;

            await DraftController.AddImage(imageObj, key);

            newImageEntitiesArray.push(imageObj);
        }

        setImageEntitiesArray(newImageEntitiesArray);
        setStepOneError(false);
    }
    
    const backStepOne = () => {
        setRowKey("");
        setImageEntitiesArray(new Array);

        setCurrentStep(0);
    }

    const submit = () => {
        onChangeName("");
        onChangeLocation("");
        onChangeCopyright("URA");
        setImageList(new Array);
        setRowKey("");
        setImageEntitiesArray(new Array);

        setCurrentStep(0);
    }

    useEffect(() => {
        const deleteDraftFunc = async () => {
            await DraftController.DeleteDraft(rowKey);
        }

        if ((rowKey != "") && (imageEntitiesArray.length == 0)) {
            deleteDraftFunc();
            backStepOne();
        }
    }, [imageEntitiesArray])

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
                                setCurrentStep={setCurrentStep}
                            />
                        </ProgressStep>

                        <ProgressStep 
                            label="Confirm Upload" 
                            nextBtnStyle={nextBtnStyle} 
                            nextBtnTextStyle={nextBtnTextStyle} 
                            previousBtnStyle={previousBtnStyle} 
                            previousBtnTextStyle={previousBtnTextStyle}
                            onPrevious={() => setCurrentStep(1)}
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