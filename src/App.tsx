import { useState } from "react";
import { Button } from "./components/ui/button";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <Button
              type="button"
              onClick={() => setCount((count) => count + 1)}
            >
              Count is {count}
            </Button>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
