import { subMonths, addMonths, formatISO } from "date-fns";
import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { getOathToken } from "./clerk.action";

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

export async function listEvents(email: string) {
  const auth = await getOathToken();
  const oAuth2Client = new OAuth2Client();

  const YOUR_OAUTH2_TOKEN = {
    access_token: auth,
    scope: "https://www.googleapis.com/auth/calendar",
    token_type: "Bearer",
  };
  oAuth2Client.setCredentials(YOUR_OAUTH2_TOKEN);

  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  // Calculate time range: last 1 months to next 2 months
  const timeMin = subMonths(new Date(), 1);
  const timeMax = addMonths(new Date(), 3);

  const res = await calendar.events.list({
    calendarId: email,
    maxResults: 2000, // Updated maxResults to 2000
    singleEvents: true,
    orderBy: "startTime",
    timeMin: formatISO(timeMin), // ISO string for start time
    timeMax: formatISO(timeMax), // ISO string for end time
  });

  const events = res.data.items;
  if (!events || events.length === 0) {
    console.log("No upcoming events found.");
    return;
  }

  return events;
}

export async function scheduleMeeting(
  senderEmail: string,
  receiverEmail: string,
  startTime: string,
  endTime: string
) {
  const auth = await getOathToken();
  const oAuth2Client = new OAuth2Client();

  const YOUR_OAUTH2_TOKEN = {
    access_token: auth,
    scope: "https://www.googleapis.com/auth/calendar",
    token_type: "Bearer", // Unix timestamp in milliseconds
  };
  oAuth2Client.setCredentials(YOUR_OAUTH2_TOKEN);

  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  const event = {
    summary: "Meeting",
    description: "This is a Google Meet video conference",
    start: {
      dateTime: startTime,
      timeZone: "America/New_York", // Specify your time zone here
    },
    attendees: [{ email: senderEmail }, { email: receiverEmail }],
    end: {
      dateTime: endTime,
      timeZone: "America/New_York", // Specify your time zone here
    },
    conferenceData: {
      createRequest: {
        requestId: "your-custom-request-id-2e827e629e7",
        conferenceSolutionKey: {
          type: "hangoutsMeet",
        },
      },
    },
    reminders: {
      useDefault: false,
      overrides: [{ method: "popup", minutes: 10 }],
    },
  };

  try {
    const res = await calendar.events.insert({
      calendarId: senderEmail,
      requestBody: event, // Pass the event directly as the request body
      conferenceDataVersion: 1, // Include this to enable video conference data
    });
  } catch (error) {
    console.error("Error creating event:", error);
  }
}
