import React from 'react';

import Icon from '../../Icon';
import { ReactComponent as IconSVG } from '../../../assets/icons/expectation-icon.svg';

const IconExpectation = ({ color = 'var(--color-stroke)', ...restProps }) => (
  <Icon {...restProps} color={color}>
    <IconSVG />
  </Icon>
);

export default IconExpectation;
