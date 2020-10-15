import * as actionType from "../../Const/Actions"
export const setSprints = (listsprint) => ({
    type: actionType.SET_SPRINTS,
    list : listsprint
});

export const setLastAddedSprint = (sprint) => ({
    type: actionType.SET_LAST_ADDED_SPRINT,
    lastAdded : sprint
});

