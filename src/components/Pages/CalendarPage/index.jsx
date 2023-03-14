import { Calendar, momentLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";

import moment from 'moment'

export default function CalendarPage() {
  const localizer = momentLocalizer(moment)

  return (
    <div>
      <Calendar
        events={[]}
        localizer={localizer}
        style={{ height: 500 }}
      />
    </div>
  )
}