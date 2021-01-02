import "normalize.css";
import "src/styles/tailwind.output.css";
import "src/styles/reset.css";

import { memo } from "react";

import Helmet from "react-helmet";
import packageJson from "src/../package.json";
import Home from "src/pages/home";

const siteName = packageJson.name;
const App = memo(() => {
  return (
    <>
      <Helmet titleTemplate={`%s | ${siteName}`} defaultTitle={siteName} defer={false} />
      <Home />
    </>
  );
});

export default App;
