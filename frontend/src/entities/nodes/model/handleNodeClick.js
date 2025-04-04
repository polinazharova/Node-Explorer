import { selectNode } from "./store/selectedNodeSlice"

const handleNodeClick = (event, dispatch, nodes, nodeId) => {
    event.stopPropagation();

    const node = event.target.closest('.main__node');
    const selectedClass = 'main__node_selected';

    if (node.classList.contains(selectedClass)) {
        node.classList.remove(selectedClass);

        dispatch(selectNode(null));
        return;
    }

    const prev = document.getElementsByClassName(selectedClass)[0];
    if (prev) {
        prev.classList.remove(selectedClass);
    }

    node.classList.add(selectedClass);
    dispatch(selectNode({'nodeId' : nodeId, ...structuredClone(nodes[nodeId])}));
};

export default handleNodeClick;