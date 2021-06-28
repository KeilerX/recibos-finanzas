import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import { Redirect } from 'react-router-dom'
import LoadingScreen from '../../layout/loading_screen/LoadingScreen'
import TableCustom from '../../shared/TableCustom'

const TableWallet = () => {
  const { auth } = useSelector((state) => state.firebase);

  useFirestoreConnect(props => [{
    collection: 'wallets',
    where: ['uid', '==', auth.uid]
  }])

  const { profile } = useSelector((state) => state.firebase);
  const { wallets } = useSelector((state) => state.firestore.data);

  if (!auth.uid) {
    return <Redirect to="/login" />;
  }

  const columns = [
    { id: 'TCEAWallet', label: 'TCEA de Cartera', minWidth: 100, align: 'center' },
    { id: 'VRWallet', label: 'Valor Total Recibido de Cartera', minWidth: 100, align: 'center' },
    { id: 'link', label: 'Ver Más', minWidth: 50, align: 'center'},
    /* { id: 'TEA', label: 'TEA(sin costes)', minWidth: 50, align: 'center' },
    { id: 'ND', label: 'Días transcurridos', minWidth: 100, align: 'center' },
    { id: 'TE', label: 'TE Nª días', minWidth: 50, align: 'center' },
    { id: 'd', label: 'Tasa descontada Nª días', minWidth: 50, align: 'center' },
    { id: 'D', label: 'Descuento Nª días', minWidth: 50, align: 'center' },
    { id: 'Rt', label: 'Retención', minWidth: 50, align: 'center' },
    { id: 'CI', label: 'Costes Iniciales', minWidth: 70, align: 'center' },
    { id: 'VNet', label: 'Valor Neto', minWidth: 70, align: 'center' },
    { id: 'VR', label: 'Total a Recibir', minWidth: 70, align: 'center' },
    { id: 'CF', label: 'Costes Finales', minWidth: 70, align: 'center' },
    { id: 'VE', label: 'Total a Entregar', minWidth: 70, align: 'center' },
    { id: 'TCEA', label: 'TCEA', minWidth: 50, align: 'center' }, */
  ];

  const myWallets = [];
  for(const w in wallets) {
    myWallets.push({
      link: { value: 'link', id: 'link' },
      TCEAWallet: { value: wallets[w].TCEAWallet.toString() + '%', id: 'TCEAWallet' },
      VRWallet: { value: wallets[w].currency + ' ' + wallets[w].VRWallet.toString(), id: 'VRWallet' },
      /* TEA: { value: receipts[r].TEA ? receipts[r].TEA.toString() : 0 + '%', id: 'TEA' },
      ND: { value: receipts[r].ND, id: 'ND' },
      TE: { value: receipts[r].TE.toString() + '%', id: 'TE' },
      d: { value: receipts[r].d.toString() + '%', id: 'd' },
      D: { value: receipts[r].currency + ' ' + receipts[r].D.toString(), id: 'D' },
      Rt: { value: receipts[r].currency + ' ' + receipts[r].Rt.toString(), id: 'Rt' },
      CI: { value: receipts[r].currency + ' ' + receipts[r].CI.toString(), id: 'CI' },
      VNet: { value: receipts[r].currency + ' ' + receipts[r].VNet.toString(), id: 'VNet' },
      VR: { value: receipts[r].currency + ' ' + receipts[r].VR.toString(), id: 'VR' },
      CF: { value: receipts[r].currency + ' ' + receipts[r].CF.toString(), id: 'CF' },
      VE: { value: receipts[r].currency + ' ' + receipts[r].VE.toString(), id: 'VE' },
      TCEA: { value: receipts[r].TCEA.toString() + '%', id: 'TCEA' }, */
    })
  }

  return (
    <div>
      {!profile.isEmpty ?
      <div>
        <TableCustom 
          columns={columns}
          rows={myWallets}
          data={wallets}
        />
      </div>
      : <LoadingScreen />}
    </div>
  );
}

export default TableWallet