import { HttpResponse, delay as _delay, JsonBodyType } from "msw";
import { random } from "lodash-es";

export async function response(body: JsonBodyType) {
  const delay = random(500, 1000);
  await _delay(delay);
  return HttpResponse.json(body);
}
