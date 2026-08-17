const TOPIC_KEY = "besinci-mevsim-contact-topic";
const VEHICLE_KEY = "besinci-mevsim-contact-vehicle";

export function setContactIntent(topic: string, vehicle?: string) {
  try {
    sessionStorage.setItem(TOPIC_KEY, topic);
    if (vehicle) sessionStorage.setItem(VEHICLE_KEY, vehicle);
    else sessionStorage.removeItem(VEHICLE_KEY);
  } catch {
    // sessionStorage can fail in private mode
  }
}

export function readContactIntent(): { topic: string | null; vehicle: string | null } {
  try {
    return {
      topic: sessionStorage.getItem(TOPIC_KEY),
      vehicle: sessionStorage.getItem(VEHICLE_KEY),
    };
  } catch {
    return { topic: null, vehicle: null };
  }
}
