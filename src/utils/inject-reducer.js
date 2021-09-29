import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ReactReduxContext } from 'react-redux';

import getInjectors from './reducer-injectors';

const injectReducer =
  ({ key, reducer }) =>
  (WrappedComponent) => {
    class ReducerInjector extends React.Component {
      static WrappedComponent = WrappedComponent;

      // eslint-disable-next-line react/static-property-placement
      static contextType = ReactReduxContext;

      // eslint-disable-next-line react/static-property-placement
      static displayName = `withReducer(${
        WrappedComponent.displayName || WrappedComponent.name || 'Component'
      })`;

      constructor(props, context) {
        super(props, context);

        getInjectors(context.store).injectReducer(key, reducer);
      }

      render() {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <WrappedComponent {...this.props} />;
      }
    }

    return hoistNonReactStatics(ReducerInjector, WrappedComponent);
  };

export default injectReducer;

const useInjectReducer = ({ key, reducer }) => {
  const context = React.useContext(ReactReduxContext);
  React.useEffect(() => {
    getInjectors(context.store).injectReducer(key, reducer);
  }, []);
};

export { useInjectReducer };