import React from 'react'
import PropTypes from 'prop-types'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

const DashboardCard = ({
  title,
  children,
  ...otherProps
}) => {
  return (
    <Card
      {...otherProps}
      sx={{
        position: 'relative',
        overflow: 'initial',
        mt: 3,
        pt: 4
      }}
    >
      <CardHeader
        title={title}
        sx={{
          position: 'absolute',
          mt: -7,
          ml: 2,
          width: '80%',
          alignSelf: 'center',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          boxShadow: 3,
          borderRadius: 3,
        }}
      />
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
}

export default DashboardCard
