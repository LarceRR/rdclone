if (location.hostname == 'localhost') {
    var link = 'http://remontdeco.back';
} else {
    var link = '${import.meta.env.VITE_EBV}';
}

export const API_LINK = link;

// queries
export const API_WORK_1 = '/work/1';
export const API_WORK_2 = '/work/2';
export const API_WORK_3 = '/work/3';
export const API_ADD_1 = '/work/1/add';
export const API_ADD_2 = '/work/2/add';
export const API_VIEW = '/work/3/view';
export const API_DELETE = '/work/3/delete';

export const API_BANNER_MAIN = '/banner/main';
export const API_BANNER = '/banner';
export const API_BANNER_ADD = '/banner/add';
export const API_BANNER_VIEW = '/banner/view';
export const API_BANNER_DELETE = '/banner/delete';

export const API_PROFESSION_MAIN = '/profession/main';
export const API_PROFESSION = '/profession';
export const API_PROFESSION_ADD = '/profession/add';
export const API_PROFESSION_VIEW = '/profession/view';
export const API_PROFESSION_DELETE = '/profession/delete';

export const API_CITY_MAIN = '/city/main';
export const API_CITY = '/city';
export const API_CITY_ADD = '/city/add';
export const API_CITY_VIEW = '/city/view';
export const API_CITY_DELETE = '/city/delete';
export const API_CITY_GET_NAME_BY_INDEX = '/city/getNameByIndex';

export const API_CATALOG_MAIN = '/catalog/main';
export const API_CATALOG = '/catalog';
export const API_CATALOG_ADD = '/catalog/add';
export const API_CATALOG_VIEW = '/catalog/view';
export const API_CATALOG_DELETE = '/catalog/delete';

export const API_REKLAMA_MAIN = '/reklama/main';
export const API_REKLAMA = '/reklama';
export const API_REKLAMA_ADD = '/reklama/add';
export const API_REKLAMA_VIEW = '/reklama/view';
export const API_REKLAMA_DELETE = '/reklama/delete';

export const API_CITY_GET_TITLE_BY_NAME = '/city/getTitleByName';

export const API_USERS = '/admin/enter';
export const API_USERS_GET_TOKEN = '/admin/getToken';
