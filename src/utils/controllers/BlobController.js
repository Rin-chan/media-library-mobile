import axios from "axios";

import appsettings from '../../../appsettings.json';

async function CreateBlob(blob) {
    console.log("CREATEBLOB");
    console.log(blob.key)
    let blobName = blob.key;
    let urlString = appsettings.AppSettings.MediaStorageURL+"/"+blobName+appsettings.AppSettings.MediaStorageParams;

    const data = new FormData();

    data.append('photo', {
        name: blob.key,
        type: "image/jpeg",
        uri: Platform.OS === 'ios' ? blob.uri.replace('file://', '') : blob.uri,
    });
  
    axios(urlString, {
        method: "PUT",
        headers: {
            "Content-Type": "multipart/form-data",
            "x-ms-blob-type": "BlockBlob"
        },
        data: data
    }).catch((error) => {
        console.log(error.response);
    });
}

async function DeleteBlob() {
    let blobName = "";
    let urlString = appsettings.AppSettings.MediaStorageURL+"/"+blobName+appsettings.AppSettings.MediaStorageParams;
}

export default {CreateBlob, DeleteBlob};