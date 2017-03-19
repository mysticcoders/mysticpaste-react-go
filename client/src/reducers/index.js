 import { combineReducers } from 'redux';
 import {routerReducer} from 'react-router-redux';
 import PasteReducer from './pasteReducer';

 const rootReducer = combineReducers({
   pastes: PasteReducer,
   routing: routerReducer,
 });

 export default rootReducer;
