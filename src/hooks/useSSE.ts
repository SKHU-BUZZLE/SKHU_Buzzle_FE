import { useEffect, useRef, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useAuthStore } from "../stores/authStore";
import { inGameState, useMultiMatchStore } from "../stores/multiStore";

function parseRoomId(data: string): string | null {
  const parts = data.split(":");
  if (parts.length >= 2) {
    return parts[1].trim();
  }
  return null;
}

export function useSSEPolyfill() {
  const { accessToken } = useAuthStore();
  const [events, _] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);

  useEffect(() => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/connect`;

    eventSourceRef.current = new EventSourcePolyfill(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
      heartbeatTimeout: 600000, // 타임아웃을 10분으로 설정
    });

    const eventSource = eventSourceRef.current;

    eventSource.addEventListener("open", () => {
      setIsConnected(true);
      setError(null);
    });

    eventSource.addEventListener("message", (event) => {
      const roomId = parseRoomId(event.data);
      if (event.data.startsWith("roomId")) {
        parseRoomId(event.data);
        if (roomId) {
          useMultiMatchStore.getState().setRoomId(roomId);
          useMultiMatchStore.getState().setState(inGameState.ingame);
        }
      }
    });

    eventSource.addEventListener("error", (event) => {
      console.error("SSE 에러 발생:", event);
      setError("SSE 연결 오류");
      setIsConnected(false);
      // 필요 시 eventSource.close() 호출 가능
    });

    return () => {
      eventSource.close();
    };
  }, [accessToken]);

  return { events, isConnected, error };
}
