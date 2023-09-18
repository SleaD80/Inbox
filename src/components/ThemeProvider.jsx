import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadStoredTheme } from '../actions';

function ThemeProvider(props) {
  //const themes = {
  //slate: 'tasks/slate/bootstrap.min.css',
  //cerulean: 'tasks/cerulean/bootstrap.min.css',
  //materia: 'tasks/materia/bootstrap.min.css',
  //};

  let currentTheme = useSelector((store) => store.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const styles = Array.from(document.querySelectorAll('style'));
    styles.forEach((item) => (item.disabled = true));
    let bootswatchStyles = styles.filter((item) =>
      /Bootswatch/.test(item.innerText)
    );
    if (bootswatchStyles.length === 0) {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        currentTheme = storedTheme;
        dispatch(loadStoredTheme(currentTheme));
      }
    }
    bootswatchStyles.forEach((item) => (item.disabled = true));
    let alreadyApplied = bootswatchStyles.find((item) =>
      new RegExp('Theme: ' + currentTheme).test(item.innerText + '\n')
    );
    if (alreadyApplied) {
      alreadyApplied.disabled = false;
    } else {
      require(`bootswatch/dist/${currentTheme}/bootstrap.min.css`);
    }
    localStorage.setItem('theme', currentTheme);
    //let themeSheet = document.getElementById('themeSheet');
    //if (!themeSheet) {
    //themeSheet = document.createElement('link');
    //themeSheet.id = 'themeSheet';
    //themeSheet.href = themes[currentTheme];
    //themeSheet.rel = 'stylesheet';
    //themeSheet.type = 'text/css';
    //document.head.appendChild(themeSheet);
    //} else {
    //themeSheet.href = themes[currentTheme];
    //}
  });

  return props.children;
}

export default ThemeProvider;
