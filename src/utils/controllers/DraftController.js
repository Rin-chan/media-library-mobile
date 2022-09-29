import { Draft } from "../models";
import axios from "axios";

import appsettings from '../../../appsettings.json';

const email = "nian.ci@hotmail.com"

export async function CreateDraft(imageEntities) {
    let newDraft = new Draft();
    newDraft.Author = email;
    newDraft.ImageEntities = imageEntities;

    return newDraft
}