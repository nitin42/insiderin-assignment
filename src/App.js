import React, { Component } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import sizeOf from 'image-size';
import url from 'url'
import http from 'http'

import Next from './Next';
import Preview from './Preview';
import Crop from './Crop';

import './styles.css';

const CLOUDINARY_UPLOAD_PRESET = 'ny5ujqse';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/djbufbqnq/upload';

const Container = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	margin: 80px;
`;

const Text = styled.p`
	font-size: 30px;
	font-family: Tahoma;
	margin: 90px auto;
`;

class App extends Component {
	state = {
		check: false,
		show: false,
		loader: false,
		error: false,
		msg: '',
		uploadedFileCloudinaryUrl: '',
	};

	handleImageUpload = file => {
		let upload = request.post(CLOUDINARY_UPLOAD_URL).field('upload_preset', CLOUDINARY_UPLOAD_PRESET).field('file', file);

		upload.end((err, response) => {
			if (err) {
				console.error(err);
			}

			if (response.body.secure_url !== '') {
				const URL = response.body.secure_url
				URL.replace('https', 'http');
			
				let imgUrl = URL // https not supported
				let options = url.parse(imgUrl);
				
				// Blob => Buffer and check whether image can be uploaded or not
				http.get(options, (response) => {
					let chunks = [];
					response.on('data', function (chunk) {
						chunks.push(chunk);
					}).on('end',() => {
						let buffer = Buffer.concat(chunks);
						const dimensions = sizeOf(buffer)
						if (dimensions.width !== 1024 && dimensions.height !== 1024) {
							this.setState({
								uploadedFileCloudinaryUrl: null,
								loader: false,
								error: true,
								msg: '⁉️  Image cannot be uploaded. Try an image with size 1024 x 1024'
							})
						} else {
							this.setState({
								uploadedFileCloudinaryUrl: URL,
								show: true,
								loader: false,
							});
						}
					});
				});
			}
		});
	};

	onDrop = files => {
		this.setState({
			loader: true,
			error: false,
			msg: ''
		});
		this.handleImageUpload(files[0]);
	};

	errorMsg = (error, msg) => <h4>{error ? msg : null}</h4>

	render() {
		const { error, msg } = this.state;

		return (
			<Container>
				<Dropzone multiple={false} accept="image/*" className="dropzone" onDrop={this.onDrop}>
					<Text>Drag an image or click to upload</Text>
				</Dropzone>
				{this.errorMsg(error, msg)}
				<Preview 
					loader={this.state.loader} 
					show={this.state.show} 
					uploadedFileCloudinaryUrl={this.state.uploadedFileCloudinaryUrl} 
				/>
				<Crop 
					show={this.state.show}
					uploadedFileCloudinaryUrl={this.state.uploadedFileCloudinaryUrl}
				/>
				<Next 
					show={this.state.show} 
					uploadedFileCloudinaryUrl={this.state.uploadedFileCloudinaryUrl} 
				/>
			</Container>
		);
	}
}

export default App;
