'use client'
import { Grid, Button } from '@mui/material';
import data from '../../public/data.json'
import { useState, useEffect } from 'react';
interface mockData {
  type: String,
  name: String
}

export default function Test1() {

  const [list, setList] = useState<mockData[]>([])
  const [newList, setNewList] = useState<mockData[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      if (newList.length > 0) {
        //remove data
        let updatedItems = [...newList];
        updatedItems = updatedItems.slice(1)
        setNewList(updatedItems);

        //return data to main array
        let itemRemove = newList[0];
        let item: any = [...list];
        item.push(itemRemove)
        setList(item)
      } else {
        clearInterval(interval);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [newList]);


  const checkList = (obj: mockData, i: number) => {
    if (obj) {
      let item: any = [...newList];
      item.push(obj)
      setNewList(item)
    }
    const result = list.slice(0, i).concat(list.slice(i + 1));
    setList(result)
  }

  const removeList = (obj: mockData) => {
    let item: any = [...list];
    item.push(obj)
    setList(item)

    let index = newList.findIndex((newList: mockData) => newList.name === obj.name);
    if (index !== -1) {
      const result = newList.slice(0, index).concat(newList.slice(index + 1));
      setNewList(result)
    }
  }

  useEffect(() => {
    setList(data)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          {list && list.length > 0 ? (
            <>
              {list.map((obj: mockData, i: number) => (
                <Button className='btn-list' key={i} onClick={() => checkList(obj, i)}> {obj.name} </Button>
              ))}
            </>
          ) : (<></>)
          }
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Grid className='container-list' >
                <p className='title'>Fruit</p>
                {newList && newList.length > 0 ? (
                  <>
                    {newList.filter((obj: mockData) => obj.type == 'Fruit').map((obj: mockData, i: number) => (
                      <Button key={i} className='btn-list-in' onClick={() => removeList(obj)}> {obj.name} </Button>
                    ))}
                  </>
                ) : (<></>)
                }
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid className='container-list' >
                <p className='title'>Vegetable</p>
                {newList && newList.length > 0 ? (
                  <>
                    {newList.filter((obj: mockData) => obj.type == 'Vegetable').map((obj: mockData, i: number) => (
                      <Button key={i} className='btn-list-in' onClick={() => removeList(obj)}> {obj.name} </Button>
                    ))}
                  </>
                ) : (<></>)
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </main>
  );
}
