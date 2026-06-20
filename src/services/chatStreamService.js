// services/chat-stream.service.ts

export async function streamChatMessage({
  message,
  conversationId,
  onEvent,
}) {

  const response =
    await fetch(
      // `${process.env.NEXT_PUBLIC_API_URL}/ai/chat/stream`,
      `http://localhost:3000/ai/chat/stream`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${
              localStorage.getItem("token")
            }`,
        },

        body: JSON.stringify({
          message,
          conversationId,
        }),
      }
    );

  if (!response.body) {
    throw new Error(
      "Streaming non supporté"
    );
  }

  const reader =
    response.body.getReader();

  const decoder =
    new TextDecoder();

  let buffer = "";

  while (true) {

    const {
      done,
      value,
    } =
      await reader.read();

    if (done) {
      break;
    }

    buffer += decoder.decode(
      value,
      {
        stream: true,
      }
    );

    const events =
      buffer.split("\n\n");

    buffer =
      events.pop() ?? "";

    for (const eventText of events) {

      const line =
        eventText
          .split("\n")
          .find(
            l =>
              l.startsWith(
                "data:"
              )
          );

      if (!line) continue;

      try {

        const event =
          JSON.parse(
            line.replace(
              "data:",
              ""
            )
          );

        onEvent(event);

      } catch (error) {

        console.error(error);
      }
    }
  }
}