"use strict";

(function () {
  describe("Timeline", function () {
    var invalidParams = {foo: "bar"},
      validParams = {
        "firstName": "Chip",
        "lastName": "Bitly",
        "age": 9,
        "events": [
          {
            "age": 0,
            "content": "was born"
          },
          {
            "age": 4,
            "content": "learned to ride a bike"
          }
        ]
      },
      unorderedAges = {
        events: [
          {age: 5},
          {age: 3},
          {age: 8}
        ]
      };

    it("should expect valid parameters when instantiated", function () {
      var badTimeline = new app.Timeline(invalidParams);
      var goodTimeline = new app.Timeline(validParams);
      expect(badTimeline.play).toEqual(goodTimeline.play);
      expect(goodTimeline).toBeDefined();
    });

    it("should sort events by age", function () {
      var timeline = new app.Timeline(unorderedAges);
      expect(timeline.events[0].age).toBe(3);
    });

    it("should set a duration on each event object", function () {
      var goodTimeline = new app.Timeline(validParams);
      expect(goodTimeline.events[0].duration).toBeDefined();
      expect(goodTimeline.events[0].duration).toEqual(8000);
      expect(goodTimeline.events[1].duration).toEqual(10000);
    });

    it("should set itself to finished when there are no more events", function () {

    })

  });
})();

