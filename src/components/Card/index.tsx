/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Card as RadixCard,
  Code,
  Flex,
  Heading,
  Spinner,
  Text,
} from '@radix-ui/themes';
import { CheckCircledIcon } from '@radix-ui/react-icons';
import { motion } from 'motion/react';

import { animationDuration, cardAnimationDuration, TStep } from '../../utils';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: animationDuration,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export const Card = ({
  step,
  stepComplete,
  allStepsComplete,
  isCurrentStep,
}: {
  step: TStep;
  stepComplete: boolean;
  allStepsComplete: boolean;
  isCurrentStep: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: '1%' }}
    animate={{
      opacity: 1,
      y: 0,
      transition: { ease: 'backOut', duration: cardAnimationDuration },
    }}
  >
    <motion.div
      whileHover={{ opacity: 1 }}
      style={{ opacity: !isCurrentStep || allStepsComplete ? 0.5 : 1 }}
    >
      <RadixCard>
        <motion.div variants={container} initial="hidden" animate="show">
          <Flex direction={'column'} gap="2" mb="2">
            <motion.div style={{ textWrap: 'nowrap' }} variants={item}>
              <Heading size="6">{step.title}</Heading>
            </motion.div>
            <motion.div variants={item}>
              <Code>/{step.title.replace(/ /g, '-')}</Code>
            </motion.div>
          </Flex>
          <Box my="4" style={{ opacity: 0.1 }}>
            <hr />
          </Box>
          <Flex direction="column">
            {step?.substeps.map((substep) => {
              let color = substep.color;

              if (!isNaN(parseInt(substep.value))) {
                color = 'violet';
              } else if (!substep.color) {
                color = 'gray';
              }

              return (
                <motion.div variants={item}>
                  <Text color="gray" size="1">
                    {substep.key}:{' '}
                  </Text>
                  <Code color={color as any} size="1">
                    {substep.value}
                  </Code>
                </motion.div>
              );
            })}
          </Flex>

          <Box position="absolute" top="2" right="2">
            {!stepComplete ? (
              <Spinner />
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: '200%' }}
                animate={{
                  opacity: 1,
                  scale: '100%',
                  transition: { duration: animationDuration },
                }}
              >
                <Box style={{ transform: 'scale(1.25)' }}>
                  <CheckCircledIcon color="#1FD8A4" height={20} />
                </Box>
              </motion.div>
            )}
          </Box>
        </motion.div>
      </RadixCard>
    </motion.div>
  </motion.div>
);
