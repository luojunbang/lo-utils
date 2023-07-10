import { parseParams, r } from "./index";

/**
 * @public
 * jsonp
 * @param url - url
 * @param params - params
 * @returns - Promise
 */
export function jsonp<T>(
  url: string,
  params: Record<string, any> = {}
): Promise<{ data: T }> {
  if (!window) return Promise.reject();

  return new Promise((rs, rj) => {
    const _id: string = "jsonp_" + r();
    Reflect.defineProperty(window, _id, {
      writable: false,
      configurable: true,
      enumerable: false,
      value: function (res: T) {
        rs({ data: res });
        Reflect.deleteProperty(window, _id);
      },
    });
    const script = document.createElement("script");
    const _params = parseParams(params);
    script.src = url + _id + (_params ? "&" : "") + _params;
    document.head.append(script);
  });
}
