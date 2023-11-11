import { EventListener } from "./type";

/**
 * A class representing an event emitter that allows registering and emitting events.
 */
export class LokiEventEmitter {
  public events: { [key: string]: EventListener[] } = {};
  public asyncListeners = false;
  /**
   * Registers an event listener for the specified event(s).
   * @param eventName - The name of the event(s) to listen for.
   * @param listener - The function to be called when the event(s) is emitted.
   * @returns The event listener function.
   */
  public on(
    eventName: string | string[],
    listener: EventListener,
  ): EventListener {
    if (Array.isArray(eventName)) {
      eventName.forEach((currentEventName) => {
        this.on(currentEventName, listener);
      });
      return listener;
    }
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
    return listener;
  }

  /**
   * Emits an event with the given name and arguments.
   * @param eventName - The name of the event to emit.
   * @param args - The arguments to pass to the event listeners.
   * @returns void
   */
  public emit(eventName: string, ...args: unknown[]): void {
    if (eventName && this.events[eventName]) {
      if (this.events[eventName].length) {
        this.events[eventName].forEach((listener) => {
          if (this.asyncListeners) {
            setTimeout(() => {
              listener.apply(this, args);
            }, 1);
          } else {
            listener.apply(this, args);
          }
        });
      }
    } else {
      throw new Error("No event " + eventName + " defined");
    }
  }

  /**
   * Adds a listener function to the specified event.
   * @param eventName - The name of the event to listen for.
   * @param listener - The function to be called when the event is emitted.
   * @returns The listener function that was added.
   */
  public addListener(
    eventName: string | string[],
    listener: EventListener,
  ): EventListener {
    return this.on(eventName, listener);
  }

  /**
   * Removes a listener from the specified event(s).
   *
   * @param events - The name of the event or an array of event names.
   * @param listener - The listener function to remove.
   */
  public removeListener(
    events: string | string[],
    listener: EventListener,
  ): void {
    if (Array.isArray(events)) {
      events.forEach((eventName) => {
        this.removeListener(eventName, listener);
      });
    } else {
      if (this.events[events]) {
        const index = this.events[events].indexOf(listener);
        this.events[events].splice(index, 1);
      }
    }
  }
}
