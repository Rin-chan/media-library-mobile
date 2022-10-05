import { Draft } from "../models";
import axios from "axios";

import appsettings from '../../../appsettings.json';

const email = "nian.ci@hotmail.com"

function CreateDraft() {
    let newDraft = new Draft();
    newDraft.Author = email;
    newDraft.ImageEntities = new Array;

    let urlString = appsettings.AppSettings.TableConnectionURL+appsettings.AppSettings.TableConnectionParams;

    const body = JSON.stringify({
        'PartitionKey': newDraft.PartitionKey,
        'RowKey': newDraft.RowKey,
        'UploadDate': newDraft.UploadDate,
        'Author' : newDraft.Author,
        'ImageEntities' : newDraft.ImageEntities.toString()
    });

    axios(urlString, {
        method: "post",
        headers: {
            "Accept": "application/json",
            "Content-Type" : "application/json"
        },
        data: JSON.parse(body)
    }).catch((error) => {
        console.log(error.response);
    });

    return newDraft.RowKey;
}

async function AddImage(req, rowkey) {
    let draft = "";
    let urlString = appsettings.AppSettings.TableConnectionURL+`(PartitionKey='draft',RowKey='${rowkey}')`+appsettings.AppSettings.TableConnectionParams;

    let response = await axios.get(urlString);
    draft = await response.data;

    let imageEntitiesArray = new Array;
    if (draft.ImageEntities != "") {
        imageEntitiesArray = Array.from(draft.ImageEntities);
    }

    console.log(imageEntitiesArray);

    imageEntitiesArray.push(JSON.stringify(req));
    
    console.log(imageEntitiesArray);

    const body = JSON.stringify({
        'PartitionKey': draft.PartitionKey,
        'RowKey': draft.RowKey,
        'UploadDate': draft.UploadDate,
        'Author' : draft.Author,
        'ImageEntities' : draft.ImageEntities.toString()
    });

    axios(urlString, {
        method: "put",
        headers: {
            "Accept": "application/json",
            "Content-Type" : "application/json"
        },
        data: JSON.parse(body)
    }).catch((error) => {
        console.log(error.response);
    });
}

export default {CreateDraft, AddImage};