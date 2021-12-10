import React, {useState} from 'react'
import "react-dates/initialize"
import { DateRangePicker } from 'react-dates'
import "react-dates/lib/css/_datepicker.css";

function DatePicker(props) {
    const {startDate, onStartDate, endDate, onEndDate,focusedInput,  onFocusedInput} = props || {};

    const handleDatesChange = ({ startDate, endDate }) => {
        onStartDate(startDate);
        onEndDate(endDate);
      };

      return (
          <div className="App">
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onDatesChange={handleDatesChange}
                focusedInput={focusedInput}
                onFocusChange={focusedInput => onFocusedInput(focusedInput)}
                onStartDate={onStartDate}
                onEndDate={onEndDate}
              />
            
          </div>
      )
}

export default DatePicker;