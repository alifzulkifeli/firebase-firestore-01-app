
import React, {useEffect, useState} from 'react'
import { loopdata } from '../utils/tools';
import { laptopCollection, subCollection } from '../utils/firebase';

export default function Laptop() {

  const [laptop, setLaptop] = useState(null)

  const getAllLaptop = () => {
    laptopCollection.get().then(
      snapshot => {
       const laptopdata = loopdata(snapshot)
        setLaptop(laptopdata)
        console.log(laptop);
      }
    )
  }
  useEffect(() => {
     getAllLaptop()

     //GET doc by id
     laptopCollection.doc('OgTvvOf77y7FSzk2j5k0').get().then(snapshot => {
       console.table(snapshot.data());
     })
     
    }, [])
    
    return (
      <div>
      {laptop && laptop[0].id}
      {laptop && JSON.stringify(laptop[0])}
     
      
    
    </div>
  )
}


// ssdCollection.get().then(
//   snapshot => {
//     console.log(snapshot.data());
//   }
// )

// subCollection.get().then(
//   snapshot => {
//     const admin = loopdata(snapshot)
//     console.log(admin);
//   }
// )