import React from 'react'
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider'; 
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List'; 
import ListItem from '@mui/material/ListItem'; 
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';


const OrderDetails = () => {
  const [showFeeDetails, setShowFeeDetails] = React.useState(false);

  const handleShowFeeDeatils = () => {
    setShowFeeDetails(!showFeeDetails);
  }
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" component="div">
          Description
        </Typography>
        <Typography variant="body1" component="div">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora commodi architecto, fugit perferendis inventore ipsam aspernatur voluptatibus! Eaque impedit eum consequuntur totam? Alias beatae ex animi accusantium quod sed ipsum!
        </Typography>
      </Grid>
      <Grid
        container
        spacing={2}
        justifyContent="space-evenly"
      >
        <Grid item xs={12} sm={6}>
          <List
            subheader={
              <ListSubheader component="div">
                Deadline
              </ListSubheader>
            }
          >
            <ListItem>
              <ListItemIcon>
                <CalendarTodayOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="October 30th, 20201"
                secondary="6 days to deadline"
              />
            </ListItem>
          </List>
        </Grid>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Grid item xs={12} sm={5}>
          <List
            subheader={
              <ListSubheader component="div">
                Fee details
              </ListSubheader>
            }
          >
            <ListItem>
              <ListItemIcon>
                <MonetizationOnOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary="190 NZD"
                secondary="Inc. GST."
              />
              <IconButton onClick={handleShowFeeDeatils}>
                {showFeeDetails ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
              </IconButton>
            </ListItem>
            <Collapse in={showFeeDetails} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText
                    primary="Paid"
                    secondary="$ 100 NZD Inc. GST."
                  />
                </ListItem>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText
                    primary="To paid"
                    secondary="$ 90 NZD Inc. GST."
                  />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default OrderDetails
