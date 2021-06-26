export const createCurrency = (newCurrency) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection("currencies").add({
      ...newCurrency,
      creationDate: new Date(),
    }).then(() => {
      dispatch({ type: 'CURRENCY_CREATED' });
    }).catch(err => {
      dispatch({ type: 'CURRENCY_CREATATION_ERROR', err });
    });
  }
}