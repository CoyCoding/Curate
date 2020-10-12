export const removeIndexFromArray = (arr, i) =>{
  return [...arr.slice(0,i), ...arr.slice(i+1,arr.length+1)]
}