import uuid from 'react-native-uuid';
import moment from 'moment';

export default function ImageEntity() {
    let imageEntity = new Object();
    //imageEntity.PartitionKey = Date.now();
    //imageEntity.RowKey = uuid.v4();

    imageEntity.Id = "";
    imageEntity.Name = "";
    imageEntity.DateTaken = moment().format("YYYY:MM:DD hh:mm:ss");
    imageEntity.Location = "";
    imageEntity.Tag = "";
    imageEntity.Caption = "";
    imageEntity.Author = "";
    imageEntity.UploadDate = moment().format("YYYY:MM:DD hh:mm:ss");
    imageEntity.FileURL = "";
    imageEntity.ThumbnailURL = "";
    imageEntity.Project = "";
    imageEntity.Event = "";
    imageEntity.LocationName = "";
    imageEntity.Copyright = "";
    imageEntity.AdditionalField = new Array;

    return imageEntity;
}