import React from 'react';
import { Modal } from 'react-native';
import GenericScreen from './GenericScreen';

const modalScreenState = {
	visible: false
};

function ModalScreen(WrappedComponent) {
	const ModalScreenRaw = class extends React.Component {
		constructor(props) {
			super(props);
			this.state = modalScreenState;
		}

		open = () => {
			this.setState({
				...modalScreenState,
				visible: true
			});
		};

		close = () => {
			this.setState({
				...modalScreenState,
				visible: false
			});
		};

		render() {
			const { visible } = this.state;
			const props = {
				...this.props,
				close: this.close
			};
			return (
				<Modal visible={visible} onRequestClose={this.close} animation='slide'>
					<WrappedComponent {...props} />
				</Modal>
			);
		}
	};
	return GenericScreen(ModalScreenRaw);
}

export default ModalScreen;
