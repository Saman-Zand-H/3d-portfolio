import { Html } from '@react-three/drei';

type LoaderProps = {
  color?: string;
};

const Loader = ({ color }: LoaderProps) => {
  return (
    <Html>
      <div className="flex items-center justify-center">
        <div
          className={`h-20 w-20 animate-spin rounded-full border-2 border-${color || 'blue-500'} border-t-${color || 'blue-500'} border-opacity-20`}
        ></div>
      </div>
    </Html>
  );
};

export default Loader;
