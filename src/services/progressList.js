import configData from "../config.json"

export default function getList() {
    return fetch(configData.PROGRESSAPI_URL)
      .then(data => 
        data.json()
              )
  }