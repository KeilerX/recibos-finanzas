export const createReceipt = (newReceipt) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection("receipts").add({
            ...newReceipt,
            creationDate: new Date(),
        }).then(() => {
            dispatch({ type: 'RECEIPT_CREATED'});
        }).catch(err => {
            dispatch({ type: 'RECEIPT_CREATION_ERROR', err});
        });
    }
}