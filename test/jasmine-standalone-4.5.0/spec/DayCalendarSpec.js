describe("The Day View Calendar", function () {
    let calendar = Object.create(Calendar);

    it("should set event start time to minimum value if outside the given range", function () {
        let event = [{id: 1, start: -50, end: 540},];

        expect(calendar.renderEvent(event)[0].start).toEqual(0)
    });

    it("should set event end time to maximum value if outside the given range", function () {
        let event = [{id: 1, start: 30, end: 700},];

        expect(calendar.renderEvent(event)[0].end).toEqual(540)
    });

    it("should throw error if events are not in array format", function () {
        let event = {id: 1, start: 60, end: 120};

        expect(function () {
            calendar.renderEvent(event);
        }).toThrow();
    });

    it("should not have any run time error in case event array is empty", function () {
        expect(calendar.renderEvent([])).toEqual([]);
    });

    it("should render event with max time interval", function () {
        let event = [{id: 1, start: 0, end: 540},];

        expect(calendar.renderEvent(event)).toEqual([{id: 1, start: 0, end: 540, top: 0, width: 540, left: 10}]);
    });

    it("should sort two events according to time", function () {
        let firstEvent = {id: 1, start: 60, end: 120};
        let secondEvent = {id: 2, start: 30, end: 120};

        expect([firstEvent, secondEvent].sort(calendar.compareEvents)).toEqual([secondEvent, firstEvent]);
    });

    it("should sort three events where two events have same start or end time", function () {
        let firstEvent = {id: 1, start: 60, end: 220};
        let secondEvent = {id: 2, start: 60, end: 120};
        let thirdEvent = {id: 3, start: 10, end: 120};

        expect([firstEvent, secondEvent, thirdEvent].sort(calendar.compareEvents)).toEqual([thirdEvent, firstEvent, secondEvent]);
    });

    it("should have maximum width in case of single event", function () {
        let event = [{id: 1, start: 60, end: 120}];
        let response = calendar.renderEvent(event);

        expect(response[0].width).toEqual(540);
    });

    it("should render events with same & different widths with overlap", function () {
        let events = [{id: 1, start: 60, end: 180}, {id: 2, start: 100, end: 240}, {
            id: 3, start: 150, end: 400
        }, {id: 4, start: 250, end: 540}];
        expect(calendar.renderEvent(events)).toEqual([{
            id: 1, start: 60, end: 180, top: 60, width: 180, left: 10
        }, {id: 2, start: 100, end: 240, top: 100, width: 180, left: 190}, {
            id: 3, start: 150, end: 400, top: 150, width: 180, left: 370
        }, {id: 4, start: 250, end: 540, top: 250, width: 360, left: 10}]);
    });

    it("should have equal width in case two events collide", function () {
        let events = [{id: 1, start: 100, end: 120}, {id: 2, start: 100, end: 240}];

        let response = calendar.renderEvent(events);
        expect(response[0].width).toEqual(540 / 2);
        expect(response[1].width).toEqual(540 / 2);
    });

    it("should not overlap two colliding events", function () {
        let events = [{id: 1, start: 60, end: 120}, {id: 2, start: 100, end: 240}];

        expect(calendar.renderEvent(events)).toEqual([{
            id: 1, start: 60, end: 120, width: 270, left: 10, top: 60
        }, {id: 2, start: 100, end: 240, width: 270, left: 280, top: 100}]);
    });

    it("should render multiple events in 2 columns", function () {
        let events = [{id: 0, start: 60, end: 120}, {id: 1, start: 100, end: 240}, {id: 2, start: 200, end: 240}];

        expect(calendar.renderEvent(events)).toEqual([{
            id: 0, start: 60, end: 120, width: 270, left: 10, top: 60
        }, {id: 1, start: 100, end: 240, width: 270, left: 280, top: 100}, {
            id: 2, start: 200, end: 240, width: 270, left: 10, top: 200
        }]);
    });

    it("should render three colliding events without overlapping ", function () {
        let events = [{id: 1, start: 60, end: 120}, {id: 2, start: 100, end: 240}, {id: 3, start: 200, end: 300}];

        expect(calendar.renderEvent(events)).toEqual([{
            id: 1, start: 60, end: 120, width: 270, left: 10, top: 60
        }, {id: 2, start: 100, end: 240, width: 270, left: 280, top: 100}, {
            id: 3, start: 200, end: 300, width: 270, left: 10, top: 200
        }]);
    });

    it("should render multiple colliding events", function () {
        let events = [{id: 1, start: 60, end: 180}, {id: 2, start: 100, end: 240}, {
            id: 3, start: 150, end: 400
        }, {id: 4, start: 185, end: 230}, {id: 5, start: 250, end: 600}];
        expect(calendar.renderEvent(events)).toEqual([{
            id: 1, start: 60, end: 180, top: 60, width: 180, left: 10
        }, {id: 2, start: 100, end: 240, top: 100, width: 180, left: 190}, {
            id: 3, start: 150, end: 400, top: 150, width: 180, left: 370
        }, {id: 4, start: 185, end: 230, top: 185, width: 180, left: 10}, {
            id: 5, start: 250, end: 540, top: 250, width: 360, left: 10
        }]);
    });

    it("should display random multiple events in correct order", function () {
        let events = [{id: 4, start: 110, end: 200}, {id: 2, start: 25, end: 100}, {id: 0, start: 10, end: 550}, {
            id: 5, start: 260, end: 300
        }, {id: 6, start: 600, end: 700}, {id: 3, start: 35, end: 250}, {id: 1, start: 20, end: 100}];
        expect(calendar.renderEvent(events)).toEqual([{
            id: 0, start: 10, end: 540, top: 10, width: 135, left: 10
        }, {id: 1, start: 20, end: 100, top: 20, width: 135, left: 145}, {
            id: 2, start: 25, end: 100, top: 25, width: 135, left: 280
        }, {id: 3, start: 35, end: 250, top: 35, width: 135, left: 415}, {
            id: 4, start: 110, end: 200, top: 110, width: 270, left: 145
        }, {id: 5, start: 260, end: 300, top: 260, width: 405, left: 145}, {
            id: 6, start: 510, end: 540, top: 510, width: 405, left: 145
        }]);
    });
});