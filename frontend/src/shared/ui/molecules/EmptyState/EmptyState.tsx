import { FiInbox } from "react-icons/fi";
import { Text } from "@shared/ui/atoms";
import { Wrapper } from "./EmptyState.styles";
import type { EmptyStateProps } from "./EmptyState.types";

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <Wrapper>
      <FiInbox size={28} />
      <Text variant="body" muted>
        {message}
      </Text>
    </Wrapper>
  );
}
