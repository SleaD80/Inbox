import React from 'react';

import Icon from '../../Icon';
import { ReactComponent as IconSVG } from '../../../assets/icons/task-signature-icon.svg';

const IconTaskSignature = ({ color = 'var(--color-stroke)', ...restProps }) => (
  <Icon {...restProps} color={color}>
    <IconSVG />
  </Icon>
);

export default IconTaskSignature;
