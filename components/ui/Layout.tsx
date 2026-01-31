import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

// Simple hook to detect mobile - runs once on mount
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
  }, []);

  return isMobile;
};

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  dark?: boolean;
}

export const Section: React.FC<SectionProps> = ({ id, className, children, dark = false }) => {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-32 px-6 md:px-12 lg:px-24 relative",
        dark ? "bg-surface-secondary" : "bg-white",
        className
      )}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
};

export const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.43, 0.13, 0.23, 0.96] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScaleIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.43, 0.13, 0.23, 0.96] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const SlideIn: React.FC<{ children: React.ReactNode; delay?: number; className?: string; direction?: 'left' | 'right' }> = ({
  children,
  delay = 0,
  className,
  direction = 'left'
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.43, 0.13, 0.23, 0.96] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer: React.FC<{ children: React.ReactNode; className?: string; staggerDelay?: number }> = ({
  children,
  className,
  staggerDelay = 0.1
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
