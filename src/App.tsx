import React from "react";
import ProjectSideBar from "./components/ProjectSideBar";
import NoProjectSelected from "./components/NoProjectSelected";
// import NewProject from "./components/NewProject";

const App: React.FC = () => {
  return (
    <div className=" h-screen my-8 flex gap-8 font-mono">
      <ProjectSideBar onStartAddProject={}/>
      <NoProjectSelected/>
      {/* <NewProject/> */}
    </div>
  );
};

export default App;
