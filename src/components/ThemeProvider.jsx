import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from '../actions';

function ThemeProvider(props) {
  const themes = {
    slate: '/app/tasks/slate/bootstrap.min.css',
    cerulean: '/app/tasks/cerulean/bootstrap.min.css',
    materia: '/app/tasks/materia/bootstrap.min.css',
  };

  let currentTheme = useSelector((store) => store.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    let themeSheet = document.getElementById('themeSheet');
    if (!themeSheet) {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        currentTheme = storedTheme;
        dispatch(changeTheme(currentTheme));
      }
      themeSheet = document.createElement('link');
      themeSheet.id = 'themeSheet';
      themeSheet.href = themes[currentTheme];
      themeSheet.rel = 'stylesheet';
      themeSheet.type = 'text/css';
      document.head.appendChild(themeSheet);
    } else {
      themeSheet.href = themes[currentTheme];
    }
    localStorage.setItem('theme', currentTheme);
  });

  return props.children;
}

export default ThemeProvider;
