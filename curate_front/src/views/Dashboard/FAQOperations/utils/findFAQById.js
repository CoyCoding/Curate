export const findFAQById = (faqs, id) => {
    for(var i = 0; i < faqs.length; i++){
      if(faqs[i].id === Number(id)){
        return i;
      }
    }
}