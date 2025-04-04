import { useDispatch, useSelector } from "react-redux"
import { selectGroup } from "../store/selectedGroupNodesSlice";
import { useEffect } from "react";

const useSelectedGroup = (selectedGroup, setSelectedGroup) => {
    const dispatch = useDispatch();
    const {groups, nodes} = useSelector(state => state.groupsNodes);

    useEffect(() => {
        if (selectedGroup === 'Все') {
            dispatch(selectGroup(Object.keys(nodes)));
            return;
        }

        const foundGroup = Object.keys(groups).find(groupId => 
            groups[groupId]['groupName'] === selectedGroup
        );
    
        if (foundGroup) {
            dispatch(selectGroup(groups[foundGroup]['nodeId']));
        } else {
            setSelectedGroup('Все');
        }
    }, [selectedGroup, groups, dispatch])
}

export default useSelectedGroup;