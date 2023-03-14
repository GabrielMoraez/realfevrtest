import { Calendar, momentLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css"
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

export default function CalendarPage() {
  const localizer    = momentLocalizer(moment)
  const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
  const navigate     = useNavigate()

  const handleSelectEvent = useCallback(
    ({ path }) => navigate(`/${path}`),
    []
  )

  return (
    <div>
      <Calendar
        events={storedEvents}
        localizer={localizer}
        style={{ height: 500 }}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  )
}