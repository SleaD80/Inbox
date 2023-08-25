import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

function Preview({ content }) {
  const docs = [{ uri: content }];
  return content ? (
    <DocViewer
      documents={docs}
      pluginRenderers={DocViewerRenderers}
      theme={{
        primary: 'white',
        secondary: '#ffffff',
        tertiary: 'white',
        textPrimary: '#ffffff',
        textSecondary: '#5296d8',
        textTertiary: '#00000099',
        disableThemeScrollbar: false,
      }}
      config={{
        header: {
          disableHeader: true,
          disableFileName: false,
          retainURLParams: false,
        },
      }}
    />
  ) : (
    <div>Файл не найден</div>
  );
}

export default Preview;
