import React, { useCallback } from 'react';
import { Box } from '@mui/material';
import Member from './Member';

const membersMock = [
    {
        id: 1,
        name: "Rick",
        citizenId: "324dsd",
        canDeposit: false,
        canWithdraw: true,
        canTransfer: false,
    },
    {
        id: 1,
        name: "Taso",
        citizenId: "welku7",
        canDeposit: true,
        canWithdraw: false,
        canTransfer: true,
    },
]

const AccountMembers = () => {
    const handleUpdateMember = useCallback((data: any) => {
        console.log(data)
    }, [])

    return (
        <Box>
            {membersMock.map((member: any) => (
                <Member member={member} updateMember={handleUpdateMember} />
            ))}
        </Box>
    )
}

export default AccountMembers;