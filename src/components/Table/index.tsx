import * as React from 'react';
import axios from 'axios';
import { DataGrid, ColDef, RowModel } from '@material-ui/data-grid';

export default function DataTable() {
  const [coins, setCoins] = React.useState();
  const [columns, setColumns] = React.useState<ColDef[]>([
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'coinName', headerName: 'Coin name', width: 140 },
    { field: 'majorMarket', headerName: 'Major Exchange', width: 170 },
    {
      field: 'lastPrice',
      headerName: 'Last Price',
      type: 'number',
      width: 130,
    },
  ]);

  interface Coins {
    id: number;
    coinName: string;
    majorMarket: string;
    lastPrice: number;
  }
  interface setRowsInterface extends RowModel {
    coinsRows: Coins[];
  }
  const [rows, setRows] = React.useState<setRowsInterface | Coins[]>([]);

  const getCryptoData = async () => {
    const {
      data: { Data: coinsData },
    } = await axios.get(
      `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD&api_key=${process.env.REACT_APP_API_KEY}`,
    );
    return coinsData;
  };

  React.useEffect(() => {
    const marketCaps = getCryptoData();
    marketCaps.then(data => {
      setCoins(data);
    });
  }, []);
  console.log(coins);

  React.useEffect(() => {
    // @ts-ignore
    const coinsRows: Coins[] = coins?.map(coin => {
      return {
        id: +coin.CoinInfo.Id,
        coinName: coin.CoinInfo.Internal,
        majorMarket: coin.RAW.USD.LASTMARKET,
        lastPrice: `${coin.RAW.USD.PRICE} ${
          coin.RAW.USD.CHANGEHOUR < 0 ? '↘' : '↗'
        }`,
      };
    });
    console.log(coinsRows);
    if (coinsRows) {
      setRows([...coinsRows]);
    }
  }, [coins]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      {/* @ts-ignore */}
      {rows && <DataGrid rows={rows} columns={columns} autoPageSize />}
    </div>
  );
}
