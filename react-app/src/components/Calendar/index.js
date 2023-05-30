import React, { useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import "./calendar.css"
import 'react-calendar/dist/Calendar.css';
import { setTime11am } from '../../Utils';

function CalendarComponent({ setStartDate, startDate, setShowCalendar, showCalendar }) {
    const calendarRef = useRef()
    
    useEffect(() => {
        if (!showCalendar) return;

        const closeMenu = (e) => {
          if (!calendarRef.current.contains(e.target)) {
            setShowCalendar(false);
          }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [showCalendar]);

    // Event Handlers ------------------------------------------------------------------------------------------
    const handleDateChange = (date) => {
        setStartDate(setTime11am(date))
        setShowCalendar(false)
    }

    // Calendar prop functions ---------------------------------------------------------------------------------
    const tileDisabled = ({ date }) => {
        // Disable dates prior to tomorrow and weekends
        return date <= new Date() || date.getDay() === 0 || date.getDay() === 6;
    };


    return (
        <div className='calendar-container' ref={calendarRef}>
            <Calendar
                value={startDate}
                onChange={handleDateChange}
                tileDisabled={tileDisabled}
            />
        </div>
    )
}

export default CalendarComponent
