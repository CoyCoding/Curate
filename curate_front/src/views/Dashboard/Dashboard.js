import React, { useState } from 'react';
import FAQLoading from './../FaqPage/components/FAQLoading';
import EnhancedTableBody from './EnhancedTableBody';
import DeletePopUp from './FAQOperations/PopUps/DeletePopUp';
import { authHeaders } from '../../utils/authHeaders';
import { findFAQById } from './FAQOperations/utils/findFAQById';
import { removeIndexFromArray } from '../../utils/removeIndexFromArray';
import axios from 'axios';

function Dashboard(props){
  const [popUpStatus, setPopUpStatus] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null);

  const deleteSelected = (itemToDelete) => {
    console.log(itemToDelete)
    setSelectedItem(itemToDelete);
    setPopUpStatus(true);
  }

  const confirmDelete = () => {
    axios.delete('https://curate.v1.coycoding.com/FaqPosts/' + selectedItem.id, authHeaders)
        .then(function (response) {
          const i = findFAQById(props.faqs, selectedItem.id);
          const newFaq = removeIndexFromArray(props.faqs, i);
          props.setFaqs(newFaq);
        })
        .catch(function (error) {
          console.log(error);
      });
  }

  const closePopUp = () => {
    setSelectedItem(null);
    setPopUpStatus(false);
  }

  return (
    <>
      <DeletePopUp status={popUpStatus} {...props} close={closePopUp} faq={selectedItem} delete={confirmDelete}/>
      {props.faqs ? <EnhancedTableBody delete={deleteSelected} {...props}/> : <FAQLoading/>}
    </>
  )

}

export default Dashboard;
