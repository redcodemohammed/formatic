import type { $Fetch, NitroFetchRequest } from "nitropack";

/*
 The FetchFactory acts as a wrapper around an HTTP client. 
 It encapsulates the functionality for making API requests asynchronously 
 through the call function, utilizing the provided HTTP client.
*/
class FetchFactory<T> {
  private $fetch: $Fetch<T, NitroFetchRequest>;

  constructor(fetcher: $Fetch<T, NitroFetchRequest>) {
    this.$fetch = fetcher;
  }

  /**
   * The HTTP client is utilized to control the process of making API requests.
   * @param method the HTTP method (GET, POST, ...)
   * @param url the endpoint url
   * @param data the body data
   * @param fetchOptions fetch options
   * @returns
   */
  call<U>(method: string, url: string, data?: object, fetchOptions?: any): Promise<U> {
    return this.$fetch<U>(url, {
      method,
      body: data,
      ...fetchOptions,
    });
  }
}

export default FetchFactory;
