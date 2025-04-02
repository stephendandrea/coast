import { ReactNode, useCallback, useEffect, useState } from 'react';
import {
  Container,
  Flex,
  Heading,
  IconButton,
  Spinner,
  Text,
  Theme,
} from '@radix-ui/themes';
import { ReloadIcon } from '@radix-ui/react-icons';
import ProgressBar from './components/ProgressBar';
import {
  animationDurationMS,
  cardAnimationDurationMS,
  generateRandomColor,
  generateRandomPhrase,
  generateRandomValue,
  stepsArray,
  TStep,
} from './utils';
import { Card } from './components/Card';

function App() {
  const [steps, setSteps] = useState<TStep[]>([]);
  const [step, setStep] = useState(-1);
  const [stepsComplete, setStepsComplete] = useState(-1);
  const [allStepsComplete, setAllSetpsComplete] = useState(false);
  const cards: ReactNode[] = [];

  const goToNextStep = useCallback(() => setStep(step + 1), [step]);

  const onRestartClick = () => {
    if (allStepsComplete) {
      setStep(-1);
      setAllSetpsComplete(false);
      setStepsComplete(-1);
    }
  };

  // Animation orchestration
  useEffect(() => {
    if (allStepsComplete) return;

    let intervalId;

    // Pad delay to account for card entrance
    let intervalDelay = cardAnimationDurationMS;

    if (steps[step]?.substeps) {
      // add delay to ensure all substeps have time to animate
      intervalDelay += steps[step].substeps.length * animationDurationMS;
    }

    if (step > -1) {
      // fire an event early to show the checkmark before prgoressing to the next step
      // assumes all events are successful
      setTimeout(
        () => setStepsComplete(step),
        intervalDelay - animationDurationMS
      );
    }

    if (step === steps.length - 1) {
      intervalId = setTimeout(() => setAllSetpsComplete(true), intervalDelay);
    } else {
      intervalId = setTimeout(goToNextStep, intervalDelay);
    }

    return () => clearTimeout(intervalId);
  }, [goToNextStep, step, steps, allStepsComplete]);

  // Start animation on mount
  useEffect(() => {
    // generate random data
    setSteps(
      stepsArray.map((step) => ({
        ...step,
        title: generateRandomPhrase(),
        substeps: Array(step.substeps)
          .fill(undefined)
          .map(() => ({
            key: generateRandomPhrase(),
            value: generateRandomValue(),
            color: generateRandomColor(),
          })),
      }))
    );

    goToNextStep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  steps.forEach((_, idx) => {
    if (idx <= step) {
      const isCurrent = idx === step;

      cards.unshift(
        <Card
          key={`steps-${idx}`}
          step={steps[idx]}
          isCurrentStep={isCurrent}
          stepComplete={!isCurrent || stepsComplete >= step}
          allStepsComplete={allStepsComplete}
        />
      );
    }
  });

  const getProgress = () => {
    if (allStepsComplete) {
      return 100;
    }

    // handle multiplier with 0 based index
    const stepMultiple = step === steps.length ? step : step + 1;

    // add 1 to amount of divisions to hold progress bar while the final step completes
    const division = 100 / (steps.length + 1);

    return division * stepMultiple;
  };

  return (
    <Theme appearance="dark" accentColor="violet" grayColor="sand">
      <Container size="3" p="4">
        <Flex direction="column" gap="2">
          <Flex align="center" justify="between" gap="2" my="2" mb="4">
            <Heading color="gray">
              {allStepsComplete ? 'Complete!' : 'Processing...'}
            </Heading>
            <Flex align="center" gap="2">
              <IconButton
                onClick={onRestartClick}
                size="1"
                color="gray"
                variant="ghost"
                style={{ cursor: 'pointer' }}
              >
                {allStepsComplete && <ReloadIcon />}
              </IconButton>
              <ProgressBar progress={getProgress()} />
              <Flex width="35px" justify="end">
                <Text color="violet" size="1">
                  {step + 1} of {steps.length}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          {cards.length === 0 && (
            <Flex direction="column" align="center" p="6">
              <Spinner />
            </Flex>
          )}
          {cards}
        </Flex>
      </Container>
    </Theme>
  );
}

export default App;
