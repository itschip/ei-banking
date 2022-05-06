import { fetchNui } from "../../../utils/fetchNui";
import { Account } from "../../../types/account";
import { useAccountsActions } from "./useAccountsActions";
import { useSnackbar } from "notistack";

export const useAccountsApi = () => {
	const { createLocalAccount, updateAccountBalance } = useAccountsActions();
	const { enqueueSnackbar } = useSnackbar();
	
	const createAccount = (name: string) => {
		fetchNui('ei-banking:createAccount', { name }).then((res) => {
			console.log('new account', res)
			createLocalAccount(res)
		})
	}
	
	const depositMoney = (account: Account, amount: string) => {
		fetchNui('ei-banking:depositMoney', {
			account,
			amount: parseInt(amount, 10)
		}).then((resp) => {
			if (resp.status === 'ok') {
				updateAccountBalance(account.id, resp.data)
				enqueueSnackbar(`You deposited ${amount} to ${account.accountName}`, { variant: 'success' })
			}
		})
	}
	
	const withdrawMoney = (account: Account, amount: string) => {
		console.log('withdrawMoney account', account)
		fetchNui('ei-banking:withdrawMoney', {
			account,
			amount: parseInt(amount, 10)
		}).then((resp) => {
			if (resp.status === 'ok') {
				updateAccountBalance(account.id, resp.data)
				enqueueSnackbar(`You have withdrawn ${amount} from ${account.accountName}`, { variant: 'success' })
			}
		})
	}
	
	const transferMoney = (sourceAccount: Account, targetAccount: Account | string, amount: string) => {
		fetchNui('ei-banking:transferMoney', {
			sourceAccount,
			targetAccount,
			amount: parseInt(amount, 10)
		}).then((resp) => {
			let targetAccountName;
			if (typeof targetAccount !== "string") {
				targetAccountName = targetAccount.accountName;
			} else {
				targetAccountName = targetAccount
			}
			
			updateAccountBalance(sourceAccount.id, resp.data)
			
			enqueueSnackbar(`You have transferred ${amount} from ${sourceAccount.accountName} to ${targetAccountName}`, { variant: 'success' })
		})
	}
	
	return {
		createAccount,
		depositMoney,
		withdrawMoney,
		transferMoney
	}
}
