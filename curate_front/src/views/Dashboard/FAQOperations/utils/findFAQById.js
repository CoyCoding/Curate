export const findFAQById = (faqs, id) => {
  console.log('here')
    for(var i = 0; i < faqs.length; i++){
      if(faqs[i].id === Number(id)){
        return i;
      }
    }
}