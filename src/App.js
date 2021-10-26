import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import NavDrawer from './Components/NavDrawer';
import WorkOrder from './Components/WorkOrder';
import WorkOrderForm from './Components/WorkOrderForm';
import WorkOrderDashboard from './Components/WorkOrderDashboard';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <NavDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 12 }}>
          <Switch>
            <Route exact path="/order">
              <WorkOrderDashboard />
            </Route>
            <Route exact path={'/order/:ordernumber'}>
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
