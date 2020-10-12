import React from 'react';
import FAQLoading from './../FaqPage/components/FAQLoading';
import EnhancedTableBody from './EnhancedTableBody';

function Dashboard(props){

  return (
    <>
      {props.faqs ? <EnhancedTableBody {...props}/> : <FAQLoading/>}
    </>
  )

}

export default Dashboard;
