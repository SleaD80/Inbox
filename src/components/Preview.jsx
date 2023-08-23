import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

function Preview({ content }) {
  const docs = [{ uri: content }];
  return content ? (
    <DocViewer
      documents={docs}
      pluginRenderers={DocViewerRenderers}
      theme={{
        primary: "#5296d8",
        secondary: "#ffffff",
        // tertiary: "#5296d899",
        tertiary: "rgba(82, 150, 216, 1)",
        textPrimary: "#ffffff",
        textSecondary: "#5296d8",
        textTertiary: "#00000099",
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
