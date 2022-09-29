import uuid from 'react-native-uuid';

export default function Draft() {
    let draft = new Object();
    draft.PartitionKey = "draft";
    draft.RowKey = uuid.v4();
    draft.UploadDate = Date.now();
    draft.Author = "";
    draft.ImageEntities = "";

    return draft
}