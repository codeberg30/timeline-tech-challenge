"use strict";

(function () {
  describe("TimelineViewModel", function () {

    var validParams = {
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
      timelineInstance = app.TimelineViewModel.prototype,
      vm, container;

    beforeEach(function () {
      spyOn(timelineInstance, "requestTimeline")
        .andCallFake(function () {
          this.data = validParams;
          this.initializeView();
          this.initializeModel();
          return {then: function () {
          }}
        });

      container = document.createElement('div');
      document.body.appendChild(container);
      vm = new app.TimelineViewModel(container, 'dummy');
    });

    afterEach(function () {
      document.body.removeChild(container);
      vm = null;
    })

    it("should instantiate the viewModel with the mocked parameters", function () {
      expect(vm.data).toBeDefined();
    });

    it("should call requestTimeline during instantiation if given a URL", function () {
      expect(timelineInstance.requestTimeline).toHaveBeenCalled();
    });

    it("should contain two elements", function () {
      expect(vm.container.children.length).toBe(2);
    });

    it("should play the timeline when the playback control is first clicked", function () {
      var playbackControl = vm.container.lastElementChild;
      expect(playbackControl.textContent).toBe("play");
      playbackControl.click();
      waitsFor(function () {
        return playbackControl.textContent === 'pause';
      }, "The text should be 'pause'", 5000);
      runs(function () {
        expect(playbackControl.textContent).toBe("pause");
      });
    });

  });
})();

