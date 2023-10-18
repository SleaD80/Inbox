import React from 'react';
import PropTypes from 'prop-types';
import './Icon.css';

// Компонент для создания иконок. Напрямую не используется
const Icon = ({
  children,
  color,
  externalClass,
  hint,
  onClick,
  size = 'm',
}) => {
  const colorStyle = {
    borderColor: color,
    fill: color,
  };
  const sizeClass = `icon_${size}`;

  let iconChildren = null;

  if (React.isValidElement(children)) {
    iconChildren = React.cloneElement(children);
  };

  return (
    <span
      className={`icon d-block ${sizeClass} ${externalClass}`}
      onClick={onClick}
      style={{ ...colorStyle }}
      title={hint}
    >
      {iconChildren}
    </span>
  );
};

export default Icon;

Icon.propTypes = {
  /**
   * Some svg image element
   */
  children: PropTypes.element,
  /**
   * What icon color to use
   */
  color: PropTypes.string,
  /**
   * Classes for wrapping icons
   */
  externalClass: PropTypes.string,
  /**
   * Some text shown when hovering over the icon
   */
  hint: PropTypes.string,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
  /**
   * How large should the icon be?
   */
  size: PropTypes.oneOf(['xs', 's', 'm', 'l']),
};

Icon.defaultProps = {
  children: null,
  color: 'color-stroke',
  externalClass: undefined,
  hint: undefined,
  onClick: undefined,
  size: 'm',
};
