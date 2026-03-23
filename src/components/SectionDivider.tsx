import { motion } from 'motion/react';

interface SectionDividerProps {
  variant: 'rule' | 'yellow-wash' | 'label';
  label?: string;
}

export default function SectionDivider({ variant, label }: SectionDividerProps) {
  if (variant === 'label') {
    return (
      <div className="px-6 md:px-12 py-5 overflow-hidden relative">
        <div className="flex items-center gap-6">
          <motion.span
            className="font-headline text-comedy-yellow text-sm tracking-[0.3em] shrink-0 whitespace-nowrap"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {label}
          </motion.span>
          <motion.div
            className="section-rule origin-left flex-1"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    );
  }

  // 'rule' and 'yellow-wash'
  return (
    <div className="relative overflow-hidden">
      <div className="px-6 md:px-12">
        <motion.div
          className="section-rule origin-left"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
