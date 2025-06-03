import { io, Socket } from 'socket.io-client'
import { watchEffect, onUnmounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRuntimeConfig } from '#app'

let socket: Socket | null = null

export function useSocket() {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  const connect = () => {
    if (socket && socket.connected) return

    socket = io(config.public.apiBase, {
      transports: ['websocket'],
      auth: {
        token: authStore.token,
      },
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    })

    socket.on('connect', () => {
      console.log('✅ Socket connected:', socket?.id)
      if (authStore.user?._id) {
        socket?.emit('user-connected', authStore.user._id)
      }
    })

    socket.on('disconnect', (reason) => {
      console.log('⚠️ Socket disconnected:', reason)
    })

    socket.on('connect_error', (err) => {
      console.error('❌ Socket connection error:', err.message)
    })

    socket.onAny((event, ...args) => {
      console.log(`📩 Received "${event}":`, ...args)
    })
    socket.on('reconnect_attempt', (attemptNumber) => {
      console.log('⚡ Attempting reconnect:', attemptNumber);
    });

    socket.on('reconnect_failed', () => {
      console.log('❌ Reconnect failed after max attempts');
    });
  }

  const disconnect = () => {
    if (socket) {
      socket.removeAllListeners()
      socket.disconnect()
      socket = null
    }
  }

  const getSocket = () => socket

  // Tự động kết nối lại khi token thay đổi
  watchEffect(() => {
    if (authStore.token) {
      connect()
    } else {
      disconnect()
    }
  })

  // Dọn dẹp khi component bị hủy (optional nếu dùng trong layout/app.vue)
  onUnmounted(() => {
    disconnect()
  })

  return {
    connect,
    disconnect,
    getSocket,
  }
}