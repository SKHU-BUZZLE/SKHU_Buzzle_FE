import { useEffect, useRef, useState } from "react";

import { EventSourcePolyfill } from "event-source-polyfill";
import { useAuthStore } from "../stores/authStore";

interface ServerEvent {
  type: string;
  payload: any;
}

export function useSSEPolyfill() {
  const { accessToken } = useAuthStore();
  const [events, setEvents] = useState<ServerEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);

  useEffect(() => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/connect`;

    // EventSourcePolyfill 인스턴스 생성 (withCredentials 옵션 사용)
    eventSourceRef.current = new EventSourcePolyfill(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      withCredentials: true, // credentials: "include" 대신 사용
    });

    const eventSource = eventSourceRef.current;

    eventSource.addEventListener("open", () => {
      console.log("✅ SSE: 연결 성공!");
      setIsConnected(true);
      setError(null);
    });

    eventSource.addEventListener("message", (event) => {
      console.log("📩 [MESSAGE] 도착:", event.data);
    });

    eventSource.addEventListener("error", (event) => {
      console.error("❌ SSE 에러 발생:", event);
      setError("SSE 연결 오류");
      setIsConnected(false);
      // 필요 시 eventSource.close() 호출
    });

    return () => {
      eventSource.close();
    };
  }, [accessToken]);

  return { events, isConnected, error };
}
