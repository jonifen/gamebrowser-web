import React, { useState } from "react";
import { getServerDetails } from "../services/gamebrowser-api";
import ServerDetailsSummary from "./server-details-summary.jsx";

function ServerDetails(server) {
  const [ serverDetails, setServerDetails ] = useState({});
  const [ requestFailed, setRequestFailed ] = useState(false);

  const serverReceived = typeof server === "object" ? Object.keys(server).length > 0 : false;
  if (!serverReceived) {
    return (
      <div>
        No server details specified
      </div>
    );
  }

  const queryServer = function() {
    if (server.ipAddress === "127.0.0.1") {
      const dummyData = {"allDetails":{"sv_maxPing":"0","sv_minPing":"0","sv_punkbuster":"0","sv_floodProtect":"1","sv_maxRate":"0","sv_hostname":"noname","dmflags":"0","fraglimit":"20","timelimit":"0","sv_maxclients":"8","g_maxGameClients":"0","capturelimit":"0","version":"Q3 1.32c win-x86 May  8 2006","g_gametype":"0","protocol":"68","mapname":"Q3DM1","sv_privateClients":"0","sv_allowDownload":"0","bot_minplayers":"0","gamename":"baseq3","g_needpass":"0"},"gameName":"baseq3","gameType":"0","ipAddress":"127.0.0.1","mapName":"Q3DM1","maxClients":8,"name":"noname","players":[{"name":"7jon1.","ping":0,"score":0}, {"name":"^2greenmonster","ping":0,"score":0}],"ping":0,"port":27960,"status":0};
      setServerDetails(dummyData);
      return;
    }

    getServerDetails(server.ipAddress, server.port, server.game)
      .then(data => {
        setServerDetails(data);
      })
      .catch(err => {
        setServerDetails({});
        setRequestFailed(true);
      });
  }

  const serverDetailsExist = typeof serverDetails === "object" ? Object.keys(serverDetails).length > 0 : false;
  if (serverDetailsExist) {
    const allDetailKeys = Object.keys(serverDetails.allDetails);

    return (
      <div data-testid="server-details">
        <ServerDetailsSummary server={server} serverDetails={serverDetails} />

        <div className="server-details-verbose">
          <div className="server-details-section">
            <h3>{serverDetails.name}</h3>
            <p>Game Name: {serverDetails.gameName}</p>

            {
              serverDetails.mapName &&
                <img src={`https://jonifen.co.uk/gamebrowser-images/quake3arena/${serverDetails.mapName}.jpg`} />
            }

            <div>
              <button onClick={queryServer}>Refresh</button>
            </div>
          </div>

          <div className="server-details-section">
            <h4>Players ({serverDetails.players.length}/{serverDetails.maxClients})</h4>
            <table className="details-table">
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Score</td>
                  <td>Ping</td>
                </tr>
              </thead>
              <tbody>
                {
                  serverDetails.players.map((player, index) => {
                    return (
                      <tr key={`${player.name}${index}`}>
                        <td>{player.name}</td>
                        <td>{player.score}</td>
                        <td>{player.ping}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>

          <div className="server-details-section">
            <h4>Server Info</h4>
            <table className="details-table">
              <thead>
                <tr>
                  <td>Key</td>
                  <td>Value</td>
                </tr>
              </thead>
              <tbody>
                {
                  allDetailKeys.map((detailKey, index) => {
                    return (
                      <tr key={`${detailKey}${index}`}>
                        <td>{detailKey}</td>
                        <td>{serverDetails.allDetails[detailKey]}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  if (!requestFailed) {
    return (
      <ServerDetailsSummary server={server} serverDetails={serverDetails} queryServer={queryServer} />
    );
  }

  return (
    <div>
      <p>Server request failed</p>
      <button onClick={queryServer}>Refresh</button>
    </div>
  );
}

export default ServerDetails;