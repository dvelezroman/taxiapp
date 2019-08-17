import React from 'react';
import { Keyboard } from 'react-native';
import SpinnerComponent from '../screen/Common/SpinnerComponent';

function GenericScreen(WrappedScreen) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        working: false,
      };
      this.setWorking = this.setWorking.bind(this);
    }

    setWorking(working = false, callback = () => {}) {
      if (working) Keyboard.dismiss();
      this.setState({ working }, () => callback());
    }

    render() {
      const { working } = this.state;
      return (
        <>
          {working && <SpinnerComponent color="blue" />}
          <WrappedScreen {...this.props} setWorking={this.setWorking} />
        </>
      );
    }
  };
}

export default GenericScreen;
