import type { Event } from "@prisma/client";

// locals
import FetchFactory from "../repository/factory";

export class EventsModule extends FetchFactory<Event[]> {
  private RESOURCE = "/api/events";

  /**
   * Return the events as array
   * @returns
   */
  list(): Promise<Event[]> {
    return this.call<Event[]>("GET", `${this.RESOURCE}`);
  }

  /**
   * Return the event by id
   * @param id
   * @returns
   */
  get(id: number): Promise<Event> {
    return this.call<Event>("GET", `${this.RESOURCE}/${id}`);
  }

  /**
   * Create a new event
   * @param event
   * @returns
   */
  create(event: Event): Promise<Event> {
    return this.call<Event>("POST", `${this.RESOURCE}`, event);
  }

  /**
   * Update an event by id
   * @param id
   * @param event
   * @returns
   */
  update(id: number, event: Event): Promise<Event> {
    return this.call<Event>("PUT", `${this.RESOURCE}/${id}`, event);
  }

  /**
   * Delete an event by id
   * @param id
   * @returns
   */
  delete(id: number): Promise<void> {
    return this.call<void>("DELETE", `${this.RESOURCE}/${id}`);
  }
}
