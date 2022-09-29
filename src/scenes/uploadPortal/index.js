import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import { Header } from '../../components';
import { Typography, Colors } from '../../styles';
import { CreateDraft } from '../../utils/controllers/DraftController';

import StepOneScreen from './StepOneScreen';
import StepTwoScreen from './StepTwoScreen';

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
    // Step 1
    const [imageList, setImageList] = useState(Array);
    const [name, onChangeName] = useState("");
    const [location, onChangeLocation] = useState("");
    const [copyright, onChangeCopyright] = useState("URA");
    const [stepOneError, setStepOneError] = useState(false);

    const stepOne = () => {
        /*
        if (name == "" || location == "") {
            setStepOneError(true);
            return;
        }

        if (imageList.length == 0) {
            setStepOneError(true);
            return;
        }
        */

        setStepOneError(false);
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
                        completedLabelColor={Colors.BLACK}>

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
                            previousBtnTextStyle={previousBtnTextStyle}>
                            <StepTwoScreen />
                        </ProgressStep>

                        <ProgressStep 
                            label="Confirm Upload" 
                            nextBtnStyle={nextBtnStyle} 
                            nextBtnTextStyle={nextBtnTextStyle} 
                            previousBtnStyle={previousBtnStyle} 
                            previousBtnTextStyle={previousBtnTextStyle}>
                            <View style={{ alignItems: 'center' }}>
                                <Text>This is the content within step 3!</Text>
                            </View>
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