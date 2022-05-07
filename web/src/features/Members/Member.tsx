import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
} from "@mui/material";

interface MemberProps {
  member: any;
  updateMember: (data: any) => void;
}

const Member: React.FC<MemberProps> = ({ member, updateMember }) => {
    const [canDeposit, setCanDeposit] = useState(member.canDeposit);
    const [canWithdraw, setCanWithdraw] = useState(member.canWithdraw);
    const [canTransfer, setCanTransfer] = useState(member.canTransfer);

    const handleUpdate = () => {
        const data = { canDeposit, canWithdraw, canTransfer }
        updateMember(data)
    }

  return (
    <Box
      mb={2}
      display="flex"
      gap={10}
      justifyContent="flex-start"
      alignItems="start"
    >
      <Box>
        <Typography>{member.name}</Typography>
        <Typography fontSize={14} color="gray">
          {member.citizenId}
        </Typography>
        <Box mt={1}>
          <Button onClick={handleUpdate} size="small" variant="outlined">
            Update
          </Button>
        </Box>
      </Box>
      <Box>
        <FormGroup
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <FormControlLabel control={<Checkbox onChange={(e) => setCanDeposit(e.target.checked)} checked={canDeposit} />} label="Deposit" />
          <FormControlLabel control={<Checkbox onChange={(e) => setCanWithdraw(e.target.checked)} checked={canWithdraw} />} label="Withdraw" />
          <FormControlLabel control={<Checkbox onChange={(e) => setCanTransfer(e.target.checked)} checked={canTransfer} />} label="Transfer" />
        </FormGroup>
      </Box>
    </Box>
  );
};

export default React.memo(Member);
