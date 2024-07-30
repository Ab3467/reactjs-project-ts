import React from "react";
import ProjectSideBar from "./components/ProjectSideBar";

const App: React.FC = () => {
  return (
    <div className=" h-screen my-8 flex gap-8 font-mono">
      <ProjectSideBar />
    </div>
  );
};

export default App;
