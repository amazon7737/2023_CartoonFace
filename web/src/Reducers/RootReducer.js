import { persistReducer } from "redux-persist"; // 추가
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
};

const initialState = {
    picList: [],
    selPicList: [],
    selBackground: "",
    selFilter: "",
};

const rootReducer = (state = initialState, action) => {
    let temp = { ...state };
    switch (action.type) {
        case "ADD_PIC":
            temp.picList.push(action.payload);
            return temp;
        case "CLEAR_PIC_LIST":
            temp.userData = "";
            return temp;
        case "SET_LOADING_START":
            temp.isLoading = true;
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
