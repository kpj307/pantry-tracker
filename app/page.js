'use client';
import { Box, Stack, Typography, Button } from "@mui/material";
import TextField from '@mui/material/TextField';

import { collection, addDoc, getDoc, getDocs, QuerySnapshot, query, onSnapshot, deleteDoc, doc, increment, updateDoc, where } from "firebase/firestore"; 
import { db } from "./firebase";
import { useEffect, useState } from "react";


export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({item: '', quantity: 1});
  const [searchItem, setSearchItem] = useState('')
  const [clicked, setClicked] = useState(false);
  
  const handleSubmit = (e) => {
    setClicked(true);
  }
  const handleSearchClicked = (e) => {
    setSearchItem(e.target.value);
  }

  // add to database
  const addItem = async(e) => {
    // e.preventDefault();
    if (newItem.item !== '' && newItem.quantity !== ''){
      await addDoc(collection(db, 'items'), {
        item: newItem.item.trim(),
        quantity: newItem.quantity,
      });
      setNewItem({item: '', quantity: ''})
    }
    window.location.reload();
  }

  // read from database
  useEffect(() => {
    const q = query(collection(db, 'items'));

    onSnapshot(q, (QuerySnapshot) => {
      let itemsArr = [];
      QuerySnapshot.forEach((doc) => {
        itemsArr.push({...doc.data(), id: doc.id})
      })
      setItems(itemsArr);
    })
  },[]);

  // delete from database
  const deleteItem = async(id) => {
    await deleteDoc(doc(db, 'items', id));
  } 
  // increment quantity
  const incrementQty = async(id) => {
   const itemRef = doc(db, "items", id);
   await updateDoc(itemRef, {
    quantity: increment(1)
   });
  }

  // decrement quantity
  const decrementQty = async(id) => {
    const itemRef = doc(db, "items", id);
    await updateDoc(itemRef, {
     quantity: increment(-1)
    });
  }

  const filteredItems = []
  items.forEach(item =>{
    if(item.item == searchItem){
      filteredItems.push(item)
    }
  })
  
  const displayItems = clicked ? filteredItems : items;
  
  return (
    <Box 
      width="100vw"
      height="100vh"
      paddingTop={"15vh"}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={''}
      alignItems={'center'}
      bgcolor={'#'}
    >
      <Box
        width={'400px'}
        height={'auto'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& > :not(style)': { m: 1 },
          }}
          bgcolor={"#fff"}
          borderRadius={1}
        >
         <TextField 
          id="standard-basic" 
          label="Search" 
          variant="standard" 
          onChange={handleSearchClicked}
          value={searchItem}
         />
          <Button 
            variant="outlined"
            size={"small"}
            type="submit"
            onClick={handleSubmit}
          >Search</Button>
        </Box>
      </Box>

      <Box
        width={'800px'}
        height={'auto'}
        bgcolor={'#123'}
        borderRadius={2}
        margin={'10px'}
        paddingY={'10px'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Typography
          variant="h4"
          fontWeight={'bold'}
          color={'#fff'}
        >
            Pantry Items
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& > :not(style)': { m: 1 },
          }}
          bgcolor={"#fff"}
          margin={"10px"}
          padding={"10px"}
          borderRadius={1}
        >
          <TextField
            id="demo-helper-text-aligned"
            label="Enter Item"
            value={newItem.item}
            onChange={(e) => setNewItem({...newItem, item: e.target.value})}
          />
          <Button 
            variant="outlined"
            onClick={addItem}
            size={"large"}
          >+</Button>
        </Box>
      </Box>
      
      <Stack 
        paddingRight={3} 
        width="800px" 
        height="200px" spacing={2} 
        overflow={'auto'} 
        direction={{ xs: 'column' }}
      >
        {displayItems.map((item, id) => (
          <Stack
            key={id}
            direction="row"
            width={'100%'}
            height={'auto'}
            paddingY={'10px'}
            paddingX={'1.5rem'}
            display={'flex'}
            bgcolor={'#111'}
            justifyContent={"space-between"}
          >
            <Box
              variant={'h5'}
              color={'#fff'}
              textTransform = 'capitalize'
              display={'flex'}
              alignItems={'center'}
            >
              {item.item}
            </Box>
            <Stack
              direction="row"
              display={'flex'}
              paddingY={'5px'}
              paddingX={'1rem'}
              color={'#fff'}
              bgcolor={'#123'}
              borderRadius={1}
            >
              
              <Box
                display={'flex'}
                alignItems={'center'}
                marginRight={2}
                color={'#fff'}
              >
                Qty: {item.quantity}
              </Box>
              <Button 
                style={{maxWidth: '30px', 
                  maxHeight: '30px', 
                  minWidth: '30px', 
                  minHeight: '30px',
                  margin: '5px'
                }}
                  variant="outlined"
                  onClick={() => incrementQty(item.id)}
                >
                +
              </Button>
              <Button 
                style={{maxWidth: '30px', 
                  maxHeight: '30px', 
                  minWidth: '30px', 
                  minHeight: '30px',
                  margin: '5px'
                }}
                  variant="outlined"
                  onClick={() => decrementQty(item.id)}
                >
                -
              </Button>
            </Stack>
            <Button 
                variant="outlined"
                onClick={() => deleteItem(item.id)}
                >
                DELETE
              </Button>
          </Stack>
        )
      )}
      </Stack>
    </Box>
  );
}
