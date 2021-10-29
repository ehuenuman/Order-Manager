import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';

import StatusCell from './components/StatusCell';
import DashboardCard from '../DashboardCard';

import OrdersData from '../../data/ordersData.json';

const columns = [
  {
    field: 'number',
    headerName: '#',
    width: 50
  },
  {
    field: 'customer',
    headName: 'Customer',
    flex: 1
  },
  {
    field: 'creationDate',
    headerName: 'Creation Date',
    type: 'dateTime',
    flex: 1
  },
  {
    field: 'deadline',
    headerName: 'Deadline',
    type: 'dateTime',
    flex: 1
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 250,
    renderCell: (params) => (
      <StatusCell status={params.value.status} areas={params.value.areas} />
    ),
  },
  {
    field: 'actions',
    type: 'actions',
    getActions: (params) => [
      <Button
        component={RouterLink}
        to={"/order/" + params.row.number}
      >
        More
      </Button>
    ]
  }
];

const ParseData = () => {
  var rows = [];
  var row = {};

  OrdersData.map(order => {
    row.id = order._id;
    row.number = order.number;
    row.customer = order.customer.id;
    row.creationDate = order.creationDate;
    row.deadline = order.deadline;
    row.status = {
      status: order.status,
      areas: order.areas
    };

    rows.push(row);
    row = {}

  });

  return rows
}

function WorkOrderDashboard() {

  const rows = ParseData();

  return (
    <Container>
      <Grid
        container
        spacing={4}
      >
        <Grid item xs={12}>
          <DashboardCard title="Recent orders">
            <DataGrid
              columns={columns}
              rows={rows}
              pageSize={10}
              disableColumnMenu
              autoHeight
            />
          </DashboardCard>
        </Grid>
      </Grid>
    </Container>
  )
}

export default WorkOrderDashboard
