import React, {useEffect, useState} from 'react'
import { db } from '../utils/firebase';
import { loopdata } from '../utils/tools';

export default function Laptop() {

  const [laptop, setLaptop] = useState(null)

  useEffect(() => {
    db.collection('laptop').get().then(
      snapshot => {
       const laptopdata = loopdata(snapshot)
       setLaptop(laptopdata)
       console.log(laptop, laptopdata);
      }
    ).catch(e => {
      console.log(e);
    })
   
  }, [])

  return (
    <div>
      {laptop && laptop.forEach(element => {
        <h1>{element.id}</h1>
      })}
    </div>
  )
}
