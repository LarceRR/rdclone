import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { useLayoutEffect, useState } from 'react';
import { storageDB } from '../database/firebase.js';

//получаем видео из storage
export const useGetVideo = (advId) => {
    const databaseUrl = `/advertising/${advId}/videos`;
    //for files from database
    const [data, setData] = useState(null);
    //ref for database
    const listRef = ref(storageDB, databaseUrl);

    useLayoutEffect(() => {
        setData(null);

        listAll(listRef)
            .then((res) => {
                res.items.forEach((itemRef) => {
                    getDownloadURL(itemRef).then((elemLink) =>
                        setData(elemLink),
                    );
                });
            })
            .catch(() => setData(null));

        //eslint-disable-next-line
    }, []);

    return data;
};

