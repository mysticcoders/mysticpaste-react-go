 import { combineReducers } from 'redux';
 import {routerReducer} from 'react-router-redux';
 import PasteReducer from '../ducks/pastes';
 import AuthReducer from '../ducks/auths';

 const rootReducer = combineReducers({
   pastes: PasteReducer,
   auth: AuthReducer,
   routing: routerReducer,
 });

 export default rootReducer;
