
import React, {useEffect, useState} from 'react'
import { loopdata } from '../utils/tools';
import { laptopCollection, subCollection } from '../utils/firebase';

export default function Laptop() {

  const [laptop, setLaptop] = useState(null)

  useEffect(() => {
     laptopCollection.get().then(
      snapshot => {
       const laptopdata = loopdata(snapshot)
        setLaptop(laptopdata)
        console.log(laptop);
      }
    )
     
    // ssdCollection.get().then(
    //   snapshot => {
    //     console.log(snapshot.data());
    //   }
    // )

    subCollection.get().then(
      snapshot => {
        const admin = loopdata(snapshot)
        console.log(admin);
      }
    )
   
  }, [])

  return (
    <div>
      {laptop && laptop[0].id}
      hello
    
    </div>
  )
}