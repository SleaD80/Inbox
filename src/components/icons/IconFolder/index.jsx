import React from 'react';

import Icon from '../../Icon';
import { ReactComponent as IconSVG } from '../../../assets/icons/folder-icon.svg';

const IconFolder = ({ color = 'var(--color-stroke)', ...restProps }) => (
  <Icon {...restProps} color={color}>
    <IconSVG />
  </Icon>
);

export default IconFolder;
