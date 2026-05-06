import React from 'react';

import { FaRotate } from "react-icons/fa6";
import { Container } from './Common.styles';

const Loading = ({height, iconSize, border, width = "auto"}) => {
  return (
    <Container height={height} $iconSize={iconSize} border={border} width={width}  suppressHydrationWarning={true}>
     
        <FaRotate className='spinner' />

    </Container>
  )
}

export default Loading