import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { list } from "./list_State";
import * as S from "./style/TodoListStyled";

const TodoList = () => {
  const [listState, setListState] = useRecoilState(list);
  const [text, setText] = useState("");

  const PlusList = () => {
    let TestListState: any = [...listState];
    TestListState.push(text);
    setListState(TestListState);
  };

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const DeleteLIstIndex = (e: any) => {
    let ListIndex = e.target.name;
    const ListFilter = listState.filter((x, index) => {
      if (index != ListIndex) {
        return(x)
      }
    });
    setListState(ListFilter);
  };

  const listStateMap = listState.map((x, index) => {
    return (
      <S.listElement name={index}>
        {x}
        <S.DeleteButton name={index} onClick={DeleteLIstIndex}>
          삭제
        </S.DeleteButton>
      </S.listElement>
    );
  });

  return (
    <S.MainPage>
      <S.Title>To do LSist</S.Title>
      <S.TextBox>
        <S.inputBox onChange={onChangeText} />
        <S.PlusButton onClick={PlusList}>추가</S.PlusButton>
      </S.TextBox>
      <S.UnNumberList>{listStateMap}</S.UnNumberList>
    </S.MainPage>
  );
};

export default TodoList;
