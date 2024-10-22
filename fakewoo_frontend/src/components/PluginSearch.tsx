import { Button, Container, Input } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

interface Plugin {
  name: string;
  slug: string;
  author: string;
  homepage: string;
  version: string;
}

const debounce = (func: (...args: any[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout | null;
  return (...args: any[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

function PluginSearch() {
  const [input, setInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Plugin[]>([]);

  const debouncedSearch = useCallback(
    debounce(async (input: string) => {
      if (input.length <= 3) {
        setSearchResults([]);
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8000/api.php?search_plugin=${input}`
        );
        console.log(response.data);
        setSearchResults(response.data as Plugin[]);
      } catch (error) {
        console.error("Error searching plugins:", error);
      }
    }, 500),
    []
  );

  const installPlugin = async (slug: string)=> { 
    try {
      const response = await axios.get(
        `http://localhost:8000/api.php?plugin_to_install=${slug}`
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error installing plugin:", error);
  }
};

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    debouncedSearch(input);
  }, [input, debouncedSearch]);

  return (
    <Container>
      <h1>Plugin Search</h1>
      <Input placeholder="Search for a plugin" onChange={onChangeInput} />
      <Container>
        {searchResults.length > 0 && <h2>Found Plugins:</h2>}
        {searchResults?.map((plugin, index) => (
          <Container
            key={index}
            style={{ border: "1px solid black", borderRadius: "10px" }}
          >
            <h2>{plugin.name}</h2>
            <h3>{plugin.author.split(">")[1].split("<")[0]}</h3>
            <h3>{plugin.version}</h3>
            <a href={plugin.homepage}>Homepage</a>
            <Button onClick={()=>installPlugin(plugin.slug)}>Install</Button>
          </Container>
        ))}
      </Container>
    </Container>
  );
}

export default PluginSearch;
