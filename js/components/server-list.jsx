import React, { useEffect, useState } from "react";
import { getFavourites, saveFavourites } from "../repositories/server-list-repository";
import ServerDetails from "./server-details.jsx";

function ServerList() {
  const [ serverList, setServerList ] = useState([]);
  const [ editingServerList, setEditingServerList ] = useState(JSON.stringify(serverList));
  const [ rawDataVisible, setRawDataVisible ] = useState(false);

  const rawDataStyles = rawDataVisible ? {} : { display: "none" };

  useEffect(() => {
    getFavourites();
  }, [serverList]);

  const handleViewStoredDataClick = function() {
    setRawDataVisible(true);
  };

  const handleServerListDataChange = function(event) {
    setEditingServerList(event.target.value);
  }

  const handleSaveServerListClick = async function() {
    const data = JSON.parse(editingServerList);

    if (data) {
      await saveFavourites(data);
      setServerList(data);
      setRawDataVisible(false);
    }
  }

  return (
    <div data-testid="server-list">
      {
        serverList.map((server, index) => {
          return (
            <div key={`${server.ipAddress}-${index}`}>
              <ServerDetails {...server} />
              <hr />
            </div>
          )
        })
      }
      <div>
        <button onClick={handleViewStoredDataClick}>View Stored Data</button>
      </div>
      <div style={rawDataStyles}>
        <textarea value={editingServerList} onChange={handleServerListDataChange} />
        <button onClick={handleSaveServerListClick}>Save Server List Data</button>
      </div>
    </div>
  );
}

export default ServerList;