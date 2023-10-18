import React from 'react';

import Icon from '../../Icon';
import { ReactComponent as IconSVG } from '../../../assets/icons/task-icon.svg';

const IconTask = ({ color = 'var(--color-stroke)', ...restProps }) => (
  <Icon {...restProps} color={color}>
    <IconSVG />
  </Icon>
);

export default IconTask;
