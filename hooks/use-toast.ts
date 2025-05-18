"use client"

// This is a simple utility function that can be imported and used anywhere
// It doesn't use hooks, so it's safe to use outside of React components

let showToast = (props: { title: string; description: string; variant?: "default" | "destructive" | "success" }) => {
  // This will be replaced with the actual toast function from the context
  console.log(`Toast: ${props.title} - ${props.description}`)
}

// This function will be replaced when the ToastProvider is mounted
export const setToastFunction = (fn: typeof showToast) => {
  showToast = fn
}

// Export a function, not a hook
export const toast = (props: {
  title: string
  description: string
  variant?: "default" | "destructive" | "success"
}) => {
  showToast(props)
}
