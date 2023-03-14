import { useParams } from 'react-router-dom'
import emojiList from 'emojis-list'
import { useEffect, useMemo, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import Web3 from "web3"

export default function EmojiPage() {
  const storedEvents = JSON.parse(localStorage.getItem('events')) || [];

  const { hash } = useParams()
  const localizer = momentLocalizer(moment)
  const [web3, setWeb3] = useState(null)
  const [account, setAccount] = useState(null)
  const [events, setEvents] = useState(storedEvents)


  // Save new events at the localStorage
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  // Try to connect to the web3 provider
  useEffect(() => { 
    const connectWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum)
        try {
          await window.ethereum.enable()
          const accounts = await web3.eth.getAccounts()
          setWeb3(web3)
          setAccount(accounts[0])
        } catch(error) {
          console.error(error)
        }
      } else if (window.web3) {
        const web3 = new Web3(window.web3.currentProvider)
        setWeb3(web3)
      } else {
        console.error('No web3 provider found')
      }
    }
    connectWeb3()
  }, [])

  // Decode the path into emojis
  const decodedEmojis = useMemo(() => {
    const decodedEmojis = []
    
    for (let i = 0; i < hash.length; i += 2) {
      const hex = hash.slice(i, i + 1)
      const index = parseInt(hex, 36) % emojiList.length
      decodedEmojis.push(emojiList[index])
    }

    return decodedEmojis
  }, [hash])


  // Create the message and adds the emojis to the selected date
  const handleSelectSlot = async (slotInfo) => {
    if (web3 && account) {
      const {start, end} = slotInfo
      const message = JSON.stringify({ decodedEmojis, start, end })
      const signature = await web3.eth.personal.sign(
        message,
        account,
      )

      let event = {
        signature,
        title: decodedEmojis,
        start,
        end,
        path: hash
      }

      setEvents([
        ...events,
        event
      ])
    }
  };

  return (
    <div>
      {web3 && account ? (
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              justifyContent: 'center',
              textAlign: 'center',
              fontSize: 20,
              marginBottom: 50
            }}
          >
            <span>Connected to web3 wallet</span>
            <span>{account}</span>
            <span>YOUR EMOJIS: {decodedEmojis}</span>
            <span>YOU CAN ADD THEM TO A DATE BELOW</span>
          </div>
          <Calendar
            localizer={localizer}
            selectable
            events={events}
            style={{ height: 500 }}
            onSelectSlot={handleSelectSlot}
          />
        </div>
      ) : (
        <p>Connect your web3 wallet to add decoded emojis to the calendar</p>
      )}
    </div>
  )
}