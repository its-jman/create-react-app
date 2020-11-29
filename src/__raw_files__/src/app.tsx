import "normalize.css";
import 'src/styles/tailwind.output.css';
import "src/styles/reset.css";
import "src/styles/base.css";

import BaseLayout from "src/layouts/BaseLayout";
import Home from "src/pages/home";

const App = () => {
  return (
    <BaseLayout>
      <Home />
    </BaseLayout>
  );
};

export default App;
