import { ref, uploadBytesResumable } from 'firebase/storage';
import { storageDB } from '../database/firebase.js';

export const handleAddVideo = (video, advId) => {
    const fileRef = ref(storageDB, `/advertising/${advId}/videos/${video.name}`);
    return uploadBytesResumable(fileRef, video);
};

