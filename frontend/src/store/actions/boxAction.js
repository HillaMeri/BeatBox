import { boxService } from "../../services/boxService"
var gTimeoutId;

export function loadBoxes(filterBy) {
  return async dispatch => {
    const boxes = await boxService.query(filterBy);
    dispatch({ type: 'SET_BOXES', boxes })
  };
}

export function loadBox(boxId) {
  return async dispatch => {
    const box = await boxService.getById(boxId);
    dispatch({ type: 'SET_BOX', box })
  };
}

export function saveBox(box) {
  return async dispatch => {
    const actionType = box._id ? 'EDIT_BOX' : 'ADD_BOX';
    const newBox = await boxService.save(box);
    dispatch({ type: actionType, box: newBox })
    // dispatch({ type: 'NOTIFY', isShown: true, msg: 'Changes Saved!' })
    return newBox;
  };
}

export function removeBox(boxId) {
  return async dispatch => {
    await boxService.remove(boxId)
    dispatch({ type: 'REMOVE_BOX', boxId })
  };
}

export function notify(txt) {
  return dispatch => {
    dispatch({ type: 'NOTIFY', isShown: true, msg: txt })
  }
}

export function closeNotification() {
  return dispatch => {
    dispatch({ type: 'NOTIFY', isShown: false, msg: '' })
  }
}