import { useThreekitInitStatus } from '../../../hooks';

const AwaitPlayerLoad = ({ children }) => {
  const isLoaded = useThreekitInitStatus();
  if (!isLoaded || !children) return null;
  return children;
};

export default AwaitPlayerLoad;
