import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadStoredTheme } from '../actions';

function ThemeProvider(props) {
  const themes = {
    slate: 'tasks/slate/bootstrap.min.css',
    cerulean: 'tasks/cerulean/bootstrap.min.css',
    materia: 'tasks/materia/bootstrap.min.css',
  };

  let currentTheme = useSelector((store) => store.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    let themeSheet = document.getElementById('themeSheet');
    if (!themeSheet) {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        currentTheme = storedTheme;
        dispatch(loadStoredTheme(currentTheme));
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
