import { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

const SocketContext = createContext<Socket | null>(null)

export const useListenEvent = (event: string, callback: (data: any) => void) => {
  const socket = useContext(SocketContext)

  useEffect(() => {
    if (!socket) return

    socket.on(event, callback)

    return () => {
      socket.off(event, callback)
    }
  }, [socket, event, callback])
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const newSocket = io('http://localhost:5000')
    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [])

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}
