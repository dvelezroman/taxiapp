import React from "react";
import {
	StyleSheet,
	ScrollView,
	View,
	Text,
	TextInput,
	Dimensions
} from "react-native";
import io from "socket.io-client";
import { Colors } from "react-native/Libraries/NewAppScreen";

const { width, height } = Dimensions.get("window");

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: "",
			messageStack: []
		};
	}

	submitMessage = () => {
		const { message } = this.state;
		this.socket.emit("chat message", message);
		this.setState({ message: "" });
	};

	componentDidMount() {
		this.socket = io("http://192.168.1.47:3000");
		this.socket.on("chat message", msg => {
			const { messageStack } = this.state;
			stackUpdated = [...messageStack, msg];
			this.setState({ messageStack: stackUpdated });
		});
	}

	render() {
		const { messageStack } = this.state;
		return (
			<View style={styles.body}>
				<View style={{ flex: 1 }}>
					<TextInput
						style={styles.input}
						placeholder="Send a message"
						autoCorrect={false}
						value={this.state.message}
						onSubmitEditing={() => this.submitMessage()}
						onChangeText={message => {
							this.setState({ message });
						}}
					/>
				</View>

				<View
					style={{
						flex: 11,
						width: width - 20,
						borderWidth: 1,
						paddingHorizontal: 5,
						maxHeight: height - 20
					}}
				>
					<ScrollView>
						{messageStack.map((message, index) => {
							return (
								<View key={index} style={styles.chatBox}>
									<Text style={styles.text}>{message}</Text>
								</View>
							);
						})}
					</ScrollView>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
		padding: 20,
		flexDirection: "column",
		backgroundColor: Colors.white,
		justifyContent: "center",
		alignItems: "center"
	},
	text: {
		color: "#d0d0d0",
		fontSize: 16
	},
	input: {
		height: 40,
		width: width - 40,
		borderWidth: 1
	},
	chatBox: {
		marginVertical: 5,
		padding: 5,
		borderWidth: 0.5,
		backgroundColor: "#00b3fe"
	}
});
