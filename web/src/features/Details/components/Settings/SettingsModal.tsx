import React, { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogContentText, Tab, Typography } from "@mui/material";
import { TabList, TabPanel, TabContext } from '@mui/lab'

interface SettingsModalProps {
	open: boolean;
	onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ open, onClose }) => {
  const [tabValue, setTabValue] = useState('1');
  const handleTabChange = (e: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  }

	return (
		<Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth={true}>
      <TabContext value={tabValue}>
        <DialogContent>
          <DialogContentText>Settings</DialogContentText>
          <TabList onChange={handleTabChange}>
            <Tab label="Permissions" value="1"/>
            <Tab label="Settings" value="2"/>
          </TabList>
          <TabPanel value="1">
	          Cyka
          </TabPanel>
          <TabPanel value="2">
	          <Box>
		          <Typography>Danger Zone</Typography>
	            <Button style={{ marginTop: 10 }} variant="outlined">
		            Delete
	            </Button>
	          </Box>
          </TabPanel>
        </DialogContent>
      </TabContext>
		</Dialog>
	)
}

export default SettingsModal;
