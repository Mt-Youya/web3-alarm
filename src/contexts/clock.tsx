import { createContext } from "react"
import { ethers, parseEther,AbiCoder  } from "ethers"
import { contractABI, contractAddress } from "@/constants/contractConfig.json"

export const ClockContext = createContext()

const { ethereum } = window
export const abiCoder = new AbiCoder()

async function createEthereumContract() {
    const provider = new ethers.BrowserProvider(ethereum)
    const signer = await provider.getSigner()
    return new ethers.Contract(contractAddress, contractABI, signer)
}

export default function ClockProvider({ children }) {
    const contract = createEthereumContract()

    async function onSignup() {
        const value = +new Date

        const parsedValue = parseEther(value)
        contract.set({ value: parsedValue })
    }

    return (
        <ClockContext.Provider
            value={{
                contract,
                onSignup,
            }}
        >
            {children}
        </ClockContext.Provider>
    )
}
