import react, { useState, useEffect } from 'react';
import ApplicationItem from './ApplicationItem';
function ApplicationList() {
    const [data, setData] = useState([]);
    const [selectedApp, setSelectedApp] = useState('');
    const [loading, setLoading] = useState(true);
    const applicationURL = "https://engineering-task.elancoapps.com/api/applications";
    useEffect(() => {
        fetch(applicationURL)
            .then((resp) => resp.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (<div>
        <h1>Applications</h1>
        <label>Select an application to view the trend: <br />
            <select onChange={(ev) => { setSelectedApp(ev.target.value) }}>
                <option value=''>Select an application</option>
                {data.map(item => (<option key={item} value={item}>{item}
                </option>))}
            </select>
        </label>

        {selectedApp ? <ApplicationItem applicationName={selectedApp} /> : null}
    </div>
    );
}
export default ApplicationList;
