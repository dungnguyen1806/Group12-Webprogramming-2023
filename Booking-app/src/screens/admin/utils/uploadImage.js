import axios from 'axios';
import React, { Component } from 'react';

class UploadImage extends Component {
	state = {
		// Initially, no file is selected
		selectedFile: null
	};

	// On file select (from the pop up)
	onFileChange = event => {
		// Update the state
		this.setState({ selectedFile: event.target.files[0] });
	};

	// On file upload (click the upload button)
	onFileUpload = () => {
		// Create an object of formData
		const formData = new FormData();
		// Update the formData object
		formData.append(
			"myFile",
			this.state.selectedFile,
			this.state.selectedFile.name
		);
        
		// Request made to the backend api
		// Send formData object
		axios.post("api/uploadfile", formData);
	};

	render() {
		return (
			<div>
				<div>
					<input type="file" onChange={this.onFileChange} />
					<button onClick={this.onFileUpload}>
						Upload!
					</button>
				</div>
			</div>
		);
	}
}

export default UploadImage;
