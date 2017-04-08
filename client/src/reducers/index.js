 import { combineReducers } from 'redux';
 import {routerReducer} from 'react-router-redux';
 import PasteReducer from './pasteReducer';
 import AuthReducer from './authReducer';

 const rootReducer = combineReducers({
   pastes: PasteReducer,
   auth: AuthReducer,
   routing: routerReducer,
 });

 export default rootReducer;
