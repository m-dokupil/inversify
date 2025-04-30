import { Provider } from 'inversify-react';
import { Container } from 'inversify';

interface InversifyProviderProps {
  container: Container;
  children: React.ReactNode;
}

export const InversifyProvider: React.FC<InversifyProviderProps> = ({ container, children }) => {
  return (
    <Provider container={container}>
      {children}
    </Provider>
  );
};
