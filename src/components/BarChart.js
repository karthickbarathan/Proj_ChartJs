import React,{useState,useEffect} from 'react'
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale} from 'chart.js'
import {Bar} from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale ,
    BarElement
)


const BarChart = () => {
  const [chart, setchart] = useState({data : []});

  useEffect(() => {
        const fetchData = async ()=>{
            try{
                const response = await fetch('https://dummyjson.com/products');
                if(!response.ok){
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                console.log(jsonData);
                setchart(jsonData);
            }
            catch(error){
                console.log('Error fetching data:', error);
            }
        };
        fetchData();
  
  }, [])
  console.log('Chart', chart);

  var data = {
    labels: chart?.products?.map(x=> x.id) || [],
    datasets: [{
      label: 'Checking',
      data: chart?.products?.map(x=> x.price) || [],
      backgroundColor:['#ff4d4d','#4d4dff','#ffff4d','#70db70','#ff4dff','#ffb84d','#4d4d4d'],
      borderWidth: 1
    }]
}
  
  return (
    <div>
        <Bar data={data} />
    </div>
  )
}

export default BarChart