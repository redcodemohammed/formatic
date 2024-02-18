import { type Event, Category, EventStatus } from "@prisma/client";

export const useEventsStore = defineStore("Events", () => {
  const newEvent = useState<Event>("new-event", () => {
    return {
      capacity: 0,
      description: "",
      category: Category.Other,
      createdAt: new Date(),
      updatedAt: new Date(),
      duration: 0,
      startDate: new Date(),
      endDate: new Date(),
      registrationStartDate: new Date(),
      registrationEndDate: new Date(),
      fields: [],
      id: "",
      isPublished: false,
      location: "",
      name: "",
      overCapacity: false,
      ownerId: "",
      status: EventStatus.DRAFT,
    };
  });
  return { newEvent };
});
