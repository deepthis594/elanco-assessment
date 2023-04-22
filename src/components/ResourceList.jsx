import react, { useState, useEffect } from 'react';
import ResourceItem from './ResourceItem';
function ResourceList() {
    const [data, setData] = useState([]);
    const [selectedApp, setSelectedApp] = useState('');
    const [loading, setLoading] = useState(true);
    const applicationURL = "https://engineering-task.elancoapps.com/api/resources";
    useEffect(() => {
        fetch(applicationURL)
            .then((resp) => resp.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (<div>
        <h1>Resources</h1>
        <select onChange={(ev) => { setSelectedApp(ev.target.value) }}>
            <option value=''>Select a resource</option>
            {data.map(item => (<option key={item} value={item}>{item}
            </option>))}
        </select>
        {selectedApp ? <ResourceItem resourceName={selectedApp} /> : <p> Select a resource to view the trend</p>}
    </div>
    );
}
export default ResourceList;
