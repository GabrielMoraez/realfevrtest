import { useParams } from 'react-router-dom'
import emojiList from 'emojis-list'
import { useMemo } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

export default function EmojiPage() {
  const { hash } = useParams()
  const localizer = momentLocalizer(moment)

  const decodedEmojis = useMemo(() => {
    const decodedEmojis = []
    
    for (let i = 0; i < hash.length; i += 2) {
      const hex = hash.slice(i, i + 1)
      const index = parseInt(hex, 36) % emojiList.length
      decodedEmojis.push(emojiList[index])
    }

    return decodedEmojis
  }, [hash])

  const handleSelectSlot = (slotInfo) => {
    console.log(slotInfo)
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: 20,
          marginBottom: 50
        }}
      >
        YOUR EMOJIS: {decodedEmojis}
        <br />
        YOU CAN ADD THEM TO A DATE BELOW
      </div>
      <Calendar
        localizer={localizer}
        selectable
        events={[]}
        style={{ height: 500 }}
        onSelectSlot={handleSelectSlot}
      />

    </div>
  )
}