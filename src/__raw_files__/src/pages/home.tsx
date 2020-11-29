import * as S from "./_home.styled";

const Home = () => {
  return (
    <S.Wrapper className="h-full flex flex-col">
      <S.GlobalStyle />

      <S.Header />

      <div className="flex-grow flex">
        <S.Sidebar />
        <div className="flex-grow">
          <S.MainContainer className="text-white py-24 text-center text-6xl font-bold">
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
