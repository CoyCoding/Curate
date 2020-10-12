import React from 'react';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import './Dashboard.scss';
// import GamesDashboard from './Tabs/GamesDashboard'
// import ConsoleDashboard from './Tabs/ConsoleDashboard'
// import GenreDashboard from './Tabs/GenreDashboard'
//import Popups from './Popups/Popups'
// import findTabIndex from './Tabs/Utils/TabMap';
import FAQLoading from './../FaqPage/components/FAQLoading';
//
import { withRouter } from 'react-router-dom';
// import queryString from 'query-string';
import EnhancedTableBody from './EnhancedTableBody';

import axios from 'axios';

function Dashboard(props){

  return (
    <>
      {props.faqs ? <EnhancedTableBody {...props}/> : <FAQLoading/>}
    </>
  )

}


export default Dashboard;
