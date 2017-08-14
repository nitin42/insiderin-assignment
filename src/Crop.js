import React, { Component } from 'react';
import styled from 'styled-components';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const CropContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 10px;
`;

const PreviewContainer = styled.div`
	margin: 160px auto;
	height: 200px;
	width: 500px;
`;

export default class Crop extends Component {
	_crop = () => {
		this.refs.cropper.getCroppedCanvas().toDataURL();
	};

	render() {
		return (
			<div>
				{this.props.show
					? <div>
          <h3>Crop the image</h3>
								<Cropper
									ref="cropper"
									src={this.props.uploadedFileCloudinaryUrl}
									style={{ height: 200, width: '50%' }}
									// Cropper.js options
									aspectRatio={16 / 9}
									guides={false}
									preview="#preview"
									crop={this._crop}
								/>
							<PreviewContainer id="preview" />
						</div>
					: null}
			</div>
		);
	}
}
