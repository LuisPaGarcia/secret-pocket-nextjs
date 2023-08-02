import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { hit_secret } from "../../lib/functions/utils";

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  try {

    if (event.httpMethod !== "GET") return { statusCode: 405, body: "Method Not Allowed" };

    const secret_id = event.queryStringParameters?.id || '';
    console.log('secret_id', secret_id)
    const secret = await hit_secret(secret_id);

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
