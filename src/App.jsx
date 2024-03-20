
import { useRef, useState, useEffect } from 'react';
import Display from './Display';


function App() {
  const [leftData, setLeftData] = useState([]);
  const [rightData, setRightData] = useState([]);

  const inpRef = useRef();

  const clearAll = () => {
    setLeftData([]);
    setRightData([]);
    localStorage.removeItem("leftData");
    localStorage.removeItem("rightData");
  }

  const addData = (data) => {   
    if (!leftData.includes(inpRef.current.value) && inpRef.current.value !== "") {
      setLeftData
      (
        [...leftData, inpRef.current.value]
        )

    }
    inpRef.current.value = ""

  }

  const moveToRight = (index) => {
    console.log(index);
    setRightData(
      [
        ...rightData,
        leftData[index],

      ]
    )


    if (leftData.length == 1) {
      setLeftData([])
      localStorage.removeItem("leftData");
    } else {



      const newLeftData = leftData.filter(
        (ID, i) => {
          if (i == index) return false;
          else return true;
        }
      )
      setLeftData(newLeftData);
    }
  }




  const moveToLeft = (index) => {

    console.log(index);
    setLeftData(
      [
        ...leftData,
        rightData[index]
      ]
    )


    if (rightData.length == 1) {

      setRightData([])
      localStorage.removeItem("rightData");

    } else {
      const newRightData = rightData.filter(
        (ID, i) => {
          if (i == index) return false;
          else return true;
        }
      )
      setRightData(newRightData);

    }
  }





  useEffect(
    () => {
      if (leftData.length != 0) {
        localStorage.setItem("leftData", JSON.stringify(leftData));
      }
    },
    [leftData]
  )

  useEffect(
    () => {
      const lsHistroy = localStorage.getItem("leftData");
      if (lsHistroy != undefined) {
        setLeftData(JSON.parse(lsHistroy));
      }
    },
    []
  )






  useEffect(
    () => {
      if (rightData.length != 0) {
        localStorage.setItem("rightData", JSON.stringify(rightData));
      }
    },
    [rightData]
  )
  useEffect(
    () => {
      const jsHistroy = localStorage.getItem("rightData");
      if (jsHistroy != undefined) {
        setRightData(JSON.parse(jsHistroy));
      }
    },
    []
  )



  return (
    <div className="container">
      <div className=" d-flex my-3 " style={{
        gap: 10,
      }}>
        <input type="text  " ref={inpRef} className='form-control' />
        <button className='btn btn-primary' onClick={addData}>Add</button>
        <button onClick={clearAll} className='btn btn-primary' >Clear All</button>
      </div>

      <div className='row'>
        <Display items={leftData} mode="bg-primary" moveHandler={moveToRight} />
        <Display items={rightData} mode=" bg-secondary" moveHandler={moveToLeft} />

      </div>
    </div>
  );
}

export default App;  
