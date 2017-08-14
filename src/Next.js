import React from 'react';
import { Link } from 'react-router-dom';

let Next = ({show, uploadedFileCloudinaryUrl }) =>
	<div>
		{show
			? <Link className="button" to={{ pathname: '/images', state: { url: uploadedFileCloudinaryUrl } }}>Show images</Link>
			: null}
	</div>;

export default Next;