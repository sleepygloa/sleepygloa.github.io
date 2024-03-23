import styled from "styled-components";

// 사이드바 전체를 감싸는 div
export const SbContainer = styled.div`
  height: auto;
  min-height: 100vh;
  font-size: 15px;
  position: fixed;
  padding-top:50px;
  padding-left:10px;
  overflow-y:auto;
  z-index:998;
`

// SbItem에서 하위메뉴들을 묶어줄 div
export const SbSub = styled.div`
  overflow: hidden;
  max-height: ${props => props.isOpen ? "100%" : "0"};
`;

// 메뉴명을 보여줄 div
export const SbTitle = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${props => (props.depth * 20)}px;
  height: 25px;
  &:hover {
    background-color: #f6f6f2;
    cursor: pointer;
    border-right: solid 5px;
  }
`;

// 제일 하위메뉴에서 클릭할 Link 
// export const SbLink = styled(Link)`
export const SbLink = styled.div`
  color: inherit;
  text-decoration: inherit;
  display: flex;
`;