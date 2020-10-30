import React from "react";

import * as S from "./_home.styled";
import { gcn } from "src/utils";

const Home = () => {
  return (
    <S.Wrapper className={"h-full flex flex-col"}>
      <S.GlobalStyle />

      <S.Header />

      <div className={"flex-grow flex"}>
        <S.Sidebar />
        <div className={"flex-grow"}>
          <S.MainContainer className={gcn("text-white py-24 text-center text-6xl font-bold")}>
            Hello, World!
          </S.MainContainer>
        </div>
        <S.Sidebar />
      </div>

      <S.Header />

    </S.Wrapper>
  );
};

export default Home;
