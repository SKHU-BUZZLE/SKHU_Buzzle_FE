import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../authStore";

interface ServerEvent {
  type: string;
  payload: any;
}

export function useSSEFetch() {
  const { accessToken } = useAuthStore();
  const [events, setEvents] = useState<ServerEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(
    null
  );

  useEffect(() => {
    async function connectSSE() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/connect`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`서버 응답 실패: ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error("ReadableStream을 지원하지 않습니다.");
        }
        readerRef.current = reader;
        const decoder = new TextDecoder();
        setIsConnected(true);
        setError(null);

        let buffer = "";
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          // 스트림의 새로운 청크를 디코딩
          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;

          // SSE 메시지는 보통 두 개의 개행(\n\n)으로 구분됨
          const parts = buffer.split("\n\n");
          // 마지막 부분은 완전하지 않을 수 있으므로 buffer에 남김
          buffer = parts.pop() || "";
          for (const part of parts) {
            // SSE 메시지는 보통 "data:"로 시작합니다.
            if (part.startsWith("data:")) {
              const dataStr = part.slice("data:".length).trim();
              try {
                const parsed: ServerEvent = JSON.parse(dataStr);
                setEvents((prev) => [...prev, parsed]);
              } catch (err) {
                console.error("JSON 파싱 실패:", err, dataStr);
              }
            }
          }
        }
      } catch (err) {
        console.error("SSE 연결 실패:", err);
        setError(err instanceof Error ? err.message : String(err));
        setIsConnected(false);
      }
    }

    connectSSE();

    return () => {
      if (readerRef.current) {
        readerRef.current.cancel();
      }
    };
  }, [accessToken]);

  return { events, isConnected, error };
}
