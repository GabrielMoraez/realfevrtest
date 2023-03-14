import { useParams } from 'react-router-dom'
import emojiList from 'emojis-list'
import { useMemo } from 'react'

export default function EmojiPage() {
  const { hash } = useParams()

  const decodedEmojis = useMemo(() => {
    const decodedEmojis = []
    
    for (let i = 0; i < hash.length; i += 2) {
      const hex = hash.slice(i, i + 1)
      const index = parseInt(hex, 36) % emojiList.length
      decodedEmojis.push(emojiList[index])
    }

    return decodedEmojis
  }, [hash])

  return (
    <div>
      {decodedEmojis}
    </div>
  )
}