import React from 'react';
import PropTypes from 'prop-types';
import { IconTypes } from '../consts/consts';
import { ReactComponent as IconExpectation } from '../assets/icons/expectation-icon.svg';
import { ReactComponent as IconFolder } from '../assets/icons/folder-icon.svg';
import { ReactComponent as IconSchedule } from '../assets/icons/schedule-icon.svg';
import { ReactComponent as IconTask } from '../assets/icons/task-icon.svg';
import { ReactComponent as IconTaskSignature } from '../assets/icons/task-signature-icon.svg';
import { ReactComponent as IconUnchecked } from '../assets/icons/unchecked-icon.svg';
import './Icon.css';

// Компонент для создания иконок. Напрямую не используется
const Icon = ({
  color,
  externalClass,
  hint,
  onClick,
  size = 'm',
  name,
}) => {
  const colorStyle = {
    borderColor: color,
    fill: color,
  };
  const sizeClass = `icon_${size}`;

  const getIconSvg = () => {
    switch (name) {
      case IconTypes.Expectation:
        return <IconExpectation/>
      case IconTypes.Folder:
        return <IconFolder/>
      case IconTypes.Schedule:
        return <IconSchedule/>
      case IconTypes.Task:
        return <IconTask/>
      case IconTypes.TaskSignature:
        return <IconTaskSignature/>
      case IconTypes.Unchecked:
        return <IconUnchecked/>
      default:
        return <IconFolder/>
    }
  }

  return (
    <span
      className={`icon d-block ${sizeClass} ${externalClass}`}
      onClick={onClick}
      style={{ ...colorStyle }}
      title={hint}
    >
      {getIconSvg()}
    </span>
  );
};

export default Icon;

Icon.propTypes = {
  /**
   * How large should the icon be?
   */
  name: PropTypes.oneOf(['Expectation', 'Folder', 'Schedule', 'Task', 'TaskSignature', 'Unchecked']),
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
  name: IconTypes.Folder,
  color: undefined,
  externalClass: undefined,
  hint: undefined,
  onClick: undefined,
  size: 'm',
};
