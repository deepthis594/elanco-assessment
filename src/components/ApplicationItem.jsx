import react, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



function ApplicationItem({ applicationName }) {
  const [appdata, setAppData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [environment, setEnvironment] = useState('All');
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `trends for ${environment}`,
      },
    },
  };

  useEffect(() => {
    if (applicationName == '') {
      return;
    }
    const itemURL = `https://engineering-task.elancoapps.com/api/applications/${applicationName}`;
    setLoading(true);
    fetch(itemURL)
      .then((resp) => resp.json())
      .then((json) => setAppData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [applicationName]);

  const environmentOptions = ['All', ...new Set(appdata.map((item) => { return item.Tags.environment }))];
  console.log(environmentOptions);
  const filteredAppData = appdata.filter((item) => {
    if (environment == 'All') { return true; }
    return item.Tags.environment === environment;
  });
  const data = {
    labels: filteredAppData.map((item) => { return item.Date }),
    datasets: [
      {
        label: 'ConsumedQuantity',
        data: filteredAppData.map((item) => { return parseInt(item.ConsumedQuantity, 10) }),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Cost',
        data: filteredAppData.map((item) => { return parseInt(item.Cost), 10 }),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  console.log('Data', data, options);

  return (
    <>
      <h2>{applicationName}</h2>
      <label> Select the environment: <br />
        <select onChange={(ev) => { setEnvironment(ev.target.value) }}>
          {environmentOptions.map(item => (<option key={item} value={item}>{item}
          </option>))}
        </select>
        <div className='chart-container'> <Line options={options} data={data} /></div>
      </label>

    </>
  );

}
export default ApplicationItem;