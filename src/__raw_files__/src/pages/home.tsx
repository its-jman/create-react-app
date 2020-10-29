import React from "react";

import * as S from "./_home.styled";
import { gcn } from "src/utils";

const Home = () => {
  return (
    <S.Wrapper className={gcn("text-white py-24 text-center text-6xl font-bold")}>
      Hello, World!
    </S.Wrapper>
  );
};

export default Home;
