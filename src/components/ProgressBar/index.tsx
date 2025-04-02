import { Progress } from 'radix-ui';
import './styles.css';

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <Progress.Root className="ProgressRoot" value={progress}>
      <Progress.Indicator
        className="ProgressIndicator"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
};

export default ProgressBar;
