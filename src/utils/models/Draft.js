import uuid from 'react-native-uuid';
import moment from 'moment';

export default function Draft() {
    let draft = new Object();
    draft.PartitionKey = "draft";
    draft.RowKey = uuid.v4();
    draft.UploadDate = moment().format("YYYY:MM:DD hh:mm:ss");
    draft.Author = "";
    draft.ImageEntities = "";

    return draft
}