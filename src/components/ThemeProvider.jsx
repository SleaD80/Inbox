import { useEffect, lazy } from 'react';
import { useSelector } from 'react-redux';

function ThemeProvider(props) {
  //const themes = {
  //slate: 'tasks/slate/bootstrap.min.css',
  //cerulean: 'tasks/cerulean/bootstrap.min.css',
  //materia: 'tasks/materia/bootstrap.min.css',
  //};

  const currentTheme = useSelector((store) => store.theme);

  useEffect(() => {
    const styles = Array.from(document.querySelectorAll('style'));
    styles.forEach((item) => (item.disabled = true));
    let bootswatchStyles = styles.filter((item) =>
      /Bootswatch/.test(item.innerText)
    );
    bootswatchStyles.forEach((item) => (item.disabled = true));
    let alreadyApplied = bootswatchStyles.find((item) =>
      new RegExp('Theme: ' + currentTheme).test(item.innerText + '\n')
    );
    if (alreadyApplied) {
      alreadyApplied.disabled = false;
    } else {
      require('bootswatch/dist/' + currentTheme + '/bootstrap.min.css');
    }
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
