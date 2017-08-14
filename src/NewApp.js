import React from 'react';
import styled from 'styled-components';

const Horizontal = styled.img`
	width: 755px;
	height: 450px;
  padding: 2px;
`;

const Vertical = styled.img`
	width: 365px;
	height: 450px;
	padding: 2px;
`;

const HorizontalSmall = styled.img`
	width: 365px;
	height: 212px;
	padding: 2px;
`;

const Gallery = styled.img`
	width: 380px;
	height: 380px;
	padding: 2px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center
`

class Image extends React.Component {
	render() {
		return (
      <Container>
        <h1>755px x 450px</h1>
        <Horizontal src={this.props.url}/>
        <h1>365px x 450px</h1>
        <Vertical src={this.props.url}/>
        <h1>365px x 212px</h1>
        <HorizontalSmall src={this.props.url} />
        <h1>380px x 380px</h1>
        <Gallery src={this.props.url}/>
      </Container>
    )
	}
}

export default Image;
