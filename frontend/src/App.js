import { Routes, Route } from "react-router-dom";
import {Formuario, NotFoundPage} from "./pages/index.js"




function App() {

  return (
    <div>
      <Routes>
        {/* <Route path="/" element={ <Formuario/> } /> */}
        <Route path="/:id" element={<Formuario />} />
        <Route path="*" element={ <NotFoundPage /> } />
      </Routes>
    </div>
  )

}

export default App;
