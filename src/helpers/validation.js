export function getElementIfNotOnList(list, element) {
    if (list.length && findElement(list, element)) {
        alert(`${element.name} has been added`);
    } else {
        return element;
    }
}

function findElement(list, element) {
    return list.find(listElement => listElement.name === element.name);
}

export function validateSchedule(list, element) {
    if (list.length && hasScheduleBeenAdded(list, element)) {
        alert(`Schedule for ${element.group} on ${element.date} has been created`);
    } else {
        return element;
    }
}

function hasScheduleBeenAdded(list, element) {
    return list.find(listElement => listElement.group === element.group && listElement.date === element.date);
}