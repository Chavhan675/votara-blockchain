"use client"

import { useState, useEffect } from "react"

export default function useWallet(){

  const [account,setAccount] = useState(null)
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")

  // Auto connect if wallet already connected
  useEffect(()=>{

    if(window.ethereum){

      window.ethereum.request({method:"eth_accounts"})
      .then(accounts=>{
        if(accounts.length > 0){
          setAccount(accounts[0])
        }
      })

      // Detect account change
      window.ethereum.on("accountsChanged",(accounts)=>{
        setAccount(accounts[0] || null)
      })

      // Detect network change
      window.ethereum.on("chainChanged",()=>{
        window.location.reload()
      })

    }

  },[])

  const connectWallet = async ()=>{

    if(!window.ethereum){
      setError("MetaMask not detected")
      alert("Please install MetaMask")
      return
    }

    try{

      setLoading(true)

      const accounts = await window.ethereum.request({
        method:"eth_requestAccounts"
      })

      setAccount(accounts[0])
      setError("")

    }catch(err){

      console.error(err)
      setError("Wallet connection failed")

    }finally{

      setLoading(false)

    }

  }

  const disconnectWallet = ()=>{

    setAccount(null)

  }

  return{
    account,
    loading,
    error,
    connectWallet,
    disconnectWallet
  }

}