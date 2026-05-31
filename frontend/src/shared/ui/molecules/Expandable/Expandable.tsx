import { useEffect, useRef, useState } from "react";
import { Content, ToggleRow, Toggle } from "./Expandable.styles";
import type { ExpandableProps } from "./Expandable.types";

export function Expandable({
  children,
  lines = 3,
  moreLabel,
  lessLabel,
}: ExpandableProps) {
  const [expanded, setExpanded] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      setOverflowing(el.scrollHeight > el.clientHeight);
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <Content ref={ref} $expanded={expanded} $lines={lines}>
        {children}
      </Content>
      {(overflowing || expanded) && (
        <ToggleRow>
          <Toggle type="button" onClick={() => setExpanded((value) => !value)}>
            {expanded ? lessLabel : moreLabel}
          </Toggle>
        </ToggleRow>
      )}
    </div>
  );
}
