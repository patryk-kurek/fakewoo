import React,{useEffect, useState} from "react";
import axios from "axios";
import { Container } from "@mui/material";

interface installedPlugin {
    name: string;
    version: string;
}

function InstalledPlugins() {
    const [installedPlugins,setInstalledPlugins] = useState<installedPlugin[]>([]);

    useEffect(()=>{
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8000/api.php");
            setInstalledPlugins(response.data.plugins);            
        } 
        fetchData();
    },[]);
 
    return (
    <Container style={{border: '1px solid black'}}>
      <h1>Installed Plugins</h1>
     {installedPlugins.map((plugin,index) => (
        <Container key={index}>
        <h2>{plugin.name}</h2>
        <h3>{plugin.version}</h3>
        </Container>
     ))}
    </Container>
  );
}

export default InstalledPlugins;
