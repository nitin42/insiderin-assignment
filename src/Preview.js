import React from 'react';
import styled from 'styled-components';

const View = styled.div`margin: 30px auto;`;

let Preview = ({ loader, show, uploadedFileCloudinaryUrl }) =>
	<View>
		{loader ? <div className="loader" /> : null}
	</View>;

export default Preview