import { useRecoilState } from "recoil";
import { completeSortState, completeSortNameState, completeSegmentState, completeSegmentNameState } from "@/utils/HeaderAtom";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Palette } from "@/styles/Palette";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

//value로 영어 추가 하기
const sortList = [
  {
    id: 0,
    category: "최신순",
    value: "current",
  },
  {
    id: 1,
    category: "인기순",
    value: "popular",
  },
];

const contentList = [
  {
    id: 0,
    category: "골라조",
    value: "total",
  },
  {
    id: 1,
    category: "뭐사조",
    value: "buy",
  },
  {
    id: 2,
    category: "어디가조",
    value: "where",
  },
  {
    id: 3,
    category: "뭐하조",
    value: "what",
  },
  {
    id: 4,
    category: "뭐먹조",
    value: "food",
  },
  {
    id: 5,
    category: "뭐보조",
    value: "movie",
  },
  {
    id: 6,
    category: "들어조",
    value: "listen",
  },
  {
    id: 7,
    category: "기타",
    value: "etc",
  },
];

export const CompleteCategoryBox = () => {
  const [sort, setSort] = useRecoilState(completeSortState);
  const [sortName, setSortName] = useRecoilState(completeSortNameState);
  const [content, setContent] = useRecoilState(completeSegmentState);
  const [contentName, setContentName] = useRecoilState(completeSegmentNameState);

  const [drops, setDrops] = useState({ sort: false, content: false });

  const sortDropdownRef = useRef(null);
  const contentDropdownRef = useRef(null);

  const toggleDropdown = (dropdownType) => {
    if (dropdownType === "sort") {
      setDrops({ sort: !drops.sort, content: drops.content });
    } else if (dropdownType === "content") {
      setDrops({ sort: drops.sort, content: !drops.content });
    }
  };

  useEffect(() => {

  }, [sort, content])
  // recoil 사용: 클릭된 값을 atom에 넣어주기
  const handleSort = (num) => {
    setSort(sortList[num].value);
    setSortName(sortList[num].category);
    toggleDropdown("sort");
    console.log(sort);
  };

  const handleContent = (num) => {
    setContent(contentList[num].value);
    setContentName(contentList[num].category);
    console.log(contentList[num].value);
    toggleDropdown("content");
    console.log(content);
    console.log(contentName);
    // window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target) &&
        contentDropdownRef.current &&
        !contentDropdownRef.current.contains(event.target)
      ) {
        setDrops({ sort: false, content: false });
      } else if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target)
      ) {
        setDrops({ sort: false, content: drops.content });
      } else if (
        contentDropdownRef.current &&
        !contentDropdownRef.current.contains(event.target)
      ) {
        setDrops({ sort: drops.sort, content: false });
      }
    };
    // Add
    document.addEventListener("mousedown", handleClickOutside);

    // Remove
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drops.sort, drops.content]);

  return (
    <div style={{ paddingLeft: 20 }}>
      {/* 정렬 카테고리 */}
      <Category className="dropdown" ref={sortDropdownRef}>
        <MainButton onClick={() => toggleDropdown("sort")}>
          {sortName}
          <ExpandMoreIcon style={{ fontSize: 30 }} />
        </MainButton>
        {drops.sort ? (
          <Ul>
            {sortList.map((item) => (
              <Li key={item.id} className="item">
                <StyledButton>
                  <div
                    onClick={() => handleSort(item.id)}
                    style={
                      item.value === sort
                        ? { color: Palette.font_blue, fontWeight: "bolder" }
                        : null
                    }
                  >
                    {item.category}
                  </div>
                </StyledButton>
              </Li>
            ))}
          </Ul>
        ) : null}
      </Category>
      {/* 컨텐츠 카테고리 */}
      <Category className="dropdown" ref={contentDropdownRef}>
        <MainButton onClick={() => toggleDropdown("content")}>
          {contentName}
          <ExpandMoreIcon style={{ fontSize: 30 }} />
        </MainButton>
        {drops.content ? (
          <Ul>
            {contentList.map((item) => (
              <Li key={item.id} className="item">
                <StyledButton>
                  <div
                    onClick={() => handleContent(item.id)}
                    style={
                      item.value === content
                        ? { color: Palette.font_blue, fontWeight: "bolder" }
                        : null
                    }
                  >
                    {item.category}
                  </div>
                </StyledButton>
              </Li>
            ))}
          </Ul>
        ) : null}
      </Category>
    </div>
  );
};

const Category = styled.div`
  display: inline-block;
  position: relative;
  margin-right: 10px;
`;

const MainButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #fff;
  color: ${Palette.font_gray};
  border-radius: 10px;
  border-width: 0px;
  padding: 0px;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    background-color: ${Palette.percent_gray}
  }
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #fff;
  color: ${Palette.font_gray};
  padding: 5px;
  width: 4.2rem;
  height: 32px;
  border-width: 0px;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    background-color: ${Palette.percent_gray}
  }
`;

const Ul = styled.ul`
  top: 34px;
  position: absolute;
  list-style: none;
  padding-left: 0;
  padding-bottom: 0;
  border: 1px ${Palette.main_gray} solid;
  border-radius: 2px;
  margin: 0;
  width: 4.2rem;
  background-color: #fff;
`;

const Li = styled.li`
  margin: 0;
  &:hover {
    background-color: ${Palette.percent_gray}
  }
`;
