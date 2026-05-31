import { FiAlertTriangle } from "react-icons/fi";
import { Text } from "@shared/ui/atoms";
import { Wrapper } from "./ErrorState.styles";
import type { ErrorStateProps } from "./ErrorState.types";

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <Wrapper>
      <FiAlertTriangle size={28} />
      <Text variant="body" muted>
        {message}
      </Text>
    </Wrapper>
  );
}
