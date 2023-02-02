'use strict';

const Calendar = {
    timeDuration: 540, padding: 10,

    // To compares two events and arrange them in correct order of timeline
    compareEvents: function (eventA, eventB) {
        return eventA.start - eventB.start;
    },

    renderEvent: function renderEvent(evts) {
        if (!Array.isArray(evts)) {
            throw new Error("Events must be an Array!");
        }

        //To find events that coincides with each other
        let self = this;
        let events = evts;
        let eventsLength = evts.length;
        let columnEventPositions = {};
        let totalEventsColumns = 0;

        if (eventsLength > 0) {

            //To sort events in correct order
            events.sort(this.compareEvents);

            columnEventPositions[events[0].id] = 0;


            for (let i = 0; i < eventsLength; i++) {
                let maxColumn = 0;
                let event = events[i];

                //Handling edge case, setting up min, max for event start and end time
                //Event start time should be less than end time
                if (event.start > event.end) {
                    throw new Error("Event start time cannot be greater than end time ");
                }
                let start = Math.max(0, Math.min(event.start, 510));
                let end = Math.max(30, Math.min(event.end, 540));
                event.start = start;
                event.end = end;

                // to check for events that coincide with each other (i.e. have overlapping start and end times)
                // to calculate the column event position on calendar for each event and the number of columns
                for (let j = 0; j < i; j++) {
                    let prevEvent = events[j];
                    if (event.start >= prevEvent.start && event.start < prevEvent.end) {
                        if (columnEventPositions[prevEvent.id] <= maxColumn) {
                            maxColumn++;
                        }
                    }
                    columnEventPositions[event.id] = maxColumn;
                    totalEventsColumns = Math.max(totalEventsColumns, maxColumn);
                }
            }

            let colWidth = self.timeDuration / (totalEventsColumns + 1);

            // To check the width of an event, to find overlapping times.
            // The width of the event is determined by the minimum space between the event
            // and all other events in the same column.
            // calculate the display dimensions of events in a calendar layout
            for (let i = 0; i < eventsLength; i++) {
                let event = events[i];
                let posI = columnEventPositions[event.id];
                let eventWidth = totalEventsColumns - posI + 1;

                for (let j = 0; j < eventsLength; j++) {
                    if (i !== j) {
                        let otherEvent = events[j];
                        let posJ = columnEventPositions[otherEvent.id];
                        if (posJ >= posI && (event.start >= otherEvent.start && event.start < otherEvent.end) || (otherEvent.start >= event.start && otherEvent.start < event.end)) {

                            eventWidth = Math.min(eventWidth, posJ - posI);
                            if (eventWidth === 1) {
                                break;
                            }
                        }
                    }
                }
                event.top = event.start ;
                event.width = Math.max(eventWidth, 1) * colWidth;
                event.left = posI * colWidth + this.padding;
            }
        }
        return events;
    }

};


       

