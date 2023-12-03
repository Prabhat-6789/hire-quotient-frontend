import React, { useState, useEffect } from 'react';
import Table from './table';
import './App.css';
//import { AppStateProvider } from './AppStateContext';

const API_ENDPOINT = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';

const App = () => {
  const [data, setData] = useState([]);
  const [visibleData,setVisibleData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const result = await response.json();
        console.log("result: ",result);
        setData(() => result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  const itemsPerGroup = 5;
  const dividedArrays = [];
for (let i = 0; i < data.length; i += itemsPerGroup) {
  const group = data.slice(i, i + itemsPerGroup);
  //console.log("group: ",group);
  dividedArrays.push(group);
  //console.log("dividedArray: ",dividedArrays);
}
useEffect(()=>setVisibleData(dividedArrays),[data]);
  return (
    <div>
        <Table data={data} visibleData={visibleData} setVisibleData={setVisibleData} />
      </div>
  );
};

export default App;