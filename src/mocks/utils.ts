import { HttpResponse, JsonBodyType, delay as _delay } from "msw";
import { random } from "lodash-es";

export async function response(
  body: JsonBodyType,
  options?: { delay?: number },
) {
  const delayTime = options?.delay ?? random(500, 1000);
  await _delay(delayTime);
  return HttpResponse.json(body);
}
