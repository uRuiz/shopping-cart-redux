import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { OompaLoompasList } from "./components/OompaLoompasList/OompaLoompasList";
import { OompaLoompaDetail } from "./components/OompaLoompaDetail/OompaLoompaDetail";
import { Header } from "./components/Header/Header";

function NotFound() {
  return (
    <div>
      <h2>Page Not Found</h2>
      <Link to="/">Go Back to Home</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<OompaLoompasList />} />
          <Route path="/:id" element={<OompaLoompaDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
