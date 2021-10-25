import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import NavDrawer from './Components/NavDrawer';
import WorkOrderForm from './Components/WorkOrderForm';
import WorkOrder from './Components/WorkOrder';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <NavDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 12 }}>
          <Switch>
            <Route exact path="/">
              <Typography>
                Dashboard
              </Typography>
            </Route>
            <Route exact path="/order">
              <WorkOrder />
            </Route>
            <Route exact path="/new-work">
              <WorkOrderForm />
            </Route>
          </Switch>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
