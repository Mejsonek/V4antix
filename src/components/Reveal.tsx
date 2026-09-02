import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
};

export function Reveal({ children, delay = 0, className = "", as: Tag = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties = { transitionDelay: `${delay}ms` };
  const Component = Tag as unknown as "div";
  return (
    <Component
      // @ts-expect-error polymorphic ref
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={style}
    >
      {children}
    </Component>
  );
}
