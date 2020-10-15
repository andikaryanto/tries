import { combineReducers } from 'redux'
import mobile from '../Reducers/Mobile';
import auth from '../Reducers/Auth';
import screen from '../Reducers/Screen';
import project from '../Reducers/Modules/Projects';
import task from '../Reducers/Modules/Tasks';
import sprint from '../Reducers/Modules/Sprints';

export default combineReducers({
    mobile:mobile,
    auth:auth,
    screen:screen,
    project:project,
    sprint:sprint,
    task:task,
    

});
