import { useQueryClient } from "@tanstack/react-query";

export function useRefetchTickets() {
  const queryClient = useQueryClient();
  
  return () => queryClient.invalidateQueries(["tickets"]);
}