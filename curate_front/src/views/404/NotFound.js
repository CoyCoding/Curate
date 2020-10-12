import React, { useEffect, useState } from 'react';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import './Dashboard.scss';
// import GamesDashboard from './Tabs/GamesDashboard'
// import ConsoleDashboard from './Tabs/ConsoleDashboard'
// import GenreDashboard from './Tabs/GenreDashboard'
//import Popups from './Popups/Popups'
// import findTabIndex from './Tabs/Utils/TabMap';
//
import { withRouter } from 'react-router-dom';
// import queryString from 'query-string';
import axios from 'axios';

function NotFound(props){
  return (
    <>Not Found</>
  )

}


export default withRouter(NotFound);
