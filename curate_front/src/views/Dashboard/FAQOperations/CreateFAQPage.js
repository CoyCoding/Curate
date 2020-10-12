import React, {Component} from 'react';
import FAQform from './Form/FAQForm';
//import { getStringifiedKeyFromValue } from '../../Utils/MapFunctions/MapFunctions';


function CreateFAQPage(props){
    return(
        <FAQform {...props} />
    )
}


export default CreateFAQPage;
