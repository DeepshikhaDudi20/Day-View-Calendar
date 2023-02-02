(function () {
    'use strict';

    let defaultEvents = [
        {id: 0, start: 30, end: 90},
        {id: 1, start: 120, end: 180},
        {id: 2, start: 150, end: 270},
        {id: 3, start: 180, end: 240},
        {id: 4, start: 300, end: 540}];

    // To create calendar events with title and location
    const createCalendarEvent = function (event) {
        let div = document.createElement('div');
        div.className = 'event';
        div.style.width = event.width + 'px';
        div.style.height = (event.end - event.start) - 4 + 'px';
        div.style.top = event.top + 'px';
        div.style.left = event.left + 'px';
        div.style['z-index'] = event.left;

        div.innerHTML = `
        <div class="event-title">Event Title</div>
        <div class="event-location">Event Location</div>
        `;
        return div;
    };

    // To create calendar timeline with minimum of 30 minutes interval
    const createCalendarTimeline = function () {
        let timeline = document.getElementById("calendar-timeline");

        let fragment = document.createDocumentFragment();

        for (let i = 9; i <= 18; i += 0.5) {
            let span = document.createElement('span');
            span.className = (i % 1 === 0) ? 'hour' : 'half-hour';
            span.appendChild(timeToText(i));
            fragment.appendChild(span);
        }

        timeline.appendChild(fragment);
    };

    // To display calendar timeline in 12 hours format
    const timeToText = function (time) {
        let timeFragment = document.createDocumentFragment();
        let hour = Math.floor(time >= 13 ? time - 12 : time);
        let minutes = time % 1 === 0 ? ":00" : ":30";
        let meridiem = time >= 12 ? "PM" : "AM";
        let textNode = document.createTextNode(hour + minutes + ' ' + meridiem);
        timeFragment.appendChild(textNode);
        return timeFragment;
    };

    // To render calendar events and timeline with default event values or run time events passed from console
    const renderDay = function (defaultEventsValue) {

        //clear existing events before adding new events
        let parentTimeline = document.getElementById("calendar-timeline");
        let parentEvents = document.getElementById("calendar-events");

        parentTimeline.innerHTML = '';
        parentEvents.innerHTML = '';

        //Generating calendar events based on value passed
        let calendarContainer = document.getElementById('calendar-events');
        defaultEventsValue = Calendar.renderEvent(defaultEventsValue);

        let eventsFragment = document.createDocumentFragment();
        defaultEventsValue.forEach(function (event) {
            let div = createCalendarEvent(event);
            eventsFragment.appendChild(div);
        });
        calendarContainer.appendChild(eventsFragment);

        createCalendarTimeline();
    };

    window.addEventListener('load', function () {
        renderDay(defaultEvents)
    }, false);

    // renderDay added to global namespace so that it could be called from console
    // new events can be added from console
    window.renderDay = renderDay;

})();
