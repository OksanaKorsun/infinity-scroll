import axios from 'axios';
export async function serviceModal(touchId) {
  const responce = await axios.get(`${touchId}`);
  return await responce.data; 
}
  