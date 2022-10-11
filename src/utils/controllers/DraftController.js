import { Draft } from "../models";
import axios from "axios";

import appsettings from '../../../appsettings.json';

const email = "nian.ci@hotmail.com"

async function CreateDraft() {
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

    await axios(urlString, {
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
    let urlString = appsettings.AppSettings.TableConnectionURL+`(PartitionKey='draft',RowKey='${rowkey}')`+appsettings.AppSettings.TableConnectionParams;

    let response = await axios.get(urlString);
    let draft = await response.data;

    let imageEntitiesArray = new Array;
    if (draft.ImageEntities != "") {
        for (let entity of JSON.parse(draft.ImageEntities)) {
            imageEntitiesArray.push(JSON.stringify(entity));
        }
    }

    imageEntitiesArray.push(JSON.stringify(req));

    const body = JSON.stringify({
        'PartitionKey': draft.PartitionKey,
        'RowKey': draft.RowKey,
        'UploadDate': draft.UploadDate,
        'Author' : draft.Author,
        'ImageEntities' : "[" + imageEntitiesArray.toString() + "]"
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

async function UpdateImage(req, rowkey, imageKey) {
    let urlString = appsettings.AppSettings.TableConnectionURL+`(PartitionKey='draft',RowKey='${rowkey}')`+appsettings.AppSettings.TableConnectionParams;

    let response = await axios.get(urlString);
    let draft = await response.data;

    let imageEntitiesArray = new Array;
    if (draft.ImageEntities == "") {
        return;
    }

    for (let entity of JSON.parse(draft.ImageEntities)) {
        if (entity.Id == imageKey) {
            entity.Project = req.Project;
            entity.LocationName = req.LocationName;
            entity.Copyright = req.Copyright;
            entity.Caption = req.Caption;
            entity.Tag = req.Tag;
            entity.AdditionalField = req.AdditionalField;
        }

        imageEntitiesArray.push(JSON.stringify(entity));
    }

    const body = JSON.stringify({
        'PartitionKey': draft.PartitionKey,
        'RowKey': draft.RowKey,
        'UploadDate': draft.UploadDate,
        'Author' : draft.Author,
        'ImageEntities' : "[" + imageEntitiesArray.toString() + "]"
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

async function DeleteImage(rowkey, imageKey) {
    let urlString = appsettings.AppSettings.TableConnectionURL+`(PartitionKey='draft',RowKey='${rowkey}')`+appsettings.AppSettings.TableConnectionParams;

    let response = await axios.get(urlString);
    let draft = await response.data;

    let imageEntitiesArray = new Array;
    if (draft.ImageEntities == "") {
        return;
    }

    for (let entity of JSON.parse(draft.ImageEntities)) {
        if (entity.Id != imageKey) {
            imageEntitiesArray.push(JSON.stringify(entity));
        }
    }

    const body = JSON.stringify({
        'PartitionKey': draft.PartitionKey,
        'RowKey': draft.RowKey,
        'UploadDate': draft.UploadDate,
        'Author' : draft.Author,
        'ImageEntities' : "[" + imageEntitiesArray.toString() + "]"
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

async function DeleteDraft(rowkey) {
    let urlString = appsettings.AppSettings.TableConnectionURL+`(PartitionKey='draft',RowKey='${rowkey}')`+appsettings.AppSettings.TableConnectionParams;

    let response = await axios.get(urlString);
    let draft = await response.data;

    if (draft.ImageEntities != "") {
        for await (let entity of JSON.parse(draft.ImageEntities)) {
            await DeleteImage(rowkey, entity.Id);
        }
    }

    axios(urlString, {
        method: "delete",
        headers: {
            "If-Match" : "*"
        }
    }).catch((error) => {
        console.log(error.response);
    });
}

export default {CreateDraft, AddImage, UpdateImage, DeleteImage, DeleteDraft};