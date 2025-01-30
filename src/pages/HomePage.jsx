import React, { useState, useEffect } from 'react';
import ProjectComps from './projectComps/ProjectComps';
import TeamComponent from './teamComps/TeamComponent';
import TaskComponent from './taskComponent/TaskComponent';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const currentUser = useSelector((state) => state?.user?.currentUser)
  console.log(currentUser)
  return (
    <>
    <main className='col-md-8'>
      <div className='homePageContainer my-3'>
          <h2>Welcome To Project Gestionando</h2>
          <p>{currentUser ? currentUser.fullName : "User"}</p>
          <ProjectComps />
          <TeamComponent />
          <TaskComponent />
      </div>
    </main>
    </>
  );
};

export default HomePage;