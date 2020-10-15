import * as actionType from "../../Const/Actions"
export const setProjects = (listproject) => ({
    type: actionType.SET_PROJECTS,
    list : listproject
});

export const setSelectedProject = (project) => ({
    type: actionType.SET_SELECTED_PROJECT,
    selected:project
});

export const setLastAddedProject = (project) => ({
    type: actionType.SET_LAST_ADDED_PROJECT,
    lastAdded:project
});