export const get =()=> JSON.parse(localStorage.getItem('state')) || undefined;
export const set =(state)=> {
  localStorage.setItem('state', JSON.stringify(state))
};

