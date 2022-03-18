local function toggleNuiFrame(shouldShow)
	SetNuiFocus(shouldShow, shouldShow)
	SendReactMessage('setVisible', shouldShow)
end

RegisterCommand('show-nui', function()
	toggleNuiFrame(true)
	SendReactMessage('ei-banking:setCredentials', { charName = "Chip Chipperson" })
	TriggerServerEvent(EiBankingEvents.SyncDefaultAccount)
end)

RegisterNUICallback('hideFrame', function(_, cb)
	toggleNuiFrame(false)
	debugPrint('Hide NUI frame')
	cb({})
end)

AddEventHandler(EiBankingEvents.SendAccounts)

RegisterNUICallback(EiBankingEvents.GetAccounts, function(data, cb)
	TriggerServerEvent(EiBankingEvents.GetAccounts)

	RegisterNetEvent(EiBankingEvents.SendAccounts, function(accounts)
		cb(accounts)
	end)
end)

RegisterNUICallback(EiBankingEvents.CreateAccount, function(data, cb)
	TriggerServerEvent(EiBankingEvents.CreateAccount, data)

	RegisterNetEvent(EiBankingEvents.CreateAccountSuccess, function(account)
		cb(account)
	end)
end)

RegisterNUICallback(EiBankingEvents.DepositMoney, function(data, cb)
	TriggerServerEvent(EiBankingEvents.DepositMoney, data)

	RegisterNetEvent(EiBankingEvents.DepositMoneySuccess, function(newBalance)
		cb({ status = 'ok', data = newBalance })
	end)
end)

RegisterNUICallback(EiBankingEvents.WithdrawMoney, function(data, cb)
	TriggerServerEvent(EiBankingEvents.WithdrawMoney, data)

	RegisterNetEvent(EiBankingEvents.WithdrawMoneySuccess, function(newBalance)
		print("new balance from withdraw", newBalance)
		cb({ status = 'ok', data = newBalance })
	end)
end)

RegisterNetEvent(EiBankingEvents.SyncDefaultAccountSuccess)
AddEventHandler(EiBankingEvents.SyncDefaultAccountSuccess, function(balance)
	SendReactMessage("SyncDefaultAccount", balance)
end)

-- TransferMoney
RegisterNUICallback(EiBankingEvents.TransferMoney, function(data, cb)
	TriggerServerEvent(EiBankingEvents.TransferMoney, data)

	RegisterNetEvent(EiBankingEvents.TransferMoneySuccess, function(data)
		cb({ status = 'ok', data = data })
	end)
end)