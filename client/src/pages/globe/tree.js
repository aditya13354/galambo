import React from "react";
import tree_parent from "../../assets/tree_parent.png";
import sub_first from "../../assets/sub_first.png";
import sub_common from "../../assets/sub_common.png";
import hide from "../../assets/Hide.png";
import * as Styled from "./style";
import { getJSONDepth } from "../../utils/getJSONDepth";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

function TreeView({ data, current, visible, setVisible }) {
  const Tree = ({ data, dataIndex, topParent = false }) => {
    // Ensure data is defined and is either an array or object
    if (!data || (typeof data !== "object" && !Array.isArray(data))) {
      return null; // Return early if data is invalid
    }

    // Convert object to an array of keys, fallback to empty array if data is null/undefined
    const treeData = Array.isArray(data) ? data : Object.keys(data || {});

    return (
      <Styled.MenuForm>
        {treeData.map((keyOrItem, i) => {
          const isObject =
            !Array.isArray(data) &&
            typeof data[keyOrItem] === "object" &&
            data[keyOrItem] !== null;
          const isArrayOfObjects =
            Array.isArray(data) && typeof keyOrItem === "object";

          return (
            <Styled.MenuView key={i}>
              <div>
                {isObject && getJSONDepth(data[keyOrItem]) >= 1 && (
                  <img
                    src={
                      topParent ? tree_parent : i === 0 ? sub_common : sub_first
                    }
                    alt="node"
                  />
                )}

                {isArrayOfObjects ? (
                  <>
                    {keyOrItem.contextLink && (
                      <a
                        href={keyOrItem.contextLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {keyOrItem.title}
                      </a>
                    )}
                  </>
                ) : (
                  <a rel="noreferrer" href={`#${dataIndex} ${keyOrItem}`}>
                    {keyOrItem}
                  </a>
                )}
              </div>

              {/* Recursively render nested data */}
              {isObject &&
                Object.keys(data[keyOrItem]).length > 0 &&
                !Array.isArray(data[keyOrItem]) && (
                  <Tree
                    data={data[keyOrItem]}
                    dataIndex={`${dataIndex} ${keyOrItem}`}
                  />
                )}
            </Styled.MenuView>
          );
        })}
      </Styled.MenuForm>
    );
  };

  return visible ? (
    <Styled.ArrowWrapper>
      <MdKeyboardDoubleArrowRight
        color="black"
        size={40}
        cursor={"pointer"}
        onClick={() => setVisible(!visible)}
      />
    </Styled.ArrowWrapper>
  ) : (
    <Styled.TreeWrapper>
      <Styled.TreeContainer>
        {!visible && (
          <img src={hide} alt="hide" onClick={() => setVisible(!visible)} />
        )}
        <div style={{ height: `calc(100vh - 250px)`, overflowY: `scroll` }}>
          <Tree data={data || {}} dataIndex={""} topParent={true} />
        </div>
      </Styled.TreeContainer>
    </Styled.TreeWrapper>
  );
}

export default React.memo(TreeView);
