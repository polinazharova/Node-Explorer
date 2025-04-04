import "./NodesSwitcher.styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { setIndex, nullIndex } from "../../../model/store/firstShownIndexSlice";
import { useEffect } from "react";

const NodesSwitcher = () => {
  const dispatch = useDispatch();

  const { nodes } = useSelector((state) => state.groupsNodes);
  const { firstShownIndex } = useSelector((state) => state.firstShownIndex);
  const { selectedGroupNodes } = useSelector(
    (state) => state.selectedGroupNodes,
  );

  useEffect(() => {
    dispatch(nullIndex());
  }, [selectedGroupNodes, nodes]);

  const handleNextClick = () => {
    dispatch(
      setIndex(
        firstShownIndex + 5 >= selectedGroupNodes.length
          ? firstShownIndex
          : firstShownIndex + 5,
      ),
    );
  };
  const handlePrevClick = () => {
    dispatch(setIndex(firstShownIndex - 5 <= 0 ? 0 : firstShownIndex - 5));
  };

  return (
    <div className="main__nodes-switcher">
      <span
        className={`main__nodes-switcher-prev ${!firstShownIndex ? "main__nodes-switcher_disabled" : ""}`}
        onClick={handlePrevClick}
      >
        Пред.
      </span>
      <span
        className={`main__nodes-switcher-next ${firstShownIndex + 5 >= selectedGroupNodes.length ? "main__nodes-switcher_disabled" : ""}`}
        onClick={handleNextClick}
      >
        След.
      </span>
    </div>
  );
};

export default NodesSwitcher;
