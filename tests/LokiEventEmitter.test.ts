import { LokiEventEmitter } from "../src/LokiEventEmitter";

describe("LokiEventEmitter", () => {
  let emitter: LokiEventEmitter;

  beforeEach(() => {
    emitter = new LokiEventEmitter();
  });

  describe("on", () => {
    it("should add a listener for the given event name", () => {
      const listener = jest.fn();
      emitter.on("test", listener);
      expect(emitter["events"]["test"]).toContain(listener);
    });

    it("should add multiple listeners for an array of event names", () => {
      const listener1 = jest.fn();
      const listener2 = jest.fn();
      emitter.on(["test1", "test2"], listener1);
      emitter.on(["test1", "test2"], listener2);
      expect(emitter["events"]["test1"]).toContain(listener1);
      expect(emitter["events"]["test1"]).toContain(listener2);
      expect(emitter["events"]["test2"]).toContain(listener1);
      expect(emitter["events"]["test2"]).toContain(listener2);
    });

    it("should return the listener", () => {
      const listener = jest.fn();
      const result = emitter.on("test", listener);
      expect(result).toBe(listener);
    });
  });

  describe("emit", () => {
    it("should call all listeners for the given event name", () => {
      const listener1 = jest.fn();
      const listener2 = jest.fn();
      emitter.on("test", listener1);
      emitter.on("test", listener2);
      emitter.emit("test");
      expect(listener1).toHaveBeenCalled();
      expect(listener2).toHaveBeenCalled();
    });

    it("should pass all arguments to the listeners", () => {
      const listener = jest.fn();
      emitter.on("test", listener);
      emitter.emit("test", 1, "two", { three: 3 });
      expect(listener).toHaveBeenCalledWith(1, "two", { three: 3 });
    });

    it("should throw an error if the event name is not defined", () => {
      expect(() => emitter.emit("test")).toThrow("No event test defined");
    });

    it("should call listeners asynchronously if asyncListeners is true", (done) => {
      const listener = jest.fn();
      emitter.on("test", listener);
      emitter["asyncListeners"] = true;
      emitter.emit("test");
      expect(listener).not.toHaveBeenCalled();
      setTimeout(() => {
        expect(listener).toHaveBeenCalled();
        done();
      }, 10);
    });
  });

  describe("addListener", () => {
    it("should add a listener for the given event name", () => {
      const listener = jest.fn();
      emitter.addListener("test", listener);
      expect(emitter["events"]["test"]).toContain(listener);
    });

    it("should add multiple listeners for an array of event names", () => {
      const listener1 = jest.fn();
      const listener2 = jest.fn();
      emitter.addListener(["test1", "test2"], listener1);
      emitter.addListener(["test1", "test2"], listener2);
      expect(emitter["events"]["test1"]).toContain(listener1);
      expect(emitter["events"]["test1"]).toContain(listener2);
      expect(emitter["events"]["test2"]).toContain(listener1);
      expect(emitter["events"]["test2"]).toContain(listener2);
    });

    it("should return the listener", () => {
      const listener = jest.fn();
      const result = emitter.addListener("test", listener);
      expect(result).toBe(listener);
    });
  });

  describe("removeListener", () => {
    it("should remove a listener for the given event name", () => {
      const listener = jest.fn();
      emitter.on("test", listener);
      emitter.removeListener("test", listener);
      expect(emitter["events"]["test"]).not.toContain(listener);
    });

    it("should remove multiple listeners for an array of event names", () => {
      const listener1 = jest.fn();
      const listener2 = jest.fn();
      emitter.on(["test1", "test2"], listener1);
      emitter.on(["test1", "test2"], listener2);
      emitter.removeListener(["test1", "test2"], listener1);
      expect(emitter["events"]["test1"]).not.toContain(listener1);
      expect(emitter["events"]["test1"]).toContain(listener2);
      expect(emitter["events"]["test2"]).not.toContain(listener1);
      expect(emitter["events"]["test2"]).toContain(listener2);
    });

    it("should not remove other listeners for the same event name", () => {
      const listener1 = jest.fn();
      const listener2 = jest.fn();
      emitter.on("test", listener1);
      emitter.on("test", listener2);
      emitter.removeListener("test", listener1);
      expect(emitter["events"]["test"]).not.toContain(listener1);
      expect(emitter["events"]["test"]).toContain(listener2);
    });

    it("should not throw an error if the event name is not defined", () => {
      const listener = jest.fn();
      expect(() => emitter.removeListener("test", listener)).not.toThrow();
    });

    it("should remove the listener from all events if events is an array", () => {
      const listener = jest.fn();
      emitter.on(["test1", "test2"], listener);
      emitter.removeListener(["test1", "test2"], listener);
      expect(emitter["events"]["test1"]).not.toContain(listener);
      expect(emitter["events"]["test2"]).not.toContain(listener);
    });
  });
});
