export async function getServerDetails(ipAddress, port, game) {
  function getServiceUrl() {
    const gameUrls = {
      "quake3arena": "Quake3Arena"
    };
  
    return `${process.env.API_URL}api/${gameUrls[game]}/${ipAddress}/${port}/status`;
  }

  return await fetch(getServiceUrl(), {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json());
}