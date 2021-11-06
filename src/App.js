import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import NavDrawer from './components/NavDrawer';
import WorkOrder from './components/WorkOrder';
import WorkOrderForm from './components/WorkOrderForm';
import WorkOrderDashboard from './components/WorkOrderDashboard';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <NavDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 12 }}>
          <Switch>
            <Route exact path="/">
              <WorkOrderDashboard />
            </Route>
            <Route exact path={'/order/:orderNumber'}>
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
