import React from "react";
import ProjectSideBar from "./components/ProjectSideBar";
import NoProjectSelected from "./components/NoProjectSelected";

const App: React.FC = () => {
  return (
    <div className=" h-screen my-8 flex gap-8 font-mono">
      <ProjectSideBar />
      <NoProjectSelected/>
    </div>
  );
};

export default App;
