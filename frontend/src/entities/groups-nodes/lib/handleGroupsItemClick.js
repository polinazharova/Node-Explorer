const handleGroupsItemClick = (event, setSelectedGroup) => {
    const prevSelected = document.getElementsByClassName('main__groups-list-item_selected')[0];
    if (prevSelected) {
        prevSelected.classList.remove('main__groups-list-item_selected');
    }
    event.target.classList.toggle('main__groups-list-item_selected');

    const groupName = event.target.textContent;
    setSelectedGroup(groupName);
}

export default handleGroupsItemClick;