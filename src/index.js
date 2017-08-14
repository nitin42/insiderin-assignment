import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import Image from './NewApp';
import registerServiceWorker from './registerServiceWorker';

const NewApp = () =>
	<Router>
		<div>
			<Route exact path="/" component={App} />
			<Route
				exact
				path="/images"
				render={props => {
					return (
						<div>
							<Image url={props.location.state.url} />
						</div>
					);
				}}
			/>
		</div>
	</Router>;

ReactDOM.render(<NewApp />, document.getElementById('root'));
registerServiceWorker();
