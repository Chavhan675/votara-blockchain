"use client"

import useWallet from "../hooks/useWallet"
import { shortenAddress } from "../utils/helpers"

export default function ConnectWallet(){

  const { account, connectWallet, disconnectWallet, loading, error } = useWallet()

  return(

    <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">

      {/* Wallet Status */}

      {account ? (

        <div className="flex items-center gap-3">

          <span className="text-sm bg-green-600 text-white px-3 py-1 rounded-full">
            Connected
          </span>

          <span className="text-gray-700 font-medium">
            {shortenAddress(account)}
          </span>

        </div>

      ) : (

        <span className="text-gray-500">
          Wallet not connected
        </span>

      )}

      {/* Buttons */}

      {account ? (

        <button
          onClick={disconnectWallet}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Disconnect
        </button>

      ) : (

        <button
          onClick={connectWallet}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >

          {loading ? "Connecting..." : "Connect Wallet"}

        </button>

      )}

      {/* Error Message */}

      {error && (
        <p className="text-red-500 text-sm mt-2">
          {error}
        </p>
      )}

    </div>

  )

}