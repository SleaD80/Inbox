import React from 'react';

import Icon from '../../Icon';
import { ReactComponent as IconSVG } from '../../../assets/icons/schedule-icon.svg';

const IconSchedule = ({ color = 'var(--color-stroke)', ...restProps }) => (
  <Icon {...restProps} color={color}>
    <IconSVG />
  </Icon>
);

export default IconSchedule;
