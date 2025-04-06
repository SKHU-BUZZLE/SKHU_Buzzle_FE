export {};

declare global {
  interface Window {
    SockJS: any;
    Stomp: {
      over: (socket: any) => {
        [x: string]: any;
        connect: (
          headers: Record<string, unknown>,
          onConnect: () => void,
          onError: (error: unknown) => void
        ) => void;
        subscribe: (
          destination: string,
          callback: (message: { body: string }) => void
        ) => void;
        send: (destination: string, headers: {}, body: string) => void;
        disconnect: (callback: () => void) => void;
      };
    };
  }
}
