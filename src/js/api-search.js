import axios from 'axios';
export async function serviceModal() {
    const result = axios.get(`${touchId}`);
    const resultVal = await result.then(data => data.data);
    console.log(resultVal);
    const modalMake = makeModal(resultVal);
    modal.classList.add('active');
    return modalMake;
  }