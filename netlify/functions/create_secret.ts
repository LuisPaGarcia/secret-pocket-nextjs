import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { create_secret_func } from "../../lib/functions/utils";

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  try {

    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

    const { secret_content } = JSON.parse(event.body || '{}');
    console.log(secret_content)
    const secret = await create_secret_func(secret_content);

    return {
      statusCode: 200,
      body: JSON.stringify({ data: secret, error: null }),
    };
  } catch (e: unknown) {
    return {
      statusCode: 500,
      body: JSON.stringify({ data: null, error: e }),
    };
  }
};

export { handler };
