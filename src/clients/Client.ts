export type ClientRequestProps = {
  endpoint: string;
  payload?: any;
  queryParams?: Record<string, string>;
  baseApi?: string;
};

export type ClientResponse<T = any> = {
  statusCode: number;
  message?: string;
  data?: T;
};

export class Client {
  static async get<T = any>(
    endpoint: string,
    options: Omit<ClientRequestProps, "endpoint"> = {}
  ) {
    return this.request<T>("GET", {
      ...options,
      endpoint,
    });
  }

  static async post<T = any>(
    endpoint: string,
    options: Omit<ClientRequestProps, "endpoint"> = {}
  ) {
    return this.request<T>("POST", {
      ...options,
      endpoint,
    });
  }

  static async put<T = any>(
    endpoint: string,
    options: Omit<ClientRequestProps, "endpoint"> = {}
  ) {
    return this.request<T>("PUT", {
      ...options,
      endpoint,
    });
  }

  static async path<T = any>(
    endpoint: string,
    options: Omit<ClientRequestProps, "endpoint"> = {}
  ) {
    return this.request<T>("PATH", {
      ...options,
      endpoint,
    });
  }

  static async delete<T = any>(
    endpoint: string,
    options: Omit<ClientRequestProps, "endpoint"> = {}
  ) {
    return this.request<T>("DELETE", {
      ...options,
      endpoint,
    });
  }

  static async request<T = any>(
    method: "GET" | "POST" | "PUT" | "PATH" | "DELETE",
    options: ClientRequestProps
  ): Promise<ClientResponse<T>> {
    try {
      const finalUrl = new URL(
        `${options.baseApi ?? import.meta.env.VITE_REGISTRATIONS_BASE_URL}/${
          options.endpoint
        }`
      );
      for (const key in options.queryParams)
        finalUrl.searchParams.append(key, options.queryParams[key]);

      const response = await fetch(finalUrl, {
        method,
        body: JSON.stringify(options.payload),
      });

      const data = (await response.json()) as T;

      return {
        statusCode: response.status,
        data,
      } as ClientResponse<T>;
    } catch (e) {
      return {
        statusCode: 500,
        message: JSON.stringify(e),
      } as ClientResponse<T>;
    }
  }
}
