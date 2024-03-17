'use client'
import { Grid, Button,Link } from '@mui/material';
import data from '../public/data.json'
import { useState, useEffect } from 'react';
interface mockData {
  type: String,
  name: String
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Button className='btn-list'>
            <Link href='/test1'>Test 1. Auto Delete Todo List</Link>
          </Button>
          <Button className='btn-list'>
          <Link href='/test2'>Test 2. Create data from API (OPTIONAL)</Link>
          </Button>
        </Grid>
        <Grid item xs={9}>
        </Grid>
      </Grid>
    </main>
  );
}
