import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { list } from "./list_State";
import * as S from "./style/TodoListStyled";

const TodoList = () => {
  let num: number = 0;
  let CopyListState: any = [];
  const [UpdateSwitch, setUpdateSwitch] = useState(false);
  const [listState, setListState] = useRecoilState(list);
  const [text, setText] = useState("");

  const PlusList = () => {
    let TestListState: any = [...listState];
    TestListState.push(text);
    setListState(TestListState);
    setText("");
  };

  const UpdateList = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (num == 0) {
      CopyListState = [...listState];
      ++num;
    }
    let ListIndex: any = e.target.name;
    ListIndex *= 1;
    CopyListState[ListIndex] = e.target.value;
  };

  const UpdateListCheck = () => {
    num = 0;
    setListState(CopyListState);
  };

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const DeleteLIstIndex = (e: any) => {
    let ListIndex: number = e.target.name;
    const ListFilter = listState.filter((x, index) => {
      if (index != ListIndex) {
        return x;
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
        {UpdateSwitch ? (
          <>
            <S.UpdateInput name={index} onChange={UpdateList}/>
            <S.UpdateCheck onClick={UpdateListCheck}>확인</S.UpdateCheck>
            <S.UpdateBack
              onClick={() => {
                setUpdateSwitch(false);
              }}
            >
              취소
            </S.UpdateBack>
          </>
        ) : (
          <S.UpdateButton
            onClick={() => {
              setUpdateSwitch(true);
            }}
          >
            수정
          </S.UpdateButton>
        )}
      </S.listElement>
    );
  });

  return (
    <S.MainPage>
      <S.Title>To do List</S.Title>
      <S.TextBox>
        <S.inputBox onChange={onChangeText} value={text} />
        <S.PlusButton onClick={PlusList}>추가</S.PlusButton>
      </S.TextBox>
      <S.UnNumberList>{listStateMap}</S.UnNumberList>
    </S.MainPage>
  );
};

export default TodoList;
