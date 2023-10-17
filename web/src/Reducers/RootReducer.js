import { persistReducer } from "redux-persist"; // 추가
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
};

const initialState = {
    picList: [],
    selPicList: [],
    selBg: 1,
    selFilter: 1,
};

const rootReducer = (state = initialState, action) => {
    let temp = { ...state };
    switch (action.type) {
        case "SET_PIC_LIST":
            temp.picList = action.payload;
            return temp;
        case "CLEAR_PIC_LIST":
            temp.picList = [];
            return temp;
        case "SET_SEL_PIC_LIST":
            temp.selPicList = action.payload;
            return temp;
        case "CLEAR_SEL_PIC_LIST":
            temp.selPicList = [];
            return temp;
        case "SET_SEL_BG":
            temp.selBg = action.payload;
            return temp;
        case "SET_SEL_FILTER":
            temp.selFilter = action.payload;
            return temp;
        case "SET_LOADING_END":
            temp.isLoading = false;
            return temp;
        default:
            return state;
    }
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
