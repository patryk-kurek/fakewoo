import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import InstalledPlugins from './components/InstalledPlugins';
import PluginSearch from './components/PluginSearch';

function App() {
  return ( 
    <Container>
      <Typography variant="h1" align="center">
       FakeWoo Dashboard
      </Typography>
      <Box mt={5}>
        <InstalledPlugins/>
      </Box>
      <Box mt={5}>
        <PluginSearch/>
      </Box>
    </Container>
  );
}

export default App;
