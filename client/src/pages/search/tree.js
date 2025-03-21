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
    const treeData = Array.isArray(data) ? data : Object.keys(data);
    console.log(treeData)
    return (
      <Styled.MenuForm>
        {treeData.map((key, i) => (
          <Styled.MenuView key={key}>
            <div>
              {getJSONDepth(data[key]) >= 1 && (
                <img
                  src={
                    topParent ? tree_parent : i === 0 ? sub_common : sub_first
                  }
                  alt="search"
                />
              )}

              {getJSONDepth(data[key]) < 1 ? (
                <a
                  rel="noreferrer"
                  // className={`${getJSONDepth(data[key]) === 1 && "last_node"}`}
                  href={`#${dataIndex} ${key}`}
                >
                  {key}
                </a>
              ) : (
                <a
                  rel="noreferrer"
                  // className={`${getJSONDepth(data[key]) === 1 && "last_node"}`}
                  href={`#${dataIndex} ${key}`}
                >
                  {key}
                </a>
              )}
            </div>
            {typeof data[key] === "object" &&
              Object.keys(data[key]).length > 0 && (
                <Tree
                  data={data[key]}
                  dataIndex={
                    topParent ? `${dataIndex} ${key}` : `${dataIndex} ${key}`
                  }
                />
              )}
          </Styled.MenuView>
        ))}
      </Styled.MenuForm>
    );
  };

  return visible ? (
    <Styled.ArrowWrapper>
      <MdKeyboardDoubleArrowRight
        color="black"
        size={40}
        cursor={"pointer"}
        onClick={() => {
          setVisible(!visible);
        }}
      />
    </Styled.ArrowWrapper>
  ) : (
    <Styled.TreeWrapper>
      <Styled.TreeContainer>
        {!visible && (
          <img
            src={hide}
            alt="hideImg"
            onClick={() => {
              setVisible(!visible);
            }}
          />
        )}
        <Tree data={data ? data : {}} dataIndex={""} topParent={true} />
      </Styled.TreeContainer>
    </Styled.TreeWrapper>
  );
}

export default React.memo(TreeView);
